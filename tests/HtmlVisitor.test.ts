import { expect, test } from 'vitest'
import { HtmlVisitor } from '../src/Model/Visitors/HtmlVisitor';
import * as pm from "../src/Model/PresentationModel";
function getSimpleVisitor(): HtmlVisitor {
    return new HtmlVisitor(false, [], []);
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
    expect(visitor.getResult()).toEqual("<p>simple</p>");
});

test("bold text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitBoldNode(new pm.BoldElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("<strong>simple</strong>");
});

test("italic text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitItalicNode(new pm.ItalicElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("<em>simple</em>");
});

test("code text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitCodeNode(new pm.CodeElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("<code>simple</code>");
});

test("horizontal line", () => {
    let visitor = getSimpleVisitor();
    visitor.visitHorizontalLineNode(new pm.HorizontalLineElement([], {}));
    expect(visitor.getResult()).toEqual("<hr />");
});

test("table data", () => {
    let visitor = getSimpleVisitor();
    visitor.visitTableDataNode(new pm.TableDataElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("<td>simple</td>");
});

test("table heading", () => {
    let visitor = getSimpleVisitor();
    visitor.visitTableHeadingNode(new pm.TableHeadingElement([getTextNode("simple")]));
    expect(visitor.getResult()).toEqual("<th>simple</th>");
});

test("table row data", () => {
    let visitor = getSimpleVisitor();
    let row = new pm.TableRowElement([new pm.TableDataElement([getTextNode("first")]), new pm.TableDataElement([getTextNode("second")])]);
    visitor.visitTableRowNode(row);
    expect(visitor.getResult()).toEqual("<tr><td>first</td><td>second</td></tr>");
});

test("table row heading", () => {
    let visitor = getSimpleVisitor();
    let row = new pm.TableRowElement([new pm.TableHeadingElement([getTextNode("first")]), new pm.TableHeadingElement([getTextNode("second")])]);
    visitor.visitTableRowNode(row);
    expect(visitor.getResult()).toEqual("<tr><th>first</th><th>second</th></tr>");
});

test("table row mix", () => {
    let visitor = getSimpleVisitor();
    let row = new pm.TableRowElement([new pm.TableHeadingElement([getTextNode("first")]), new pm.TableDataElement([getTextNode("second")])]);
    visitor.visitTableRowNode(row);
    expect(visitor.getResult()).toEqual("<tr><th>first</th><td>second</td></tr>");
});

test("table", () => {
    let visitor = getSimpleVisitor();
    let row1 = new pm.TableRowElement([new pm.TableHeadingElement([getTextNode("11")]), new pm.TableHeadingElement([getTextNode("12")])]);
    let row2 = new pm.TableRowElement([new pm.TableDataElement([getTextNode("21")]), new pm.TableDataElement([getTextNode("22")])]);
    visitor.visitTableNode(new pm.TableElement([row1, row2], [], {}));
    expect(visitor.getResult()).toEqual("<table><tr><th>11</th><th>12</th></tr><tr><td>21</td><td>22</td></tr></table>");
});

test("image", () => {
    let visitor = getSimpleVisitor();
    let img = new pm.ImageElement("./img.png", "image");
    visitor.visitImageNode(img);
    expect(visitor.getResult()).toEqual("<img src=\"./img.png\" alt=\"image\">");
});

test("link", () => {
    let visitor = getSimpleVisitor();
    let link = new pm.LinkElement("www.google.com", "google");
    visitor.visitLinkNode(link);
    expect(visitor.getResult()).toEqual("<a href=\"www.google.com\">google</a>");
});

test("heading", () => {
    let visitor = getSimpleVisitor();
    let heading = new pm.HeadingElement(1, [getTextNode("heading")], [], {});
    visitor.visitHeadingNode(heading);
    expect(visitor.getResult()).toEqual("<h1>heading</h1>");
});

test("list item", () => {
    let visitor = getSimpleVisitor();
    let item = new pm.ListItemElement([getTextNode("item")]);
    visitor.visitListItemNode(item);
    expect(visitor.getResult()).toEqual("<li>item</li>");
});

test("ordered list", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("ordered", [item1, item2], [], {});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("<ol><li>item1</li><li>item2</li></ol>");
});

