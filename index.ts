import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
const cors = require("cors");

type GateCommand = {
  gateIP: string;
  command: string;
  localhostPort: number;
};

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/gate", async (req: Request<GateCommand>, res: Response) => {
  console.log("############# start", req.body, req.headers.authorization);
  const bodyObject = req.body;

  if (!bodyObject?.gateIP) return res.send("no gateIP");
  if (!bodyObject?.command) return res.send("no command");
  if (!req.headers.authorization) return res.send("no authorization");
  await fetch(
    `http://${bodyObject.gateIP}/cdor.cgi?open=${bodyObject.command}`,
    {
      method: "GET",
      headers: {
        Authorization: req.headers.authorization,
      },
    }
  );
  console.log("############# success");
  return res.send("success");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
