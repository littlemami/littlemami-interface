import { rpcUrl } from "@/config";
const getUser = async (address) => {
  return send("getUser", [address]);
};

const register = async (inviteCode, signature) => {
  return send("register", [inviteCode, signature]);
};

const getScoreRank = async (page = 1, size = 100) => {
  return send("getScoreRank", [page, size]);
};

const getMarsRank = async (page = 1, size = 100) => {
  return send("getMarsRank", [page, size]);
};

const send = async (method, params) => {
  let res;
  try {
    res = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: 1,
      }),
    });
  } catch (e) {
    return { error: e.message };
  }

  const json = await res?.json();

  if (json?.error) {
    return { error: json.error };
  }
  return json?.["result"];
};

module.exports = {
  getUser,
  register,
  getScoreRank,
  getMarsRank,
};
