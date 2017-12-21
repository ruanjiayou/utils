//TODO: i18n
/**
 * 
 * file exe|image
 * custom
 * 
 * requiredif:field|int?
 */
const _ = require('./_');
const moment = require('moment');
class Validator {
    constructor(o) {
        this.rules = {};
        this.messages = {};
        if (o) {
            this.parse(o.rules);
            this.messages = o.messages || this.messages[o.lang || 'cn'];
        }
    }
    /**
     * 按rules的字段,过滤额外的字段
     */
    filter(data) {
        let res = {};
        for(let k in this.rules) {
            if(this.rules.hasOwnProperty(k) && !_.isEmptyObject(data[k])){
                res[k] = data[k];
            }
        }
        return res;
    }
    /**
     * required|int|min:100|max:200  --> required: true, int: true, max: 10, max: 200
     * @param {object} rules 
     */
    parse(rules) {
        for (let k in rules) {
            let arr = rules[k].split('|');
            let rule = {};
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                let kv = /^([^:]+)[:]?(.*)$/.exec(item);
                if (kv === null) {
                    throw new Error(`${item} 不是有效的规则!`)
                }
                rule['range'] = {
                    min: -Infinity,
                    max: Infinity,
                    includeTop: false,
                    includeBottom: false
                };
                rule['length'] = {
                    min: 0,
                    max: 255
                }
                if (kv[2] === '') {
                    // 无参数
                    switch (kv[1].toLowerCase()) {
                        case 'nullable':
                            rule['nullable'] = true;
                            break;
                        case 'required':
                            rule['required'] = true;
                            break;
                        case 'int':
                            rule['int'] = true;
                            break;
                        case 'float':
                            rule['float'] = true;
                            break;
                        case 'boolean':
                            rule['boolean'] = true;
                            break;
                        case 'date':
                            rule['date'] = true;
                            break;
                        case 'url':
                            rule['url'] = true;
                            break;
                        case 'email':
                            rule['email'] = true;
                            break;
                        case 'file':
                            //TODO:
                            break;
                        default: break;
                    }
                } else {
                    // 带参数
                    switch (kv[1].toLowerCase()) {
                        case 'min':
                            if (this.isFloat(kv[2])) {
                                rule['range']['min'] = parseFloat(kv[2]);
                            } else {
                                throw new Error('min 属性值不是数字!');
                            }
                            break;
                        case 'max':
                            if (this.isFloat(kv[2])) {
                                rule['range']['max'] = parseFloat(kv[2]);
                            } else {
                                throw new Error('max 属性值不是数字!');
                            }
                            break;
                        case 'range':
                            let t = /^(\(|\[)\s*(.+?)\s*,\s*(.+?)\s*(\)|\])$/.exec(kv[2]);
                            if (t && this.isFloat(t[2]) && this.isFloat(t[3])) {
                                rule['range']['includeBottom'] = t[1] === '(' ? false : true;
                                rule['range']['includeTop'] = t[4] === ')' ? false : true;
                                rule['range']['min'] = parseFloat(t[2]);
                                rule['range']['max'] = parseFloat(t[3]);
                            } else {
                                throw new Error('range 不是有效的格式!')
                            }
                            break;
                        case 'minlength':
                            if (this.isInt(kv[2])) {
                                rule['minlength'] = parseInt(kv[2]);
                            } else {
                                throw new Error('minlength 属性值不是正整数!');
                            }
                            break;
                        case 'maxlength':
                            if (this.isInt(kv[2])) {
                                rule['maxlength'] = parseInt(kv[2]);
                            } else {
                                throw new Error('maxlength 属性值不是正整数!');
                            }
                            break;
                        case 'length':
                            if (this.isInt(kv[2])) {
                                rule['length']['min'] = parseInt(kv[2]);
                            } else {
                                let t = /^(\(|\[)(\d+),(\d+)(\)|\])$/.exec(kv[2]);
                                if (t) {
                                    rule['length']['min'] = parseInt(t[2]);
                                    rule['length']['max'] = parseInt(t[3]);
                                } else {
                                    throw new Error('range 不是有效的格式!')
                                }
                            }
                            break;
                        case 'in':
                            rule['in'] = kv[2].split(',').map(function (item) {
                                if (item.trim() === '') {
                                    throw new Error('in')
                                }
                                return item.trim();
                            });
                            break;
                        case 'required_if':
                            break;
                        case 'file':
                            //TODO:
                            break;
                        case 'custom':
                            //TODO:
                            break;
                    }
                }

            };
            // 1.nullable和required不能同时存在
            if (rule['required'] == true && rule['nullable'] == true) {
                throw new Error('nullable required');
            }
            if (rule['string'] === undefined) {
                delete rule['length'];
            }
            if (rule['int'] === undefined && rule['float'] === undefined) {
                delete rule['range'];
            }
            this.rules[k] = rule;
        }
        return this;
    }
    check(data, messages) {
        let res = true;
        let key = '';
        let result = {};
        for (let k in data) {
            key = k;
            if (res === false) {
                break;
            }
            let v = data[k].trim(), n;
            if (this.rules[k]) {
                result[k] = v;
            }
            for (let rule in this.rules[k]) {
                let rk = this.rules[k][rule];
                switch (rule) {
                    case 'nullable': break;
                    case 'required':
                        if (v === '') {
                            res = false;
                        }
                        break;
                    case 'string':
                        result[k] = v;
                        break;
                    case 'int':
                        res = this.isInt(v);
                        result[k] = parseInt(v);
                        break;
                    case 'float': res = this.isFloat(v);
                        result[k] = parseFloat(v);
                        break;
                    case 'range':
                        n = parseFloat(v);
                        res = (rk.min < n || (rk.includeBottom === true && rk.min === n))
                            &&
                            (rk.max > n || (rk.includeTop === true && rk.max === n))
                        break;
                    case 'length':
                        n = v.length;
                        res = (rk.min <= n && rk.max >= n);
                        break;
                    case 'email':
                        res = this.isEmail(v);
                        result[k] = v;
                        break;
                    case 'url':
                        res = this.isUrl(v);
                        result[k] = v;
                        break;
                    case 'date':
                        console.log(v);
                        res = this.isDate(v);
                        result[k] = moment(v).toISOString();
                        break;
                    case 'boolean':
                        res = v ? true : false;
                        result[k] = res;
                        break;
                    case 'in':
                        res = rk.indexOf(v) !== -1 ? true : false;
                        result[k] = v;
                        break;
                    case 'custom':
                        //TODO:
                        break;
                    default: break;
                }
            }
        }
        return res ? result : res;
    }
    isUrl(v) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v);
    }
    isDate(v) {
        return moment(v).isValid();
    }
    isInt(v) {
        return /^\d+$/.test(v);
    }
    isFloat(v) {
        return /^[-+]?(\d+[.])?\d+$/.test(v);
    }
    isEmail(v) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(v)
    }
    isID(sfzhm_new) {
        var sum = 0;
        var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        for (let m = 0; m < sfzhm_new.length - 1; m++) {
            sum += sfzhm_new[m] * weight[m];
        }
        let mode = sum % 11;
        if (sfzhm_new[17] == validate[mode]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Luhn校验算法校验银行卡号
     * Description:  银行卡号Luhm校验
     * Luhm校验规则：16位银行卡号（19位通用）:
     * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
     * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
     * 3.将加法和加上校验位能被 10 整除。
     * 方法步骤很清晰，易理解，需要在页面引用Jquery.js
     * bankno为银行卡号
     */
    isCredit(bankno) {
        var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

        var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {//前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array();  //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9

        var arrOuShu = new Array();  //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {//奇数位
                if (parseInt(newArr[j]) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j]) * 2);
                else
                    arrJiShu2.push(parseInt(newArr[j]) * 2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算Luhm值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;
        var my = false;
        if (lastNum == luhm) {//Luhm验证通过
            my = true;
        }
        else {//银行卡号必须符合Luhm校验
            my = false;
        }
        return my;
    }
    isString() {

    }
    isChar() {

    }
    isFile() {

    }
}
//默认required
Validator.prototype.messages = {
    cn: {
        'required': '{field}字段不能为空!',
        'url': '{field}不是有效的url!',
        'email': '{field}不是有效的邮件格式!',
        'date': '{value}不是有效的时间格式!',
        'int': '{field}必须是整数!',
        'float': '{value}不是有效的小数格式!',
        'boolean': '{field}必须是布尔类型!',
        'in': '{field}的值必须是{value}中的一种!',
        'range': '{field}的值TODO:',
        'min': '{field}的值最小为{value}!',
        'max': '{field}的值最大为{value}!',
        'length': '{field}的长度必须TODO:',
        'minlength': '{field}的长度最小为{value}!',
        'maxlength': '{field}的长度最大为{value}!',
        'file': '非法的文件格式!'
    },
    en: {},
    fr: {}
};

module.exports = Validator;