import { NextApiRequest, NextApiResponse } from "next";

import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const doc = new PDFDocument({ layout: "landscape" });

    const svg = req.body.svg;
    doc.text(`Sociogram: ${req.body.title}`, 20, 20);
    SVGtoPDF(doc, svg, 0, 20);
    res.setHeader("Content-Disposition", "attachment;filename=file.pdf");
    res.setHeader("Content-Type", "application/pdf");
    res.statusCode = 200;
    doc.pipe(res);
    doc.end();
  }
};
