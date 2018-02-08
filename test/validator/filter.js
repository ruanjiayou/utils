const assert = require('assert');
const Validator = require('../../lib/validator');

describe('validator测试filter过滤:', function () {
    it('filter()', function () {
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
        let input = v1.filter({ search: '1', adminId: '2', url: '3' });
        assert.strictEqual(input.search, '1');
        assert.strictEqual(input.adminId, undefined);
        assert.strictEqual(input.url, '3');
        assert.strictEqual(input.status, undefined);
    });
    it('filter() 实际中遇到的问题', function () {
        let v1 = new Validator({
            rules: {
                filename: 'required|string|min:1',
                path: 'required|string',
                size: 'required|int|min:0',
                md5: 'required|string|length:32',
                time: 'required|date',
                status1: 'required|boolean',
                status2: 'required|boolean',
                status3: 'required|boolean',
                status4: 'required|boolean'
            }
        });
        const t = Date.now().toLocaleString();
        let input = v1.filter({
            filename: 'test.png',
            path: 'upload/images/',
            size: 123,
            time: t,
            status1: '0',
            status2: '1',
            status3: 'false',
            status4: 'true',
        });
        assert.deepEqual(input, {
            filename: 'test.png',
            path: 'upload/images/',
            size: 123,
            time: t,
            status1: false,
            status2: true,
            status3: false,
            status4: true,
        });
    });
    it('filter() 2018-2-8 11:56:53', function () {
        let v1 = new Validator({
            rules: {
                'search': 'nullable|string',
                'id': 'nullable|int',
                'name': 'nullable|string',
                'isApproved': 'boolean',
                'status': 'in: pending, success, failed',
                'time': 'date',
                'url': 'url',
                'email': 'email',
                'people': 'int|range:(5,10)',
                'money': 'float|range:[12.23, 100]'
            }
        });
        let input = v1.filter({ search: '', id: 0, name: null });
        assert.strictEqual(input.search, '');
        assert.equal(input.id, '0');
        assert.strictEqual(input.name, null);
    });
});