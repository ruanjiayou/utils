const _ = require('../lib/date');
const assert = require('assert');

describe('测试date()函数', function () {
    it('new Date().format()', function () {
        const d = new Date('2017/10/18 22:22:22');
        console.log(d.format('{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{y}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        // 字母最多两个
        console.log(d.format('{yyy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        //测试 大写 数字转汉字
        console.log(d.format('{Y}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{YY}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{Yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));

        console.log(d.format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{yy}-{M}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{yy}-{MM}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(d.format('{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{W}'));
    });
    it('new Date().offset()', function () {
        var today = new Date();
        var oldDay = new Date('2017/08/08 0:0:0');
        var newDay = new Date('2017/10/10 0:0:0');
        console.log(today.format('{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(oldDay.format('{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(newDay.format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log('秒：' + today.offset(oldDay, 's'));
        console.log('秒：' + today.offset(newDay, 's'));
        console.log('秒：' + newDay.offset(oldDay, 's'));
        console.log('分：' + today.offset(oldDay, 'i'));
        console.log('分：' + today.offset(newDay, 'i'));
        console.log('分：' + newDay.offset(oldDay, 'i'));
        console.log('时：' + today.offset(oldDay, 'h'));
        console.log('时：' + today.offset(newDay, 'h'));
        console.log('时：' + newDay.offset(oldDay, 'h'));
        console.log('天：' + today.offset(oldDay, 'd'));
        console.log('天：' + today.offset(newDay, 'd'));
        console.log('天：' + newDay.offset(oldDay, 'd'));
        console.log('周：' + today.offset(oldDay, 'w'));
        console.log('周：' + today.offset(newDay, 'w'));
        console.log('周：' + newDay.offset(oldDay, 'w'));
    });
    it('new Date().compute()', function () {
        var t = new Date('2017-10-10 0:0:0');
        console.log(t.compute(12).format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(-12).format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(-12, 'i').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(12, 'i').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(12, 'h').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(-12, 'h').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(12, 'd').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(-12, 'd').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(12, 'w').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(-12, 'w').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(12, 'y').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(t.compute(-12, 'y').format('{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
    });
});