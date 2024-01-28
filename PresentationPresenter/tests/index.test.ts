const { expect, test } = require('@jest/globals');
const { ToHtmlFromFile, ToHtmlFromJson } = require('../src/index');
const path = require('path');

const testFileName = path.join(__dirname, "./", "./example.json");

const inlineElementArray = [{ "type": "text", "content": "Text, "}, {"type": "bold", "content": [{"type": "text", "content": "bolded text, "}]}, {"type": "italic", "content": [{"type": "text", "content": "italic text, "}]}, {"type": "boldItalic", "content": [{"type": "text", "content": "bolded italic text."}]}];
const inlineElementArrayResult = "Text, <strong>bolded text, </strong><em>italic text, </em><em><strong>bolded italic text.</strong></em>";

test('Empty Json', () => {
    expect(ToHtmlFromJson([])).toBe("");
});

test('Simple paragraph', () => {
    expect(ToHtmlFromJson([{type: "slide", "content": [{"type": "paragraph", "content": [{ "type": "text", "content": "Text"}]}]}]))
    .toBe("<p>Text</p>");
});

test('Paragraph with Inline elements', () => {
    expect(ToHtmlFromJson([{type: "slide", "content": [{"type": "paragraph", "content": inlineElementArray}]}]))
    .toBe("<p>" + inlineElementArrayResult + "</p>");
});

test ('Nested  Inline Elements', () => {
    expect(ToHtmlFromJson([{type: "slide", "content": [{"type": "paragraph", "content": [{"type": "bold", "content": [{"type": "text", "content": "Bold text"}, {"type": "italic", "content": [{"type": "text", "content": " also italic"}]}]}]}]}]))
    .toBe("<p><strong>Bold text<em> also italic</em></strong></p>");
})

test('Simple heading', () => {
    expect(ToHtmlFromJson([{type: "slide", "content": [{"type": "heading", "level": 1, "content": [{ "type": "text", "content": "Text"}]}]}]))
    .toBe("<h1>Text</h1>");
});

test('Heading with Inline elements', () => {
    expect(ToHtmlFromJson([{type: "slide", "content": [{"type": "heading", "level": 1, "content": inlineElementArray}]}]))
    .toBe("<h1>" + inlineElementArrayResult + "</h1>")
});
