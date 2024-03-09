import * as pm from "../src/presentationModel";
import { expect, test } from "@jest/globals";
import { HtmlVisitor, MarkdownVisitor } from "../src/Visitors";

test("Html: Empty slide", () => {
    let presentation = new pm.Presentation([]);
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation);
    expect(visitor.getResult()).toBe("");
});

test("Html: Paragraph", () => {
    let presentation = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.TextElement("test")])])]);
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation);
    expect(visitor.getResult()).toBe("<p>test</p>");
});

test("Html: Heading", () => {
    let presentation = new pm.Presentation([new pm.SlideElement([new pm.HeadingElement(1, [new pm.TextElement("test")]), new pm.HeadingElement(6, [new pm.TextElement("test")])])]);
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation);
    expect(visitor.getResult()).toBe("<h1>test</h1><h6>test</h6>");
});

test("Html: Blockquote", () => {
    let presentation = new pm.Presentation([new pm.SlideElement([new pm.BlockQuoteElement([new pm.ParagraphElement([new pm.TextElement("text")])])])]);
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation);
    expect(visitor.getResult()).toBe("<blockquote><p>text</p></blockquote>");
});

test("Html: List", () => {
    let presentation = new pm.Presentation([new pm.SlideElement([new pm.ListElement("ordered", [new pm.ListItemElement([new pm.TextElement("text 1")]), new pm.ListElement("unoredered", [new pm.ListItemElement([new pm.TextElement("text 12")]), new pm.ListItemElement([new pm.TextElement("text 22")])])])])]);
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation);
    expect(visitor.getResult()).toBe("<ol><li>text 1</li><ul><li>text 12</li><li>text 22</li></ul></ol>");
});

test("Html: inline elements", () => {
    let presentation = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.LinkElement("link", "alias"), new pm.ImageElement("image", "alias"), new pm.BoldElement([new pm.TextElement("text")]), new pm.ItalicElement([new pm.TextElement("text")]), new pm.BoldItalicElement([new pm.TextElement("text")]), new pm.CodeElement([new pm.TextElement("text")])])])]);
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation);
    expect(visitor.getResult()).toBe("<p><a href=\"link\">alias</a><img src=\"image\" alt=\"alias\"><strong>text</strong><em>text</em><strong><em>text</em></strong><code>text</code></p>");
});

test("Html: Multiple presentations", () => {
    let presentation1 = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.TextElement("first")])])]);
    let presentation2 = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.TextElement("second")])])]);
    let visitor = new HtmlVisitor();
    visitor.visitPresentationNode(presentation1);
    expect(visitor.getResult()).toBe("<p>first</p>");
    visitor.visitPresentationNode(presentation2);
    expect(visitor.getResult()).toBe("<p>second</p>");
});