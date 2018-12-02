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
    const execTestData = [
        { str: "0002112300", chars: "0" , expected: "21123" },
        { str: "abcabcabpozdrobcabcabc", chars: "abc" , expected: "abpozdrobc" },
        { str: "   2137  ", chars: undefined , expected: "2137" },
        { str: "   2137  ", chars: null , expected: "2137" },
        { str: "   2137  ", chars: {} , expected: "2137" },
    ];
    execTestData.forEach(({ str, chars, expected }) => {
        const jsonChars = JSON.stringify(chars);
        it(`result of "${str}".trim(${jsonChars}) should be "${expected}"`, () => {
            const input = `const s = "${str}".trim(${jsonChars});`;
            const { code } = transform(input, { plugins: [ plugin ] });
            const f = new Function(`
                ${code};
                return s;
            `);
            assert.equal(f(), expected);
        });
    });
    it(`result of "  jp2   ".trim() should be "jp2"`, () => {
        const input = `const s = "jp2".trim();`;
        const { code } = transform(input, { plugins: [ plugin ] });
        const f = new Function(`
                ${code};
                return s;
            `);
        assert.equal(f(), "jp2");
    });
});
