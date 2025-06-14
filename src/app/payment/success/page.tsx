"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { verifyPayment } from "@/services/order";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaDownload, FaPrint } from "react-icons/fa";
import { toast } from "sonner";

interface PaymentSuccessProps {
  order: {
    _id: string;
    items: Array<{
      product: {
        name: string;
        price: number;
        image: string[];
      };
      quantity: number;
      price: number;
    }>;
    totalPrice: number;
    shippingAddress: {
      fullName: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
      phone: string;
    };
    payment: {
      method: string;
      status: string;
      transaction: {
        id: string;
        amount: number;
        currency: string;
        paidAt: string;
      };
    };
    createdAt: string;
  };
}

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<PaymentSuccessProps["order"] | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(searchParams);

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const tran_id = searchParams.get("tran_id");
        console.log("Transaction ID:", tran_id);

        if (!tran_id) {
          console.error("No transaction ID found in URL");
          toast.error("Invalid payment verification");
          router.push("/");
          return;
        }

        const response = await verifyPayment(tran_id);
        console.log("Payment verification response:", response);

        if (response?.data) {
          setOrder(response.data);
        } else {
          throw new Error("No order data received");
        }
      } catch (err) {
        console.error("Payment verification failed:", err);
        toast.error("Failed to verify payment");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    verifyOrder();
  }, [searchParams, router]);

  const handleDownloadInvoice = () => {
    if (!order) return;

    // Create new PDF document
    const doc = new jsPDF();

    // Add company logo (if you have one)
    // doc.addImage(logo, 'PNG', 10, 10, 30, 30);

    // Add header
    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Order #${order._id}`, 105, 30, { align: "center" });
    doc.text(`Date: ${format(new Date(order.createdAt), "PPP")}`, 105, 40, {
      align: "center",
    });

    // Add shipping address
    doc.setFontSize(12);
    doc.text("Shipping Address:", 20, 60);
    doc.setFontSize(10);
    doc.text(order.shippingAddress.fullName, 20, 70);
    doc.text(order.shippingAddress.address, 20, 75);
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`,
      20,
      80
    );
    doc.text(order.shippingAddress.country, 20, 85);
    doc.text(`Phone: ${order.shippingAddress.phone}`, 20, 90);

    // Add items table
    const tableData = order.items.map((item) => [
      item.product.name,
      item.quantity.toString(),
      `${item.price.toFixed(2)} ${order.payment.transaction.currency}`,
      `${(item.price * item.quantity).toFixed(2)} ${
        order.payment.transaction.currency
      }`,
    ]);

    autoTable(doc, {
      startY: 100,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Add payment details
    const finalY =
      (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY || 150;
    doc.setFontSize(12);
    doc.text("Payment Details:", 20, finalY + 10);
    doc.setFontSize(10);
    doc.text(
      `Total Amount: ${order.totalPrice.toFixed(2)} ${
        order.payment.transaction.currency
      }`,
      20,
      finalY + 20
    );
    doc.text(
      `Payment Method: ${order.payment.method.toUpperCase()}`,
      20,
      finalY + 25
    );
    doc.text(
      `Transaction ID: ${order.payment.transaction.id}`,
      20,
      finalY + 30
    );
    doc.text(
      `Payment Date: ${format(
        new Date(order.payment.transaction.paidAt),
        "PPP"
      )}`,
      20,
      finalY + 35
    );

    // Save the PDF
    doc.save(`invoice-${order._id}.pdf`);
  };

  const handlePrintInvoice = () => {
    if (!order) return;

    // Create new PDF document
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Order #${order._id}`, 105, 30, { align: "center" });
    doc.text(`Date: ${format(new Date(order.createdAt), "PPP")}`, 105, 40, {
      align: "center",
    });

    // Add shipping address
    doc.setFontSize(12);
    doc.text("Shipping Address:", 20, 60);
    doc.setFontSize(10);
    doc.text(order.shippingAddress.fullName, 20, 70);
    doc.text(order.shippingAddress.address, 20, 75);
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`,
      20,
      80
    );
    doc.text(order.shippingAddress.country, 20, 85);
    doc.text(`Phone: ${order.shippingAddress.phone}`, 20, 90);

    // Add items table
    const tableData = order.items.map((item) => [
      item.product.name,
      item.quantity.toString(),
      `${item.price.toFixed(2)} ${order.payment.transaction.currency}`,
      `${(item.price * item.quantity).toFixed(2)} ${
        order.payment.transaction.currency
      }`,
    ]);

    autoTable(doc, {
      startY: 100,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Add payment details
    const finalY =
      (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY || 150;
    doc.setFontSize(12);
    doc.text("Payment Details:", 20, finalY + 10);
    doc.setFontSize(10);
    doc.text(
      `Total Amount: ${order.totalPrice.toFixed(2)} ${
        order.payment.transaction.currency
      }`,
      20,
      finalY + 20
    );
    doc.text(
      `Payment Method: ${order.payment.method.toUpperCase()}`,
      20,
      finalY + 25
    );
    doc.text(
      `Transaction ID: ${order.payment.transaction.id}`,
      20,
      finalY + 30
    );
    doc.text(
      `Payment Date: ${format(
        new Date(order.payment.transaction.paidAt),
        "PPP"
      )}`,
      20,
      finalY + 35
    );

    // Open PDF in new window for printing
    const pdfWindow = window.open("", "_blank");
    if (pdfWindow) {
      pdfWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice</title>
            <style>
              body { margin: 0; }
              iframe { width: 100%; height: 100vh; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${doc.output("datauristring")}"></iframe>
          </body>
        </html>
      `);
      pdfWindow.document.close();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <div className="text-center mb-8">
            <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Order Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Order ID
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-xs break-all">
                    {order._id}
                  </p>
                </div>
                <div className="min-w-0 overflow-hidden">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Payment Method
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-xs break-all">
                    {order.payment.method.toUpperCase()}
                  </p>
                </div>
                <div className="min-w-0 overflow-hidden">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Transaction ID
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-xs break-all">
                    {order.payment.transaction.id}
                  </p>
                </div>
                <div className="min-w-0 overflow-hidden">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Payment Date
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-xs break-all">
                    {format(new Date(order.payment.transaction.paidAt), "PPP")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Shipping Address
              </h2>
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.shippingAddress.address}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.shippingAddress.country}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Order Summary
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16">
                        <Image
                          src={item.product.image[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toFixed(2)}{" "}
                      {order.payment.transaction.currency}
                    </p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {order.totalPrice.toFixed(2)}{" "}
                      {order.payment.transaction.currency}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleDownloadInvoice}
                className="flex items-center space-x-2"
                variant="outline"
              >
                <FaDownload className="h-5 w-5" />
                <span>Download Invoice</span>
              </Button>
              <Button
                onClick={handlePrintInvoice}
                className="flex items-center space-x-2"
                variant="outline"
              >
                <FaPrint className="h-5 w-5" />
                <span>Print Invoice</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
