import { useState, useContext, useEffect } from "react";
import TinyMCEEditor from "../Helper/Editor";
import blogContext from "../Helper/Context/blogContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TitleandContent from "../Component/common/WriteComponents/TitleandContent";
import Tag from "../Component/common/WriteComponents/Tag";
import Category from "../Component/common/WriteComponents/Category";
import FeaturedImage from "../Component/common/WriteComponents/FeaturedImage";
import Content from "../Component/common/WriteComponents/Content";
import { useNavigation } from "react-router";
import ShowPreview from "../Component/common/WriteComponents/ShowPreview";
import SaveasDraft from "../Component/common/WriteComponents/SaveasDraft";
const WriteBlog = ({ UserDetails }) => {
  const [blogs, setblog] = useState({
    userID: JSON.parse(localStorage.getItem("UserData")).userDetailId,
  });

  const [category, setcategory] = useState("");
  const [featuredImage, setfeaturedImage] = useState("");

  useEffect(() => {
    let input = {
      Blog_url: featuredImage,
    };
    setblog({
      ...blogs,
      ...input,
      Category: category,
    });
    console.log(blogs);
  }, [featuredImage, category]);

  console.log(JSON.parse(localStorage.getItem("BlogData")) || {});
  // setblog(JSON.parse(localStorage.getItem("BlogData")) || {});
  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem("BlogData")) || {};
    // localStorage.setItem("BlogData", JSON.stringify(savedDraft));
    console.log(typeof savedDraft);
    setblog(JSON.parse(localStorage.getItem("BlogData")) || {});

    console.log(blogs);
    console.log(savedDraft);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "BlogData",
      JSON.stringify({ ...blogs, author: UserDetails })
    );
  }, [blogs]);

  const context = useContext(blogContext);

  const { addblogcontent, updateblog } = context;

  const [tags, settags] = useState("");

  const updateDesc = (content) => {
    let input = {
      description: content,
    };

    setblog({ ...blogs, ...input });
  };
  const getTags = (e) => {
    let str = e.target.value;
    let strarr = str.split(",");

    settags(strarr);

    setblog({ ...blogs, tags: strarr });
    console.log(blogs);
  };
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = {
      [name]: value,
    };
    setblog({ ...blogs, ...input });
    console.log(blogs);
  };

  const handleadd = async () => {
    try {
      console.log(blogs);
      // await addblogCard(blogs);
      await addblogcontent(blogs);
      toast.success("Your blog added Successfully!");
    } catch (error) {
      toast.error("Error occured while adding your blog");
    }

    console.log("Saved to Database");
  };

  return (
    <>
      <div className="flex w-full justify-end pt-2 pr-5 bg-gray-100 p-3 dark:bg-darkBgPrimary z-50">
        <ShowPreview blogData={blogs}></ShowPreview>
        <button
          className="border-2 border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-400   rounded-md bg-primaryMain dark:bg-secondary px-4 py-1 font-semibold text-white"
          onClick={handleadd}
        >
          Publish
        </button>
      </div>

      <section className="p-4 rounded-lg flex  dark:text-white dark:bg-darkBgMain max-lg:flex-col ">
        <div className=" w-[70%] px-6 p-3 max-lg:w-full">
          <TitleandContent blogs={blogs} getInput={getInput}></TitleandContent>
          <Content blogs={blogs} updateDesc={updateDesc}></Content>
        </div>
        <div className="w-[30%] flex   flex-col justify-between my-3  max-lg:w-full">
          <div className="">
            <Category
              blogs={blogs}
              setcategory={setcategory}
              category={category}
              getInput={getInput}
            ></Category>

            <Tag tags={tags} getTags={getTags}></Tag>
            <FeaturedImage
              setfeaturedImage={setfeaturedImage}
              featuredImage={featuredImage}
              blogs={blogs}
              setblog={setblog}
              getInput={getInput}
            ></FeaturedImage>
          </div>
        </div>

        <div className="flex justify-center items-center "></div>
      </section>
    </>
  );
};

export default WriteBlog;
