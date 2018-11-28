import assert from 'assert';
import { transformFileSync, transform } from 'babel-core';
import plugin from '../src';

describe('Better string trim function.', () => {
    it("shouldn't change anything if method is not trim", () => {
        const input = 'const s = "   This is a string  ".toLowerCase();';
        const { code } = transform(input, { plugins: [ plugin ] });
        assert(code.includes(input));
    });
    it("shouldn't change anything if no argument provided for trim()", () => {
        const input = 'const s = "   This is a string  ".trim();';
        const { code } = transform(input, { plugins: [ plugin ] });
        assert(code.includes(input));
    });
    it("if argument provided for trim then __better_trim__ function should be used", () => {
        const input = 'const s = "0002112300".trim("0");';
        const { code } = transform(input, { plugins: [ plugin ] });
        assert(code.includes('const s = __better_trim__("0002112300", "0");'));
    });
});
