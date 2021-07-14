const users = [
    { id: 1, name: "Sasha" },
    { id: 2, name: "Viktor" },
];

const getUsers = () => {
    return users;
};
const addUser = (name) => {
    users.push({ name });
};

exports.addUser = addUser;
exports.getUsers = getUsers;
