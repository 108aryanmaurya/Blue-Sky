import BookmarkPage from "../Pages/BookmarkPage";
import { RightSection } from "../Section";
const BookmarkLayout = () => {
  return (
    <section className="max-container flex min-h-screen w-[95%] max-lg:w-[100%]  justify-between  max-lg:flex-col">
      <div className="pt-5 px-20 max-md:px-10 max-sm:px-2 w-full">
        <BookmarkPage></BookmarkPage>{" "}
      </div>
      <div className="relative w-[35%] border-l-[1px] dark:border-darkBorderAll overflow-hidden  max-lg:w-[100%]">
        <RightSection></RightSection>
      </div>
    </section>
  );
};

export default BookmarkLayout;
