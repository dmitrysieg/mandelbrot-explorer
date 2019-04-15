/**
 * Contracts:
 * * Unsupported values: x >= this.BASE (1e+10), everything above is truncated / overflowed.
 * * number[0] - sign flag (1, 0 or -1). Zero always has 0 sign flag;
 * * number[1] - integer part, < this.BASE;
 * * number[2..len] - fractional part.
 *
 * Procedural style for copying it to GLSL code subsequently.
 */
var BigMath = function () {

};

BigMath.prototype = {

    BASE: 1e+7,

    /**
     * Debug and test purposes.
     */
    toString: function(a, len) {
        var part_int = '' + (a[0] < 0 ? '-' : '') + a[1],
            part_frac = '';

        var i = len;
        while (a[i] == 0) {i--}

        for (; i > 1; i--) {
            part_frac = (this.BASE + a[i] + '').slice(-(this.BASE - 1 + '').length) + part_frac;
        }
        return part_int + (part_frac.length ? ('.' + part_frac) : '');
    },

    /**
     * Support only integer numbers X, abs(X) < this.BASE;
     */
    lng_create_2_1: function(b, len) {
        var result = new Array(len + 1);

        result[0] = b < 0 ? -1 : (b > 0 ? 1 : 0);
        result[1] = Math.abs(b);
        for (var i = 2; i <= len; i++) {
            result[i] = 0;
        }
        return result;
    },

    lng_sign_2: function (b) {
        return b[0];
    },

    lng_inv_2: function (a) {
        var result = Array.from(a);
        result[0] = -result[0];
        return result;
    },

    lng_abs_2: function (a) {
        var result = Array.from(a);
        result[0] = this.lng_sign_2(a) === 0 ? 0 : 1;
        return result;
    },

    // @private (not for testing)
    lng_cmp_abs_2_2: function (a, b, len) {
        for (var i = 1; i <= len; i++) {
            if (a[i] == b[i]) {
                continue;
            }
            return a[i] > b[i] ? 1 : -1;
        }
        return 0;
    },

    lng_cmp_2_2: function (a, b, len) {
        if (this.lng_sign_2(a) > 0 && this.lng_sign_2(b) > 0) {
            return this.lng_cmp_abs_2_2(a, b, len);
        }
        if (this.lng_sign_2(a) < 0 && this.lng_sign_2(b) < 0) {
            return -this.lng_cmp_abs_2_2(a, b, len);
        }
        return this._cmp(this.lng_sign_2(a), this.lng_sign_2(b));
    },

    /**
     * Contract: a >= b >= 0.
     */
    lng_add_abs_2_2: function (a, b, len) {
        var result = new Array(len + 1);
        result[0] = 1;
        var carry = 0.0;

        for (var i = len; i > 0; i--) {
            var vr = a[i] + b[i] + carry;
            result[i] = vr % this.BASE;
            carry = Math.floor(vr / this.BASE);
        }
        return result;
    },

    /**
     * Contract: a >= b >= 0.
     * Caution: result sign is not being set!
     */
    lng_sub_abs_2_2: function (a, b, len) {
        var result = new Array(len + 1);
        result[0] = 1;
        var uncarry = 0;
        var all_zero = true;

        for (var i = len; i >= 1; i--) {
            var ai = a[i] - uncarry >= 0 ? a[i] - uncarry : (i > 0 ? this.BASE - uncarry : a[i] - uncarry);
            var vr = ai - b[i];
            if (vr < 0 || a[i] - uncarry < 0) {
                uncarry = 1;
                if (vr < 0 && i > 0) {
                    vr = vr + this.BASE;
                }
            } else {
                uncarry = 0;
            }
            result[i] = vr % this.BASE;
            all_zero = all_zero && (result[i] === 0);
        }
        if (all_zero) {
            result[0] = 0;
        }
        return result;
    },

    lng_add_2_2: function (a, b, len) {

        // case of adding zero
        if (this.lng_sign_2(a) === 0 || this.lng_sign_2(b) === 0) {
            var non_zero = this.lng_sign_2(a) === 0 ? b : a; // or zero, if both zero.
            return Array.from(non_zero);
        }

        // case of different signs.
        if (this.lng_sign_2(a) * this.lng_sign_2(b) < 0) {

            if (this.lng_sign_2(a) > 0) {
                var t = a;
                a = b;
                b = t;
            }

            if (this.lng_cmp_abs_2_2(a, b, len) > 0) {
                return this.lng_inv_2(this.lng_sub_abs_2_2(a, b, len));
            } else {
                return this.lng_sub_abs_2_2(b, a, len);
            }
        }

        var result = this.lng_add_abs_2_2(a, b, len);

        result[0] = this.lng_sign_2(a);
        return result;
    },

    lng_sub_2_2: function (a, b, len) {

        // cases of subtracting zero or subtracting from zero.
        if (this.lng_sign_2(b) === 0) {
            return Array.from(a);
        }
        if (this.lng_sign_2(a) === 0) {
            return this.lng_inv_2(b);
        }

        // cases of opposite signs.
        if (this.lng_sign_2(a) * this.lng_sign_2(b) < 0) {
            var result = this.lng_add_abs_2_2(a, b, len);
            result[0] = a[0];
            return result;
        }

        // cases of same signs.
        if (this.lng_cmp_abs_2_2(a, b, len) >= 0) {
            var result = this.lng_sub_abs_2_2(a, b, len);
            result[0] = result[0] === 0 ? 0 : a[0];
            return result;
        }
        var result = this.lng_sub_abs_2_2(b, a, len);
        result[0] = result[0] === 0 ? 0 : -a[0];
        return result;
    },

    /**
     * Contract: this.BASE > b >= 0
     */
    lng_mul_2_1: function (a, b, len) {

        // zero case.
        if (b === 0) {
            return this.lng_create_2_1(0, len);
        }

        var result = new Array(len + 1);
        result[0] = a[0] * this._sign(b);
        var carry = 0;
        b = Math.abs(b);

        for (var i = len; i >= 1; i--) {
            var vr = a[i] * b + carry;
            carry = Math.floor(vr / this.BASE);
            result[i] = vr % this.BASE;
        }
        return result;
    },

    /**
     * Using naive algorithm with n^2 complexity.
     * Contract: a > 0, b > 0.
     */
    lng_mul_abs_2_2_n2: function (a, b, len) {
        var i_end = len;
        while (a[i_end] === 0) {i_end--}
        var j_end = len;
        while (b[j_end] === 0) {j_end--}

        var result = this.lng_create_2_1(0, 2 * len - 1);
        result[0] = 1;

        for (var i = i_end; i >= 1; i--) {
            var accum = this.lng_create_2_1(0, 2 * len - 1);
            var carry = 0;
            for (var j = j_end; j >= 1; j--) {
                var vr = a[i] * b[j] + carry;
                accum[i + j - 1] = vr % this.BASE;
                carry = Math.floor(vr / this.BASE);
            }
            if (i + j - 1 >= 1) {
                accum[i + j - 1] = carry;
            }
            result = this.lng_add_abs_2_2(result, accum, 2 * len - 1);
        }
        return result.slice(0, len + 1);
    },

    lng_mul_2_2: function (a, b, len) {

        // zero case.
        if (this.lng_sign_2(a) === 0 || this.lng_sign_2(b) === 0) {
            return this.lng_create_2_1(0, len);
        }

        var result = this.lng_mul_abs_2_2_n2(a, b, len);
        result[0] = this.lng_sign_2(a) * this.lng_sign_2(b);
        return result;
    },

    _sign: function(a) {
        return a > 0 ? 1 : (a < 0 ? -1 : 0);
    },
    _cmp: function (a, b) {
        return this._sign(a - b);
    }
};

BigMath = new BigMath();