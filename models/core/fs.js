const fs = require('fs');
const path = require('path');

const fsOptions = {
    encoding: 'utf-8'
};

function readFile(fileName, options = fsOptions) {
    if (!fs.existsSync(fileName)) {
        console.log(`file ${fileName} doesn't exist`);
        return;
    }

    const data = fs.readFileSync(fileName, fsOptions);
    const dataArray = data.split('\n');

    return dataArray;
}

function writeFile(dataArray, fileName, rootDir = '') {
    if (rootDir && !fs.existsSync(rootDir)) {
        fs.mkdirSync(rootDir);
    }

    const dataString = dataArray.join('\n');
    const filePath = path.join(rootDir, fileName);

    fs.writeFileSync(filePath, dataString);
}

module.exports = {
    readFile,
    writeFile
}
