import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagementApi";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrderTable } from "@/types/orderType";
import { verifyToken } from "@/utils/verifyToken";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { columns } from "../Order Table/gridData";

export default function CustomizedDataGrid() {
  const products: TOrderTable[] = [];
  const { data: userOrder } = useGetUserOrdersQuery(undefined);
  const { data: allOrder } = useGetAllOrdersQuery(undefined);
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  console.log(userOrder);

  if (user?.role === "admin") {
    allOrder?.map((order) => {
      const eachOrder: TOrderTable = {
        id: order?._id,
        productName: order?.product?.name,
        productPrice: order?.product?.price,
        orderBy: order?.user.name,
        customerEmail: order?.user.email,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        orderDate: order.createdAt,
        status: order.status,
        payment: order.payment,
        transaction: order.transaction ? order.transaction.id : null,
      };
      products.push(eachOrder);
    });
  } else {
    userOrder?.map((order) => {
      const eachOrder: TOrderTable = {
        id: order?._id,
        productName: order?.product?.name,
        productPrice: order?.product?.price,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        orderDate: order.createdAt,
        status: order.status,
        payment: order.payment,
        transaction: order.transaction ? order.transaction.id : null,
      };
      products.push(eachOrder);
    });
  }
  const rows: GridRowsProp = products;
  return (
    <DataGrid
      sx={{ width: "100%" }}
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
