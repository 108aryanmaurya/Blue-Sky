import { useNavigate } from "react-router";

export default function Tags({ tags }) {
  const trimSpaces = (str) => str.trim();
  const navigate = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/searchBy/tags/${tags}`);
        }}
      >
        <a className="text-[14px] dark:text-white hover:text-primaryMain hover:underline font-semibold font-montserrat lowercase ml-2">
          #{trimSpaces(tags)}
          <span> </span>
        </a>
      </div>
    </>
  );
}
