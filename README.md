# 模块功能说明
```
工具库:基本IO操作的封装;validator是对表单输入的数据进行过滤和验证的封装;仿lodash方法的封装(有些写法不习惯,所以自己造轮子)
基本对象的方法拓展(string/number/date等,风险有点大.有次改了object的原型造成sequelize报错)
```
**安装方法: npm install utils2 -s**
#### 2017-12-18 20:34:42
```
    初始化仓库
```
#### 2017-12-20 00:27:03
```
    添加了validator对输入进行验证和过滤.用mocha进行单元测试
```
let input = {} 在try input = validator.validate(req.body) 做法傻逼

let input = validator.pick(req.body); try validator.check();
#### 2017-12-21 18:57:26
```
    validator添加filter()方法
    尝试assert的strictEqual测试
```