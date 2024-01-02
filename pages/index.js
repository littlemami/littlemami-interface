import Node from "@/components/Node";
import Invite from "@/components/Invite";
import rpc from "@/components/Rpc";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Index";
import Welcome from "@/components/Welcome";

const Home = (props) => {
  const [mount, setMount] = useState(false);
  const { address } = useAccount();
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const user = await rpc.getUser(address);
      if (user) {
        setData({ ...data, user });
      } else {
        delete data.user;
        setData({ ...data });
      }
      setMount(true);
    }
    fetchData();
  }, [address]);

  const user = data.user;

  useEffect(() => {
    if (!address || !user?.leader) {
      document.body.className = "";
    } else {
      document.body.className = "star";
    }
  }, [address, user?.leader]);

  return mount ? (
    !address ? (
      <Welcome />
    ) : !user?.leader ? (
      <Invite />
    ) : (
      <Node {...user} />
    )
  ) : (
    <Loading />
  );
};

export default Home;
