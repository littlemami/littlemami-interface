import { rpcUrl } from "@/config";
const getUser = async (address) => {
  return send("getUser", [address]);
};

const register = async (leader, signature) => {
  console.log(leader);
  return send("register", [leader, signature]);
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
  } catch (e) {}

  const json = await res?.json();

  if (json?.error) {
    return { error: json.error };
  }
  return json?.["result"];
};

module.exports = {
  getUser,
  register,
};
