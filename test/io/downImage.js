const IO = require('../../lib/io');
const assert = require('assert');

describe('测试下载图片:', function () {
    it('downImage', async function () {
        // 2017-12-20 22:42:29
        await IO.downImage(
            'http://e.hiphotos.baidu.com/news/w=638/sign=85fd95fdb83533faf5b6902d90d2fdca/c2fdfc039245d688481aae57adc27d1ed21b242c.jpg',
            'D:/',
            function (err, res) {
                if (err) {
                    console.log(`error:${err.message}`);
                } else {
                    assert.equal('D:/', res.dir);
                }
            }
        );
    });
});