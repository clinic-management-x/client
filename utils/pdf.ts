import jsPDF from "jspdf";
import path from "path";

export const generateBarcodePdf = (
  urls: string[],
  width: number,
  height: number,
  pageNumber: number
) => {
  const pdf = new jsPDF();
  var img = new Image();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const xPos = (pageWidth - width) / 2;
  let yPos = 10;

  urls.map((url, index) => {
    img.src = path.resolve(url);

    if (yPos + height > pageHeight) {
      pdf.addPage();
      yPos = 10;
    }
    pdf.addImage(img, "png", xPos, yPos, width, height, "", "FAST");
    yPos += height + 10;
  });

  pdf.save(`barcode_sticker page ${pageNumber}.pdf`);
};
