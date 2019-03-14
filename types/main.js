"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var LazyCalc = /** @class */ (function () {
    function LazyCalc(init) {
        this.initValue = 0;
        this.compose = function (fns) {
            return fns.reduceRight(function (prevFn, nextFn) { return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return nextFn(prevFn.apply(void 0, __spread(args)));
            }; }, function (i) { return i; });
        };
        this.initValue = init || 0;
        this.operators = [];
        return this;
    }
    LazyCalc.prototype.createRound = function (methodName, precision) {
        if (precision === void 0) { precision = 0; }
        var func = Math[methodName];
        return function (number) {
            console.log(methodName, number);
            precision =
                precision == null
                    ? 0
                    : precision >= 0
                        ? Math.min(precision, 292)
                        : Math.max(precision, -292);
            if (precision) {
                // Shift with exponential notation to avoid floating-point issues.
                // See [MDN](https://mdn.io/round#Examples) for more details.
                var pair = (number + "e").split("e");
                var value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (value + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
        };
    };
    LazyCalc.prototype.clone = function (operators) {
        var tmp = new LazyCalc(this.initValue);
        tmp.operators = operators;
        return tmp;
    };
    LazyCalc.prototype.lazy = function (init) {
        return new LazyCalc(init);
    };
    LazyCalc.prototype.add = function (y) {
        var operation = function (x) {
            console.log("add");
            console.log("x:", x, "y:", y);
            return +x + +y;
        };
        return this.clone(__spread([operation], this.operators));
    };
    LazyCalc.prototype.divide = function (y) {
        var operation = function (x) {
            console.log("divide");
            console.log("x:", x, "y:", y);
            return +x / +y;
        };
        // this.operators.unshift(operation);
        return this.clone(__spread([operation], this.operators));
    };
    LazyCalc.prototype.subtract = function (y) {
        var operation = function (x) {
            console.log("subtract");
            console.log("x:", x, "y:", y);
            return +x - +y;
        };
        // this.operators.unshift(operation);
        return this.clone(__spread([operation], this.operators));
    };
    LazyCalc.prototype.multiply = function (y) {
        var operation = function (x) {
            console.log("multiply");
            console.log("x:", x, "y:", y);
            return +x * +y;
        };
        // this.operators.unshift(operation);
        return this.clone(__spread([operation], this.operators));
    };
    LazyCalc.prototype.ceil = function (precision) {
        if (precision === void 0) { precision = 0; }
        var operation = this.createRound("ceil", precision);
        // this.operators.unshift(operation);
        return this.clone(__spread([operation], this.operators));
    };
    LazyCalc.prototype.floor = function (precision) {
        if (precision === void 0) { precision = 0; }
        var operation = this.createRound("floor", precision);
        // this.operators.unshift(operation);
        return this.clone(__spread([operation], this.operators));
    };
    LazyCalc.prototype.round = function (precision) {
        if (precision === void 0) { precision = 0; }
        var operation = this.createRound("round", precision);
        // this.operators.unshift(operation);
        return this.clone(__spread([operation], this.operators));
    };
    LazyCalc.prototype.value = function (fallback) {
        if (fallback === void 0) { fallback = 0; }
        var result = this.compose(this.operators)(this.initValue);
        console.log("result:", result);
        this.initValue = 0;
        return isNaN(result) ? fallback : result;
    };
    return LazyCalc;
}());
var instance = new LazyCalc();
var a = instance.add(10).multiply(2);
var b = a.subtract(13).value(null);
var c = a.divide(2).value();
console.log("b: " + b, "c: " + c);
//# sourceMappingURL=main.js.map