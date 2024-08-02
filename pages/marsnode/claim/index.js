import { useAccount, useNetwork, useContractReads } from "wagmi";
import { lmcPrize } from "@/config/constant";
import WriteButton from "@/components/WriteButton";
import { keccak256, encodePacked, getAddress } from "viem";
import { contract } from "@/config";
import { MerkleTree } from "merkletreejs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const hash = (msgSender, max) => {
  try {
    return keccak256(encodePacked(["address", "uint256"], [msgSender, max]));
  } catch (error) {

    return "";
  }
};

const getTree = (list) => {
  const leaves = list.map((item) => {
    return hash(item?.address, item?.max);
  });
  const tree = new MerkleTree(leaves, keccak256, {
    sort: true,
  });
  return tree;
};
const getProof = (list, data) => {
  const tree = getTree(list);
  const leaf = hash(data?.address, data?.max);
  const proof = tree.getHexProof(leaf);
  console.log("root", tree.getHexRoot());
  return proof;
};

const getMax = (list, address) => {
  return list.find((item) => item?.address === address)?.max || 0;
};

const LMCClaim = () => {
  const [mount, setMount] = useState(false);
  const { address } = useAccount();
  const list = [];
  Object.entries(lmcPrize).forEach(([key, value]) => {
    list.push({ address: getAddress(key), max: value });
  });

  const { chain } = useNetwork();

  const lmcClaimContract = contract[chain?.id]?.lmcClaim;

  const { data: reads0 } = useContractReads({
    contracts: [
      {
        ...lmcClaimContract,
        functionName: "claimed",
        args: [address],
      },
    ],
  });

  const claimed = reads0?.[0]?.result;

  const max = getMax(list, address);

  const proof = getProof(list, {
    address: address,
    max: max,
  });
  const routre = useRouter();
  const claim = {
    buttonName: "Claim",
    data: {
      ...lmcClaimContract,
      functionName: "claim",
      args: [max, proof],
    },
    callback: (confirm) => {
      if (confirm) {
        routre.push("/marsnode/claim");
      }
    },
  };


  useEffect(() => {
    setMount(true);
  }, []);
  return (
    mount && (
      <>
        <div className="text-center">
          <div>
            You can claim {((BigInt(max) - (claimed || BigInt(0))) / BigInt(1e18))?.toString()} LMC
          </div>
          <WriteButton {...claim} className={"mt-6"} />
        </div>
      </>
    )
  );
};

export default LMCClaim;
