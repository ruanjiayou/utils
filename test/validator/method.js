const assert = require('assert');
const Validator = require('../../lib/validator');

describe('validator测试:', function () {
    it('新增methods验证方法', function () {
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
                'other': 'required|methods:fn1,fn2',
                'money': 'float|range:[12.23, 100]'
            },
            methods: {
                fn1: function(v){
                    return /^\d+$/.test(v);
                },
                fn2: function(v){
                    return v.length <= 6;
                }
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
            other: '1234a',
            money: '122.5',
            hex: 'sql'
        });
        console.log(v1.rules, 'rules');
        console.log(input, 'input');
        try {
            v1.check(input);
        } catch(err){
            console.log(err);
        }
    });
});