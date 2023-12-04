import Node from "@/components/Node";
import Invite from "@/components/Invite";
import rpc from "@/components/Rpc";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Index";
import { useRouter } from "next/router";
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

  return mount ? !user?.leader ? <Invite /> : <Node {...user} /> : <Loading />;
};

export default Home;
