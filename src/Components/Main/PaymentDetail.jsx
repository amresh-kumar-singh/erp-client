import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

const PaymentDetail = ({ setPaymentMode, payment, setPayment }) => {
  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        height="40px"
        marginTop={0}
        borderBottom="1px solid grey"
      >
        <Typography ml={1}>Payment Mode</Typography>
        <FormGroup
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "70%",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) =>
                  setPaymentMode((prev) => ({
                    ...prev,
                    cash: e.target.checked,
                  }))
                }
              />
            }
            label="Cash"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  setPaymentMode((prev) => ({
                    ...prev,
                    cheque: e.target.checked,
                  }))
                }
              />
            }
            label="Cheque"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  setPaymentMode((prev) => ({
                    ...prev,
                    card: e.target.checked,
                  }))
                }
              />
            }
            label="Card"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  setPaymentMode((prev) => ({
                    ...prev,
                    voucher: e.target.checked,
                  }))
                }
              />
            }
            label="Voucher"
          />
        </FormGroup>
      </Box>
      <Box
        width="100%"
        display="flex"
        height="80px"
        // borderBottom="1px solid grey"
      >
        <Box
          width="50%"
          display="flex"
          height="40px"
          borderBottom="1px solid grey"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box>Cheque Amount</Box>
          <Box>
            <input
              type="text"
              value={payment.chequeAmount}
              onChange={(e) =>
                setPayment((prev) => ({
                  ...prev,
                  chequeAmount: e.target.value,
                }))
              }
            />
          </Box>
        </Box>
        <Box width="50%" borderLeft="1px solid grey" height="100%">
          <Box
            width="100%"
            display="flex"
            height="40px"
            borderBottom="1px solid grey"
            alignItems="center"
            justifyContent="space-around"
          >
            <Box>Cheque Detail</Box>
            <Box>
              <input
                type="text"
                value={payment.chequeDetail}
                onChange={(e) =>
                  setPayment((prev) => ({
                    ...prev,
                    chequeDetail: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            height="40px"
            alignItems="center"
            justifyContent="space-around"
          >
            <Box>Cash Amount</Box>
            <Box>
              <input
                type="text"
                value={payment.cashAmount}
                onChange={(e) =>
                  setPayment((prev) => ({
                    ...prev,
                    cashAmount: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default PaymentDetail;
