import { Tags } from "../../Component/common";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blogContext from "../../Helper/Context/blogContext";
import { useContext, useEffect, useState } from "react";
import HelperContext from "../../Helper/Context/HelperContext";
import AuthContext from "../../Helper/Context/AuthContext";
import { code1 } from "../../Assets/images";

import {
  dark,
  darkprofileDefault,
  profileDefault,
  view,
} from "../../Assets/icons";
import CommentLikeContext from "../../Helper/Context/CommentLikeContext";
import ShareModal from "../SingleBlogComponents/ShareModal";

export default function LandingCards({ card }) {
  const context = useContext(blogContext);
  const context2 = useContext(CommentLikeContext);
  // const getl
  const [like, setlike] = useState(0);
  const [book, setbook] = useState(0);
  const { countLike, countBookmark } = context2;

  const [shareModalVisible, setShareModalVisible] = useState(false);

  useEffect(() => {
    async function func() {
      setlike(await countLike(card._id));
      setbook(await countBookmark(card._id));
    }
    func();
  }, [card]);

  const { deletenote, host } = context;
  const navigate = useNavigate();
  const context3 = useContext(AuthContext);
  const { UserDetails, AuthStatus, getUser, UserProfile } = context3;
  const [date, setdate] = useState("");
  const [ShowEdit, setShowEdit] = useState(false);
  const [user, setuser] = useState("");
  console.log(card);
  const onDelete = async () => {
    await deletenote(card?.postID);
  };

  const startTime = new Date().getTime();

  useEffect(() => {
    if (AuthStatus) {
      if (card?.userID === UserDetails?._id) {
        setShowEdit(true);
      } else {
        setShowEdit(false);
      }
    } else {
      setShowEdit(false);
    }
  }, [UserDetails, card]);

  useEffect(() => {
    const date = new Date(card?.Date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setdate(date.toLocaleString("en-US", options));

    console.log(card?.UserName);

    const func = async () => {
      const response1 = await fetch(
        `${host}/api/blogs/userImg/${card?.userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const Userimage = await response1.json();
      setuser(
        Userimage[0]?.profileImg != ""
          ? Userimage[0]?.profileImg
          : profileDefault
      );
    };
    func();
  }, []);

  const sharemodal = () => {
    setShareModalVisible(!shareModalVisible);
  };

  return (
    <>
      {shareModalVisible && (
        <ShareModal
          sharemodal={sharemodal}
          currentUrl={`${window.location.origin}/blogs/${card?.Title?.replace(
            /\s+/g,
            "-"
          )}`}
        ></ShareModal>
      )}
      <article className="break-inside-avoid mx-auto w-[100%] max-md:w-[95%] p-6 max-sm:p-3 bg-bgBlue rounded-xl  dark:bg-darkBgPrimary flex flex-col bg-clip-border  my-5 group">
        <div className="flex pb-4 max-sm:pb-2 items-center justify-between">
          <div className="flex">
            <img
              className="rounded-full  dark:bg-darkBgMain bg-white max-w-none w-10  h-10 object-cover object-top"
              src={
                card.author.profileImg == ""
                  ? profileDefault
                  : card.author.profileImg
              }
            />
            <div className="flex flex-col justify-center ml-2">
              <div
                className="flex items-center text-[17px] tracking-[0.8px] dark:text-darkTextMain cursor-pointer font-semibold"
                onClick={() => {
                  navigate(
                    `/profile/${card?.author.username?.replace(/\s+/g, "-")}`,
                    {}
                  );
                }}
              >
                {card?.author.username}
              </div>
              <div className="text-slate-600 font-semibold text-xs  dark:text-darkTextPrimary">
                {date}
              </div>
            </div>
          </div>
          <button
            className="p-1 max-lg:hidden rounded-md text-[15px] text-white px-4 border-2 border-slate-200  dark:border-gray-700 hover:border-blue-300  bg-primaryMain dark:hover:border-blue-400"
            onClick={() => {
              toast.success("Welcome to Blog");

              navigate(`/blogs/${card._id}`);
            }}
          >
            Read
          </button>
        </div>
        <div className="flex gap-10">
          <h2
            className="text-gray-600 text-xl max-lg:text-md max-sm:text-sm leading-7 font-bold font-serif  dark:text-darkTextMain hover:text-primaryMain tracking-wider dark:hover:text-secondary line-clamp-2 cursor-pointer capitalize"
            onClick={() => {
              navigate(`/blogs/${card?._id}`);
            }}
          >
            {card.Title}
          </h2>
        </div>

        <div className="py-3 max-sm:py-2">
          <img className="w-full rounded-lg" src={card.Blog_url} />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-5">
            <div className=" max-sm:pt-0">
              <i className="fa fa-heart text-red-500 mr-1 "></i>

              <span className="text-lg font-bold text-gray-600 dark:text-darkTextMain">
                {like}
              </span>
            </div>
            <div className=" max-sm:pt-0">
              <i className="fa fa-bookmark text-primaryMain mr-1 "></i>

              <span className="text-lg text-gray-600 font-bold  dark:text-darkTextMain">
                {book}
              </span>
            </div>
            <div className=" max-sm:pt-0">
              <i className="fa fa-eye  text-gray-600  mr-1 dark:text-gray-200"></i>

              <span className="text-lg font-bold   dark:text-darkTextMain">
                {card?.view}
              </span>
            </div>
          </div>
          <div className="rounded-full max-sm:px-[7px] flex-col-reverse max-sm:py-[6px]   flex justify-center items-center transition ease-in-out">
            {" "}
            <i
              className="dark:text-white  fa fa-share  text-gray-600 text-[19px]  "
              onClick={sharemodal}
            ></i>
          </div>
        </div>
      </article>
    </>
  );
}
