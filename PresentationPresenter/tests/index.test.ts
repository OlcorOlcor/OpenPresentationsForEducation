const { expect, test } = require('@jest/globals');
const { ToHtmlFromFile } = require('../src/index');
const path = require('path');

const testFileName = path.join(__dirname, "./", "./example.json");

test('test', () => {
    expect(ToHtmlFromFile(testFileName)).toBe("");
});