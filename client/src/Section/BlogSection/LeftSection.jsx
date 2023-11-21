import { BlogCard } from "../../Component/common";
import { useContext, useEffect, useState } from "react";
import blogContext from "../../Helper/Context/blogContext";
import BlogCardSkeleton from "../../Component/SkeletonLoaders/BlogCardSkeleton";
import FilterContext from "../../Helper/Context/FilterContext";
import AuthContext from "../../Helper/Context/AuthContext";
import CommentLikeContext from "../../Helper/Context/CommentLikeContext";
import "../../Component/PageNotFound/PageNotFoundMoon.css";

CommentLikeContext;
export default function LeftSection() {
  const context = useContext(blogContext);
  const { blog, getblogs } = context;
  const context2 = useContext(FilterContext);
  const {
    getrelevantblogs,
    getallblogs,
    getlatestblogs,
    filterBlogs,
    getTopBlogs,
  } = context2;
  const context3 = useContext(AuthContext);
  const { UserDetails, AuthStatus } = context3;
  const context4 = useContext(CommentLikeContext);
  const { Checkbookmark, checkbookmark, Checklike, checklike } = context4;
  const [filterState, setfilterState] = useState(null);
  // const [isLogged,setisLoggen]=useState(localStorage.getItem("UserData") != null)
  const [BLogsArray, setBLogsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("UserData"))) {
      Checklike(JSON.parse(localStorage?.getItem("UserData"))?.userDetailId);
      Checkbookmark(
        JSON.parse(localStorage?.getItem("UserData"))?.userDetailId
      ).then(() => {});
    }
    getallblogs()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      });
  }, [filterState === null]);

  const [showMoreOption, setshowMoreOption] = useState(false);
  const [Range, setRange] = useState("week");

  useEffect(() => {}, [filterBlogs]);

  const handleclick = (tab) => {
    setfilterState(tab);
  };
  useEffect(() => {
    if (filterState == "top") {
      setshowMoreOption(true);
    } else {
      setshowMoreOption(false);
    }
  }, [filterState]);

  return (
    <section className=" flex justify-center max-lg:justify-start  flex-col rounded-md">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className=" flex flex-col w-full items-center z-30">
        <div className="flex max-lg:flex-col justify-evenly items-center  w-full max-lg:ml-1">
          <div className="flex mt-3  gap-1">
            <button
              className={`${
                AuthStatus ? "block" : "hidden"
              } dark:text-white hover:bg-bgBlue dark:bg-darkBgPrimary dark:hover:bg-secondary  ${
                filterState === "relevant" && "bg-bgBlue dark:bg-secondary"
              } p-1 px-3 rounded-md`}
              value="relevant"
              onClick={(e) => {
                handleclick("relevant");
                setLoading(true);

                getrelevantblogs(UserDetails?.relevant)
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error fetching blog data:", error);
                    setLoading(false);
                  });
              }}
            >
              Relevant
            </button>
            <button
              className={`dark:text-white hover:bg-bgBlue dark:bg-darkBgPrimary dark:hover:bg-secondary  ${
                filterState === "latest" && "bg-bgBlue dark:bg-secondary "
              } p-1 px-3 rounded-md`}
              value="latest"
              onClick={async (e) => {
                setLoading(true);
                console.log(filterState);
                handleclick("latest");

                // onLatesthandle(e);
                getlatestblogs()
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error fetching blog data:", error);
                    setLoading(false);
                  });
              }}
            >
              Latest
            </button>
            <button
              className={`dark:text-white hover:bg-bgBlue dark:bg-darkBgPrimary dark:hover:bg-secondary  ${
                filterState == "top" && "bg-bgBlue dark:bg-secondary "
              }  p-1 px-3 rounded-md`}
              value="top"
              onClick={(e) => {
                setLoading(true);
                handleclick("top");
                // filterTop(e);
                getTopBlogs("week")
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error fetching blog data:", error);
                    setLoading(false);
                  });
              }}
            >
              Top
            </button>
          </div>
          <div
            className={`${
              showMoreOption ? "block" : "hidden"
            } flex max-lg:mt-3 gap-1 mt-3`}
          >
            <button
              className={`dark:text-white hover:bg-bgBlue dark:bg-darkBgPrimary dark:hover:bg-secondary  ${
                Range === "week" && "bg-bgBlue dark:bg-secondary "
              }  p-1 px-3  rounded-md`}
              value="week"
              onClick={(e) => {
                setLoading(true);
                // setfilterState("")
                setRange("week");

                // Topfilter(e);
                getTopBlogs("week")
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error fetching blog data:", error);
                    setLoading(false);
                  });
              }}
            >
              Week
            </button>
            <button
              className={`dark:text-white hover:bg-bgBlue dark:bg-darkBgPrimary dark:hover:bg-secondary  ${
                Range === "month" && "bg-bgBlue dark:bg-secondary "
              }  p-1 px-3 rounded-md`}
              value="month"
              onClick={(e) => {
                setLoading(true);
                setRange("month");
                // Topfilter(e);
                getTopBlogs("month")
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error fetching blog data:", error);
                    setLoading(false);
                  });
              }}
            >
              Month
            </button>
            <button
              className={`dark:text-white hover:bg-bgBlue dark:bg-darkBgPrimary dark:hover:bg-secondary  ${
                Range === "year" && "bg-bgBlue dark:bg-secondary "
              }  p-1 px-3 rounded-md`}
              value="year"
              onClick={(e) => {
                // Topfilter(e);
                setLoading(true);
                setRange("year");
                getTopBlogs("year")
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error fetching blog data:", error);
                    setLoading(false);
                  });
              }}
            >
              Year
            </button>
            <button
              className={`dark:text-white hover:bg-bgBlue dark:bg-darkBgPrimary dark:hover:bg-secondary  ${
                Range === "all" && "bg-bgBlue dark:bg-secondary "
              }  p-1 px-3 rounded-md`}
              value="all"
              onClick={(e) => {
                setLoading(true);
                setRange("all");
                // Topfilter(e);
                getTopBlogs(localStorage.getItem("filterTop"))
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error fetching blog data:", error);
                    setLoading(false);
                  });
              }}
            >
              Infinity
            </button>
          </div>
        </div>
        <div className="p-3 px-20 max-sm:px-2 flex flex-col w-full">
          {loading
            ? Array.from({ length: 3 }, (_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            : filterBlogs?.map((card, index) => {
                return (
                  <BlogCard
                    key={index}
                    isBookmark={AuthStatus && checkbookmark?.includes(card._id)}
                    isLiked={AuthStatus && checklike?.includes(card._id)}
                    card={card}
                  ></BlogCard>
                );
              })}
        </div>
      </div>
    </section>
  );
}
