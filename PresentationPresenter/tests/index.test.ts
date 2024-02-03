const { expect, test } = require('@jest/globals');
const { ToHtmlFromFile, ToHtmlFromJson } = require('../src/index');
const path = require('path');

const testFileName = path.join(__dirname, "./", "./example.json");

const inlineElementArray = [{ "type": "text", "content": "Text, "}, {"type": "bold", "content": [{"type": "text", "content": "bolded text, "}]}, {"type": "italic", "content": [{"type": "text", "content": "italic text, "}]}, {"type": "boldItalic", "content": [{"type": "text", "content": "bolded italic text, "}]}, {"type": "code", "content": [{"type": "text", "content": "inline code."}]}, {"type": "link", "address": "https://www.google.com", "content": "Google"}];
const inlineElementArrayResult = "Text, <strong>bolded text, </strong><em>italic text, </em><em><strong>bolded italic text, </strong></em><code>inline code.</code><a href=\"https://www.google.com\">Google</a>";

test('Empty Json', () => {
    expect(ToHtmlFromJson([])).toBe("");
});

test('Simple paragraph', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [{"type": "paragraph", "content": [{ "type": "text", "content": "Text"}]}]}]))
    .toBe("<p>Text</p>");
});

test('Paragraph with Inline elements', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [{"type": "paragraph", "content": inlineElementArray}]}]))
    .toBe("<p>" + inlineElementArrayResult + "</p>");
});

test ('Nested  Inline Elements', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [{"type": "paragraph", "content": [{"type": "bold", "content": [{"type": "text", "content": "Bold text"}, {"type": "italic", "content": [{"type": "text", "content": " also italic"}]}]}]}]}]))
    .toBe("<p><strong>Bold text<em> also italic</em></strong></p>");
})

test('Simple heading', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [{"type": "heading", "level": 1, "content": [{ "type": "text", "content": "Text"}]}]}]))
    .toBe("<h1>Text</h1>");
});

test('Heading with Inline elements', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [{"type": "heading", "level": 1, "content": inlineElementArray}]}]))
    .toBe("<h1>" + inlineElementArrayResult + "</h1>")
});

test('Simple unordered list', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [
        {"type": "list", 
        "listType": "unordered", 
        "items": [
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "text",
                        "content": "First"  
                    }   
                ]    
            },
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "text",
                        "content": "Second"  
                    }   
                ]    
            }
    ]}]}])).toBe("<ul><li>First</li><li>Second</li></ul>");
})

test('Simple ordered list', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [
        {"type": "list", 
        "listType": "ordered", 
        "items": [
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "text",
                        "content": "First"  
                    }   
                ]    
            },
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "text",
                        "content": "Second"  
                    }   
                ]    
            }
    ]}]}])).toBe("<ol><li>First</li><li>Second</li></ol>");
})

test('List with inline elements', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [
        {"type": "list", 
        "listType": "unordered", 
        "items": [
            {
                "type": "listItem",
                "content": inlineElementArray 
            },
            {
                "type": "listItem",
                "content": [
                    {
                        "type": "text",
                        "content": "Second"  
                    }   
                ]    
            }
    ]}]}])).toBe("<ul><li>" + inlineElementArrayResult + "</li><li>Second</li></ul>");
})

test('Nested list', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [
        {"type": "list", 
        "listType": "unordered", 
        "items": [
            {
                "type": "list",
                "listType": "ordered",
                "items": [
                    {
                        "type": "listItem",
                        "content": [
                            {
                                "type": "text",
                                "content": "First"  
                            }   
                        ]    
                    },
                    {
                        "type": "listItem",
                        "content": [
                            {
                                "type": "text",
                                "content": "Second"  
                            }   
                        ]    
                    }
                ]
            },
    ]}]}])).toBe("<ul><li><ol><li>First</li><li>Second</li></ol></li></ul>")
})

test('Simple blockquote', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [
        {
            "type": "blockquote",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "content": "Paragraph content"
                        }
                    ]
                },
                {
                    "type": "list",
                    "listType": "unordered",
                    "items": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "text",
                                    "content": "First"
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "text",
                                    "content": "Second"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]}])).toBe("<blockquote><p>Paragraph content</p><ul><li>First</li><li>Second</li></ul></blockquote>");
})

test('Nested blockquotes', () => {
    expect(ToHtmlFromJson([{"type": "slide", "content": [
        {
            "type": "blockquote",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "content": "Paragraph content"
                        }
                    ]
                },
                {
                    "type": "blockquote",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "content": "Inner paragraph content"
                                }
                            ]
                        },
                        {
                            "type": "list",
                            "listType": "unordered",
                            "items": [
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "text",
                                            "content": "First"
                                        }
                                    ]
                                },
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "text",
                                            "content": "Second"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ]}])).toBe("<blockquote><p>Paragraph content</p><blockquote><p>Inner paragraph content</p><ul><li>First</li><li>Second</li></ul></blockquote></blockquote>");
})