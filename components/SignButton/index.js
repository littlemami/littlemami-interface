import { useEffect } from "react";
import { useSignMessage } from "wagmi";
import ArrowSvg from "@/public/images/svg/arrow.svg";

import Loading from "@/public/images/svg/loading.svg";
import Tip from "@/public/images/svg/tip.svg";

import { useAccount } from "wagmi"
import {
  useConnectModal,

} from "@rainbow-me/rainbowkit";

function SignButton(props) {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal();

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: props.message,
  });

  useEffect(() => {
    if (isSuccess) {
      props.callback?.(data);
    }
  }, [data]);

  return (
    <div className={props.className}>
      <button
        className={"lit-btn"}
        disabled={props?.disabled || isLoading}
        onClick={() => {
  
          if(address) {
            signMessage()
          }else {
            openConnectModal()
          }
        }}
      >
        <ArrowSvg width={"2.125rem"} />
      </button>
      {isLoading && (
        <div className="tips-pop">
          {/* <Loading /> */}
          <img className="anticon-spin" src="/images/svg/loading.png" alt="" />
          <p>Transaction in process</p>
        </div>
      )}
      {isError && (
        <div className="tips-pop error">
          <Tip width={"1.875rem"} />
          <p>Error signing message</p>
        </div>
      )}
    </div>
  );
}

export default SignButton;
