import express, { Request } from "express";
import generator, { GeneratorSchema } from "./generator";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/generate-file", (req: Request<GeneratorSchema>, res) => {
  // tslint:disable-next-line:no-console
  console.log(req.body);
  generator(req, res);
});

app.listen(3000);
