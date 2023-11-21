import React, { useEffect, useRef, useState } from "react";

const CommentSettings = ({ comment, setedit, edit }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {}, [edit]);
  const handleOutsideClick = (event) => {
    console.log("CLICED");
    if (modalRef.current === event.target) {
      profileMenu();
    }
  };
  const profileMenu = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      {" "}
      {comment?.author?._id ==
        JSON.parse(localStorage.getItem("UserData")).userDetailId && (
        <button
          onClick={profileMenu}
          id="dropdownComment1Button"
          data-dropdown-toggle="dropdownComment1"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100   dark:bg-darkBgPrimary dark:hover:bg-gray-700 "
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
      )}
      <div>
        {isDropdownVisible && (
          <div className="relative">
            <div
              id="myModal"
              className="fixed z-50 inset-0 w-full h-full  transition-all ease-in-out duration-300 "
              ref={modalRef}
              onClick={handleOutsideClick}
            ></div>
            <div
              id="dropdownAvatarName"
              className="z-50 block absolute top-[-10px] right-[-20px]  max-sm:left-[-20px] max-sm:top-[65px] max-sm:w-14 bg-white divide-y divide-gray-100 max-sm:rounded-md rounded-lg shadow-sm w-16 dark:bg-darkBgPrimary dark:divide-gray-600 border dark:border-gray-600"
            >
              <ul
                className=" max-sm:py-0 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
              >
                <li>
                  <span
                    to="/"
                    className="block cursor-pointer max-sm:px-1 max-sm:py-1 px-3 pt-2 pb-1 max-sm:rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      console.log(edit);
                      setedit(true);
                      //   navigate(`/updateblog/${card._id}`);
                    }}
                  >
                    Edit
                  </span>
                </li>
                <li>
                  <span
                    // onClick={onDelete}
                    className="block cursor-pointer max-sm:px-1 max-sm:py-1 px-3 pb-2 max-sm:rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSettings;
