import { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import fs from "fs";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return new Promise<void>((resolve) => {
      const doc = new PDFDocument({ layout: "landscape" });
      const stream = fs.createWriteStream("file.pdf");
      const svg = req.body.svg;
      doc.text(`Sociogram: ${req.body.title}`, 20, 20);
      SVGtoPDF(doc, svg, 0, 20);
      stream.on("finish", function () {
        res.setHeader("Content-Disposition", "attachment;filename=file.pdf");
        res.setHeader("Content-Type", "application/pdf");
        res.statusCode = 200;
        res.send(fs.readFileSync("file.pdf"));
        resolve();
      });

      doc.pipe(stream);
      doc.end();
    });
  }
};
