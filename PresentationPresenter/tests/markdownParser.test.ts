import { MarkdownParser } from "../src/markdownParser";
import {test, expect} from "@jest/globals";

test("paragraph", () => {
    let parser = new MarkdownParser();
    expect(parser.parseMarkdown("text **bold *em***")).toEqual([{type: "slide", content: [{type: "paragraph", content: [{type: "text", content: ["text "]}, {type: "bold", content: [{type: "text", content: ["bold "]}, {type: "italic", content: [{type: "text", content: ["em"]}]}]}]}]}]);
});


test("link", () => {
    let parser = new MarkdownParser();
    expect(parser.parseMarkdown("[alias](link)")).toEqual([{type: "slide", content: [{type: "paragraph", content: [{type: "link", content: ["link"], attributes: {alias: "alias"}}]}]}]);
});

test("link", () => {
    let parser = new MarkdownParser();
    expect(parser.parseMarkdown("![alias](img)")).toEqual([{type: "slide", content: [{type: "paragraph", content: [{type: "image", content: ["img"], attributes: {alias: "alias"}}]}]}]);
});

test("code", () => {
    let parser = new MarkdownParser();
    expect(parser.parseMarkdown("`code`")).toEqual([{type: "slide", content: [{type: "paragraph", content: [{type: "code", content: ["code"]}]}]}]);
});

test("test", () => {
    let parser = new MarkdownParser();
    expect(parser.parseMarkdown("[alias](link)\n![alias](img)")).toEqual([{type: "slide", content: [{type: "paragraph", content: [{type: "link", content: ["link"], attributes: {alias: "alias"}}, {type: "text", content: ["\n"]}, {type: "image", content: ["img"], attributes: {alias: "alias"}}]}]}]);
});