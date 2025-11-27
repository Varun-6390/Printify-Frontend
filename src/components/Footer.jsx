import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 font-sans py-16 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.12),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.85))]"></div>

      <div className="relative max-w-6xl mx-auto px-4 z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-wide">
              PRINTIFY
            </h3>

            <p className="text-sm mb-4 opacity-80">
              Quality document printing, delivered to your door.
            </p>

            <div>
              <input
                type="email"
                placeholder="Your email for offers"
                className="w-full p-2 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-t-md backdrop-blur-md focus:outline-none" />
              <button className="w-full p-2 bg-teal-500 text-black font-semibold rounded-b-md hover:bg-teal-400 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 relative">
              Services
              <span className="absolute left-0 -bottom-2 h-0.5 w-12 bg-teal-400"></span>
            </h4>

            <ul className="space-y-2">
              {["Print Options", "Bulk Orders", "Templates", "Business Pricing"].map((item, i) => (
                <li key={i}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-white transition pl-0 hover:pl-2">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 relative">
              Support
              <span className="absolute left-0 -bottom-2 h-0.5 w-12 bg-teal-400"></span>
            </h4>

            <ul className="space-y-2">
              {["FAQ", "Contact Us", "Track Order", "Help Center"].map((item, i) => (
                <li key={i}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-white transition pl-0 hover:pl-2">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 relative">
              Company
              <span className="absolute left-0 -bottom-2 h-0.5 w-12 bg-teal-400"></span>
            </h4>

            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Terms of Service", "Privacy Policy"].map((item, i) => (
                <li key={i}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-white transition pl-0 hover:pl-2">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col lg:flex-row justify-between items-center">

          <p className="text-sm text-center lg:text-left opacity-75 mb-4 lg:mb-0">
            &copy; {new Date().getFullYear()} PRINTIFY — All Rights Reserved. <br /> Powered and designed by Varun Sharma
          </p>

          <div className="flex space-x-4">
            {[
              ["fa-facebook", "https://facebook.com"],
              ["fa-x-twitter", "https://twitter.com"],
              ["fa-linkedin", "https://linkedin.com"],
            ].map(([icon, url], i) => (
              <a
                key={i}
                href={url}
                className="h-10 w-10 flex items-center justify-center rounded-full 
                           bg-white/10 border border-white/20 text-white 
                           hover:bg-teal-400 hover:text-black transition backdrop-blur-xl">
                <i className={`fa-brands ${icon}`}></i>
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
