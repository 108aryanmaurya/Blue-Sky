import React, { useState } from "react";
import { ProfileModal } from "./";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-2 text-lg leading-normal font-medium px-4 items-center ">
        <img src="" alt="" className="rounded-full" width={35} height={35} />
        <span className="dark:text-darkTextMain ">ASh</span>
        <ProfileModal />
      </div>
    </>
  );
}
