import React, { useContext, useEffect, useState } from "react";
import { code1 } from "../../Assets/images";
import Reply from "./Reply";
import UserReplies from "./UserReplies";
import HelperContext from "../../Helper/Context/HelperContext";
import CommentLikeContext from "../../Helper/Context/CommentLikeContext";
import { profileDefault } from "../../Assets/icons";
import CommentSettings from "./CommentSettings";
import EditComment from "./EditComment";

const CommentBox = ({ comment, depth, maxdepth }) => {
  const constext = useContext(HelperContext);
  const context3 = useContext(CommentLikeContext);
  const { getreply, reply } = context3;
  const [edit, setedit] = useState(false);
  const { formatUTCDate, date } = constext;
  // console.log(comment);
  const [data, setdata] = useState({});
  const [showReply, setshowReply] = useState(false);

  useEffect(() => {}, [edit]);
  // const comData = getreply(comment?._id);
  useEffect(() => {
    // console.log(comment);
    async function f() {
      setdata(await getreply(comment?._id));
      console.log(data);
    }
    f();
  }, []);

  useEffect(() => {
    // Uncomment the next line if you need to log replies
    // console.log(reply);
  }, [data]);

  const handleReplySubmit = async () => {
    // Trigger a re-fetch of replies when a reply is submitted
    // console.log("I ran");
    setdata(await getreply(comment?._id));
  };

  const [replyBox, setreplyBox] = useState(false);
  // console.log(reply);

  return (
    <section className="">
      <article className="p-6 text-base mt-2 bg-white rounded-lg dark:bg-darkBgPrimary">
        <footer className=" flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img
                className="dark:bg-slate-300 mr-2 w-6 h-6 bg-gray-200 rounded-full"
                src={
                  comment?.author?.profileImg
                    ? comment?.author?.profileImg
                    : profileDefault
                }
                alt="commentor"
              />
              {comment?.author?.username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time title="February 8th, 2022">{date}</time>
            </p>
          </div>

          <CommentSettings
            edit={edit}
            setedit={setedit}
            comment={comment}
          ></CommentSettings>
        </footer>
        <div className="border-l-2 pl-2">
          {edit ? (
            <EditComment
              // reply={reply}
              // setreply={setreply}
              key={comment?._id}
              comment={comment}
              // commentID={comment?._id}
              // setshow={setreplyBox}
              // show={true}
              edit={edit}
              setedit={setedit}
              // onReplySubmit={handleReplySubmit}
            ></EditComment>
          ) : (
            <p className=" text-gray-500 dark:text-gray-400">{comment.text}</p>
          )}
          <div className="flex mt-4 gap-3 flex-col items-start">
            <div className="flex items-center  space-x-4">
              <button>
                <i className="fa fa-thumbs-up "></i>
              </button>
              <button>
                <i className="fa fa-thumbs-down "></i>
              </button>
              <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                onClick={() => {
                  setreplyBox(true);
                }}
              >
                <svg
                  className="mr-1.5 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Reply
              </button>
            </div>
            <div
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
              onClick={() => {
                setshowReply(!showReply);
              }}
            >
              <i className="fa fa-angle-down mr-1 "></i>
              {data.children?.length > 0 && data.children?.length} Reply
            </div>
          </div>
          {JSON.parse(localStorage.getItem("UserData")) && (
            <Reply
              // reply={reply}
              // setreply={setreply}
              key={comment?._id}
              comment={comment}
              // commentID={comment?._id}
              setshow={setreplyBox}
              show={replyBox}
              onReplySubmit={handleReplySubmit}
            ></Reply>
          )}
        </div>
        {
          // depth < maxdepth &&
          // data.children &&
          showReply &&
            data.children?.length > 0 &&
            data?.children?.map((item) => {
              // console.log(item);
              return (
                <CommentBox
                  key={item._id}
                  depth={depth + 1}
                  maxdepth={maxdepth}
                  comment={item}
                ></CommentBox>
              );
            })
        }
      </article>
    </section>
  );
};

export default CommentBox;
