import Navbar from "../Navbar";
import {ContractBar} from "../LaunchpadLayout"
const Layout = ({ children }) => {
  return (
    <main className="main-box m-auto">
      <Navbar />
      {children}
      <ContractBar/>
    </main>
  );
};

export default Layout;
