import { Link } from "react-router-dom";
import useUserStore from "../store/UserStore.ts";

function Header() {
  const { logout } = useUserStore();

  return (
    <div className="flex justify-between p-5 text-white border-b-2 items-center">
      <div className="font-bold text-lg">
        <Link to={"/"}>Todo App</Link>
      </div>
      <div>
        <button
          className="border p-2 rounded-lg hover:bg-white hover:text-black hover:font-bold"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
