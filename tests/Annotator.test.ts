import { AreaParenthesizationError, annotateText } from "../src/Annotator";

test("Regular text", () => {
    let text = "Hello World!";
    expect(annotateText([text])).toEqual(text);
});

test("Single heading 1", () => {
    expect(annotateText(["# Hello World!"])).toEqual("<heading1>Hello World!</heading1>");
});

test("Single heading 6", () => {
    expect(annotateText(["###### Hello World!"])).toEqual("<heading6>Hello World!</heading6>");
});

test("Heading levels", () => {
    let text = "# text\n## text\n### text\n#### text\n##### text\n###### text";
    let expectedText = "<heading1>text</heading1>\n<heading2>text</heading2>\n<heading3>text</heading3>\n<heading4>text</heading4>\n<heading5>text</heading5>\n<heading6>text</heading6>";
    expect(annotateText([text])).toEqual(expectedText);
});

test("Too many hashtags", () => {
    let text = "######## Hello World";
    expect(annotateText([text])).toEqual(text);
});

test("Leading white characters", () => {
    expect(annotateText(["   # Hello World!"])).toEqual("<heading1>Hello World!</heading1>");
});

test("Leading white characters with normal text", () => {
    let text = "   text";
    expect(annotateText([text])).toEqual(text);
});

test("Hashtag in text", () => {
    let text = "text # text";
    expect(annotateText([text])).toEqual(text);
});

test("Hashtag in heading", () => {
    let text = "# with #";
    expect(annotateText([text])).toEqual("<heading1>with #</heading1>");
});

test("Simple area", () => {
    let arr = [{ name: "Open", id: "1" }, { name: "Open" }];
    expect(annotateText(arr)).toEqual("<Open></Open>");
});

test("Many areas", () => {
    let arr = [{ name: "First", id: "1" }, { name: "Second", id: "2" }, { name: "Third", id: "3" }, { name: "Third" }, { name: "Second" }, { name: "First" } ];
    expect(annotateText(arr)).toEqual("<First><Second><Third></Third></Second></First>");
});

test("Overlapping area", () => {
    let arr = [{ name: "First", id: "1" }, { name: "Second", id: "2" }, { name: "First" }, { name: "Second" }]
    expect(annotateText(arr)).toEqual("<First><Second></First></Second>");
});

test("Text in area", () => {
    let arr = [{ name: "First", id: "1"}, "Hello World!", { name: "First" }];
    expect(annotateText(arr)).toEqual("<First>Hello World!</First>");
});

test("Text around area", () => {
    let arr = ["Hello", { name: "First", id: "1" }, "World", { name: "First" }, "!"];
    expect(annotateText(arr)).toEqual("Hello<First>World</First>!");
})

test("Multiline area", () => {
    let arr = [{ name: "First", id: "1" }, "\nText\n", { name: "First" }];
    expect(annotateText(arr)).toEqual("<First>\nText\n</First>");
})

test("Unclosed area", () => {
    let arr = [{ name: "Open", id: "1" }];
    expect(() => annotateText(arr)).toThrow(AreaParenthesizationError);
});

test("Unopened area", () => {
    let arr = [{ name: "Close" }];
    expect(() => annotateText(arr)).toThrow(AreaParenthesizationError);
});