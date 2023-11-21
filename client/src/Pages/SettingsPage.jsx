import React, { useEffect, useContext } from "react";
import Leftsection from "../Section/SettingsSection/Leftsection";
import Rightsection from "../Section/SettingsSection/Rightsection";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Helper/Context/AuthContext";
export default function SettingsPage() {
  const context = useContext(AuthContext);
  const { AuthStatus } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (!AuthStatus) {
      navigate("/");
    }
  }, [AuthStatus]);

  return (
    <>
      <section className="max-container flex min-h-screen   justify-between  max-lg:flex-col">
        <div className="relative w-[30%]  overflow-hidden  max-lg:w-[100%] max-lg:fixed bottom-0">
          <Leftsection />
        </div>
        <div className="w-[70%] max-lg:w-[100%] border-r-[1px] dark:border-darkBorderAll max-lg:border-0  border-bgBlue p-6 max-lg:p-4 ">
          <Rightsection />
        </div>
      </section>
    </>
  );
}
