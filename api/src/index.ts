import { ILocutions } from "./types";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cheerio from "cheerio";
import axios from "axios";

require("dotenv").config();

const app: express.Application = express();
const PORT = process.env.SERVER_PORT;

app.use(helmet());
if (process.env.NODE_ENV == "development") app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  const q = Number(req.query.q) || 10;
  axios
    .get("https://es.wikipedia.org/wiki/Anexo:Locuciones_latinas")
    .then((r) => {
      let $ = cheerio.load(r.data);
      let locutions: Array<ILocutions> = [];
      $("table.wikitable tbody tr").each((_, el) => {
        let values = $(el).children("td").toArray();
        locutions.push({
          locution: $(values[0]).text().replace("\n", ""),
          meaning: $(values[1]).text().replace("\n", ""),
        });
      });
      res.json({
        locutions: locutions.slice(1, q + 1),
      });
    });
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV == "development")
    console.log(`Listening in port: ${PORT}`);
});
