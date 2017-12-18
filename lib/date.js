function num2zh(num) {
    num = num ? num.toString() : '';
    var res = '';
    var d = {
        '0': '零',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九'
    };
    for (var i = 0; i < num.length; i++) {
        res += d[num[i]];
    }
    return res;
}
Date.YEAR = 'Y';
Date.QUARTER = 'Q';
Date.MONTH = 'M';
Date.DATE = 'D';
Date.DAY = 'W';
Date.HOUR = 'H';
Date.MINUTE = 'I';
Date.SECOND = 'S';
/**
 * 将时间按指定格式转为字符串 小写都是阿拉伯数字大写是汉字数字 
 * 格式首字母大写这转为汉字
 * @param {string} Y/y/YY/yy - 年份 一七/17/二零一七/2017
 * @param {string} Q/q - 季度 三/3
 * @param {string} M/m/mm - 月 九/9/09
 * @param {string} W/w - 周 一/1
 * @param {string} D/d/dd - 日 九/9/09
 * @param {string} H/h/hh - 时 四/4/04 23
 * @param {string} I/i - 分
 * @param {string} S/s - 秒
 * @return {string} - 格式化的字符串
 */
Date.prototype.format = function (format) {
    var res = format,
        m = '',
        stack = [],
        reg = /\{(\w{1,2})\}/g;
    while ((m = reg.exec(format)) !== null) {
        if (stack.indexOf(m[1]) === -1) {
            stack.push(m[1]);
        }
    }
    for (var i = 0; i < stack.length; i++) {
        var k = stack[i];
        var bZH = (k.charCodeAt(0) > 96) ? false : true;
        var bLong = (k.length === 2 && k[0].toLowerCase() === k[1].toLowerCase()) ? true : false;
        var v = null;
        //console.log(k);
        //console.log(bLong);
        switch (k[0].toUpperCase()) {
            case Date.YEAR:
                v = this.getFullYear();
                if (bLong === false) {
                    v = v % 100;
                }
                break;
            case Date.QUARTER:
                v = Math.floor((this.getMonth() + 3) / 3);
                break;
            case Date.MONTH:
                v = this.getMonth() + 1;
                break;
            case Date.DAY:
                v = this.getDay();
                break;
            case Date.DATE:
                v = this.getDate();
                break;
            case Date.HOUR:
                v = this.getHours();
                break;
            case Date.MINUTE:
                v = this.getMinutes();
                break;
            case Date.SECOND:
                v = this.getSeconds();
                break;
            default: break;
        }
        //如果指定最小两位长度则个位数前补零
        if (bLong && v < 10) {
            v = '0' + v;
        }
        //如果是大写字母则数字转中文
        if (bZH) {
            v = num2zh(parseInt(v));
        }
        res = res.replace(new RegExp('{' + k + '}', 'g'), v);
    }
    return res;
};

/**
 * 计算指定格式差值
 * @param {Date} date - 要比较的日期
 * @param {string} [format=s] - 比较的格式 s/i/h/d/w
 * @return {string} - 返回字符串
 */
Date.prototype.offset = function (date, format) {
    var t0 = this.getTime(),
        t1 = date.getTime();
    var res = Math.floor((t0 - t1) / 1000);
    if (!format) {
        format = Date.SECOND;
    }
    switch (format.toUpperCase()) {
        case Date.MINUTE:
            res /= 60;
            break;
        case Date.HOUR:
            res /= 60 * 60;
            break;
        case Date.DATE:
            res /= 60 * 60 * 24;
            break;
        case Date.DAY:
            res /= 60 * 60 * 24 * 7;
            break;
        default:
            break;
    }
    return Math.floor(res * 10) / 10;
};
/**
 * 时间加减计算
 * @param {int} v - 负数代表日期过去，正数代表日期未来 
 * @param {int} ch - @enum s/i/h/d/w/y 0/1/2/3/4/- 就是没有按月计算的~~
 */
Date.prototype.compute = function (v, ch) {
    var ts = Math.ceil(this.getTime() / 1000);
    var level = 0;
    if (!ch) {
        ch = Date.SECOND;
    } else {
        ch = ch.toUpperCase();
    }
    v = parseInt(v) || 0;
    switch (ch) {
        case Date.SECOND:
            level = 0;
            break;
        case Date.MINUTE:
            level = 1;
            break;
        case Date.HOUR:
            level = 2;
            break;
        case Date.DATE:
            level = 3;
            break;
        case Date.DAY:
            level = 4;
            break;
        case Date.YEAR: break;
        default: break;
    }
    if (ch === Date.YEAR) {
        this.setFullYear(this.getFullYear() + v);
    } else {
        if (level > 0) {
            v *= 60;
        }
        if (level > 1) {
            v *= 60;
        }
        if (level > 2) {
            v *= 24;
        }
        if (level > 3) {
            v *= 7;
        }
        this.setTime((ts + v) * 1000);
    }
    return this;
};