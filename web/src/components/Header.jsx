import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/signout`
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header className="bg-sky-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-100">Library System</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            {currentUser ? (
              <li className="hidden sm:inline text-sky-100 hover:underline">
                Home
              </li>
            ) : (
              ""
            )}
          </Link>

          {currentUser ? (
            <li
              onClick={handleSignOut}
              className=" text-sky-100 hover:underline cursor-pointer"
            >
              <span>Sign Out</span>
            </li>
          ) : (
            <li className=" text-sky-100 hover:underline cursor-pointer">
              Sign In
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
