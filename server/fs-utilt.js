const fs = require("fs");

exports.readJsonToFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, buf) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            resolve(JSON.parse(buf.toString()));
        });
    });
};

exports.writeJsonToFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            resolve("Successfully Written to File.");
        });
    });
};
