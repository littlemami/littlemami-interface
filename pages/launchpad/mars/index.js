import WriteButton from "@/components/WriteButton";

const Mars = () => {
  const stake = { buttonName: "Stake", data: {} };
  const unStake = { buttonName: "UnStake", data: {} };
  return (
    <>
      <div>User Info</div>
      <div>Point </div>
      <div>LMC staked </div>
      <div className="flex gap-2">
        <WriteButton {...stake} />
        <WriteButton {...unStake} />
      </div>
    </>
  );
};

export default Mars;
