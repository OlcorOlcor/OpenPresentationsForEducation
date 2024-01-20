import { DiffieHellmanGroup } from "crypto";
import { tokenizeText } from "../src/AreaTokenizer";

test("Empty text", () => {
  expect(tokenizeText("")).toEqual([]);
});

test("No tags", () => {
  expect(tokenizeText("Hello world!")).toEqual(["Hello world!"]);
});

const simpleOpenTag = { name: "Open", id: "123" };
const simpleOpenTagText = '<Open: id="123">';
test("Opening tag", () => {
  expect(tokenizeText(simpleOpenTagText)).toEqual([simpleOpenTag]);
});

const simpleCloseTag = { name: "Close" };
const simpleCloseTagText = "</Close>";

test("Closing tag", () => {
  expect(tokenizeText(simpleCloseTagText)).toEqual([simpleCloseTag]);
});

test("Opening and closing tag back to back", () => {
  expect(tokenizeText(simpleOpenTagText + simpleCloseTagText)).toEqual([
    simpleOpenTag,
    simpleCloseTag,
  ]);
});

test("Text between tags", () => {
  expect(
    tokenizeText(simpleOpenTagText + "Text in between" + simpleCloseTagText),
  ).toEqual([simpleOpenTag, "Text in between", simpleCloseTag]);
});

test("< in plain text", () => {
  expect(tokenizeText("There's a < in my text")).toEqual([
    "There's a < in my text",
  ]);
});

test("Missing id 1", () => {
  expect(tokenizeText("<Open: >")).toEqual(["<Open: >"]);
});

test("Missing id 2", () => {
  expect(tokenizeText("<Open: id>")).toEqual(["<Open: id>"]);
});

test("Missing id 3", () => {
  expect(tokenizeText('<Open: id="">')).toEqual(['<Open: id="">']);
});

const openTagText2 = '<Hello: id="TextId">';
const openTag2 = { name: "Hello", id: "TextId" };
const closeTagText2 = "</Hello>";
const closeTag2 = { name: "Hello" };

test("Complex", () => {
  expect(
    tokenizeText(
      "Hello World" +
        simpleOpenTagText +
        "text with < and >" +
        simpleCloseTagText +
        openTagText2 +
        closeTagText2 +
        "Final words",
    ),
  ).toEqual([
    "Hello World",
    simpleOpenTag,
    "text with < and >",
    simpleCloseTag,
    openTag2,
    closeTag2,
    "Final words",
  ]);
});
