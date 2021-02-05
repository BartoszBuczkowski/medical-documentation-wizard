import ejs from "ejs";
import { Request, Response } from "express";

import pdf, { CreateOptions } from "html-pdf";
import path from "path";
import dayjs from "dayjs";

const options: CreateOptions = {
  format: "A4",
  orientation: "portrait",
  header: {
    height: "20mm",
  },
  footer: {
    height: "20mm",
  },
};

export interface GeneratorSchema {
  list: {
    name: string;
    email: string;
    city: string;
    country: string;
  }[];
}

export default function (req: Request<GeneratorSchema>, res: Response) {
  const docPath = path.join(__dirname, "../templates/", "doc.ejs");
  ejs.renderFile(docPath, { data: req.body.list }, (err, data) => {
    if (err) {
      return res.send(err);
    }

    const createdAt = dayjs().format("DD-MM-YYYY_HH-mm_ss");

    pdf.create(data, options).toFile(`./docs/${createdAt}.pdf`, () => {
      if (err) {
        return res.send(err);
      }

      res.send(`File created successfully: ${createdAt}`);
    });
  });
}
