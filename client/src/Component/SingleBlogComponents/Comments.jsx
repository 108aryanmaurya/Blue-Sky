import React, { useContext, useState } from "react";
import { code1 } from "../../Assets/images";
import Signin from "../common/Signin";
import CommentLikeContext from "../../Helper/Context/CommentLikeContext";
import { useEffect } from "react";
import CommentBox from "./CommentBox";
import AuthContext from "../../Helper/Context/AuthContext";
import CommentSettings from "./CommentSettings";
export default function Comments({ blog }) {
  const context = useContext(CommentLikeContext);
  const context2 = useContext(AuthContext);
  const { UserDetails, AuthStatus, showAuthModal, setAuthModal } = context2;
  const { addcomment, getsingleblogComment, SingleBlogComment } = context;
  const ModalStatus = () => {
    setAuthModal((showAuthModal) => !showAuthModal);
  };

  const [comment, setcomment] = useState("");
  useEffect(() => {
    setcomment({
      comment,
      postID: blog?._id,
      userID: JSON.parse(localStorage?.getItem("UserData"))?.userDetailId,
    });
  }, [blog, UserDetails]);

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = {
      [name]: value,
    };
    setcomment({ ...comment, ...input });
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    await addcomment(comment);
    await getsingleblogComment(blog?._id);
  };
  // console.log

  useEffect(() => {
    async function d() {
      await getsingleblogComment(blog?._id);
    }
    d();
  }, [blog]);

  return (
    <>
      <section
        id="comment"
        className="bg-slate-50 w-full  dark:bg-transparent  py-8 lg:py-16 antialiased"
      >
        <div className="w-full mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Comments
            </h2>
          </div>

          <form>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-darkBgPrimary dark:border-gray-700">
              <label className="sr-only">Your comment</label>
              <textarea
                id="comment"
                rows="6"
                name="comment"
                value={comment?.comment}
                onChange={(e) => {
                  getInput(e);
                }}
                className="dark:text-white px-0 w-full text-sm text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>

            <button
              // type="submit"
              className={`mb-6 ${
                AuthStatus ? "block" : "hidden"
              } border-2 border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-400   rounded-md bg-primaryMain dark:bg-secondary px-4 py-1 font-semibold text-white`}
              onClick={(e) => {
                onsubmit(e);
              }}
            >
              Post comment
            </button>
          </form>
          <button
            className={`mb-6 ${
              AuthStatus ? "hidden" : "block"
            } border-2 border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-400   rounded-md bg-primaryMain dark:bg-secondary px-4 py-1 font-semibold text-white !hover:text-white`}
          >
            <Signin />
          </button>
          <div>
            {SingleBlogComment?.comment?.map((comment) => {
              return (
                <>
                  <CommentBox key={comment?._id} comment={comment}></CommentBox>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
