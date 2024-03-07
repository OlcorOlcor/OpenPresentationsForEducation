const { expect, test } = require("@jest/globals");
const { Checker, Result } = require("../src/structureChecker");

const inlineElementArray = [
    { type: "text", content: ["Text, "] },
    { type: "bold", content: [{ type: "text", content: ["bolded text, "] }] },
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