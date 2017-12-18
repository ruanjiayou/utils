const assert = require('assert');
const Validator = require('../lib/validator');

describe('validator测试:', function(){
    it('isID:(是否是身份证)', function(){
        let id1 = new Validator().isID('421224199301146110');
        let id2 = new Validator().isID('421224199301146112');
        let id3 = new Validator().isID('421224199301146113');
        let id4 = new Validator().isID('421224199301146114');
        let id5 = new Validator().isID('421224199301146115');
        let id6 = new Validator().isID('421224199301146116');
        let id7 = new Validator().isID('421224199301146117');
        let id8 = new Validator().isID('421224199301146118');
        let id9 = new Validator().isID('421224199301146119');
        let idX = new Validator().isID('42122419930114611X');
        assert.equal(id1, true);
        assert.equal(id2, false);
        assert.equal(id3, false);
        assert.equal(id4, false);
        assert.equal(id5, false);
        assert.equal(id6, false);
        assert.equal(id7, false);
        assert.equal(id8, false);
        assert.equal(id9, false);
        assert.equal(idX, false);
    });
    it('isCredit:(是否是银行卡)', function(){
        let c1 = new Validator().isCredit('6212264000053084147')
        assert.equal(c1, true);
    });
});