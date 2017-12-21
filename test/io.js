const _ = require('../lib/_');
const assert = require('assert');
const IO = require('../lib/IO');

const ts = new Date().getTime();

describe('测试IO操作', function () {
    it('存在性检测', function () {
        if (IO.isDirExists('d:/')) {
            let t1 = IO.isDirExists('u:/');
            assert.strictEqual(t1, false);
            let t2 = IO.isDirExists('d:/');
            assert.strictEqual(t2, true);
            let t3 = IO.isDirExists('d:/test/');
            assert.strictEqual(t3, false);
            let t4 = IO.isFileExists('d:/test.html');
            assert.strictEqual(t4, true);
            let t5 = IO.isFileExists('d:/bug.js');
            assert.strictEqual(t5, false);
        } else {
            console.log('目录不存在?');
        }
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
});