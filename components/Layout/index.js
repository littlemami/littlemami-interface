import Navbar from "../Navbar";

import {Footer} from "../LaunchpadLayout"

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="main-box m-auto">
        {children}
        <Footer/>
      </main>
    </div>
  );
};

export default Layout;
