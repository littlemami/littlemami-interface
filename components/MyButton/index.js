import { Button } from "@nextui-org/react";

const MyButton = (props) => {
  const { color, text, className, ...reset } = props;
  return (
    <Button
      radius="lg"
      className={`py-3 px-6 rounded-[15px] h-[36px] ${className}`}
      style={{ backgroundColor: color }}
      {...reset}
    >
      {text}
    </Button>
  );
};

export default MyButton;
