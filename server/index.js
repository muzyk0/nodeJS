const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./users-router");
const mongoose = require("mongoose");

const PORT = 3001;
const serverUrl = "mongodb://localhost/nodeJS-monorepo";

mongoose.connect(serverUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connction error"));
db.once("open", () => {});

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/users", router);

app.get("/tasks", async (req, res) => {
    res.send("tasks");
});

app.use((req, res) => {
    res.status(404);
    res.send({ status: "Some error occured!" });
});

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
});
