import { Collapse, ConfigProvider } from "antd";
import styles from "./index.module.scss";

import ColRight from "@/public/images/svg/col_right.svg";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
];

const Faq = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className={styles["faq-box"]}>
      <h2 className={styles["faq-box-h2"]}>FAQS</h2>
      <ConfigProvider
        theme={{
          token: {
            colorBorder: "#3C334F",
            colorText: "#fff",
          },
          components: {
            Collapse: {
              contentBg:
                "linear-gradient(90deg, rgba(205, 198, 221, 0.03) 0.02%, rgba(151, 125, 251, 0.00) 101.41%)",
              headerBg:
                "linear-gradient(91deg, rgba(152, 102, 215, 0.07) 19.69%, rgba(16, 36, 34, 0.04) 101.98%)",
            },
          },
        }}
      >
        <Collapse
          expandIcon={(panelProps) => (
            <ColRight className={`open ${panelProps.isActive ? "yes" : ""}`} />
          )}
          className="lit-collapse"
          expandIconPosition="end"
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
};

export default Faq;
