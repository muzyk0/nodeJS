const { getUsers, addUser } = require("./repository");

exports.usersController = async (req, res) => {
    if (req.method === "POST") {
        const result = await addUser("Lesha");
        res.write(JSON.stringify({ success: true }));
        res.end();
    } else {
        const users = await getUsers();
        res.write(JSON.stringify(users));
        res.end();
    }
};
