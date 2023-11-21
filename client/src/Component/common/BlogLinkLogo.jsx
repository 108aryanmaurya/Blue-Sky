import React from "react";
import { BlogLink } from "../../Assets/icons";
import { Link } from "react-router-dom";

export default function BlogLinkLogo() {
  return (
    <>
      <Link
        to="/"
        className="h-full flex justify-center items-center bg-gradient-to-r  from-blue-500 bg-white dark:bg-darkBgMain pl-5 mr-10 max-md:px-2 max-md:mr-5 max-sm:mr-2"
      >
        <img
          className="w-[50px] h-[50px]   rounded-full rotate-90"
          src={BlogLink}
          alt="logo"
        />
        <p className="ml-2 mr-3 pr-7  border-r-2 border-blue-300 max-md:border-0 max-md:hidden">
          <span className="text-white dark:text-white font- font-semibold text-xl leading-tight tracking-widest">
            Blog
          </span>
          <span className="text-blue-400 dark:text-primaryMain font-montserrat ml-[1px] font-semibold text-xl leading-tight tracking-widest">
            Link
          </span>
        </p>
      </Link>
    </>
  );
}
