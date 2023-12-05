import { useEffect } from "react";
import { useSignMessage } from "wagmi";

function SignButton(props) {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: props.message,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      props.callback?.(data);
    }
  }, [data]);

  return (
    <div className={props.className}>
      <button
        className={
          (props?.disabled && "btn-disabled") +
          " btn btn-primary btn-outline text-xs"
        }
        disabled={isLoading}
        onClick={() => signMessage()}
      >
        {props.buttonName}
      </button>
      {isError && <div>Error signing message</div>}
    </div>
  );
}

export default SignButton;
