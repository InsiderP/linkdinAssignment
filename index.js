require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const app = express();
const cors = require("cors");
const allRoutes = require("./routes/allRoutes");

const corsOptions = {
  origin: ["*"],
  credentials: true,
};
// app.use(morgan("tiny"));

app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(express.json());
app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log(`Server listening on port ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});
