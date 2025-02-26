/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";

function renderStatus(status: "Pending" | "Paid" | "Failed" | "Cancelled") {
  const colors: {
    [index: string]: "success" | "default" | "warning" | "error";
  } = {
    Paid: "success", // Green for successful payments
    Pending: "warning", // Yellow for pending status
    Failed: "error", // Red for failed transactions
    Cancelled: "default", // Gray for cancelled orders
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>
) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  {
    field: "status",
    headerName: "Status",
    flex: 1.5,
  },
  {
    field: "productName",
    headerName: "Product Name",
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "quantity",
    headerName: "Quntity",
    flex: 0.5,
    minWidth: 80,
  },
  {
    field: "productPrice",
    headerName: "Unit Price",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "payment",
    headerName: "Payment Status",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "transaction",
    headerName: "Transaction ID",
    flex: 1,
    minWidth: 150,
  },
];

export const newColumForAdmin: GridColDef[] = [
  {
    field: "orderBy",
    headerName: "Customer Name",
    flex: 1.5,
  },
  {
    field: "customerEmail",
    headerName: "Customer Email",
    flex: 1.5,
  },
  {
    field: "productName",
    headerName: "Product Name",
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "quantity",
    headerName: "Quntity",
    flex: 0.5,
    minWidth: 80,
  },
  {
    field: "productPrice",
    headerName: "Unit Price",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "payment",
    headerName: "Payment Status",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "transaction",
    headerName: "Transaction ID",
    flex: 1,
    minWidth: 150,
  },
];
// export const rows : GridRowsProp = []
