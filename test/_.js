const _ = require('../lib/_');
const assert = require('assert');

describe('辅助函数_()单元测试', function () {
    it('type', function () {
        assert.strictEqual(_.isFunction(function () { }), true);
        assert.strictEqual(_.isFunction(new Function()), true);
        assert.strictEqual(_.isArray([]), true);
        assert.strictEqual(_.isArray(new Array()), true);
        assert.strictEqual(_.isString(''), true);
        assert.strictEqual(_.isString(new String()), true);
        assert.strictEqual(_.isDate(new Date()), true);
        assert.strictEqual(_.isNumber(1), true);
        assert.strictEqual(_.isNumber(1e1), true);
        assert.strictEqual(_.isRegExp(/[0-9]+/), true);
        assert.strictEqual(_.isRegExp(new RegExp()), true);
        assert.strictEqual(_.isObject({}), true);
        assert.strictEqual(_.isObject([]), true);
        assert.strictEqual(_.isObject(null), true);
        assert.strictEqual(_.isBoolean(true), true);
        assert.strictEqual(_.isBoolean(false), true);
        assert.strictEqual(_.isNull(null), true);
        assert.strictEqual(_.isUndefined(undefined), true);
        assert.strictEqual(_.isNil(null), true);
        assert.strictEqual(_.isNil(undefined), true);
        assert.strictEqual(_.isNaN(NaN), true);
    });
    it('keys()', function () {
        var res1 = _.keys({ a: 1, b: 2 });
        var res2 = _.keys('123');
        assert.strictEqual(res1[0], 'a');
        assert.strictEqual(res1[1], 'b');
        assert.strictEqual(res2[0], '0');
        assert.strictEqual(res2[1], '1');
        assert.strictEqual(res2[2], '2');
    });
    it('pick()', function () {
        var t = {
            a: 1,
            b: 2,
            c: 3
        };
        var res1 = _.pick(t, ['a', 'c']);
        assert.strictEqual(res1.a, 1);
        assert.strictEqual(res1.b, undefined);
        var res2 = _.pick(t, { a: 'required', b: 'required' });
        assert.strictEqual(res2.a, 1);
        assert.strictEqual(res2.c, undefined);
    });
    it('isEmptyObject()', function () {
        assert.strictEqual(_.isEmptyObject(NaN), true);
        assert.strictEqual(_.isEmptyObject(false), true);
        assert.strictEqual(_.isEmptyObject(null), true);
        assert.strictEqual(_.isEmptyObject(undefined), true);
        assert.strictEqual(_.isEmptyObject([]), true);
        assert.strictEqual(_.isEmptyObject({}), true);
        assert.strictEqual(_.isEmptyObject(''), true);
        assert.strictEqual(_.isEmptyObject('12'), false);
        assert.strictEqual(_.isEmptyObject(new Object()), true);
        assert.strictEqual(_.isEmptyObject(0), true);
        assert.strictEqual(_.isEmptyObject(1), true);
        assert.strictEqual(_.isEmptyObject(new Date()), false);
        assert.strictEqual(_.isEmptyObject({ a: 18 }), false);
    });
});