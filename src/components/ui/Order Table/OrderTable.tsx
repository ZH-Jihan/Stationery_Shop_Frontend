import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TOrder, TOrderTable } from "@/types/orderType";
import { verifyToken } from "@/utils/verifyToken";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { columns } from "../Order Table/gridData";
import { newColumForAdmin } from "./gridData";

export default function OrderTable({ order }: { order: TOrder[] | undefined }) {
  const products: TOrderTable[] = [];

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  if (user?.role === "admin") {
    order?.map((order) => {
      const eachOrder: TOrderTable = {
        id: order?._id,
        productName: order?.product?.name,
        productPrice: order?.product?.price,
        orderBy: order?.user?.name,
        customerEmail: order?.user?.email,
        quantity: order?.quantity,
        totalPrice: order?.totalPrice,
        orderDate: order?.createdAt,
        status: order?.status,
        payment: order?.payment,
        transaction: order?.transaction ? order?.transaction?.id : null,
      };
      products.push(eachOrder);
    });
  } else {
    order?.map((order) => {
      const eachOrder: TOrderTable = {
        id: order?._id,
        productName: order?.product?.name,
        productPrice: order?.product?.price,
        quantity: order?.quantity,
        totalPrice: order?.totalPrice,
        orderDate: order?.createdAt,
        status: order?.status,
        payment: order?.payment,
        transaction: order?.transaction ? order?.transaction?.id : null,
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
      columns={user?.role === "admin" ? newColumForAdmin : columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
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
