const { expect, test } = require("@jest/globals");
const { Checker, Result } = require("../src/structureChecker");

const inlineElementArray = [
    { type: "text", content: ["Text, "] },
    { type: "bold", content: [{ type: "text", content: ["bolded text, "] }, {type: "italic", content: [{ type: "text", content: ["italic text, "]}] }]},
    { type: "italic", content: [{ type: "text", content: ["italic text, "] }] },
    {
        type: "boldItalic",
        content: [{ type: "text", content: ["bolded italic text, "] }],
    },
    { type: "code", content: [{ type: "text", content: ["inline code."] }] },
    {
        type: "link",
        content: ["https://www.google.com"],
        attributes: { alias: "Google" },
    },
    { type: "image", content: ["img.jpg"], attributes: { alias: "image" } },
];

const correctResult = { success: true, errors: [] };

test("Empty Json", () => {
    let checker = new Checker();
    expect(checker.CheckJsonStructure([])).toEqual(correctResult);
});

test("Correct paragraph", () => {
    let checker = new Checker();
    let json = [
        {
            type: "slide",
            content: [
                {
                    type: "paragraph",
                    content: [{ type: "text", content: ["Text"] }],
                },
            ],
        },
    ]
    expect(checker.CheckJsonStructure(json)).toEqual(correctResult);
});

test("Correct heading", () => {
    let checker = new Checker();
    let json = [
        {
            type: "slide",
            content: [
                {
                    type: "heading",
                    content: [{ type: "text", content: ["Text"] }],
                    attributes: { level: 3 }
                }
            ]
        }
    ];
    expect(checker.CheckJsonStructure(json)).toEqual(correctResult);
});

test("Correct list element", () => {
    let checker = new Checker();
    let json = [
        {
            type: "slide",
            content: [
                {
                    type: "list",
                    content: [
                        {
                            type: "list",
                            content: [
                                {
                                    type: "listItem",
                                    content: [
                                        {
                                            type: "text",
                                            content: ["First"],
                                        },
                                    ],
                                },
                                {
                                    type: "listItem",
                                    content: [
                                        {
                                            type: "text",
                                            content: ["Second"],
                                        },
                                    ],
                                },
                            ],
                            attributes: {
                                listType: "ordered",
                            },
                        },
                    ],
                    attributes: {
                        listType: "unordered",
                    },
                },
            ],
        }
    ];
    expect(checker.CheckJsonStructure(json)).toEqual(correctResult);
});

test("Correct blockquotes", () => {
    let checker = new Checker();
    let json = [ {
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
                                content: ["Paragraph content"],
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
                                        content: [
                                            "Inner paragraph content",
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "list",
                                content: [
                                    {
                                        type: "listItem",
                                        content: [
                                            {
                                                type: "text",
                                                content: ["First"],
                                            },
                                        ],
                                    },
                                    {
                                        type: "listItem",
                                        content: [
                                            {
                                                type: "text",
                                                content: ["Second"],
                                            },
                                        ],
                                    },
                                ],
                                attributes: {
                                    listType: "unordered",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    }];
    expect(checker.CheckJsonStructure(json)).toEqual(correctResult);
});

test("Correct inline elements", () => {
    let checker = new Checker();
    expect(checker.CheckJsonStructure([{ type: "slide", content: [{type: "paragraph", content: inlineElementArray}] }])).toEqual(correctResult);
});

test("Missing attributes", () => {
    let checker = new Checker();
    let json = [
        {
            type: "slide",
            content: [
                {
                    type: "list",
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "text",
                                    content: ["Text"],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "heading",
                    content: [
                        {
                            type: "text",
                            content: ["Text"],
                        },
                    ],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: ["link"],
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "image",
                            content: ["img"],
                        }
                    ]
                }
            ]
        }
    ];
    let result = { success: false, errors: ["Element is missing a field: attributes", "Element is missing a field: attributes", "Element is missing a field: attributes", "Element is missing a field: attributes"] };
    expect(checker.CheckJsonStructure(json)).toEqual(result);
});

test("Missing type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: type"] };
    expect(checker.CheckJsonStructure([{content: []}])).toEqual(result);
});

test("Missing content", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: content"] };
    expect(checker.CheckJsonStructure([{ type: "slide" }])).toEqual(result);
});

test("Incorrect slide type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Type side is incorrect."] };
    expect(checker.CheckJsonStructure([{ type: "side", content: []}])).toEqual(result);
});

test("Incorrect outer element type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Type outer is incorrect."] };
    expect(checker.CheckJsonStructure([{ type: "slide", content: [{ type: "outer", content: []}]}])).toEqual(result);
});

test("Missing outer element type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: type"] };
    expect(checker.CheckJsonStructure([{ type: "slide", content: [{ content: []}]}])).toEqual(result);
});

test("Missing outer element content", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: content"] };
    expect(checker.CheckJsonStructure([{ type: "slide", content: [{ type: "paragraph"}]}])).toEqual(result);
})

test("Incorrect inline element type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Type inline is incorrect."] };
    expect(checker.CheckJsonStructure([{ type: "slide", content: [{ type: "paragraph", content: [{type: "inline", content: []}]}]}])).toEqual(result);
});

test("Missing inline element type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: type"] };
    expect(checker.CheckJsonStructure([{ type: "slide", content: [{ type: "paragraph", content: [{content: []}]}]}])).toEqual(result);
});

test("Missing alias in link", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: alias"]};
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "paragraph", content: [{type: "link", content: [], attributes: {}}]}]}])).toEqual(result);
});

test("Missing alias in image", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: alias"]};
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "paragraph", content: [{type: "image", content: [], attributes: {}}]}]}])).toEqual(result);
});

test("Missing content in text", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: content"]};
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "paragraph", content: [{type: "text"}]}]}])).toEqual(result);
});

test("Text content isn't a string", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Text element content can only contain string literals"]};
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "paragraph", content: [{type: "text", content: ["text", "string", 123]}]}]}])).toEqual(result);
});

test("Missing level in heading", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: level"] };
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "heading", content: [], attributes: {}}]}])).toEqual(result);
});

test("Level isn't an integer", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Level should be a positive integer."]};
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "heading", content: [], attributes: {level: -1}}]}])).toEqual(result);
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "heading", content: [], attributes: {level: "1"}}]}])).toEqual(result);
});

test("Missing list type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["Element is missing a field: listType"]};
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "list", content: [], attributes: {}}]}])).toEqual(result);
});

test("Incorrect list type", () => {
    let checker = new Checker();
    let result = { success: false, errors: ["List type list is incorrect."]};
    expect(checker.CheckJsonStructure([{type: "slide", content: [{type: "list", content: [], attributes: {listType: "list"}}]}])).toEqual(result);
});