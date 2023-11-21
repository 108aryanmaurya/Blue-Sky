import React from "react";
import { Link } from "react-router-dom";
export default function TopFoundersCard() {
  return (
    <>
      <h1 className="w-full text-center text-4xl font-bold dark:text-white text-black my-5">
        Meet the Creators
      </h1>
      <div className="flex justify-evenly items-center mb-10">
        <div class="relative flex flex-col text-gray-700 bg-bgBlue dark:bg-darkBgPrimary shadow-md w-96 rounded-xl bg-clip-border">
          <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 shadow-lg h-80 rounded-xl bg-clip-border">
            <img
              src="https://docs.material-tailwind.com/img/team-3.jpg"
              className="object-cover"
              alt="profile-picture"
            />
          </div>
          <div class="px-2 pt-2 text-center">
            <h4 class="block mb-2 font-sans text-2xl  font-semibold leading-snug tracking-normal text-black dark:text-white">
              Aryan Maurya
            </h4>
            <p class="block font-sans text-base  font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
              CEO / Co-Founder
            </p>
          </div>
          <div class="flex justify-center py-2 pt-2 gap-7">
            <Link
              to="/"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text"
            >
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
            <Link
              to="/"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-gray-100 to-black bg-clip-text"
            >
              <i class="fa fa-github" aria-hidden="true"></i>
            </Link>
            <Link
              to="/"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-purple-600 to-purple-400 bg-clip-text"
            >
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        <div class="relative flex flex-col text-gray-700 bg-bgBlue dark:bg-darkBgPrimary shadow-md w-96 rounded-xl bg-clip-border">
          <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 shadow-lg h-80 rounded-xl bg-clip-border">
            <img
              src="https://docs.material-tailwind.com/img/team-3.jpg"
              className="object-cover"
              alt="profile-picture"
            />
          </div>
          <div class="px-2 pt-2 text-center">
            <h4 class="block mb-2 font-sans text-2xl  font-semibold leading-snug tracking-normal text-black dark:text-white">
              Ashwin Maurya
            </h4>
            <p class="block font-sans text-base  font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
              CEO / Co-Founder
            </p>
          </div>
          <div class="flex justify-center py-2 pt-2 gap-7">
            <Link
              to="/"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text"
            >
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
            <Link
              to="/"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-gray-100 to-black bg-clip-text"
            >
              <i class="fa fa-github" aria-hidden="true"></i>
            </Link>
            <Link
              to="/"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-purple-600 to-purple-400 bg-clip-text"
            >
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
