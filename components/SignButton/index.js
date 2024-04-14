import { useEffect } from "react";
import { useSignMessage } from "wagmi";
import ArrowSvg from "@/public/images/svg/arrow.svg";

import Loading from "@/public/images/svg/loading.svg";
import Tip from "@/public/images/svg/tip.svg";

function SignButton(props) {
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
        onClick={() => signMessage()}
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
