import { expect, test } from 'vitest'
import { MarkdownParser } from "../src/Model/MarkdownParser";
import * as pt from "../src/Model/PresentationTypes";

function getBaseResult(): pt.Slide {
    return {type: "slide", content: [], attributes: { frontMatter: {}, globalMetadataTags: [], metadata: {}, refs: [] }};
};

function getBaseParagraph(): pt.Paragraph {
    return {type: "paragraph", content: [], attributes: { globalMetadataTags: [], metadata: {} }};
};

function getBaseHeading(): pt.HeadingElement {
    return {type: "heading", content: [], attributes: {level: 1, globalMetadataTags: [], metadata: {}}};
}

function getListItem(): pt.ListItem {
    return {type: "listItem", content: []};
}

function getTableData(content: string): pt.TableData {
    return {type: "tableData", content: [getText(content)]};
}

function getTableHeading(content: string): pt.TableHeading {
    return {type: "tableHeading", content: [getText(content)]};
}

function getTableRow(): pt.TableRow {
    return {type: "tableRow", content: []};
}

function getText(text: string): pt.Text {
    return {type: "text", content: [text]};
}


const parser = new MarkdownParser();

test("simple text", () => {
    const parsedSlide = parser.parseMarkdown("text");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push(getText("text"));
    expect(parsedSlide).toEqual(expected);
});


test("italic annotation", () => {
    const parsedSlide = parser.parseMarkdown("*text*");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push({type: "italic", content: [getText("text")]});
    expect(parsedSlide).toEqual(expected);
});

test("bold annotation", () => {
    const parsedSlide = parser.parseMarkdown("**text**");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push({type: "bold", content: [getText("text")]});
    expect(parsedSlide).toEqual(expected);
});

test("bold italic annotation", () => {
    const parsedSlide = parser.parseMarkdown("***text***");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push({type: "italic", content: [{type: "bold", content: [getText("text")]}]});
    expect(parsedSlide).toEqual(expected);
});

test("link", () => {
    const parsedSlide = parser.parseMarkdown("[example](www.example.com)");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push({type: "link", content: ["www.example.com"], attributes: {alias: "example"}});
    expect(parsedSlide).toEqual(expected);
});

test("image", () => {
    const parsedSlide = parser.parseMarkdown("![title](./img/image.png)");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push({type: "image", content: ["./img/image.png"], attributes: {alias: "title"}});
    expect(parsedSlide).toEqual(expected);
});

test("code", () => {
    const parsedSlide = parser.parseMarkdown("`let example = 0;`");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push({type: "code", content: [getText("let example = 0;")]});
    expect(parsedSlide).toEqual(expected);
});

test("heading level 1", () => {
    const parsedSlide = parser.parseMarkdown("# title");
    let expected = getBaseResult();
    expected.content.push(getBaseHeading());
    (expected.content[0] as pt.HeadingElement).content.push(getText("title"));
    expect(parsedSlide).toEqual(expected);
});

test("heading level 6", () => {
    const parsedSlide = parser.parseMarkdown("###### title");
    let expected = getBaseResult();
    expected.content.push(getBaseHeading());
    (expected.content[0] as pt.HeadingElement).attributes.level = 6;
    (expected.content[0] as pt.HeadingElement).content.push(getText("title"));
    expect(parsedSlide).toEqual(expected);
});

test("heading level 7 (should be paragraph)", () => {
    const parsedSlide = parser.parseMarkdown("####### title");
    let expected = getBaseResult();
    expected.content.push(getBaseParagraph());
    (expected.content[0] as pt.Paragraph).content.push(getText("####### title"));
    expect(parsedSlide).toEqual(expected);
});

test("ordered list", () => {
    const parsedSlide = parser.parseMarkdown("1. first\n2. second\n3. third");
    let expected = getBaseResult();
    const list = {type: "list", content: [getListItem(), getListItem(), getListItem()], attributes: {globalMetadataTags: [], metadata: {}, listType: "ordered"}};
    list.content[0].content.push(getText("first"));
    list.content[1].content.push(getText("second"));
    list.content[2].content.push(getText("third"));
    expected.content.push(list);
    expect(parsedSlide).toEqual(expected);
});

test("unordered list", () => {
    const parsedSlide = parser.parseMarkdown("- first\n- second\n- third");
    let expected = getBaseResult();
    const list = {type: "list", content: [getListItem(), getListItem(), getListItem()], attributes: {globalMetadataTags: [], metadata: {}, listType: "unordered"}};
    list.content[0].content.push(getText("first"));
    list.content[1].content.push(getText("second"));
    list.content[2].content.push(getText("third"));
    expected.content.push(list);
    expect(parsedSlide).toEqual(expected);
});

