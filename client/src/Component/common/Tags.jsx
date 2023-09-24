export default function Tags({ tags }) {
  return (
    <>
      <div className="my-3 mr-2 bg-slate-400">
        <a
          href={tags.url}
          className="text-black dark:hover:bg-secondary bg-[#F2F2F2] hover:bg-primaryMain hover:text-white  transition-colors duration-100 ease-in-out font-medium rounded-lg text-base px-3 py-2 dark:bg-darkBorderAll dark:text-darkTextMain"
        >
          {tags}
        </a>
      </div>
    </>
  );
}
