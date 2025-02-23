import React, { useState, useContext } from "react";
import TinyMCEEditor from "../Helper/Editor";
import blogContext from "../Helper/Context/blogContext";
import BlogState from "../Helper/Context/BlogState";

const WriteBlog = ({ blog2 }) => {
  const [blogs, setblog] = useState(blog2 != null ? blog2 : {});
  const [tags, settags] = useState(blog2 != null && blog2.tags);
  const context = useContext(blogContext);
  const { blog, getblogs, addblogs, updateblog } = context;

  // blog2 != null && setblog(blog2);

  const updateDesc = (content) => {
    let input = {
      Description: content,
    };
    setblog({ ...blogs, ...input });

    console.log(blogs);
  };
  console.log(blogs.tags);
  const getTags = (e) => {
    let str = e.target.value;
    let strarr = str.split(",");


    console.log(strarr);
    settags(strarr);
    // settags(...strarr);
    // settags((tags) => []);
    // strarr.map((str)=>())
    // let input = {
    //   [name]: strarr,
    // };
    setblog({ ...blogs, tags: strarr });

  };
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = {
      [name]: value,
    };
    // setblog({ ...blogs, ...input });
    setblog({ ...blogs, ...input });

    console.log(blogs);
  };
  const handleadd = async () => {
    await addblogs(blogs);
    console.log("Saved to Database");
  };
  const handleupdate = async () => {
    await updateblog(blogs, blog2._id);
    console.log("Saved to Database");
  };

  //  Title,
  //  Author_name,
  //  Author_url,
  //  Description,
  //  tags,
  //  Blog_url

  return (
    <section className="m-3 rounded-lg bg-gray-100 dark:text-white dark:bg-darkBgPrimary">
      <div className="text-[24px] ">
        <div className="  flex p-10   max-lg:flex max-lg:flex-col ">
          <div className="w-[30%]">Author Name</div>
          <div className="w-[60%]">

            <input
              name="Author_name"
              value={blogs.Author_name}
              onChange={(e) => {
                getInput(e);
              }}
              className="max-lg:mt-2  w-full rounded-md dark:text-black dark:focus:border-secondary dark:border-3 border-2 outline-none p-3 text-[23px]"

              type="text"
            />
          </div>
        </div>
        <div className="max-lg:flex max-lg:flex-col   flex p-10 ">
          <div className=" w-[30%]">Author Image</div>
          <div className="w-[60%]">

            <input
              name="Author_url"
              value={blogs.Author_url}
              onChange={(e) => {
                getInput(e);
              }}
              className="max-lg:mt-2  w-full  rounded-md dark:text-black dark:focus:border-secondary dark:border-3 border-2 outline-none p-3 text-[23px]"

              type="text"
            />
          </div>
        </div>
        <div className="max-lg:flex max-lg:flex-col  flex p-10  ">

          <div className="w-[30%]">Title</div>
          <div className="w-[60%]">
            <input
              name="Title"
              value={blogs.Title}
              onChange={(e) => {
                getInput(e);
              }}
              className="max-lg:mt-2  w-full  rounded-md dark:text-black dark:focus:border-secondary dark:border-3 w-full border-2  outline-none p-3 text-[23px]"

              type="text"
            />
          </div>
        </div>
        <div className="max-lg:flex max-lg:flex-col  group flex p-10 ">
          <div className=" w-[30%]">Category</div>
          <div className="w-[60%]">

            <input
              name="Category"
              value={blogs.Category}
              onChange={(e) => {
                getInput(e);
              }}
              className="max-lg:mt-2  w-full  rounded-md dark:text-black dark:focus:border-secondary dark:border-3 border-2 focus:border-primaryMain outline-none p-3 text-[23px]"

              type="text"
            />
          </div>
        </div>
        <div className="max-lg:flex max-lg:flex-col  flex p-10 ">
          <div className="w-[30%]">Tags</div>
          <div className="w-[60%]">
            <input
              name="tags"
              value={tags}
              onChange={(e) => {
                getTags(e);
              }}
              className="max-lg:mt-2   rounded-md dark:text-black dark:focus:border-secondary dark:border-3 w-full border-2 outline-none p-3 text-[23px]"

              type="text"
            />
          </div>
        </div>
        <div className="max-lg:flex max-lg:flex-col   flex p-10 ">
          <div className="w-[30%]">Blog Image</div>
          <div className="w-[60%]">

            <input
              name="Blog_url"
              value={blogs.Blog_url}
              onChange={(e) => {
                getInput(e);
              }}
              className="max-lg:mt-2  w-full  rounded-md border-2 dark:text-black dark:focus:border-secondary dark:border-3 outline-none p-3 text-[23px]"

              type="text"
            />
          </div>
        </div>
      </div>
      <div className=" flex p-10 flex-col justify-around">
        <div className="text-[23px]">Content</div>
        <div className="overflow-hidden rounded-xl  mt-10">
          <TinyMCEEditor blogs={blogs} description={updateDesc}></TinyMCEEditor>

        </div>
        {blog2 != null ? (
          <div className="flex justify-center items-center ">
            <button
              className=" border-2 dark:bg-white dark:text-black dark:hover:bg-secondary dark:hover:text-white dark:hover:border-0 border-gray-700 hover:border-blue-800 rounded-lg hover:text-white  mt-3 bg-slate-300 pr-10 pl-10 pt-2 pb-2  hover:bg-primaryMain"
              onClick={handleupdate}
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center ">
            <button
              className=" rounded-md border-2 dark:bg-white dark:text-black dark:hover:bg-secondary dark:hover:text-white dark:hover:border-0 border-gray-700 hover:border-blue-800 hover:text-white  mt-3 bg-slate-300 pr-10 pl-10 pt-2 pb-2  hover:bg-primaryMain"
              onClick={handleadd}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WriteBlog;
