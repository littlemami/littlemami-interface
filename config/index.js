import nodeABI from "@/abi/nodeABI.json";
export const rpcUrl = "https://api.littlemami.io/";
// export const rpcUrl = "http://127.0.0.1:5555/";

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
};
