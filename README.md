**安装方法: npm install utils2 -S**
### 使用方式
```
const Validator = require('utils2/lib/validator');
const validator = new Validator({
    rules: {
        id: 'required|int'
    }
});
const input = validator.filter(req.body);
try {
    validator.check(input);
} catch(err) {
    // 错误处理
    //res.validateError(err);
    //next(err);
}
```
### 模块功能说明
```
工具库:基本IO操作的封装;validator是对表单输入的数据进行过滤和验证的封装;仿lodash方法的封装(有些写法不习惯,所以自己造轮子)
基本对象的方法拓展(string/number/date等,风险有点大.有次改了object的原型造成sequelize报错)
```

#### 2017-12-18 20:34:42
```
    初始化仓库
```
#### 2017-12-20 00:27:03
```
    添加了validator对输入进行验证和过滤.用mocha进行单元测试
```
#### 2017-12-21 18:57:26
```
    validator添加filter()方法
    尝试assert的strictEqual测试
```
#### 2017-12-21 21:41:35
```
没设计好
1.new rule 
2.filter
3.check (包含解析和断言)

```
### 2018-1-16 12:55:51
```
1.对基础对象的拓展都放到_.js中
2.修改validator抛出错误的方式
3.发布到npm
```