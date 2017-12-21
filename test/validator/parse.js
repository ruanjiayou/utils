const assert = require('assert');
const Validator = require('../../lib/validator');

describe('validator测试:', function () {
    it('parse()', function () {
        let v1 = new Validator({
            rules: {
                'search': 'nullable | string | min:1',
                'id': 'required',
                'isApproved': 'boolean',
                'status': 'in: pending, success, failed',
                'time': 'date',
                'url': 'url',
                'email': 'email',
                'people': 'int|range:(5,10)',
                'money': 'float|range:[12.23, 100]'
            }
        });
        let input = v1.filter({
            search: 'test',
            id: '1',
            isApproved: 'true',
            status: 'pending',
            time: '2017-12-19',
            url: 'http://momentjs.cn/docs/#/parsing/',
            email: '1439120442@qq.com',
            people: 6,
            money: '122.5',
            hex: 'sql'
        });
        assert.deepEqual(v1.check(input),{
            search: 'test',
            id: '1',
            isApproved: true,
            status: 'pending',
            time: '2017-12-18T16:00:00.000Z',
            url: 'http://momentjs.cn/docs/#/parsing/',
            email: '1439120442@qq.com',
            people: 6,
            money: 122.5
        });
    });
});