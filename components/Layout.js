import { Box } from "./Box.js";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Box className="max-w-full">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </Box>
    </>
  );
}
