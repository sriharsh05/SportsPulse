import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const AccountLayout = () => {
  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-8xl py-6 lg:px-8 sm:px-6 ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
