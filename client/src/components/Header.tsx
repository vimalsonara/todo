import useUserStore from "../store/UserStore.ts";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const { logout } = useUserStore();

  const header = {
    "Content-Type": "application/json",
    Authorization: "Bearer your-access-token",
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/users/logout", {
        headers: header,
      });
      if (res) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between p-5 text-white border-b-2 items-center">
      <div className="font-bold text-lg">
        <Link to={"/"}>Todo App</Link>
      </div>
      <div>
        <button
          className="border p-2 rounded-lg hover:bg-white hover:text-black hover:font-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
