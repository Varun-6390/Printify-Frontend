import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/Images/printify-removebg-preview.png"

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      <div className="backdrop-blur-lg bg-black/40 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          <div className="text-2xl font-semibold text-white tracking-wide flex">
            <img src={logo} alt="" style={{height:50,marginRight:10}} />
            Printify
          </div>

          <button
            className="md:hidden text-white p-2 z-50"
            onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul
            className={`
              flex-col md:flex-row md:flex gap-8 md:gap-10 text-lg tracking-wide
              absolute md:static left-0 top-16 w-full md:w-auto
              bg-black/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-0
              py-6 md:py-0 shadow-md md:shadow-none text-white
              transition-all duration-300
              ${open ? "flex items-center" : "hidden md:flex"}`}>
            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="hover:text-teal-300 transition">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="hover:text-teal-300 transition">
                About
              </Link>
            </li>

            <li>
              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="hover:text-teal-300 transition">
                Admin
              </Link>
            </li>

            <li>
              <Link to="/UserLogin" onClick={() => setOpen(false)}>
                <button className="bg-teal-400 text-black px-5 py-2 rounded-md font-medium hover:bg-teal-300 transition">
                  Get Print
                </button>
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
