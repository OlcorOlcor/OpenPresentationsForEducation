import { expect, test } from 'vitest'
import { JsonVisitor } from '../src/Model/Visitors/JsonVisitor';
import * as pm from "../src/Model/PresentationModel";
import * as pt from "../src/Model/PresentationTypes";
import { L } from 'vitest/dist/chunks/reporters.d.CfRkRKN2.js';

function getExpected(content: pt.OuterElement[]): pt.Lane {
    return {type: "lane", content: [{type: "slide", content: content, attributes: { refs: [], frontMatter: {}, globalMetadataTags: [], metadata: {}}}], attributes: {name: "name", compile: true} };
}

function getLane(content: pm.OuterElement[]): pm.Lane {
    let slide = new pm.SlideElement(content, true, [], [], {}, {});
    let lane = new pm.Lane([slide], "name", true);
    return lane;
}

function getText(text: string): pm.TextElement {
    return new pm.TextElement(text);
}

test("paragraph", () => {
    let visitor = new JsonVisitor();
    let paragraph = new pm.ParagraphElement([getText("text")], [], {});
    let lane = getLane([paragraph]);
    let expected = getExpected([{type: "paragraph", content: [{type: "text", content: ["text"]}], attributes: {globalMetadataTags: [], metadata: {}}}]);
    visitor.visitLaneNode(lane)
    expect(visitor.getResult()).toEqual(expected);
});

test("bold", () => {
    let visitor = new JsonVisitor();
    let paragraph = new pm.ParagraphElement([new pm.BoldElement([getText("text")])], [], {});
    let lane = getLane([paragraph]);
    let expected = getExpected([{type: "paragraph", content: [{type: "bold", content: [{type: "text", content: ["text"]}]}], attributes: {globalMetadataTags: [], metadata: {}}}]);
    visitor.visitLaneNode(lane)
    expect(visitor.getResult()).toEqual(expected);
});

test("italic", () => {
    let visitor = new JsonVisitor();
    let paragraph = new pm.ParagraphElement([new pm.ItalicElement([getText("text")])], [], {});
    let lane = getLane([paragraph]);
    let expected = getExpected([{type: "paragraph", content: [{type: "italic", content: [{type: "text", content: ["text"]}]}], attributes: {globalMetadataTags: [], metadata: {}}}]);
    visitor.visitLaneNode(lane)
    expect(visitor.getResult()).toEqual(expected);
});

test("italic", () => {
    let visitor = new JsonVisitor();
    let paragraph = new pm.ParagraphElement([new pm.CodeElement([getText("text")])], [], {});
    let lane = getLane([paragraph]);
    let expected = getExpected([{type: "paragraph", content: [{type: "code", content: [{type: "text", content: ["text"]}]}], attributes: {globalMetadataTags: [], metadata: {}}}]);
    visitor.visitLaneNode(lane)
    expect(visitor.getResult()).toEqual(expected);
});

test("horizontal line", () => {
    let visitor = new JsonVisitor();
    let hr = new pm.HorizontalLineElement([], {});
    let lane = getLane([hr]);
    let expected = getExpected([{type: "horizontal_line", attributes: {globalMetadataTags: [], metadata: {}}}]);
    visitor.visitLaneNode(lane);
    expect(visitor.getResult()).toEqual(expected);
});

test("heading", () => {
    let visitor = new JsonVisitor();
    let heading = new pm.HeadingElement(1, [getText("text")], [], {});
    let lane = getLane([heading]);
    let expected = getExpected([{type: "heading", content: [{type: "text", content: ["text"]}], attributes: {level: 1, globalMetadataTags: [], metadata: {}}}]);
    visitor.visitLaneNode(lane)
    expect(visitor.getResult()).toEqual(expected);
});

test("table", () => {
    let visitor = new JsonVisitor();
    let table = new pm.TableElement([new pm.TableRowElement([new pm.TableHeadingElement([getText("11")]), new pm.TableHeadingElement([getText("12")])]), new pm.TableRowElement([new pm.TableDataElement([getText("21")]), new pm.TableDataElement([getText("22")])])], [], {});
    let lane = getLane([table]);
    let expected = getExpected([{type: "table", content: [{type: "tableRow", content: [{type: "tableHeading", content: [{type: "text", content: ["11"]}]}, {type: "tableHeading", content: [{type: "text", content: ["12"]}]}]}, {type: "tableRow", content: [{type: "tableData", content: [{type: "text", content: ["21"]}]}, {type: "tableData", content: [{type: "text", content: ["22"]}]}]}], attributes: {globalMetadataTags: [], metadata: {}}}]);
    visitor.visitLaneNode(lane);
    expect(visitor.getResult()).toEqual(expected);
});

test("image", () => {
    
});