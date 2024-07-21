import nodeABI from "@/abi/NodeABI.json";
import stakeABI from "@/abi/StakeABI.json";
import marsABI from "@/abi/MarsABI.json";

export const rpcUrl = "https://api.littlemami.io/";
//test
// export const rpcUrl = "https://test-api.littlemami.io/";

export const contract = {
  1: {
    node: {
      address: "0x5A97E7F27a48aF5b9b5c3b48bbCac0A73F4F5138",
      abi: nodeABI,
    },
    stake: {
      address: "0xAE40f6acA75Fe3A80932c301b4022D2dFA0d4f6A",
      abi: stakeABI,
    },
    mars: {
      address: "0x3Cd275B60644caDF7C5D428c4A0d2771a2be7ebD",
      abi: marsABI,
    },
  },
  11155111: {
    node: {
      address: "0xEDdB92510981407E5A1f5Ed352979b07E47fF666",
      abi: nodeABI,
    },
    stake: {
      address: "0xD8bb5A3bDFD39aa063D6f712fc5B768760cDcCfF",
      abi: stakeABI,
    },
    mars: {
      address: "0x774CBaF5BFde76b948cC3D6010b1A55cd1a5eF80",
      abi: marsABI,
    },
  },
};
