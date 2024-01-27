import { connect } from "http2";

const { readFileSync } = require('fs');
type Text = {
    type: string,
    content: string
}

type InlineElement = {
    "type": string,
    "content": [Text | InlineElement]
}

type Paragraph = {
    "type": string,
    "content": [Text | InlineElement]
}

type HeadingElement = {
    "type": string,
    "level": number,
    "content": [Text | InlineElement]
}

type Slide = {
    "type": string,
    "content": [Paragraph, HeadingElement]
}

export function ToHtmlFromFile(fileName: string): string {

    let stringJson = readFileSync(fileName, 'utf8');
    let data = JSON.parse(stringJson);

    return ToHtmlFromJson(data);
}

function HandleInlineElement(element: InlineElement): string {
    let res: string = "";
    let content = element.content;
    content.forEach(c => {
        switch (c.type) {
            case "bold":
                res += HandleBold(c as InlineElement);
            break;
            case "italic":
                res += HandleItalic(c as InlineElement);
            break;
            case "boldItalic":
                res += HandleBoldItalic(c as InlineElement);
            break;
            default:
                console.log("Unrecognised element");
            break;
        }
    });
    return res;
}

function HandleBold(element: InlineElement): string {
    let res: string = "";
    res += "<strong>";
    res += HandleInlineElement(element);
    res += "</strong>";
    return res;
}

function HandleItalic(element: InlineElement): string {
    let res: string = "";
    res += "<em>";
    res += HandleInlineElement(element);
    res += "</em>";
    return res;
}

function HandleBoldItalic(element: InlineElement): string {
    let res: string = "";
    res += "<em><strong>";
    res += HandleInlineElement(element);
    res += "</em></strong>";
    return res;
}
function HandleText(text: Text): string {
    return text.content;
}

function HandleParagraph(paragraph: Paragraph): string {
    let res: string = "";
    res += "<p>";
    let content = paragraph.content;
    content.forEach(c => {
        res += (c.type == "text") ? HandleText(c as Text) : HandleInlineElement(c as InlineElement);
    });
    res += "</p>";
    return res;
}

function HandleHeading(heading: HeadingElement): string {
    let res: string = "";
    res += "<h" + heading.level + ">";
    let content = heading.content;
    content.forEach(c => {
        res += (c.type == "text") ? HandleText(c as Text) : HandleInlineElement(c as InlineElement);
    });
    res += "</h" + heading.level + ">";
    return res;
}

function HandleSlide(slide: Slide): string {
    let res: string = "";
    let content = slide.content;
    content.forEach(c => {
        switch(c.type) {
            case "paragraph":
                res += HandleParagraph(c as Paragraph);
            break;
            case "heading":
                res += HandleHeading(c as HeadingElement);
            break;
        }
    });
    return res;
}

function ToHtmlFromJson(json: Slide[]): string {
    let res = "";
    json.forEach(slide => {
        res += HandleSlide(slide);
    });
    return res;
}