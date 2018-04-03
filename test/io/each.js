const IO = require('../../lib/io');
const path = require('path');
const fs = require('fs');
console.log(path.normalize('D:\\WebSite\\spider.js\\acg.fi/images/295'));
IO.moveFile('d:/deletethistostop.txt', 'd:/MyApp/deletethistostop.txt')
IO.eachAsync(
    'D:/tinyEngine-master/resources/image',
    async function (filepath) {
        console.log(`filename:${filepath}`);
        console.log(IO.extension(filepath));
        let info = fs.statSync(filepath);
        console.log(info);
    },
    async function (filepath) {
        return IO.isExtension(filepath, ['png', 'jpg', 'bmp', 'jpeg', 'gif']);
    }
);