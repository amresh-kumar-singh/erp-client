import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { ContextState } from "../../Context";

function priceRow(qty, unit) {
  return qty * unit;
}
function subtotal(items) {
  return items
    .map(({ price, qty }) => priceRow(price, qty))
    .reduce((sum, i) => sum + i, 0);
}

const Invoice = () => {
  const { invoice } = ContextState();
  const [products, setProducts] = useState([]);
  // console.log(invoice);
  const invoiceSubtotal = subtotal(products);
  useEffect(() => {
    setProducts(invoice.products);
    // eslint-disable-next-line
  }, []);
  return (
    <Paper
      sx={{
        width: "98%",
        minHeight: "calc(100vh - 70px)",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Invoice
      </Typography>
      <Box
        display="flex"
        width="90%"
        justifyContent="space-between"
        textAlign="left"
        marginTop="20px"
        marginBottom="40px"
      >
        <Box display="flex" flexDirection="column">
          <Typography textTransform="capitalize">
            User: {invoice.user.split("(")[0]}
          </Typography>
          <Typography>
            Mobile: {invoice.user.split("(")[1].split(")")[0]}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography>Date: {invoice.date}</Typography>
          <Typography>Invoice No: {invoice.invoiceNo}</Typography>
        </Box>
      </Box>
      {/* _______________________ */}

      <TableContainer sx={{ maxHeight: "250px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Selling Senario</TableCell>
              <TableCell align="right">QTY</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sub Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.ProductName}</TableCell>
                <TableCell align="center">{row.senario}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  {priceRow(row.qty, row.price) | 0}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} />
              <TableCell colSpan={1} align="right">
                Total
              </TableCell>
              <TableCell align="right">{invoiceSubtotal | 0}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box marginTop="40px" width="80%">
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Typography fontWeight="600">Delivery Type:</Typography>
          <Typography>{invoice.deliveryType}</Typography>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Typography fontWeight="600">Paymenet Mode:</Typography>
          <Typography textTransform="capitalize">
            {Object.keys(invoice.paymentMode)
              .filter((item) => invoice.paymentMode[item])
              .reduce((agg, item) => agg + " " + item, "")}
          </Typography>
        </Box>
      </Box>
      <Box
        width="80%"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Typography fontWeight="600" textAlign="left">
          Paymenet Detail:
        </Typography>
        {invoice.paymentMode.cash && (
          <Box textAlign="left" ml={5} mt={1}>
            By Cash: {invoice.payment.cashAmount}
          </Box>
        )}
        {invoice.paymentMode.cheque && (
          <Box textAlign="left" ml={5} mt={1}>
            By Cheque: {invoice.payment.chequeAmount} &nbsp; Cheque
            Details:&nbsp;
            {invoice.payment.chequeDetail}
          </Box>
        )}

        <Box></Box>
      </Box>
    </Paper>
  );
};
export default Invoice;
