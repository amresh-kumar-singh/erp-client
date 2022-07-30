import { Box, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import ProductTable from "./ProductTable";

const Product = () => {
  return (
    <Paper
      sx={{
        width: "98%",
        minHeight: "calc(100vh - 70px)",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <ProductTable />
      <Box width="100%" marginTop="40px">
        <Typography
          sx={{ textAlign: "left", marginLeft: "10px", fontWeight: "600" }}
        >
          Add new Product
        </Typography>
        <Box
          width="100%"
          marginTop="40px"
          display="flex"
          justifyContent="space-around"
        >
          <TextField type="text" label="Enter Product" variant="outlined" />
          <TextField
            type="number"
            label="Enter Price/Piece"
            variant="outlined"
          />
        </Box>
        <Button variant="contained" sx={{ marginTop: "30px" }}>
          add product
        </Button>
      </Box>
    </Paper>
  );
};
export default Product;
