import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Qty from "./Qty";
import { ContextState } from "../../Context";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(ProductName, senario, qty, price) {
  return { ProductName, senario, qty, price };
}

function subtotal(items) {
  return items
    .map(({ price, qty }) => priceRow(price, qty))
    .reduce((sum, i) => sum + i, 0);
}

export default function SalesList({ products, setProducts }) {
  const { setProductData, productData } = ContextState();

  const invoiceSubtotal = subtotal(products);

  React.useEffect(() => {
    async function getProducts() {
      const response = await fetch(`http://localhost:7000/api/getProducts`);
      const data = await response.json();
      let temp = data.map((item) =>
        createRow(item.ProductName, "", 0, item.price)
      );
      setProductData(temp);
    }
    products.length === 0 && getProducts();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setProducts(productData);
    // eslint-disable-next-line
  }, [productData]);

  return (
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
              <TableCell align="right">
                <Qty qty={row.qty} product={row} setProducts={setProducts} />
              </TableCell>
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
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
