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
    }
};

module.exports = _;