const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const bfhlRoute = require("./routes/bfhl");

app.get("/", (req, res) => {
    res.send("Bajaj Assignment Backend is Running 🚀");
});

app.use("/bfhl", bfhlRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});