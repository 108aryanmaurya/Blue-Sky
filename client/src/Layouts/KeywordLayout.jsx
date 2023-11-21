import { useState } from "react";
import React, { useContext, useEffect } from "react";
import FilterContext from "../Helper/Context/FilterContext";
import { useParams } from "react-router";
import { BlogCard } from "../Component/common";
import BlogCardSkeleton from "../Component/SkeletonLoaders/BlogCardSkeleton";

const KeywordLayout = () => {
  const [blogs, setblog] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyword = useParams();
  console.log({ keyword });
  const context = useContext(FilterContext);
  const { searchBySingleKeywordarray, searchBySingleKeyword } = context;
  useEffect(() => {
    async function fetchData() {
      if (keyword.field === "tags" || keyword.field === "Date") {
        setblog(await searchBySingleKeywordarray(keyword));
        // .then(() => {
        setLoading(false);
        //     })
        //     .catch((error) => {
        //       console.error("Error fetching blog data:", error);
        //       setLoading(false);
        //     })
        // );
      } else if (keyword.field === "Category") {
        setblog(await searchBySingleKeyword(keyword));
        //   .then(() => {
        setLoading(false);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching blog data:", error);
        //     setLoading(false);
        //   });
      }
    }
    fetchData();
  }, [keyword]);
  console.log(blogs);

  return (
    <>
      <p className="dark:text-white text:black text-center py-3">
        Results for keyword "{keyword?.keyword}"
      </p>
      {loading
        ? Array.from({ length: 3 }, (_, index) => (
            <BlogCardSkeleton key={index} />
          ))
        : blogs?.map((blog) => {
            return <BlogCard key={blog._id} card={blog}></BlogCard>;
          })}
    </>
  );
};

export default KeywordLayout;
