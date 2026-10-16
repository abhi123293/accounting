
import { jsPDF } from "jspdf";

export type InvoicePDF = {
  invoiceNumber: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  status: string;
  amountPaid?: number;
  balanceDue?: number;
};

const money = (amount: number) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const dateText = (value: string) => value || "-";

export function generateInvoicePDF(invoice: InvoicePDF) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const left = 16;
  const right = pageWidth - 16;
  const contentWidth = right - left;
  const amountPaid = Math.max(0, invoice.amountPaid ?? 0);
  const balanceDue = Math.max(
    0,
    invoice.balanceDue ?? invoice.total - amountPaid
  );

  const blue: [number, number, number] = [37, 79, 160];
  const dark: [number, number, number] = [31, 41, 55];
  const muted: [number, number, number] = [100, 116, 139];
  const light: [number, number, number] = [241, 245, 249];
  const border: [number, number, number] = [219, 226, 235];

  const status = invoice.status
    .replaceAll("_", " ")
    .toUpperCase();

  let y = 18;

  // Header
  pdf.setFillColor(...blue);
  pdf.roundedRect(left, y, 11, 11, 2, 2, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("L", left + 5.5, y + 7.4, { align: "center" });

  pdf.setTextColor(...dark);
  pdf.setFontSize(20);
  pdf.text("LedgerFlow", left + 16, y + 7.5);

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...muted);
  pdf.text("ACCOUNTING SUITE", left + 16, y + 12);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(17);
  pdf.setTextColor(...blue);
  pdf.text("INVOICE", right, y + 5, { align: "right" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...muted);
  pdf.text(`Status: ${status}`, right, y + 11, {
    align: "right",
  });

  y += 23;
  pdf.setDrawColor(...border);
  pdf.line(left, y, right, y);
  y += 10;

  // Invoice metadata
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(...muted);
  pdf.text("INVOICE NUMBER", left, y);
  pdf.text("ISSUE DATE", 112, y);
  pdf.text("DUE DATE", 153, y);

  y += 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(...dark);
  pdf.text(
    pdf.splitTextToSize(invoice.invoiceNumber || "-", 83)[0],
    left,
    y
  );
  pdf.setFont("helvetica", "normal");
  pdf.text(dateText(invoice.issueDate), 112, y);
  pdf.text(dateText(invoice.dueDate), 153, y);

  y += 12;

  // Customer card
  pdf.setFillColor(...light);
  pdf.roundedRect(left, y, contentWidth, 26, 2, 2, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(...muted);
  pdf.text("BILLED TO", left + 5, y + 7);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(...dark);

  const customerLines = pdf.splitTextToSize(
    invoice.customerName || "Customer",
    contentWidth - 10
  );
  pdf.text(customerLines.slice(0, 2), left + 5, y + 14);

  y += 36;

  // Table header
  const descriptionX = left + 4;
  const qtyX = 126;
  const rateX = 157;
  const amountX = right - 4;
  const descriptionWidth = 88;

  const drawTableHeader = () => {
    pdf.setFillColor(...blue);
    pdf.roundedRect(left, y, contentWidth, 10, 1.5, 1.5, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text("DESCRIPTION", descriptionX, y + 6.5);
    pdf.text("QTY", qtyX, y + 6.5, { align: "right" });
    pdf.text("UNIT PRICE", rateX, y + 6.5, {
      align: "right",
    });
    pdf.text("AMOUNT", amountX, y + 6.5, {
      align: "right",
    });

    y += 10;
  };

  drawTableHeader();

  // Invoice items
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...dark);

  for (const item of invoice.items) {
    const lines = pdf.splitTextToSize(
      item.description || "-",
      descriptionWidth
    );
    const rowHeight = Math.max(11, lines.length * 4.5 + 5);

    if (y + rowHeight > pageHeight - 45) {
      pdf.addPage();
      y = 18;
      drawTableHeader();
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(...dark);
    }

    pdf.text(lines, descriptionX, y + 6);
    pdf.text(String(item.quantity), qtyX, y + 6, {
      align: "right",
    });
    pdf.text(money(item.unitPrice), rateX, y + 6, {
      align: "right",
    });
    pdf.text(money(item.lineTotal), amountX, y + 6, {
      align: "right",
    });

    y += rowHeight;
    pdf.setDrawColor(...border);
    pdf.line(left, y, right, y);
  }

  // Keep totals together on a new page if needed
  if (y + 62 > pageHeight - 18) {
    pdf.addPage();
    y = 20;
  } else {
    y += 8;
  }

  // Totals panel
  const totalsX = 103;
  const totalsWidth = right - totalsX;

  pdf.setFillColor(248, 250, 252);
  pdf.roundedRect(
    totalsX,
    y,
    totalsWidth,
    48,
    2,
    2,
    "F"
  );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...muted);
  pdf.text("Subtotal", totalsX + 5, y + 9);
  pdf.text(money(invoice.subtotal), right - 5, y + 9, {
    align: "right",
  });

  pdf.text(`Tax (${invoice.taxRate}%)`, totalsX + 5, y + 17);
  pdf.text(money(invoice.tax), right - 5, y + 17, {
    align: "right",
  });

  pdf.setDrawColor(...border);
  pdf.line(totalsX + 5, y + 22, right - 5, y + 22);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(...blue);
  pdf.text("TOTAL", totalsX + 5, y + 30);
  pdf.text(money(invoice.total), right - 5, y + 30, {
    align: "right",
  });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...dark);
  pdf.text("Amount paid", totalsX + 5, y + 37);
  pdf.text(money(amountPaid), right - 5, y + 37, {
    align: "right",
  });

  pdf.setFont("helvetica", "bold");
  pdf.text("Balance due", totalsX + 5, y + 43.5);
  pdf.text(money(balanceDue), right - 5, y + 43.5, {
    align: "right",
  });

  y += 58;

  // Footer: avoid overlapping the totals or item table
  if (y > pageHeight - 20) {
    pdf.addPage();
    y = 20;
  }

  pdf.setDrawColor(...border);
  pdf.line(left, y, right, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...muted);
  pdf.text(
    "Thank you for your business.",
    left,
    y + 7
  );
  pdf.text(
    "Generated by LedgerFlow Accounting Suite",
    right,
    y + 7,
    { align: "right" }
  );

  // Page numbers
  const pageCount = pdf.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    pdf.setPage(page);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...muted);
    pdf.text(
      `Page ${page} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 7,
      { align: "center" }
    );
  }

  pdf.save(`${invoice.invoiceNumber || "invoice"}.pdf`);
}
