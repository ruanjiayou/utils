# 函数工具库
```
TODO:
validator单独一个仓库,今后与 https://github.com/ruanjiayou/validator 保持一张
utils提供的形式应该和$和_一样,不能侵犯基本对象
```
**安装方法: npm install utils2 -S**
**或: npm install git@github.com:ruanjiayou/utils.git**
### 使用方式
```JavaScript
// 特别注意:methods中不能用箭头函数,this是指向validator实例的
const Validator = require('utils2/lib/validator');
const validator = new Validator({
    rules: {
        id: 'required|int'
    },
    methods: {
        isID18: function(v){
            return this.isID(v);
        }
    },
    messages: {
        'zh-ch': {
            id: '{key},{v}'
        }
    }
});
// 用法一:
const input = validator.filter(req.body);
try {
    validator.check(input);
} catch(err) {
    next(err);
}
// 用法二
try {
    const input = validator.validate(req.body);
} catch(err) {
    next(err);
}
```
### 模块功能说明
```
工具库:基本IO操作的封装;validator是对表单输入的数据进行过滤和验证的封装;仿lodash方法的封装(有些写法不习惯,所以自己造轮子)
基本对象的方法拓展(string/number/date等,风险有点大.有次改了object的原型造成sequelize报错,正确做法是提供lodash式工具)
validator字段描述类型:
1.元类型: boolean/enum/int/float/string/url/email/date/dateonly/timeonly/file/custom
2.限制类型: nullable/required/min/max/length/minlength/maxlength/range/if/
```