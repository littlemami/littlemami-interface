import Link from "next/link";

const Launchpad = () => {
  return (
    <>
      <Link href="/launchpad/mars">
        <div className="card w-96 shadow-2xl hover:bg-slate-500 m-auto  text-center">
          <div className="card-body">Mars</div>
        </div>
      </Link>
    </>
  );
};

export default Launchpad;
