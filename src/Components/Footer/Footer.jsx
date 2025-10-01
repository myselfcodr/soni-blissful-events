import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../Shared/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link to="/">
                <Logo />
              </Link>
              <p className="text-gray-400 mt-3">
               “Soni Blissful Events – where Raipur celebrates in style with exclusive events and elegant gatherings.”
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              <a
                href="https://www.google.com/search?client=ms-android-realme-terr1-rso2&sca_esv=e948bafec9f39f8c&hl=en-GB&cs=1&kgmid=/g/11w9ngm0x0&q=Soni+blissful+events&shndl=30&source=sh/x/loc/act/m1/4&kgs=203c39431bff588d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M21.35 11.1h-9.17v2.92h5.35c-.23 1.2-.93 2.21-1.98 2.88v2.39h3.19c1.87-1.72 2.95-4.25 2.95-7.19 0-.67-.06-1.31-.16-1.93h-.18zM12.18 22c2.7 0 4.96-.9 6.62-2.43l-3.19-2.39c-.89.6-2.02.96-3.43.96-2.64 0-4.88-1.78-5.68-4.17H3.21v2.61C4.84 19.73 8.21 22 12.18 22zM6.5 13.97a5.92 5.92 0 0 1 0-3.94V7.42H3.21a9.81 9.81 0 0 0 0 9.16l3.29-2.61zM12.18 5.84c1.46 0 2.77.5 3.8 1.48l2.84-2.84C17.12 2.65 14.86 2 12.18 2 8.21 2 4.84 4.27 3.21 7.42l3.29 2.61c.8-2.39 3.04-4.19 5.68-4.19z"/>
</svg>
              </a>
              <a
                href="https://www.justdial.com/Raipur-Chhattisgarh/Soni-blissful-events-Beside-Of-Gs-Super-Bazar-Purani-Basti-Raipur/9999PX771-X771-240907002201-G1Z9_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 120 40">
    <text x="0" y="28" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ff6600">
      Just
    </text>
    <text x="70" y="28" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1c7ed6">
      Dial
    </text>
  </svg>
              </a>

              <a
                href="https://www.instagram.com/soni_blissful_events/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=918319594037&text&type=phone_number&app_absent=0events"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-700 transition-colors"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 .06 5.31.06 11.94c0 2.11.55 4.17 1.6 5.97L0 24l6.27-1.64a12 12 0 0 0 5.73 1.46h.01c6.63 0 11.94-5.31 11.94-11.94 0-3.19-1.24-6.19-3.43-8.4zM12 21.5c-1.88 0-3.71-.5-5.3-1.46l-.38-.23-3.72.97.99-3.63-.25-.37a9.45 9.45 0 0 1-1.48-5.06C1.86 6.64 6.73 1.77 12 1.77c2.52 0 4.89.98 6.67 2.75a9.42 9.42 0 0 1 2.75 6.67c0 5.27-4.87 10.14-10.42 10.31zM17.2 14.39c-.29-.14-1.72-.85-1.99-.94-.27-.1-.47-.14-.67.14-.19.29-.77.94-.94 1.13-.17.19-.35.21-.64.07-.29-.14-1.21-.45-2.3-1.45-.85-.76-1.42-1.7-1.59-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.35.43-.52.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.67-1.61-.92-2.21-.24-.58-.48-.5-.67-.51h-.57c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.42s1.02 2.8 1.16 2.99c.14.19 2.01 3.08 4.87 4.32.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.72-.7 1.96-1.37.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/>
  </svg>
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-yellow-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/Membership"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-yellow-400">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Soni Blissful Events, Purani Basti Bandhvapara Lakhe nagar Raipur, Chhattisgarh</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>8319594037</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>soniblissfulevents@gmail.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-yellow-400">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on events and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                required
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm mb-4 md:mb-0"
            >
              © {new Date().getFullYear()} Soni Blissful Events. All rights reserved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex space-x-6"
            >
              <Link
                to="/privacy-policy"
                className="text-gray-500 hover:text-yellow-400 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-gray-500 hover:text-yellow-400 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