test("unordered list", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("unordered", [item1, item2], [], {});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("<ul><li>item1</li><li>item2</li></ul>");
});

test("nested list", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("unordered", [item1, item2], [], {});
    let item3 = new pm.ListItemElement([getTextNode("item3")]);
    let list2 = new pm.ListElement("ordered", [item3, list], [], {});
    visitor.visitListNode(list2);
    expect(visitor.getResult()).toEqual("<ol><li>item3</li><ul><li>item1</li><li>item2</li></ul></ol>");
});

test("blockquote", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let blockquote = new pm.BlockQuoteElement([paragraph], [], {});
    visitor.visitBlockQuoteNode(blockquote);
    expect(visitor.getResult()).toEqual("<blockquote><p>text</p></blockquote>");
});

test("section", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let section = new pm.Section("name", "value", [paragraph], [], {});
    visitor.visitSectionNode(section);
    expect(visitor.getResult()).toEqual("<div data-name=value><p>text</p></div>")
});

test("slide", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let slide = new pm.SlideElement([paragraph], true, [], [], {}, {});
    visitor.visitSlideNode(slide);
    expect(visitor.getResult()).toEqual("<div><p>text</p></div>");
});

test("lane", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let slide = new pm.SlideElement([paragraph], true, [], [], {}, {});
    let lane = new pm.Lane([slide], "lane");
    visitor.visitLaneNode(lane);
    expect(visitor.getResult()).toEqual("<div data-lane=lane><div><p>text</p></div></div>");
});

test("paragraph metadata", () => {
    let visitor = getSimpleVisitor();
    let paragraph = new pm.ParagraphElement([getTextNode("text")], [], {"meta": "data"});
    visitor.visitParagraphNode(paragraph);
    expect(visitor.getResult()).toEqual("<p data-meta=data>text</p>")
});

test("heading metadata", () => {
    let visitor = getSimpleVisitor();
    let heading = new pm.HeadingElement(1, [getTextNode("text")], [], {"meta": "data"});
    visitor.visitHeadingNode(heading);
    expect(visitor.getResult()).toEqual("<h1 data-meta=data>text</h1>")
});

test("blockquote metadata", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let blockquote = new pm.BlockQuoteElement([paragraph], [], {"meta": "data"});
    visitor.visitBlockQuoteNode(blockquote);
    expect(visitor.getResult()).toEqual("<blockquote data-meta=data><p>text</p></blockquote>");
});

test("section", () => {
    let visitor = getSimpleVisitor();
    let paragraph = getSimpleParagraph([getTextNode("text")]);
    let section = new pm.Section("name", "value", [paragraph], [], {"meta": "data"});
    visitor.visitSectionNode(section);
    expect(visitor.getResult()).toEqual("<div data-name=value data-meta=data><p>text</p></div>")
});

test("ordered list metadata", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("ordered", [item1, item2], [], {"meta": "data"});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("<ol data-meta=data><li>item1</li><li>item2</li></ol>");
});

test("unordered list metadata", () => {
    let visitor = getSimpleVisitor();
    let item1 = new pm.ListItemElement([getTextNode("item1")]);
    let item2 = new pm.ListItemElement([getTextNode("item2")]);
    let list = new pm.ListElement("unordered", [item1, item2], [], {"meta": "data"});
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual("<ul data-meta=data><li>item1</li><li>item2</li></ul>");
});

test("table metadata", () => {
    let visitor = getSimpleVisitor();
    let row1 = new pm.TableRowElement([new pm.TableHeadingElement([getTextNode("11")]), new pm.TableHeadingElement([getTextNode("12")])]);
    let row2 = new pm.TableRowElement([new pm.TableDataElement([getTextNode("21")]), new pm.TableDataElement([getTextNode("22")])]);
    visitor.visitTableNode(new pm.TableElement([row1, row2], [], {"meta": "data"}));
    expect(visitor.getResult()).toEqual("<table data-meta=data><tr><th>11</th><th>12</th></tr><tr><td>21</td><td>22</td></tr></table>");
});