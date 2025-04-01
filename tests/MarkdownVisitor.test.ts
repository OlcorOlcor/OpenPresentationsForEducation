import { expect, test } from 'vitest'
import { MarkdownVisitor } from '../src/Model/Visitors/MarkdownVisitor';
import * as pm from "../src/Model/PresentationModel";
function getSimpleVisitor(): MarkdownVisitor {
    return new MarkdownVisitor();
}

function getTextNode(text: string): pm.TextElement {
    return new pm.TextElement(text);
}

function getSimpleParagraph(content: pm.InlineElement[]): pm.ParagraphElement {
    return new pm.ParagraphElement(content, [], {});
}

test("text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitTextNode(getTextNode("simple"));
    expect(visitor.getResult()).toEqual("simple");
});

test("paragraph", () => {
    let visitor = getSimpleVisitor();
    visitor.visitParagraphNode(getSimpleParagraph([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("simple\n\n");
});

test("bold text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitBoldNode(new pm.BoldElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("**simple**");
});

test("italic text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitItalicNode(new pm.ItalicElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("*simple*");
});

test("code text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitCodeNode(new pm.CodeElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("`simple`");
});

test("horizontal line", () => {
    let visitor = getSimpleVisitor();
    visitor.visitHorizontalLineNode(new pm.HorizontalLineElement([], {}));
    expect(visitor.getResult()).toEqual("___\n\n");
});

test("table data", () => {
    let visitor = getSimpleVisitor();
    visitor.visitTableDataNode(new pm.TableDataElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("simple");
});

test("table heading", () => {
    let visitor = getSimpleVisitor();
    visitor.visitTableHeadingNode(new pm.TableHeadingElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("simple");
});

test("table row data", () => {
    let visitor = getSimpleVisitor();
    let row = new pm.TableRowElement([new pm.TableDataElement([getTextNode("first")]), new pm.TableDataElement([getTextNode("second")])]);
    visitor.visitTableRowNode(row);
    expect(visitor.getResult()).toEqual("| first | second |\n");
});

test("table row heading", () => {
    let visitor = getSimpleVisitor();
    let row = new pm.TableRowElement([new pm.TableHeadingElement([getTextNode("first")]), new pm.TableHeadingElement([getTextNode("second")])]);
    visitor.visitTableRowNode(row);
    expect(visitor.getResult()).toEqual("| first | second |\n| --- | --- |\n");
});

test("table", () => {
    let visitor = getSimpleVisitor();
    let row1 = new pm.TableRowElement([new pm.TableHeadingElement([getTextNode("11")]), new pm.TableHeadingElement([getTextNode("12")])]);
    let row2 = new pm.TableRowElement([new pm.TableDataElement([getTextNode("21")]), new pm.TableDataElement([getTextNode("22")])]);
    visitor.visitTableNode(new pm.TableElement([row1, row2], [], {}));
    expect(visitor.getResult()).toEqual("| 11 | 12 |\n| --- | --- |\n| 21 | 22 |\n\n");
});

test("image", () => {
    let visitor = getSimpleVisitor();
    let img = new pm.ImageElement("./img.png", "image");
    visitor.visitImageNode(img);
    expect(visitor.getResult()).toEqual("![image](./img.png)");
});

test("link", () => {
    let visitor = getSimpleVisitor();
    let link = new pm.LinkElement("www.google.com", "google");
    visitor.visitLinkNode(link);
    expect(visitor.getResult()).toEqual("[google](www.google.com)");
});

test("heading", () => {
    let visitor = getSimpleVisitor();
    let heading = new pm.HeadingElement(1, [getTextNode("heading")], [], {});
    visitor.visitHeadingNode(heading);
    expect(visitor.getResult()).toEqual("# heading\n");
});

test("list item", () => {
    let visitor = getSimpleVisitor();
    let item = new pm.ListItemElement([getTextNode("item")]);
    visitor.visitListItemNode(item);
    expect(visitor.getResult()).toEqual("item");
});

test("ordered list", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("ordered", [item1, item2], [], {});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("1. item1\n2. item2\n\n");
});

test("unordered list", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("unordered", [item1, item2], [], {});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("- item1\n- item2\n\n");
});

test("nested list", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("unordered", [item1, item2], [], {});
    let item3 = new pm.ListItemElement([getTextNode("item3")]);
    let list2 = new pm.ListElement("ordered", [item3, list], [], {});
    visitor.visitListNode(list2);
    expect(visitor.getResult()).toEqual("1. item3\n\t- item1\n\t- item2\n\n\n");
});

test("blockquote", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let blockquote = new pm.BlockQuoteElement([paragraph], [], {});
    visitor.visitBlockQuoteNode(blockquote);
    expect(visitor.getResult()).toEqual("> text\n\n");
});

test("section", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let section = new pm.Section("name", "value", [paragraph], [], {});
    visitor.visitSectionNode(section);
    expect(visitor.getResult()).toEqual("<!-- +name: value -->\n\ntext\n\n<!-- / -->\n\n")
});

test("slide", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let slide = new pm.SlideElement([paragraph], true, [], [], {}, {});
    visitor.visitSlideNode(slide);
    expect(visitor.getResult()).toEqual("text\n\n");
});

test("lane", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let slide = new pm.SlideElement([paragraph], true, [], [], {}, {});
    let lane = new pm.Lane([slide], "lane", true);
    visitor.visitLaneNode(lane);
    expect(visitor.getResult()).toEqual("text\n\n");
});

test("paragraph metadata", () => {
    let visitor = getSimpleVisitor();
    let paragraph = new pm.ParagraphElement([getTextNode("text")], [], {"meta": "data"});
    visitor.visitParagraphNode(paragraph);
    expect(visitor.getResult()).toEqual("<!-- meta: data -->\ntext\n\n")
});

test("heading metadata", () => {
    let visitor = getSimpleVisitor();
    let heading = new pm.HeadingElement(1, [getTextNode("text")], [], {"meta": "data"});
    visitor.visitHeadingNode(heading);
    expect(visitor.getResult()).toEqual("<!-- meta: data -->\n# text\n")
});

test("blockquote metadata", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let blockquote = new pm.BlockQuoteElement([paragraph], [], {"meta": "data"});
    visitor.visitBlockQuoteNode(blockquote);
    expect(visitor.getResult()).toEqual("<!-- meta: data -->\n> text\n\n");
});

test("section", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let section = new pm.Section("name", "value", [paragraph], [], {"meta": "data"});
    visitor.visitSectionNode(section);
    expect(visitor.getResult()).toEqual("<!-- meta: data -->\n<!-- +name: value -->\n\ntext\n\n<!-- / -->\n\n")
});

test("ordered list metadata", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("ordered", [item1, item2], [], {"meta": "data"});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("<!-- meta: data -->\n1. item1\n2. item2\n\n");
});

test("unordered list metadata", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("unordered", [item1, item2], [], {"meta": "data"});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("<!-- meta: data -->\n- item1\n- item2\n\n");
});

test("table metadata", () => {
    let visitor = getSimpleVisitor();
    let row1 = new pm.TableRowElement([new pm.TableHeadingElement([getTextNode("11")]), new pm.TableHeadingElement([getTextNode("12")])]);
    let row2 = new pm.TableRowElement([new pm.TableDataElement([getTextNode("21")]), new pm.TableDataElement([getTextNode("22")])]);
    visitor.visitTableNode(new pm.TableElement([row1, row2], [], {"meta": "data"}));
    expect(visitor.getResult()).toEqual("<!-- meta: data -->\n| 11 | 12 |\n| --- | --- |\n| 21 | 22 |\n\n");
});