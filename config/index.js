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
  5: {
    node: {
      address: "0x37c00AE5C4b49Ab0F5fD2FFB1033588e9bC33B08",
      abi: nodeABI,
    },
  },
  11155111: {
    stake: {
      address: "0x3Dd56F4cbA19183221810e54D343dFFc7A2B9dE3",
      abi: stakeABI,
    },
    mars: {
      address: "0xe91BF0a3e8AF22eA3047F8059ad15773229c1035",
      abi: marsABI,
    },
  },
};
