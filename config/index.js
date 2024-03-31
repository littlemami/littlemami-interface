import nodeABI from "@/abi/NodeABI.json";
import stakeABI from "@/abi/StakeABI.json";
import marsABI from "@/abi/MarsABI.json";
// export const rpcUrl = "https://api.littlemami.io/";
//test
export const rpcUrl = "http://34.150.32.93:5556/";

export const contract = {
  1: {
    node: {
      address: "0x5A97E7F27a48aF5b9b5c3b48bbCac0A73F4F5138",
      abi: nodeABI,
    },
  },
  11155111: {
    stake: {
      address: "0x8aA63C6f175ab2c1D5A708f4533d872A3594c5E4",
      abi: stakeABI,
    },
    mars: {
      address: "0x540FBd81745B5E1e160102b01a8bC92b7BdCa3A3",
      abi: marsABI,
    },
  },
};
