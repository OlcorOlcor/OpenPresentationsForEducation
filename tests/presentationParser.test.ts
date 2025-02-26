import { PresentationParser } from "../src/presentationParser";
import * as pm from "../src/presentationModel";
import {expect, test} from "@jest/globals";

test("empty slides", () => {
    let slides = [];
    let parser = new PresentationParser(slides);
    expect(parser.GetPresentation()).toEqual(new pm.Presentation(slides));
});

test("Paragraph", () => {
    let slides = [{type: "slide", content: [{type: "paragraph", content: [{type: "text", content: ["text"]}]}]}];
    let parser = new PresentationParser(slides);

    let slide = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.TextElement("text")])])]);

    expect(parser.GetPresentation()).toEqual(slide);
});

test("Heading", () => {
    let slides = [{type: "slide", content: [{type: "heading", content: [{type: "text", content: ["text"]}], attributes: {level: 1}}]}];
    let parser = new PresentationParser(slides);

    let slide = new pm.Presentation([new pm.SlideElement([new pm.HeadingElement(1, [new pm.TextElement("text")])])]);

    expect(parser.GetPresentation()).toEqual(slide);
});

test("Inline Elements", () => {
    let slides = [{type: "slide", content: [{type: "paragraph", content: [{ type: "bold", content: [{type: "text", content: ["text"]}]}, { type: "italic", content: [{type: "text", content: ["text"]}]}, { type: "boldItalic", content: [{type: "text", content: ["text"]}]}, {type: "code", content: [{type: "text", content: ["text"]}]}]}]}];
    let parser = new PresentationParser(slides);

    let slide = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.BoldElement([new pm.TextElement("text")]), new pm.ItalicElement([new pm.TextElement("text")]), new pm.BoldItalicElement([new pm.TextElement("text")]), new pm.CodeElement([new pm.TextElement("text")])])])]);

    expect(parser.GetPresentation()).toEqual(slide);
});

test("Blockquote Element", () => {
    let slides = [{type: "slide", content: [{type: "blockquote", content: [{type: "paragraph", content: [{type: "text", content: ["text"]}]}, {type: "paragraph", content: [{type: "text", content: ["text"]}]}]}]}];
    let parser = new PresentationParser(slides);

    let slide = new pm.Presentation([new pm.SlideElement([new pm.BlockQuoteElement([ new pm.ParagraphElement([new pm.TextElement("text")]), new pm.ParagraphElement([new pm.TextElement("text")])])])]);

    expect(parser.GetPresentation()).toEqual(slide);
});

test("List Element", () => {
    let slides = [{type: "slide", content: [{type: "list", content: [{type: "listItem", content: [{type: "text", content: ["first item"]}]}, {type: "list", content: [{type: "listItem", content: [{type: "text", content: ["second item"]}]}, {type: "listItem", content: [{type: "text", content: ["third item"]}]} ], attributes: {listType: "unordered"}}], attributes: {listType: "ordered"}}]}];
    let parser = new PresentationParser(slides);

    let slide = new pm.Presentation([new pm.SlideElement([new pm.ListElement("ordered", [new pm.ListItemElement([new pm.TextElement("first item")]), new pm.ListElement("unordered", [new pm.ListItemElement([new pm.TextElement("second item")]), new pm.ListItemElement([new pm.TextElement("third item")])])])])])

    expect(parser.GetPresentation()).toEqual(slide);
});

test("Link Element", () => {
    let slides = [{type: "slide", content: [{type: "paragraph", content: [{type: "link", content: ["content"], attributes: {alias: "alias"}}]}]}];

    let parser = new PresentationParser(slides);

    let slide = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.LinkElement("content", "alias")])])]);

    expect(parser.GetPresentation()).toEqual(slide);
});

test("Image Element", () => {
    let slides = [{type: "slide", content: [{type: "paragraph", content: [{type: "image", content: ["content"], attributes: {alias: "alias"}}]}]}];
    
    let parser = new PresentationParser(slides);

    let slide = new pm.Presentation([new pm.SlideElement([new pm.ParagraphElement([new pm.ImageElement("content", "alias")])])]);

    expect(parser.GetPresentation()).toEqual(slide);
});

test("Bad json", () => {
    let slides = [{type: "side", content: []}];

    let parser = new PresentationParser(slides);
    let result = { success: false, errors: ["Type side is incorrect."]};
    expect(parser.GetPresentation()).toEqual(result);
});