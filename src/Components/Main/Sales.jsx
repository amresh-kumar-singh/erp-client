import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useRef, useState } from "react";
import { ContextState } from "../../Context";
import Input from "./Input";
import PaymentDetail from "./PaymentDetail";
import SalesList from "./SalesList";

const formatedDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return yyyy + "-" + mm + "-" + dd;
};

const Sales = () => {
  const { user, setUser, productData, setInvoice, setActive } = ContextState();
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [paymentMode, setPaymentMode] = useState({
    cash: true,
    cheque: false,
    voucher: false,
    card: false,
  });
  const [payment, setPayment] = useState({
    cashAmount: "",
    chequeAmount: "",
    chequeDetail: "",
  });
  // eslint-disable-next-line
  const [date, setDate] = useState(() => formatedDate());
  const [invoiceNo, setInvoiceNo] = useState("000");
  const [userName, setUserName] = useState("");
  const [userLabel, setUserLabel] = useState("");
  const [deliveryType, setDeliveryType] = useState("Hand-to-Hand");
  const timerRef = useRef();

  useEffect(() => {
    async function fetchInvoice() {
      const response = await fetch(`http://localhost:7000/api/invoiceNo`);
      const data = await response.json();
      setInvoiceNo(data);
    }
    fetchInvoice();
    // eslint-disable-next-line
  }, []);
  const searchUser = (e) => {
    setUserName(e.target.value);
    setUserLabel("");
    clearTimeout(timerRef.current);
    async function search() {
      const response = await fetch(`http://localhost:7000/api/searchUser`, {
        method: "POST",
        body: JSON.stringify({
          name: e.target.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(`${e.target.value} (${data.mobileNo})`);
      } else {
        setUserLabel("User not found create new user");
      }
    }
    timerRef.current = setTimeout(search, 400);
  };
  const handleDeliveryType = (e) => {
    setDeliveryType(e.target.value);
  };
  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
  };
  useEffect(() => {
    setProducts((prev) =>
      productData.filter(
        (item) => item.ProductName.includes(productSearch) || item.qty > 0
      )
    );
    // eslint-disable-next-line
  }, [productSearch]);
  const generateInvoice = async () => {
    // if (!mobileNo || !userName) {
    //   setErr("Please fill All Details");
    // } else {
    try {
      const response = await fetch(
        `http://localhost:7000/api/generateInvoice`,
        {
          method: "POST",
          body: JSON.stringify({
            invoiceNo,
            user,
            payment,
            paymentMode,
            deliveryType,
            date,
            products: products.filter((item) => item.qty > 0),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.status === 201) {
        const data = await response.json();
        setInvoice(data);
        setActive(10);
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  return (
    <Paper
      sx={{
        width: "98%",
        minHeight: "calc(100vh - 70px)",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box width="90%" display="flex" flexWrap="wrap">
        <Input type="text" value={invoiceNo} label="Invoice No" read={true} />
        <Input
          type="date"
          defaultValue={date}
          label="Invoice Date"
          read={true}
        />
        <Input
          type="text"
          value={user || userName}
          label={userLabel ? userLabel : "Customer"}
          handleChange={searchUser}
          placeholder="Search/Create user"
        />
        <Input
          type="text"
          value={deliveryType}
          label="Delivery Type"
          handleChange={handleDeliveryType}
        />
        <Input
          type="text"
          value={productSearch}
          label="Product Name or Code"
          handleChange={handleProductSearch}
          placeholder="Search Product"
        />
      </Box>

      <Box width="90%" display="flex" border="1px solid grey" marginTop="20px">
        <SalesList products={products} setProducts={setProducts} />
      </Box>
      <Box
        width="90%"
        display="flex"
        marginTop="20px"
        flexDirection="column"
        border="1px solid grey"
      >
        <PaymentDetail
          setPaymentMode={setPaymentMode}
          payment={payment}
          setPayment={setPayment}
        />
      </Box>
      <Box width="90%" display="flex" marginTop="20px">
        <Button variant="contained" color="secondary" onClick={generateInvoice}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};
export default Sales;
