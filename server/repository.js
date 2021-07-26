const { writeJsonToFile, readJsonToFile } = require("./fs-utilt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
});

const User = mongoose.model("user", userSchema);

const getUsers = (search) => {
    if (search) {
        return User.find({ name: new RegExp(search) });
    }
    return User.find();
};

const getUser = (id) => {
    return User.find({ _id: id });
};

const deleteUser = async (id) => {
    return User.deleteOne({ _id: id });
};

const updateUser = async (id, name) => {
    return User.updateOne({ _id: id }, { name });
};

const addUser = async (name) => {
    const user = new User({ name });
    return user.save().then();

    // let users = await getUsers();
    // users.push({ name, id: users[users.length - 1].id + 1 });
    // try {
    //     await writeJsonToFile("users.json", users);
    // } catch (e) {
    //     throw new Error(e);
    // }
};

exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
