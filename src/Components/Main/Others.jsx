import Paper from "@mui/material/Paper";
import ArrayList from "../../config/ArrayList";
import { ContextState } from "../../Context";

const Others = () => {
  const { active } = ContextState();

  return (
    <Paper
      sx={{
        width: "98%",
        minHeight: "calc(100vh - 70px)",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <h1>{ArrayList[active]}</h1>
    </Paper>
  );
};
export default Others;
