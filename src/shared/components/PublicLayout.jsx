import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext"; // Temporarily import useAuth here too

function PublicLayout() {
  const authInPublicLayout = useAuth();
  console.log("Auth context in PublicLayout:", authInPublicLayout); // What does this print?

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default PublicLayout;
