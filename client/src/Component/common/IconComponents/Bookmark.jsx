import React, { useContext, useEffect, useState } from "react";
import CommentLikeContext from "../../../Helper/Context/CommentLikeContext";
import { toast } from "react-toastify";

const Bookmark = ({ setbookmarked, card }) => {
  const context5 = useContext(CommentLikeContext);
  const [bookmarkcount, setbookmarkcount] = useState(0);
  const [Bookmarked, setBookmarked] = useState(false);
  const {
    addbookmark,
    deletebookmark,
    // deletelike,
    // addlike,
    countLike,
    Checkbookmark,
    countBookmark,
  } = context5;

  useEffect(() => {
    async function countLike2() {
      setbookmarkcount(await countBookmark(card._id));

      setBookmarked(
        await Checkbookmark({
          userId: JSON.parse(localStorage.getItem("UserData"))?.userDetailId,
          postId: card._id,
        })
      );
      // setbookmarked(Bookmarked);
    }
    countLike2();
  }, [card]);

  const bookmark = async () => {
    // setBookmarked(!Bookmarked);
    // if (!AuthStatus) {
    //   setAuthModal((showAuthModal) => !showAuthModal);
    //   return;
    // }
    console.log(Bookmarked);

    if (Bookmarked == true) {
      await deletebookmark({
        userID: JSON.parse(localStorage.getItem("UserData"))?.userDetailId,
        postID: card?._id,
      });
      setbookmarkcount(await countBookmark(card._id));

      toast.success("Bookmark deleted");
      setBookmarked(!Bookmarked);
    } else {
      await addbookmark({
        userID: JSON.parse(localStorage.getItem("UserData"))?.userDetailId,
        postID: card?._id,
      });
      setbookmarkcount(await countBookmark(card._id));

      toast.success("Bookmark addedd");
      setBookmarked(!Bookmarked);
    }
  };

  return (
    <div
      className="rounded-full py-2  px-3  max-sm:px-[7px] max-sm:py-[6px]  flex justify-center items-center"
      onClick={bookmark}
    >
      <p className="text-xs  text-gray-700 dark:text-gray-300 max-sm:text-xs ">
        {bookmarkcount}
      </p>
      <i
        className={`ml-[4px]    ${
          Bookmarked
            ? "text-primaryMain dark:text-primaryMain fa fa-bookmark"
            : " fa fa-bookmark-o dark:text-white"
        } hover:text-primaryMain  text-[16px] `}
      ></i>
    </div>
  );
};

export default Bookmark;
