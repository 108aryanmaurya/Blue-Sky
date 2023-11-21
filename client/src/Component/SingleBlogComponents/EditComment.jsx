import React, { useContext, useState } from "react";
import AuthContext from "../../Helper/Context/AuthContext";
import CommentLikeContext from "../../Helper/Context/CommentLikeContext";

const EditComment = ({ comment, edit, setedit }) => {
  const context2 = useContext(AuthContext);
  const context3 = useContext(CommentLikeContext);
  const { addreply } = context3;
  const { UserDetails } = context2;
  // console.log(UserDetails);

  const [Reply, setReply] = useState({
    reply: "",
    // ...comment,
    userID: JSON.parse(localStorage.getItem("UserData")).userDetailId,

    id: comment?._id,
  });

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = {
      [name]: value,
    };

    setReply({ ...Reply, ...input });

    console.log(Reply);
    // setreply(Reply, ...reply);
  };

  const submit = () => {
    // async function f() {
    //   console.log(Reply);

    //   await addreply(Reply);
    // }
    // f();
    // onReplySubmit();
    console.log("Saved to reply");
  };
  return (
    <>
      {
        <div className="pt-2 ml-6 dark:text-white ">
          <textarea
            id="comment"
            rows="1"
            name="reply"
            value={Reply?.reply}
            onChange={(e) => {
              getInput(e);
            }}
            className="border-b-2 w-[63%] px-0  text-sm text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
          ></textarea>

          <div className="w-[65%] mt-1 flex justify-end  gap-5 pr-2">
            <div
              className="bg-primaryMain text-white p-1 px-2 rounded-md"
              onClick={() => {
                setedit(!edit);
              }}
            >
              <button>Cancel</button>
            </div>
            <div
              className="bg-primaryMain text-white p-1 px-2 rounded-md"
              onClick={submit}
            >
              <button>Edit</button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default EditComment;
