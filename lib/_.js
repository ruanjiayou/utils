const _ = {
    /**
     * 获取变量类型
     */
    type: function (o) {
        var _t = typeof o;
        return (_t === 'object' ? o === null && 'null' || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
    },
    isFunction: function (o) {
        return 'function' === this.type(o);
    },
    isArray: function (o) {
        return 'array' === this.type(o);
    },
    isString: function (o) {
        return 'string' === this.type(o);
    },
    isDate: function (o) {
        return 'date' === this.type(o);
    },
    isNumber: function (o) {
        return 'number' === this.type(o);
    },
    isRegExp: function (o) {
        return 'regexp' === this.type(o);
    },
    isObject: function (o) {
        return 'object' === typeof o;
    },
    isBoolean: function (o) {
        return 'boolean' === this.type(o);
    },
    isNull: function (o) {
        return 'null' === this.type(o);
    },
    isUndefined: function (o) {
        return 'undefined' === this.type(o);
    },
    isNil: function (o) {
        return o === null || o === undefined;
    },
    isEmpty: function (o) {
        return o === '' || this.isNil(o);
    },
    isEmptyObject: function (o) {
        for (var k in o) {
            return false;
        }
        return true;
    },
    isNaN: function (o) {
        return Number.isNaN(o);
    },
    isError: function (o) {
        return 'error' === this.type(o);
    },
    /**
     * 返回属性数组
     */
    keys: function (o) {
        var res = [];
        for (let k in o) {
            if (o.hasOwnProperty(k.toString())) {
                res.push(k);
            }
        }
        return res;
    },
    /**
     * 过滤字段(返回新的对象)
     */
    pick: function (o, arr) {
        const res = {};
        if (!_.isArray(arr)) {
            arr = _.keys(arr);
        }
        for (let k in o) {
            if (o.hasOwnProperty(k) && arr.indexOf(k) !== -1) {
                res[k] = o[k];
            }
        }
        return res;
    },
    /**
     * 两个字符串
     */
    compare: function (str1, str2) {
        let len1 = str1.length,
            len2 = str2.length;
        for (let i = 0; i < len1 && i < len2; i++) {
            if (str1.charCodeAt(i) !== str2.charCodeAt(i)) {
                return str1.charCodeAt(i) - str2.charCodeAt(i);
            }
        }
        return len1 - len2;
    },
    /**
     * 阿拉伯数字转汉语数字
     */
    num2zh: function (num) {
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
    },
    /**
     * 数组按指定方法排序
     */
    sortBy: function (arrs, func) {
        return arrs.sort(func);
    },
    /**
     * 数组中是否有指定项
     */
    hasOne: function (arr, func) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (true === func(arr[i])) {
                return true;
            }
        }
        return false;
    },
    /**
     * 日期对象操作
     */
    date: {
        YEAR: 'Y',
        QUARTER: 'Q',
        MONTH: 'M',
        DATE: 'D',
        DAY: 'W',
        HOUR: 'H',
        MINUTE: 'I',
        SECOND: 'S',
        /**
         * 将时间按指定格式转为字符串 小写都是阿拉伯数字大写是汉字数字 
         * 格式首字母大写这转为汉字
         * @param {date} date 日期对象
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
        format: function (date, format) {
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
                switch (k[0].toUpperCase()) {
                    case this.YEAR:
                        v = date.getFullYear();
                        if (bLong === false) {
                            v = v % 100;
                        }
                        break;
                    case this.QUARTER:
                        v = Math.floor((date.getMonth() + 3) / 3);
                        break;
                    case this.MONTH:
                        v = date.getMonth() + 1;
                        break;
                    case this.DAY:
                        v = date.getDay();
                        break;
                    case this.DATE:
                        v = date.getDate();
                        break;
                    case this.HOUR:
                        v = date.getHours();
                        break;
                    case this.MINUTE:
                        v = date.getMinutes();
                        break;
                    case this.SECOND:
                        v = date.getSeconds();
                        break;
                    default: break;
                }
                //如果指定最小两位长度则个位数前补零
                if (bLong && v < 10) {
                    v = '0' + v;
                }
                //如果是大写字母则数字转中文
                if (bZH) {
                    v = _.num2zh(parseInt(v));
                }
                res = res.replace(new RegExp('{' + k + '}', 'g'), v);
            }
            return res;
        },
        /**
         * 计算指定格式差值
         * @param {Date} date - 要比较的日期
         * @param {string} [format=s] - 比较的格式 s/i/h/d/w
         * @return {string} - 返回字符串
         */
        offset: function (date1, date2, format) {
            let t0 = date1.getTime(),
                t1 = date2.getTime();
            var res = Math.floor((t0 - t1) / 1000);
            if (!format) {
                format = this.SECOND;
            }
            switch (format.toUpperCase()) {
                case this.MINUTE:
                    res /= 60;
                    break;
                case this.HOUR:
                    res /= 60 * 60;
                    break;
                case this.DATE:
                    res /= 60 * 60 * 24;
                    break;
                case this.DAY:
                    res /= 60 * 60 * 24 * 7;
                    break;
                default:
                    break;
            }
            return Math.floor(res * 10) / 10;
        },
        /**
         * 时间加减计算
         * @param {date} date - 日期对象
         * @param {int} val - 负数代表日期过去，正数代表日期未来 
         * @param {int} format - @enum s/i/h/d/w/y 0/1/2/3/4/- 就是没有按月计算的~~
         */
        compute: function (date, val, format) {
            var ts = Math.ceil(date.getTime() / 1000);
            var level = 0;
            if (!format) {
                format = this.SECOND;
            } else {
                format = format.toUpperCase();
            }
            val = parseInt(val) || 0;
            switch (format) {
                case this.SECOND:
                    level = 0;
                    break;
                case this.MINUTE:
                    level = 1;
                    break;
                case this.HOUR:
                    level = 2;
                    break;
                case this.DATE:
                    level = 3;
                    break;
                case this.DAY:
                    level = 4;
                    break;
                case this.YEAR: break;
                default: break;
            }
            if (format === this.YEAR) {
                date.setFullYear(date.getFullYear() + val);
            } else {
                if (level > 0) {
                    val *= 60;
                }
                if (level > 1) {
                    val *= 60;
                }
                if (level > 2) {
                    val *= 24;
                }
                if (level > 3) {
                    val *= 7;
                }
                date.setTime((ts + val) * 1000);
            }
            return date;
        }
    }
};

module.exports = _;