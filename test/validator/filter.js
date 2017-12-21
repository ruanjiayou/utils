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
});