const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
} = require("./repository");

const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

router.get("/", async (req, res) => {
    if (!!req.query.search) {
        const search = req.query.search;

        let users = await getUsers(search);

        res.send(users);
        return;
    }

    let users = await getUsers();

    res.send(users);
});

router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    const user = await getUser(userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404);
        res.send({ status: "User not found" });
    }
});

router.post("/", async (req, res) => {
    const name = req.body.name;
    await addUser(name);
    res.send({ success: true });
});

router.put("/", async (req, res) => {
    const userId = req.body.id;
    const name = req.body.name;

    await updateUser(userId, name);
    res.send({ success: true });
});

router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    const result = await deleteUser(userId);
    if (result.n) {
        res.send({ success: true, result });
        res.status(204);
    } else {
        res.status(404);
        res.send({ success: false, result });
    }
});

module.exports = router;
