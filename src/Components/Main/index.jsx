import Box from "@mui/material/Box";
import { ContextState } from "../../Context";
import Product from "./Product";
import Purchase from "./Purchase";
import Sales from "./Sales";
import Others from "./Others";
import Invoice from "./Invoice";

const Main = () => {
  const { active } = ContextState();

  return (
    <Box
      position="fixed"
      left="240px"
      width="calc(100vw - 240px)"
      top="70px"
      minHeight="calc(100vh - 70px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {active === 0 && <Product />}
      {active === 1 && <Sales />}
      {active === 2 && <Purchase />}
      {active === 10 && <Invoice />}
      {active > 2 && active < 10 && <Others />}
    </Box>
  );
};
export default Main;
