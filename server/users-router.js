const { getUsers, addUser } = require("./repository");

const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

router.get("/", async (req, res) => {
    let users = await getUsers();

    const search = req.query.search.toLowerCase();

    if (!!search) {
        users = users.filter((u) => u.name.toLowerCase().indexOf(search) > -1);
    }

    res.send(users);
});

router.get("/:id", async (req, res) => {
    const userId = parseInt(req.params.id);

    const users = await getUsers();
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404);
        res.send({ status: "User not found" });
    }
});

router.post("/", async (req, res) => {
    const name = req.body.name;
    const result = await addUser(name);
    res.send({ success: true });
});

module.exports = router;
