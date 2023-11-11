const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

const Comment = require("../models/Comments");
const blogCard = require("../models/BlogCard");
const Userdetail = require("../models/UserDetails");
const { default: mongoose } = require("mongoose");


// ROUTE 3: Put all a blog in the database : POST "/api/blogs/addblog"
router.post(
    "/addcomment",
    fetchuser,

    async (req, res) => {
        try {
            const { userID, postID, comment,
                // UserName
            } =
                req.body;


            // If there are errors , return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("hello");

                return res.status(400).json({ errors: errors.array() });
            }
            const commentdata = new Comment({

                // UserName,

                author: userID,
                text: comment,
                parentId: postID

            });
            const savedcomment = await commentdata.save();

            const blog = await blogCard.findByIdAndUpdate(postID, { $push: { comment: savedcomment._id } }, { new: true });

            const updateblog = await blog.save()
            console.log(updateblog)
            res.json(savedcomment);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Sever error,Something in the way");
        }
    }
);



// adding reply
router.post(
    "/addreply",
    fetchuser,

    async (req, res) => {
        try {
            const { userID, id, reply,
                // UserName
            } =
                req.body;

            console.log(req.body)


            // If there are errors , return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("hello");

                return res.status(400).json({ errors: errors.array() });
            }
            const commentdata = new Comment({

                // UserName,

                author: userID,
                text: reply,
                parentId: id

            });
            const savedcomment = await commentdata.save();


            let comments = await Comment.findByIdAndUpdate(id, { $push: { children: savedcomment._id } }, { new: true });
            console.log(comments)



            res.json({ comments });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Sever error,Something in the way");
        }
    }
);


router.get('/getreply/:id', async (req, res) => {
    try {

        const comment = await Comment.findById(req.params.id).populate(
            {
                path: 'children',
                populate:
                    [
                        {
                            path: 'author',
                            // model: User,
                        }
                        , {
                            path: 'children',
                            model: 'Comment',
                            populate: {
                                path: 'author',
                                // model: User,
                                // select: "_id id name parentId image"
                            }
                        }
                    ]
            }
        )
        console.log(comment)
        res.json(comment)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever error,Something in the way");
    }
})

// ROUTE 3:Update an existing note using : POST "/api/notes/updatenote" .login required

router.put("/editcoment/:id", fetchuser, async (req, res) => {
    try {
        const {


            comment
        } = req.body;
        const newcomment = {};
        if (comment) {
            newcomment.comment = comment;
        }



        // Find the note to be updated and update it
        let comments = await Comment.findById(req.params.id);
        if (comments) {
            return res.status(404).send("not found");
        }

        //   if (blog.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Alowed");
        //   }

        comments = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: newcomment },
            { new: true }
        );
        res.json({ comments });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever error,Something in the way");
    }
});


// ROUTE 4:Delete an existing note using : DELETE "/api/notes/deletenote" .login required

router.delete('/deletecomment/:id', async (req, res) => {



    try {


        // Find the note to be deleted and delete it
        let comment = await Comment.findById(req.params.id)

        if (comment) {
            return res.status(404).send("not found")
        }

        //Allow deletion only if user owns it 
        // if (blog1.user.toString() !== req.user.id) {
        //   return res.status(401).send("Not Alowed")
        // }

        comment = await Comment.findByIdAndDelete(req.params.id)


        return res.json({ "success": "note has been deleted", comment: comment });
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Sever error,Something in the way");
    }
})


router.get("/getallcommentsbypostID/:id", async (req, res) => {
    try {

        const comment = await blogCard.findById(req.params.id).populate(
            {
                path: 'comment',
                populate:
                    [
                        {
                            path: 'author',
                            // model: User,
                        }
                        , {
                            path: 'children',
                            model: 'Comment',
                            populate: {
                                path: 'author',
                                // model: User,
                                // select: "_id id name parentId image"
                            }
                        }
                    ]
            }
        )
        console.log(comment)
        res.json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever error,Something in the way");
    }
});


router.put("/postViews/:id", async (req, res) => {
    const { view } = req.body
    let view2 = parseInt(view)
    view2 = view2 + 1
    console.log(view2)

    console.log(req.params.id)
    let blog1 = await blogCard.find({ postID: req.params.id });
    if (!blog1) {
        return res.status(404).send("not found");
    }


    blog1 = await blogCard.findOneAndUpdate({ postID: req.params.id },
        { $set: { "view": view2 } },
        { new: true });




    res.json(blog1)
})





router.put("/addbookmark", async (req, res) => {
    try {




        let { postID, userID } = req.body
        console.log(req.body)
        console.log(userID)
        // postID = postID.replaceAll("-", "")
        // postID = parseInt(postID)
        // const id = new mongoose.Types.ObjectId(postID)
        console.log(postID)
        let user = await Userdetail.findOneAndUpdate({ userID }, {
            $push: { bookmarks: postID }
        })
        // console.log(user)


        // let bookmark = []
        // bookmark.push(postID)

        if (!user) {
            return res.status(404).send("not found");
        }
        if (user.bookmarks.includes(postID)) {
            return res.status(400).json({ error: 'Post is already bookmarked' });
        }
        // console.log(user)


        // user.bookmarks.push(postID);

        // Save the updated user details
        const updatedUser = await user.save();
        console.log(updatedUser)
        res.json(updatedUser)


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever error,Something in the way");
    }


}
)



router.put("/getbookmark", fetchuser, async (req, res) => {
    try {

        console.log(req.body)




        let user = await Userdetail.findOne({ userID: req.body.data }).populate('bookmarks')


        // let bk = await Userdetail.findOne({ userID: req.body.data })
        console.log(user)
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever error,Something in the way");
    }
})


// router.put("/removeBookmark", async (req, res) => {

module.exports = router;
