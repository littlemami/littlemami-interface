import { Button } from "@nextui-org/react";

const MyButton = (props) => {
  const { color, text, className, disabled, ...reset } = props;
  return (
    <Button
      isDisabled={disabled}
      radius="lg"
      className={`disabled:opacity-75 disabled:cursor-not-allowed py-3 px-6 rounded-[15px] h-[36px] ${className}`}
      style={{ backgroundColor: color, color: "#fff" }}
      {...reset}
    >
      {text}
    </Button>
  );
};

export default MyButton;
