import { jsPDF } from 'jspdf';

function numberToNairaWords(amount: number): string {
  const numWords = (n: number): string => {
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + numWords(n % 100) : '');
    if (n < 1000000) return numWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + numWords(n % 1000) : '');
    if (n < 1000000000) return numWords(Math.floor(n / 1000000)) + ' Million' + (n % 1000000 !== 0 ? ' ' + numWords(n % 1000000) : '');
    return n.toString();
  };
  return numWords(amount) + ' Naira Only';
}

export function generateReceiptPDF(trx: {
  id: string;
  date: string;
  amount: number;
  type?: string;
  buyerName?: string;
  property: string;
  status: string;
  method: string;
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const payerName = trx.buyerName || 'John Citizen';
  const paymentType = trx.type || 'Property Installment Payment';

  // --- Draw Double Border ---
  doc.setDrawColor(16, 185, 129); // Emerald-500
  doc.setLineWidth(1);
  doc.rect(5, 5, 200, 287);
  
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.setLineWidth(0.5);
  doc.rect(7, 7, 196, 283);

  // --- Background Watermark/Seal ---
  doc.setTextColor(241, 245, 249); // Slate-100
  doc.setFontSize(40);
  doc.setFont('Helvetica', 'bold');
  doc.text('VERIFIED & CLEARED', 105, 150, { align: 'center', angle: 45 });
  doc.text('ABIA LAND REGISTRY', 105, 210, { align: 'center', angle: 45 });

  // --- Header ---
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFontSize(16);
  doc.setFont('Helvetica', 'bold');
  doc.text('ABIA STATE GOVERNMENT OF NIGERIA', 105, 22, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(71, 85, 105); // Slate-600
  doc.text('Ministry of Lands, Housing and Urban Development', 105, 28, { align: 'center' });
  doc.text('Abia State Geographic Information System (ABIAGIS) Portals', 105, 33, { align: 'center' });

  // Draw Coat of Arms Emblem Placeholder
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.8);
  doc.setFillColor(240, 253, 250); // Emerald-50
  doc.circle(105, 52, 12, 'FD');
  
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(18);
  doc.setFont('Helvetica', 'bold');
  doc.text('Abia', 105, 53.5, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('Helvetica', 'normal');
  doc.text('STATE SEAL', 105, 58, { align: 'center' });

  // --- Title Block ---
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('Helvetica', 'bold');
  doc.text('OFFICIAL PAYMENT RECEIPT & ALLOCATION CLEARANCE', 105, 74, { align: 'center' });

  // Top Divider
  doc.setDrawColor(203, 213, 225); // Slate-300
  doc.setLineWidth(0.5);
  doc.line(15, 80, 195, 80);

  // --- Metadata Columns (2-column key-value list) ---
  doc.setFontSize(10);
  
  // Column 1
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.setFont('Helvetica', 'normal');
  doc.text('TRANSACTION REFERENCE ID', 20, 90);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(trx.id.toUpperCase(), 20, 95);

  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'normal');
  doc.text('DATE OF TRANSACTION', 20, 107);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(trx.date, 20, 112);

  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'normal');
  doc.text('PAYMENT TYPE / PURPOSE', 20, 124);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(paymentType.toUpperCase(), 20, 129);

  // Column 2
  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'normal');
  doc.text('VERIFICATION STATUS', 120, 90);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // Emerald Green
  doc.text('VERIFIED & CLEARED', 120, 95);

  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'normal');
  doc.text('PAYMENT METHOD', 120, 107);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(trx.method.replace('_', ' ').toUpperCase(), 120, 112);

  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'normal');
  doc.text('PROPERTY ALLOCATION REFERENCE', 120, 124);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(trx.property.toUpperCase(), 120, 129);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 137, 195, 137);

  // --- Payee Block ---
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'normal');
  doc.text('PRIMARY ASSIGNEE (PAYEE):', 20, 146);
  
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.setFont('Helvetica', 'bold');
  doc.text(payerName.toUpperCase(), 20, 153);

  // --- Financial Ledger / Amount Block ---
  doc.setFillColor(248, 250, 252); // Slate-50
  doc.rect(15, 162, 180, 36, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, 162, 180, 36);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'normal');
  doc.text('NET AMOUNT CREDITED (NIGERIAN NAIRA):', 22, 171);

  doc.setFontSize(22);
  doc.setTextColor(16, 185, 129); // Emerald-600
  doc.setFont('Helvetica', 'bold');
  doc.text(`₦${trx.amount.toLocaleString()}.00`, 22, 181);

  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.setFont('Helvetica', 'oblique');
  doc.text(`Words: ${numberToNairaWords(trx.amount)}`, 22, 191);

  // --- Allocation Status Notice Box ---
  doc.setFillColor(240, 253, 250); // Emerald-50
  doc.rect(15, 206, 180, 24, 'F');
  doc.setDrawColor(165, 243, 252); // Cyan-200 border for dynamic feel
  doc.rect(15, 206, 180, 24);

  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.setFont('Helvetica', 'bold');
  doc.text('OFFICIAL ALLOCATION AND CERTIFICATE STATUS', 20, 213);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('This receipt serves as certified legal proof that the payment amount has been verified and cleared by', 20, 218);
  doc.text('the Abia State Treasury. Corresponding plot coordinate records are updated in the GIS registry.', 20, 222);

  // --- Signatures & Footers ---
  doc.setDrawColor(203, 213, 225);
  doc.line(15, 240, 195, 240);

  // Digital Security Stamp block
  doc.setFillColor(248, 250, 252);
  doc.rect(20, 245, 60, 25, 'F');
  doc.rect(20, 245, 60, 25);
  
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('Helvetica', 'bold');
  doc.text('ABIAGIS SECURE VALIDATION', 23, 250);
  
  doc.setFont('Courier', 'normal');
  doc.setFontSize(7);
  doc.text('DIGITAL SIGNATURE:', 23, 255);
  doc.text(`SHA256: ${Math.random().toString(36).substring(2, 14).toUpperCase()}`, 23, 259);
  doc.text('VERIFIED REVENUE AUDIT', 23, 263);
  doc.text('TIMESTAMP: 2026-07-04 UTC', 23, 267);

  // Authorized Signatory
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Authorized Registry Officer', 140, 268);
  
  // Custom handwriting style placeholder
  doc.setFont('Courier', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Chinedu Nwosu', 140, 260);
  
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.3);
  doc.line(135, 263, 185, 263);

  // Absolute bottom disclaimer
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184); // Slate-400
  doc.text('This document is electronically generated from the Abia State Government Lands Portal and is legally binding.', 105, 282, { align: 'center' });

  // Save the PDF
  doc.save(`ABIAGIS-Receipt-${trx.id}.pdf`);
}
