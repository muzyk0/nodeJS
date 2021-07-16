const { writeJsonToFile, readJsonToFile } = require("./fs-utilt");

// const getUsers = () => {
//     return users;
// };
const getUsers = () => {
    return readJsonToFile("users.json");
};
const addUser = async (name) => {
    let users = await getUsers();
    users.push({ name });

    writeJsonToFile("users.json", users);
};

exports.addUser = addUser;
exports.getUsers = getUsers;
