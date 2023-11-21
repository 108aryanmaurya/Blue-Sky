import React from "react";
import Select from "react-select";
import { computerScienceOptions } from "../../constants";
const Category = ({ blogs, setcategory }) => {
  const options = ["python", "Javascript", "CSS", "Tech"];

  const handleSelectChange = (selectedOption) => {
    // console.log(category);
    setcategory(selectedOption.value);
    // getInput(selectedOption);
  };

  return (
    <div className="flex-col  group flex dark:bg-darkBgPrimary bg-gray-100 gap-4  rounded-md p-4 mx-3  ">
      <div className=" ">Category</div>
      <div className="">
        <Select
          className="rounded-md text-black dark:text-black border-2 dark:bg-darkBgPrimary border-gray-300 dark:border-gray-700 hover:border-primaryMain hover:dark:border-secondary focus:border-primaryMain focus:dark:border-secondary outline-none transition-colors duration-300 ease-in-out "
          name="category"
          value={blogs?.category}
          onChange={handleSelectChange}
          options={computerScienceOptions.map((cat) => {
            return { value: cat, label: cat };
          })}
        ></Select>
        {/* <input
          name="Category"
          value={blogs?.category}
          onChange={(e) => {
            getInput(e);
          }}
          className="max-lg:mt-2  w-full  rounded-md dark:text-black dark:focus:border-secondary dark:border-3 border-2 focus:border-primaryMain outline-none p-3 text-[23px]"
          type="text"
        /> */}
      </div>
    </div>
  );
};

export default Category;
