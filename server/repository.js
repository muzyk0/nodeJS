const { writeJsonToFile, readJsonToFile } = require("./fs-utilt");

// const getUsers = () => {
//     return users;
// };
const getUsers = () => {
    return readJsonToFile("users.json");
};
const addUser = async (name) => {
    let users = await getUsers();
    users.push({ name, id: users[users.length - 1].id + 1 });
    try {
        await writeJsonToFile("users.json", users);
    } catch (e) {
        throw new Error(e);
    }
};

exports.addUser = addUser;
exports.getUsers = getUsers;