test("nested list", () => {
    const parsedSlide = parser.parseMarkdown("- first\n\t1. first inner\n\t 2. second inner\n- third");
    let expected = getBaseResult();
    const list = {type: "list", content: [getListItem(), {type: "list", content: [getListItem(), getListItem()], attributes: {globalMetadataTags: [], metadata: {}, listType: "ordered"}}, getListItem()], attributes: {globalMetadataTags: [], metadata: {}, listType: "unordered"}};
    (list.content[0] as pt.ListItem).content.push(getText("first"));
    const innerList = list.content[1];
    (innerList.content[0] as pt.ListItem).content.push(getText("first inner"));
    (innerList.content[1] as pt.ListItem).content.push(getText("second inner"));
    (list.content[2] as pt.ListItem).content.push(getText("third"));
    expected.content.push(list);
    expect(parsedSlide).toEqual(expected);
});

test("blockquote paragraph", () => {
    const parsedSlide = parser.parseMarkdown("> text");
    let expected = getBaseResult();
    expected.content.push({type: "blockquote", content: [], attributes: {globalMetadataTags: [], metadata: {}}});
    let paragraph = getBaseParagraph(); 
    paragraph.content.push(getText("text"));
    (expected.content[0] as pt.BlockQuote).content.push(paragraph);
    expect(parsedSlide).toEqual(expected);
});

test("blockquote heading", () => {
    const parsedSlide = parser.parseMarkdown("> # text");
    let expected = getBaseResult();
    expected.content.push({type: "blockquote", content: [], attributes: {globalMetadataTags: [], metadata: {}}});
    let heading = getBaseHeading(); 
    heading.content.push(getText("text"));
    (expected.content[0] as pt.BlockQuote).content.push(heading);
    expect(parsedSlide).toEqual(expected);
});

test("blockquote list", () => {
    const parsedSlide = parser.parseMarkdown("> - item 1\n> - item 2");
    let expected = getBaseResult();
    expected.content.push({type: "blockquote", content: [], attributes: {globalMetadataTags: [], metadata: {}}});
    let list = {type: "list", content: [getListItem(), getListItem()], attributes: {globalMetadataTags: [], metadata: {}, listType: "unordered"}};
    list.content[0].content.push(getText("item 1"));
    list.content[1].content.push(getText("item 2"));
    (expected.content[0] as pt.BlockQuote).content.push(list);
    expect(parsedSlide).toEqual(expected);
});

test("table", () => {
    const parsedSlide = parser.parseMarkdown("| heading 1 | heading 2 |\n| --- | --- |\n| text 1 | text 2 |");
    let expected = getBaseResult();
    let table = {type: "table", content: [getTableRow(), getTableRow()], attributes: {globalMetadataTags: [], metadata: {}}};
    let row1 = table.content[0];
    row1.content.push(getTableHeading("heading 1"));
    row1.content.push(getTableHeading("heading 2"));
    let row2 = table.content[1];
    row2.content.push(getTableData("text 1"));
    row2.content.push(getTableData("text 2"));
    expected.content.push(table);
    expect(parsedSlide).toEqual(expected);
});

test("front matter", () => {
   const parsedSlide = parser.parseMarkdown("---\nlayout: column_2\n---\n");
   let expected = getBaseResult();
   expected.attributes.frontMatter.layout = "column_2";
   expect(parsedSlide).toEqual(expected);
});

test("paragraph metadata", () => {
    const parsedSlide = parser.parseMarkdown("<!-- test: meta -->\ntext");
    let expected = getBaseResult();
    let paragraph = {type: "paragraph", content: [getText("text")], attributes: {globalMetadataTags: [], metadata: {test: "meta"}}};
    expected.content.push(paragraph);
    expect(parsedSlide).toEqual(expected);
});

test("heading metadata", () => {
    const parsedSlide = parser.parseMarkdown("<!-- test: meta -->\n# title");
    let expected = getBaseResult();
    let heading = {type: "heading", content: [getText("title")], attributes: {level: 1, globalMetadataTags: [], metadata: {test: "meta"}}};
    expected.content.push(heading);
    expect(parsedSlide).toEqual(expected);
});

test("list metadata", () => {
    const parsedSlide = parser.parseMarkdown("<!-- test: meta-->\n- item 1\n- item 2");
    let expected = getBaseResult();
    let list = {type: "list", content: [getListItem(), getListItem()], attributes: {listType: "unordered", globalMetadataTags: [], metadata: {test: "meta"}}};
    list.content[0].content.push(getText("item 1"));
    list.content[1].content.push(getText("item 2"));
    expected.content.push(list);
    expect(parsedSlide).toEqual(expected);
});

test("blockquote metadata", () => {
    const parsedSlide = parser.parseMarkdown("<!-- test: meta-->\n> text");
    let expected = getBaseResult();
    let blockquote: pt.BlockQuote = {type: "blockquote", content: [], attributes: {globalMetadataTags: [], metadata: {test: "meta"}}};
    let paragraph = getBaseParagraph();
    paragraph.content.push(getText("text"));
    blockquote.content.push(paragraph);
    expected.content.push(blockquote);
    expect(parsedSlide).toEqual(expected);
});