
var TestResult = function (test_name) {
    this.test_name = test_name;
    this.result = true;
    this.message = '';
};

TestResult.prototype = {
    assert: function (statement, message) {
        if (!statement) {
            this.result = false;
            if (this.message && this.message.length) {
                this.message += ', ';
            }
            this.message += ((message && message.length) ? message : '');
        }
    },
    release: function () {
        if (this.result) {
            console.log('%c' + this.test_name + ': passed', 'color: green');
        } else {
            console.log('%c' + '* ' + this.test_name + (this.message ? ': ' + this.message : ''), 'color: red');
        }
    }
};

var BigMathTests = function () {

};

BigMathTests.prototype = {

    tests: {
        test_create_0: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(2, 10);

            result.assert(lng_x.length == 11, 'lng_x.length == 11');
            result.assert(lng_x[0] > 0, 'lng_x[0] > 0');
            result.assert(lng_x[1] == 2, 'lng_x[0] == 2');
            for (var i = 2; i <= 10; i++) {
                result.assert(lng_x[i] == 0, 'lng_x[i] == 0');
            }

            return result;
        },
        test_create_zero: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            result.assert(lng_x[0] == 0);
            return result;
        },
        test_create_neg: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-1, 10);
            result.assert(lng_x[0] < 0, 'lng_x[0] < 0');
            result.assert(lng_x[1] > 0, 'lng_x[1] > 0');
            return result;
        },
        test_toString_zero: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            var str = BigMath.toString(lng_x, 10);
            result.assert(str === '0');
            return result;
        },
        test_toString_one: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(1, 10);
            var str = BigMath.toString(lng_x, 10);
            result.assert(str === '1');
            return result;
        },
        test_toString_minus_one: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-1, 10);
            var str = BigMath.toString(lng_x, 10);
            result.assert(str === '-1');
            return result;
        },
        test_toString_pos_fract: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(1, 10);
            lng_x[2] = 0.1 * BigMath.BASE; // todo make not synth, after enabling fractional create().
            var str = BigMath.toString(lng_x, 10);
            result.assert(str === '1.1000000');
            return result;
        },
        test_sign_pos: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(1, 10);
            result.assert(BigMath.lng_sign_2(lng_x) > 0);
            return result;
        },
        test_sign_zero: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            result.assert(BigMath.lng_sign_2(lng_x) === 0);
            return result;
        },
        test_sign_neg: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-1, 10);
            result.assert(BigMath.lng_sign_2(lng_x) < 0);
            return result;
        },
        test_inv_pos: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(1, 10);
            result.assert(BigMath.lng_sign_2(BigMath.lng_inv_2(lng_x)) < 0);
            result.assert(BigMath.lng_sign_2(lng_x) > 0, 'Source number is modified');
            return result;
        },
        test_inv_neg: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-11, 10);
            result.assert(BigMath.lng_sign_2(BigMath.lng_inv_2(lng_x)) > 0);
            result.assert(BigMath.lng_sign_2(lng_x) < 0, 'Source number is modified');
            return result;
        },
        test_inv_zero: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            result.assert(BigMath.lng_sign_2(BigMath.lng_inv_2(lng_x)) === 0);
            result.assert(BigMath.lng_sign_2(lng_x) === 0, 'Source number is modified');
            return result;
        },
        test_abs_pos: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(132, 10);
            var lng_abs = BigMath.lng_abs_2(lng_x);

            result.assert(lng_x[0] > 0);
            result.assert(lng_x[1] === 132);
            result.assert(lng_abs[0] > 0);
            result.assert(lng_abs[1] === 132);
            return result;
        },
        test_abs_neg: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-142, 10);
            var lng_abs = BigMath.lng_abs_2(lng_x);

            result.assert(lng_x[0] < 0);
            result.assert(lng_x[1] === 142);
            result.assert(lng_abs[0] > 0);
            result.assert(lng_abs[1] === 142);
            return result;
        },
        test_abs_zero: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            var lng_abs = BigMath.lng_abs_2(lng_x);

            result.assert(lng_x[0] === 0);
            result.assert(lng_x[1] === 0);
            result.assert(lng_abs[0] === 0);
            result.assert(lng_abs[1] === 0);
            return result;
        },

        test_cmp_001: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            var lng_y = BigMath.lng_create_2_1(0, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) === 0);
            return result;
        },
        test_cmp_002: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(100, 10);
            var lng_y = BigMath.lng_create_2_1(0, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) > 0);
            return result;
        },
        test_cmp_002a: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(100, 10);
            var lng_y = BigMath.lng_create_2_1(0, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_y, lng_x, 10) < 0);
            return result;
        },
        test_cmp_003: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            var lng_y = BigMath.lng_create_2_1(100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },
        test_cmp_003a: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(0, 10);
            var lng_y = BigMath.lng_create_2_1(100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_y, lng_x, 10) > 0);
            return result;
        },
        test_cmp_003b: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(100, 10);
            var lng_y = BigMath.lng_create_2_1(100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_y, lng_x, 10) === 0);
            return result;
        },

        test_cmp_004: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-50, 10);
            var lng_y = BigMath.lng_create_2_1(100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },
        test_cmp_004a: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-100, 10);
            var lng_y = BigMath.lng_create_2_1(100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },
        test_cmp_004b: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-150, 10);
            var lng_y = BigMath.lng_create_2_1(100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },

        test_cmp_005: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(50, 10);
            var lng_y = BigMath.lng_create_2_1(-100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) > 0);
            return result;
        },
        test_cmp_005a: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(100, 10);
            var lng_y = BigMath.lng_create_2_1(-100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) > 0);
            return result;
        },
        test_cmp_005b: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(150, 10);
            var lng_y = BigMath.lng_create_2_1(-100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) > 0);
            return result;
        },

        test_cmp_006: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-50, 10);
            var lng_y = BigMath.lng_create_2_1(-100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) > 0);
            return result;
        },
        test_cmp_006a: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-100, 10);
            var lng_y = BigMath.lng_create_2_1(-100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) === 0);
            return result;
        },
        test_cmp_006b: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(-150, 10);
            var lng_y = BigMath.lng_create_2_1(-100, 10);

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },

        test_cmp_007: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(10, 10);
            var lng_y = BigMath.lng_create_2_1(9, 10);
            lng_y[2] = 0.5 * BigMath.BASE; // todo

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) > 0);
            return result;
        },
        test_cmp_007a: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(10, 10);
            var lng_y = BigMath.lng_create_2_1(10, 10);
            lng_y[2] = 0.5 * BigMath.BASE; // todo

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },
        test_cmp_007b: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(10, 10);
            var lng_y = BigMath.lng_create_2_1(10, 10);
            lng_y[2] = 0.5 * BigMath.BASE; // todo
            lng_x[2] = 0.5 * BigMath.BASE; // todo

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) === 0);
            return result;
        },
        test_cmp_007c: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(10, 10);
            var lng_y = BigMath.lng_create_2_1(11, 10);
            lng_y[2] = 0.5 * BigMath.BASE; // todo
            lng_x[2] = 0.5 * BigMath.BASE; // todo

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },
        test_cmp_007d: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(10, 10);
            var lng_y = BigMath.lng_create_2_1(10, 10);
            lng_y[2] = 0.5 * BigMath.BASE; // todo
            lng_x[2] = 0.55 * BigMath.BASE; // todo

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) > 0);
            return result;
        },
        test_cmp_007e: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(10, 10);
            var lng_y = BigMath.lng_create_2_1(10, 10);
            // todo
            for (var i = 2; i <= 10; i++) {
                lng_x[i] = 0.9999999 * BigMath.BASE;
                lng_y[i] = 0.9999999 * BigMath.BASE;
            }

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) === 0);
            return result;
        },
        test_cmp_007f: function () {
            var result = new TestResult(arguments.callee.name);
            var lng_x = BigMath.lng_create_2_1(10, 10);
            var lng_y = BigMath.lng_create_2_1(10, 10);
            // todo
            for (var i = 2; i <= 10; i++) {
                lng_x[i] = 0.9999999 * BigMath.BASE;
                lng_y[i] = 0.9999999 * BigMath.BASE;
            }
            lng_x[10] = 0.9999998 * BigMath.BASE;

            result.assert(BigMath.lng_cmp_2_2(lng_x, lng_y, 10) < 0);
            return result;
        },

        test_add_001: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 2);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_001a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(0, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 1);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_001b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(0, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 1);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_001c: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(0, 10);
            var b = BigMath.lng_create_2_1(0, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_002a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-2, 10);
            var b = BigMath.lng_create_2_1(-3, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 5);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_002b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-2, 10);
            var b = BigMath.lng_create_2_1(0, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 2);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_002c: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(0, 10);
            var b = BigMath.lng_create_2_1(-3, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 3);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_003a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            a[2] = 0.9999999 * BigMath.BASE;
            b[2] = 0.9999999 * BigMath.BASE;
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 3);
            result.assert(c[2] === 9999998);
            return result;
        },
        test_add_003b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            a[2] = 0.9999999 * BigMath.BASE;
            b[2] = 0.0000001 * BigMath.BASE;
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 3);
            result.assert(c[2] === 0);
            result.assert(c[3] === 0);
            return result;
        },
        test_add_003c: function () {
            var result = new TestResult(arguments.callee.name);
            var data = this.dataProviders.getHardDies();

            var c = BigMath.lng_add_2_2(data.a, data.b, data.len);
            // console.log(BigMath.toString(c, 10));

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(BigMath.toString(c, data.len) == data.add_str);
            return result;
        },

        // diff signs
        test_add_004a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            return result;
        },
        test_add_004b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-2, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 1);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_004c: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-1, 10);
            var b = BigMath.lng_create_2_1(2, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 1);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_004d: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(-4, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 3);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_004e: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(4, 10);
            var b = BigMath.lng_create_2_1(-1, 10);
            var c = BigMath.lng_add_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 3);
            result.assert(c[2] === 0);
            return result;
        },
        test_add_004f: function () {
            var result = new TestResult(arguments.callee.name);
            var data = this.dataProviders.getHardDies();
            data.a = BigMath.lng_inv_2(data.a);

            var c = BigMath.lng_add_2_2(data.a, data.b, data.len);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(BigMath.toString(c, data.len) == data.sub_str);
            return result;
        },
        test_add_004g: function () {
            var result = new TestResult(arguments.callee.name);
            var data = this.dataProviders.getHardDies();
            data.b = BigMath.lng_inv_2(data.b);

            var c = BigMath.lng_add_2_2(data.a, data.b, data.len);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(BigMath.toString(c, data.len) == '-' + data.sub_str);
            return result;
        },
        test_add_004h: function () {
            var result = new TestResult(arguments.callee.name);
            var data = this.dataProviders.getHardDies();
            data.a = BigMath.lng_inv_2(data.a);
            data.b = BigMath.lng_inv_2(data.b);

            var c = BigMath.lng_add_2_2(data.a, data.b, data.len);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(BigMath.toString(c, data.len) == '-' + data.add_str);
            return result;
        },

        // sub
        test_sub_001a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001a1: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-3, 10);
            var b = BigMath.lng_create_2_1(-3, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(10, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 9);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001c: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(11, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 10);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001d: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(3, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            b[1] = 0;
            b[2] = 1;
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 2);
            result.assert(c[2] === 9999999);
            return result;
        },
        test_sub_001e: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-3, 10);
            var b = BigMath.lng_create_2_1(-1, 10);
            b[1] = 0;
            b[2] = 1;
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 2);
            result.assert(c[2] === 9999999);
            return result;
        },
        test_sub_001f: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-3, 10);
            var b = BigMath.lng_create_2_1(5, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 8);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001g: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(3, 10);
            var b = BigMath.lng_create_2_1(-5, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 8);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001h: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(5, 10);
            var b = BigMath.lng_create_2_1(3, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 2);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001i: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-5, 10);
            var b = BigMath.lng_create_2_1(-3, 10);
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 2);
            result.assert(c[2] === 0);
            return result;
        },
        test_sub_001j: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            b[1] = 0;
            b[10] = 1;
            var c = BigMath.lng_sub_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 0);
            for (var i = 2; i <= 10; i++) {
                result.assert(c[i] === 9999999);
            }
            return result;
        },

        // 1x mul
        test_mul_1_001a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(3, 10);

            var c = BigMath.lng_mul_2_1(a, 4, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 12);
            result.assert(c[2] === 0);
            return result;
        },
        test_mul_1_001b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(3, 10);

            var c = BigMath.lng_mul_2_1(a, 0, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            return result;
        },
        test_mul_1_001c: function () {
            var result = new TestResult(arguments.callee.name);
            // todo test data
            var a = BigMath.lng_create_2_1(999999, 10);
            a[1] = 0;
            a[2] = 999999;

            var c = BigMath.lng_mul_2_1(a, -999999, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 99999);
            result.assert(c[2] === 8000001);
            result.assert(c[3] === 0);
            return result;
        },
        test_mul_1_002a: function () {
            var result = new TestResult(arguments.callee.name);
            // todo test data
            var a = BigMath.lng_create_2_1(-999999, 10);
            a[1] = 0;
            a[2] = 999999;

            var c = BigMath.lng_mul_2_1(a, 999999, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 99999);
            result.assert(c[2] === 8000001);
            result.assert(c[3] === 0);
            return result;
        },
        test_mul_1_002b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-999999, 10);

            var c = BigMath.lng_mul_2_1(a, 0, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            result.assert(c[2] === 0);
            result.assert(c[3] === 0);
            return result;
        },
        test_mul_1_002c: function () {
            var result = new TestResult(arguments.callee.name);
            // todo test data
            var a = BigMath.lng_create_2_1(-999999, 10);
            a[1] = 0;
            a[2] = 999999;

            var c = BigMath.lng_mul_2_1(a, -999999, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 99999);
            result.assert(c[2] === 8000001);
            result.assert(c[3] === 0);
            return result;
        },
        test_mul_1_003a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(0, 10);

            var c = BigMath.lng_mul_2_1(a, 999999, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            result.assert(c[2] === 0);
            result.assert(c[3] === 0);
            return result;
        },
        test_mul_1_003b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(0, 10);

            var c = BigMath.lng_mul_2_1(a, 0, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            result.assert(c[2] === 0);
            result.assert(c[3] === 0);
            return result;
        },
        test_mul_1_003c: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(0, 10);

            var c = BigMath.lng_mul_2_1(a, -3, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            result.assert(c[1] === 0);
            result.assert(c[2] === 0);
            result.assert(c[3] === 0);
            return result;
        },

        // mul_2_2
        test_mul_001a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 1);
            for (var i = 2; i <= 10; i++) {
                result.assert(c[i] === 0);
            }
            return result;
        },
        test_mul_001b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 1);
            for (var i = 2; i <= 10; i++) {
                result.assert(c[i] === 0);
            }
            return result;
        },
        test_mul_001c: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(-1, 10);
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 1);
            for (var i = 2; i <= 10; i++) {
                result.assert(c[i] === 0);
            }
            return result;
        },
        test_mul_001d: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(-1, 10);
            var b = BigMath.lng_create_2_1(-1, 10);
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 1);
            for (var i = 2; i <= 10; i++) {
                result.assert(c[i] === 0);
            }
            return result;
        },
        test_mul_001e: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(0, 10);
            var b = BigMath.lng_create_2_1(-1, 10);
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            for (var i = 1; i <= 10; i++) {
                result.assert(c[i] === 0);
            }
            return result;
        },
        test_mul_001f: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(100, 10);
            var b = BigMath.lng_create_2_1(0, 10);
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) === 0);
            for (var i = 1; i <= 10; i++) {
                result.assert(c[i] === 0);
            }
            return result;
        },
        test_mul_002a: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(2, 10); // todo init
            a[2] = 0.4 * BigMath.BASE;
            var b = BigMath.lng_create_2_1(2, 10);
            b[2] = 0.4 * BigMath.BASE;
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 5);
            result.assert(c[2] === 7600000);
            return result;
        },
        test_mul_002b: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(2, 10);
            a[2] = 4;
            var b = BigMath.lng_create_2_1(2, 10);
            b[2] = 4;
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) > 0);
            result.assert(c[1] === 4);
            result.assert(c[2] === 16);
            result.assert(c[3] === 16);
            return result;
        },
        test_mul_002c: function () {
            var result = new TestResult(arguments.callee.name);
            var a = BigMath.lng_create_2_1(2, 10);
            a[2] = 0.4 * BigMath.BASE;
            var b = BigMath.lng_create_2_1(-2, 10);
            b[2] = 0.7 * BigMath.BASE;
            var c = BigMath.lng_mul_2_2(a, b, 10);

            result.assert(BigMath.lng_sign_2(c) < 0);
            result.assert(c[1] === 6);
            result.assert(c[2] === 4800000);
            return result;
        },
        test_mul_002d: function () {
            var result = new TestResult(arguments.callee.name);
            var data = this.dataProviders.getHardDies();
            var c = BigMath.lng_mul_2_2(data.a, data.b, data.len);

            result.assert(BigMath.toString(c, data.len) == data.mul_str);
            return result;
        }
    },
    dataProviders: {
        getHardDies: function () {
            var a = BigMath.lng_create_2_1(1, 10);
            var b = BigMath.lng_create_2_1(1, 10);
            a[2] = 2296115;
            a[3] = 0806726;
            a[4] = 3936856;
            a[5] = 7681346;
            a[6] = 4350344;
            a[7] = 5341890;
            a[8] = 1412545;
            a[9] = 8550267;
            a[10] = 7490859;
            a[11] = 2583055;
            a[12] = 6386741;
            a[13] = 3623520;
            a[14] = 9781510;

            b[2] = 3024769;
            b[3] = 2766955;
            b[4] = 4287752;
            b[5] = 8150002;
            b[6] = 7852294;
            b[7] = 5961334;
            b[8] = 7979465;
            b[9] = 4908920;
            b[10] = 1767296;
            b[11] = 8261540;
            b[12] = 1673674;
            b[13] = 1079913;
            b[14] = 5211870;
            // console.log(BigMath.toString(a, 10));
            // console.log(BigMath.toString(b, 10));
            // 1.229611508067263936856768134643503445341890141254585502677490859258305563867413623520978151
            // 1.302476927669554287752815000278522945961334797946549089201767296826154016736741079913521187

            var add_str = '2.5320884357368182246095831349220263913032249392011345918792581560844595806041547034344993380';
            var sub_str = '0.0728654196022903508960468656350195006194446566919635865242764375678484528693274563925430360';
            var mul_str = '1.6015406192545772992717670402330713377580503278086860173109942126429228428805724288332471892';
            return {
                len: 14,
                a: a,
                b: b,
                add_str: add_str,
                sub_str: sub_str,
                mul_str: mul_str
            }
        }
    },
    execute: function() {
        var results = [];
        for (var test in this.tests) {
            results.push(this.tests[test].call(this));
        }

        // Show successful
        var successful = results.filter(function (r) {return r.result}).length;
        console.log('%c' + 'Tests passed: ' + successful, 'color: ' + (successful > 0 ? 'green' : 'red'));

        // Show unsuccessful
        var unsuccessful = results.filter(function (r) {return !r.result});
        if (unsuccessful.length) {
            console.log('%c' + 'Tests failed: ' + unsuccessful.length, 'color: red');
            unsuccessful.forEach(function (r) {r.release()});
        }
    }
};
