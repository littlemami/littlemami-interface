import { InputNumber, ConfigProvider } from "antd";

import Plus from "@/public/images/svg/plus.svg";
import Minus from "@/public/images/svg/minus.svg";

const InputNumberCon = ({ onChange, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: "rgba(60, 64, 82, 0.80)",
        },
        components: {
          InputNumber: {
            handleVisible: true,
            handleBg: "#482AFF",
            handleHoverColor: "#000",
            handleBorderColor: "rgba(255, 255, 255, 0.10)",
            handleActiveBg: "#fff",
          },
        },
      }}
    >
      <InputNumber
        className="cur-input-number"
        {...props}
        onChange={onChange}
        controls={{ upIcon: <Plus />, downIcon: <Minus /> }}
      />
    </ConfigProvider>
  );
};
export default InputNumberCon;
