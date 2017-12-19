const assert = require('assert');
const Validator = require('../../lib/validator');

describe('validator测试:', function(){
    it('isID:(是否是身份证)', function(){
        const ids = [
            '441624198412027166',
            '410781197612251578',
            '640121197110266394',
            '440701198603034078',
            '511526199110017675',
            '310114198902177984',
            '341022199201028578',
        ];
        ids.forEach(function(v){
            assert.equal(new Validator().isID(v), true);
        });
    });
    it('isCredit:(是否是银行卡)', function(){
        const cards = [
            '6227612145830440',
            '6259655533117715'
        ];
        cards.forEach(function(v){
            assert.equal(new Validator().isCredit(v), true);
        });
    });
    it('isUrl()', function(){
        let u1 = 'https://www.baidu.com/s?wd=nodejs%20assert%E6%96%B9%E6%B3%95&rsv_spt=1&rsv_iqid=0xfbbe6fec00021978&issp=1&f=3&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&oq=assert%25E6%2596%25B9%25E6%25B3%2595&rsv_t=cc5feos7yh9LZVkbxGG3G1hlNTVU9bUX5f50r31P0JyLAU67ndhGTGybKRgK%2Bob93OHi&inputT=1474&rsv_pq=c26916bb0000566c&rsv_sug3=20&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&prefixsug=nodejs%2520assert%25E6%2596%25B9%25E6%25B3%2595&rsp=0&rsv_sug4=3682';
        assert.equal(new Validator().isUrl(u1), true);

    });
    it('isDate()', function(){
        let u1 = '2017-12-19 21:59:58';
        assert.equal(new Validator().isDate(u1), true);
        assert.equal(new Validator().isDate('u1'), false);
        
    });
});