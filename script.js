import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import QRCode from "qrcode";

const PORT = 3500;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let datax;

app.get("/get", (req, res) => {
  res.send(datax);
});

app.post("/getString", (req, res) => {
  const reqStringData = req.body.text;
  QRCode.toString(
    reqStringData,
    {
      errorCorrectionLevel: "H",
      type: "svg",
    },
    (err, data) => {
      if (err) throw err;
      console.log(data);
      datax = data;
      res.send({
        status: true,
        message: "Data Recieved!",
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Working on PORT ${PORT}`);
});
