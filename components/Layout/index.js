import Navbar from "../Navbar";

import {Footer} from "../LaunchpadLayout"

const Layout = ({ children }) => {
  return (
    <main className="main-box m-auto">
      <Navbar />
      {children}
      <Footer/>
    </main>
  );
};

export default Layout;
