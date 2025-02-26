import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useVerifyOrderQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const InvoiceContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  position: "relative",
}));

const Header = styled(Box)({
  textAlign: "center",
  marginBottom: "20px",
  background: "#2d2d2d",
  color: "#fff",
  padding: "20px",
  borderRadius: "8px",
});
const VerifyPage: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  let user: TUser;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const [searchQuery] = useSearchParams();
  const { data: data } = useVerifyOrderQuery(searchQuery.get("order_id"), {
    refetchOnMountOrArgChange: true,
  });
  const orderData = data?.data?.[0];
  if (orderData?.bank_status === "Success") {
    toast.success("Order Placed Successfully");
  } else if (orderData?.bank_status === "Pending") {
    toast.success("Order is in Pending");
  } else if (orderData?.bank_status === "Failed") {
    toast.success("Order is Failed");
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          <Button
            onClick={() => navigate(`/${user?.role}/orderlist`)}
            variant="text"
            color="info"
            size="small"
          >
            <span style={{ paddingLeft: 8 }}>Dashboard</span>
          </Button>
        </Typography>
      </Box>
      <InvoiceContainer ref={componentRef}>
        <Header>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Stationery-shop
          </Typography>
          <Typography variant="subtitle1">
            www.stationery-shop-xi.vercel.app
          </Typography>
          <Typography variant="subtitle1">(+880) 456 7890</Typography>
        </Header>

        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Stationery shop INVOICE
          </Typography>
        </Box>

        <Grid container spacing={4} mb={4}>
          <Grid item xs={6}>
            <Typography variant="h6">Bill To:</Typography>
            <Typography>
              <strong>Name:</strong> {orderData?.name}
            </Typography>
            <Typography>
              <strong>Address:</strong> {orderData?.address}, {orderData?.city}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {orderData?.phone_no}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6">
              Invoice: #{orderData?.invoice_no}
            </Typography>
            <Typography>
              <strong>Date:</strong> {orderData?.date_time}
            </Typography>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Qty.</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Unit Price</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Amount</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {orderData?.items?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="center">{item.qty}</TableCell>
                  <TableCell align="center">${item.unitPrice}</TableCell>
                  <TableCell align="center">${item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>

        <Grid container justifyContent="flex-end" spacing={0} mt={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              Subtotal: BDT-{orderData?.payable_amount}
            </Typography>
            <Typography variant="body1">Tax (0%): 0</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6">
              Total: BDT-{orderData?.payable_amount}
            </Typography>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">
            Payment Method: {orderData?.method}
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="body2">
            <strong>Terms and Conditions:</strong>
          </Typography>
          <Typography variant="body2">
            Payment is due within 15 days from the date of the invoice.
          </Typography>
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="body1">
            Thanks for your attention. We value our partnership and look forward
            to providing excellent services.
          </Typography>
          <Typography variant="body1" mt={2}>
            Date: {orderData?.date_time}
          </Typography>
          <Typography variant="body1" mt={2} sx={{ fontWeight: "bold" }}>
            Zakir Hossain Jihan
          </Typography>
        </Box>
      </InvoiceContainer>
    </Container>
  );
};

export default VerifyPage;
