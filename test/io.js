const _ = require('../lib/_');
const assert = require('assert');
const IO = require('../lib/IO');

const ts = new Date().getTime();

describe('测试IO操作', function () {
    it('存在性检测', function () {
        assert.equal(false, IO.isDirExists('u:/'));
        assert.equal(true, IO.isDirExists('d:/'));
        assert.equal(true, IO.isFileExists('d:/abc.log'));
        assert.equal(false, IO.isFileExists('d:/abcd.log'));
    });
    let txt = 'D:/test.html';
    it('同步读写文件', function () {
        if (IO.isDirExists('d:/')) {
            IO.writeTxt(txt, 'abc');
            let str = IO.readTxt(txt);
            assert.strictEqual(str, 'abc');

            IO.addTxt(txt, '123');
            str = IO.readTxt(txt);
            assert.strictEqual(str, 'abc123');
        } else {
            console.log('目录不存在?');
        }
    });
});


describe('测试字数统计', function () {
    it('测试数字', function () {
        let str = '0123456789';
        let res = IO.count(str);
        assert.strictEqual(res.num, 10);
    });
    it('测试英文', function () {
        let str = 'abcdefghijklmnopqrstuvwXyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let res = IO.count(str);
        assert.strictEqual(res.english, 52);
    });
    it('测试中文', function () {
        let str = '阮家友';
        let res = IO.count(str);
        assert.strictEqual(res.chinese, 3);
    });
    it('混合测试', function () {
        let str = '0123456789abcdefghijklmnopqrstuvwXyzABCDEFGHIJKLMNOPQRSTUVWXYZ阮家友，。、‘’“”：【】！？';
        let res = IO.count(str);
        assert.strictEqual(res.num, 10);
        assert.strictEqual(res.english, 52);
        assert.strictEqual(res.chinese, 3);
        assert.strictEqual(res.punctuation, 12);
        assert.strictEqual(res.bytes, 92);
    });

    it('clearEmpty', function () {
        IO.clearEmptyFolder('d:/test');
    })
});