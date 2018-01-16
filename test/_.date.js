const sdate = require('../lib/_').date;
const assert = require('assert');

describe('测试date()函数', function () {
    it('new Date().format()', function () {
        const d = new Date('2017/10/18 22:22:22');
        console.log(sdate.format(d, '{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{y}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        // 字母最多两个
        console.log(sdate.format(d, '{yyy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{yyyy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        //测试 大写 数字转汉字
        console.log(sdate.format(d, '{Y}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{YY}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{Yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));

        console.log(sdate.format(d, '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{yy}-{M}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{yy}-{MM}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{w}'));
        console.log(sdate.format(d, '{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{W}'));
    });
    it('new Date().offset()', function () {
        var today = new Date();
        var oldDay = new Date('2017/08/08 0:0:0');
        var newDay = new Date('2017/10/10 0:0:0');
        console.log(sdate.format(today, '{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(oldDay, '{yy}-{mm}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(newDay, '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log('秒：' + sdate.offset(today, oldDay, 's'));
        console.log('秒：' + sdate.offset(today, newDay, 's'));
        console.log('秒：' + sdate.offset(newDay, oldDay, 's'));
        console.log('分：' + sdate.offset(today, oldDay, 'i'));
        console.log('分：' + sdate.offset(today, newDay, 'i'));
        console.log('分：' + sdate.offset(newDay, oldDay, 'i'));
        console.log('时：' + sdate.offset(today, oldDay, 'h'));
        console.log('时：' + sdate.offset(today, newDay, 'h'));
        console.log('时：' + sdate.offset(newDay, oldDay, 'h'));
        console.log('天：' + sdate.offset(today, oldDay, 'd'));
        console.log('天：' + sdate.offset(today, newDay, 'd'));
        console.log('天：' + sdate.offset(newDay, oldDay, 'd'));
        console.log('周：' + sdate.offset(today, oldDay, 'w'));
        console.log('周：' + sdate.offset(today, newDay, 'w'));
        console.log('周：' + sdate.offset(newDay, oldDay, 'w'));
    });
    it('new Date().compute()', function () {
        var t = new Date('2017-10-10 0:0:0');
        console.log(sdate.format(sdate.compute(t, 12), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, -12), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, -12, 'i'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, 12, 'i'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, 12, 'h'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, -12, 'h'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, 12, 'd'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, -12, 'd'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, 12, 'w'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, -12, 'w'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, 12, 'y'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
        console.log(sdate.format(sdate.compute(t, -12, 'y'), '{yy}-{m}-{dd} {hh}:{ii}:{ss} 星期{W}'));
    });
});