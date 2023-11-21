const Tag = ({ tags, getTags }) => {
  return (
    <div className=" bg-gray-100 dark:bg-darkBgPrimary  gap-2 flex flex-col rounded-md  p-4 m-3 ">
      <div className="">Tags</div>
      <div className="flex gap-2 h-10">
        <input
          name="tags"
          value={tags}
          onChange={(e) => {
            getTags(e);
          }}
          className="dark:text-darkTextMain text-gray-900 dark:bg-darkBgPrimary border-gray-300 dark:border-gray-700 hover:border-primaryMain hover:dark:border-secondary focus:border-primaryMain focus:dark:border-secondary outline-none w-full border-2 rounded text-[20px]  px-3"
          type="text"
        />
        {/* <button className="border-2 border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-400   rounded-md bg-primaryMain dark:bg-secondary px-4 py-1 font-semibold text-white ">
          Add
        </button> */}
      </div>
      <i className=" text-gray-400">separate the tags with commas ( , )</i>
    </div>
  );
};

export default Tag;
