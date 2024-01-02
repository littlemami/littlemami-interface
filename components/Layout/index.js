import Navbar from "../Navbar";
const Layout = ({ children }) => {
  return (
    <main className="main-box m-auto">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
