const { expect, test } = require("@jest/globals");
const { ToHtmlFromFile, ToHtmlFromJson } = require("../src/index");
const path = require("path");
const fs = require("fs");
const prettier = require("@prettier/sync");

function formatHtml(html) {
    return prettier.format(html, { parser: 'html' });
}

const testJsonFile = path.join(__dirname, "./example.json");
const testHtmlFile = path.join(__dirname, "./example.html");

const inlineElementArray = [
    { type: "text", content: "Text, " },
    { type: "bold", content: [{ type: "text", content: "bolded text, " }] },
    { type: "italic", content: [{ type: "text", content: "italic text, " }] },
    {
        type: "boldItalic",
        content: [{ type: "text", content: "bolded italic text, " }],
    },
    { type: "code", content: [{ type: "text", content: "inline code." }] },
    { type: "link", address: "https://www.google.com", content: "Google" },
    { type: "image", address: "img.jpg", alias: "image" },
];
const inlineElementArrayResult =
    'Text, <strong>bolded text, </strong><em>italic text, </em><em><strong>bolded italic text, </strong></em><code>inline code.</code><a href="https://www.google.com">Google</a><img src="img.jpg" alt="image">';

test("Empty Json", () => {
    expect(ToHtmlFromJson([])).toBe("");
});

test("Simple paragraph", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "paragraph",
                        content: [{ type: "text", content: "Text" }],
                    },
                ],
            },
        ]),
    ).toBe(formatHtml("<p>Text</p>"));
});

test("Paragraph with Inline elements", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [{ type: "paragraph", content: inlineElementArray }],
            },
        ]),
    ).toBe(formatHtml("<p>" + inlineElementArrayResult + "</p>"));
});

test("Nested  Inline Elements", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "bold",
                                content: [
                                    { type: "text", content: "Bold text" },
                                    {
                                        type: "italic",
                                        content: [
                                            {
                                                type: "text",
                                                content: " also italic",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]),
    ).toBe(formatHtml("<p><strong>Bold text<em> also italic</em></strong></p>"));
});

test("Simple heading", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "heading",
                        level: 1,
                        content: [{ type: "text", content: "Text" }],
                    },
                ],
            },
        ]),
    ).toBe(formatHtml("<h1>Text</h1>"));
});

test("Heading with Inline elements", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    { type: "heading", level: 1, content: inlineElementArray },
                ],
            },
        ]),
    ).toBe(formatHtml("<h1>" + inlineElementArrayResult + "</h1>"));
});

test("Simple unordered list", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "list",
                        listType: "unordered",
                        items: [
                            {
                                type: "listItem",
                                content: [
                                    {
                                        type: "text",
                                        content: "First",
                                    },
                                ],
                            },
                            {
                                type: "listItem",
                                content: [
                                    {
                                        type: "text",
                                        content: "Second",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]),
    ).toBe(formatHtml("<ul><li>First</li><li>Second</li></ul>"));
});

test("Simple ordered list", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "list",
                        listType: "ordered",
                        items: [
                            {
                                type: "listItem",
                                content: [
                                    {
                                        type: "text",
                                        content: "First",
                                    },
                                ],
                            },
                            {
                                type: "listItem",
                                content: [
                                    {
                                        type: "text",
                                        content: "Second",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]),
    ).toBe(formatHtml("<ol><li>First</li><li>Second</li></ol>"));
});

test("List with inline elements", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "list",
                        listType: "unordered",
                        items: [
                            {
                                type: "listItem",
                                content: inlineElementArray,
                            },
                            {
                                type: "listItem",
                                content: [
                                    {
                                        type: "text",
                                        content: "Second",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]),
    ).toBe(formatHtml("<ul><li>" + inlineElementArrayResult + "</li><li>Second</li></ul>"));
});

test("Nested list", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "list",
                        listType: "unordered",
                        items: [
                            {
                                type: "list",
                                listType: "ordered",
                                items: [
                                    {
                                        type: "listItem",
                                        content: [
                                            {
                                                type: "text",
                                                content: "First",
                                            },
                                        ],
                                    },
                                    {
                                        type: "listItem",
                                        content: [
                                            {
                                                type: "text",
                                                content: "Second",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]),
    ).toBe(formatHtml("<ul><li><ol><li>First</li><li>Second</li></ol></li></ul>"));
});

test("Simple blockquote", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "blockquote",
                        content: [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "Paragraph content",
                                    },
                                ],
                            },
                            {
                                type: "list",
                                listType: "unordered",
                                items: [
                                    {
                                        type: "listItem",
                                        content: [
                                            {
                                                type: "text",
                                                content: "First",
                                            },
                                        ],
                                    },
                                    {
                                        type: "listItem",
                                        content: [
                                            {
                                                type: "text",
                                                content: "Second",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]),
    ).toBe(
        formatHtml("<blockquote><p>Paragraph content</p><ul><li>First</li><li>Second</li></ul></blockquote>"),
    );
});

test("Nested blockquotes", () => {
    expect(
        ToHtmlFromJson([
            {
                type: "slide",
                content: [
                    {
                        type: "blockquote",
                        content: [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "Paragraph content",
                                    },
                                ],
                            },
                            {
                                type: "blockquote",
                                content: [
                                    {
                                        type: "paragraph",
                                        content: [
                                            {
                                                type: "text",
                                                content:
                                                    "Inner paragraph content",
                                            },
                                        ],
                                    },
                                    {
                                        type: "list",
                                        listType: "unordered",
                                        items: [
                                            {
                                                type: "listItem",
                                                content: [
                                                    {
                                                        type: "text",
                                                        content: "First",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "listItem",
                                                content: [
                                                    {
                                                        type: "text",
                                                        content: "Second",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]),
    ).toBe(
        formatHtml("<blockquote><p>Paragraph content</p><blockquote><p>Inner paragraph content</p><ul><li>First</li><li>Second</li></ul></blockquote></blockquote>"),
    );
});

test("complex file", () => {
    let text = fs.readFileSync(testHtmlFile, "utf-8");
    expect(ToHtmlFromFile(testJsonFile)).toBe(formatHtml(text));
});
