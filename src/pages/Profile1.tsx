import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagementApi";
import {
  logOut,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { getChartData, getOrderStats } from "@/utils/profileDashbord.utils";
import { verifyToken } from "@/utils/verifyToken";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "#f5f6fa",
    minHeight: "100vh",
    width: "100%",
  },
  statBox: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 15px rgba(0,0,0,0.05)",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    "& th": {
      fontWeight: 600,
    },
  },
  statusCompleted: {
    color: "#4caf50",
    backgroundColor: "#e8f5e9",
    padding: "3px 8px",
    borderRadius: "4px",
  },
  statusPending: {
    color: "#ff9800",
    backgroundColor: "#fff3e0",
    padding: "3px 8px",
    borderRadius: "4px",
  },
}));

const CustomerDashboard = () => {
  // This Functions is used for components style
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Fetch User Data for using the information show
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const user: TUser | null = token ? (verifyToken(token) as TUser) : null;
  // Fetch Order Data for using the information show
  const { data: userOrder } = useGetUserOrdersQuery(undefined);
  const { data: allOrder } = useGetAllOrdersQuery(undefined);
  const totalOrder = user?.role === "admin" ? allOrder : userOrder;
  const stats = getOrderStats(totalOrder!);
  const chartData = getChartData(totalOrder!);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper className={classes.statBox}>
            <Avatar alt={user?.name} sx={{ width: 56, height: 56, mb: 2 }} />
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>

            {/* <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              Change Password
            </Button> */}
            {/* <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
              Newsletter
            </Button>
            <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
              Privacy Settings
            </Button>*/}
            <Button
              onClick={() => {
                dispatch(logOut());
                navigate("/");
              }}
              fullWidth
              color="error"
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Stats Grid */}
          <Grid container spacing={2}>
            {Object.entries(stats).map(([key, value]) => (
              <Grid item xs={6} sm={4} lg={3} key={key}>
                <Paper className={classes.statBox}>
                  <Typography variant="body2" color="textSecondary">
                    {key}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Chart */}
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            <LineChart
              width={isMobile ? 300 : 600}
              height={200}
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#2196f3" />
            </LineChart>
          </Paper>

          {/* Orders Table */}
          {/* <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Latest Orders
            </Typography>
            <TableContainer>
              <Table>
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell>
                        <span
                          className={
                            order.status === "Completed"
                              ? classes.statusCompleted
                              : classes.statusPending
                          }
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

// Sample props
CustomerDashboard.defaultProps = {
  userData: {
    name: "Ethan Jones",
    email: "ethan.jones@abc.com",
  },
  stats: {
    "Total Orders": 10,
    Wishlist: 20,
    Credits: 100,
    "Return Requests": 1,
    Transactions: 50,
    Delivered: 9,
  },
  orders: [
    { id: 401, products: 1, status: "Completed", total: 50, date: "12/01" },
    { id: 402, products: 1, status: "Pending", total: 80, date: "20/01" },
  ],
  chartData: [
    { date: "Jan", amount: 50 },
    { date: "Feb", amount: 80 },
    { date: "Mar", amount: 120 },
    { date: "Apr", amount: 90 },
  ],
};

export default CustomerDashboard;
