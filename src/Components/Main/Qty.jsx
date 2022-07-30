import { Button } from "@mui/material";
import { ContextState } from "../../Context";

const Qty = ({ qty, product }) => {
  const { setProductData } = ContextState();

  const handleIncrement = () => {
    setProductData((prev) =>
      prev.map((item) =>
        item === product ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };
  const handleDecrement = () => {
    setProductData((prev) =>
      prev.map((item) =>
        item === product ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };
  return (
    <span>
      <Button
        onClick={handleDecrement}
        sx={{ fontSize: "22px", padding: 0, minWidth: "20px", mr: 1 }}
      >
        -
      </Button>
      {qty}
      <Button
        onClick={handleIncrement}
        sx={{ fontSize: "22px", padding: 0, minWidth: "20px", ml: 1 }}
      >
        +
      </Button>
    </span>
  );
};

export default Qty;
