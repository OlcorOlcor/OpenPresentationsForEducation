import { expect, test } from "vitest";
import {
    AnalysisVisitor,
    AnalysisResult,
} from "../src/Model/Visitors/AnalysisVisitor";
import * as pm from "../src/Model/PresentationModel";

function getSimpleVisitor(): AnalysisVisitor {
    return new AnalysisVisitor();
}

function getTextNode(text: string): pm.TextElement {
    return new pm.TextElement(text);
}

function getAnalysis(
    words: number,
    characters: number,
    images: number,
    links: number,
    headings: number,
    bullet_points: number,
    tables: number,
): AnalysisResult {
    let analysis = new AnalysisResult();
    analysis.words = words;
    analysis.characters = characters;
    analysis.images = images;
    analysis.links = links;
    analysis.headings = headings;
    analysis.bullet_points = bullet_points;
    analysis.tables = tables;
    return analysis;
}

test("simple text", () => {
    let visitor = getSimpleVisitor();
    visitor.visitTextNode(getTextNode("text"));
    expect(visitor.getResult()).toEqual(getAnalysis(1, 4, 0, 0, 0, 0, 0));
});

test("multiple words", () => {
    let visitor = getSimpleVisitor();
    visitor.visitTextNode(getTextNode("text text"));
    expect(visitor.getResult()).toEqual(getAnalysis(2, 9, 0, 0, 0, 0, 0));
});

test("paragraph", () => {
    let visitor = getSimpleVisitor();
    let paragraph = new pm.ParagraphElement(
        [getTextNode("First row\n"), getTextNode("Second row\n")],
        [],
        {},
    );
    visitor.visitParagraphNode(paragraph);
    expect(visitor.getResult()).toEqual(getAnalysis(4, 21, 0, 0, 0, 0, 0));
});

test("heading", () => {
    let visitor = getSimpleVisitor();
    let heading = new pm.HeadingElement(1, [getTextNode("text")], [], {});
    visitor.visitHeadingNode(heading);
    expect(visitor.getResult()).toEqual(getAnalysis(1, 4, 0, 0, 1, 0, 0));
});

test("heading 2", () => {
    let visitor = getSimpleVisitor();
    let heading = new pm.HeadingElement(6, [getTextNode("text")], [], {});
    visitor.visitHeadingNode(heading);
    expect(visitor.getResult()).toEqual(getAnalysis(1, 4, 0, 0, 1, 0, 0));
});

test("ordered list", () => {
    let visitor = getSimpleVisitor();
    let list = new pm.ListElement(
        "ordered",
        [
            new pm.ListItemElement([getTextNode("1")]),
            new pm.ListItemElement([getTextNode("2")]),
        ],
        [],
        {},
    );
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual(getAnalysis(2, 2, 0, 0, 0, 2, 0));
});

test("unordered list", () => {
    let visitor = getSimpleVisitor();
    let list = new pm.ListElement(
        "unordered",
        [
            new pm.ListItemElement([getTextNode("1")]),
            new pm.ListItemElement([getTextNode("2")]),
        ],
        [],
        {},
    );
    visitor.visitListNode(list);
    expect(visitor.getResult()).toEqual(getAnalysis(2, 2, 0, 0, 0, 2, 0));
});

test("table", () => {
    let visitor = getSimpleVisitor();
    let row1 = new pm.TableRowElement([
        new pm.TableHeadingElement([getTextNode("11")]),
        new pm.TableHeadingElement([getTextNode("12")]),
    ]);
    let row2 = new pm.TableRowElement([
        new pm.TableDataElement([getTextNode("21")]),
        new pm.TableDataElement([getTextNode("22")]),
    ]);
    let table = new pm.TableElement([row1, row2], [], {});
    visitor.visitTableNode(table);
    expect(visitor.getResult()).toEqual(getAnalysis(4, 8, 0, 0, 0, 0, 1));
});

test("image", () => {
    let visitor = getSimpleVisitor();
    let image = new pm.ImageElement("./img/img.png", "img");
    visitor.visitImageNode(image);
    expect(visitor.getResult()).toEqual(getAnalysis(0, 0, 1, 0, 0, 0, 0));
});

test("link", () => {
    let visitor = getSimpleVisitor();
    let link = new pm.LinkElement("www.google.com", "link");
    visitor.visitLinkNode(link);
    expect(visitor.getResult()).toEqual(getAnalysis(1, 4, 0, 1, 0, 0, 0));
});
