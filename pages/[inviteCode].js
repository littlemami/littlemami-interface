import { useRouter } from "next/router";
import Invite from "@/components/Invite";
const Home = () => {
  const router = useRouter();
  const { inviteCode } = router.query;

  return <Invite inviteCode={inviteCode} />;
};

export default Home;
