import { connect } from "http2";

const { readFileSync } = require('fs');
type Element = InlineElement | Paragraph | HeadingElement;

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

function HandleContent(element: Element): string {
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
            case "text": 
                res += HandleText(c as Text);
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
    res += HandleContent(element);
    res += "</strong>";
    return res;
}

function HandleItalic(element: InlineElement): string {
    let res: string = "";
    res += "<em>";
    res += HandleContent(element);
    res += "</em>";
    return res;
}

function HandleBoldItalic(element: InlineElement): string {
    let res: string = "";
    res += "<em><strong>";
    res += HandleContent(element);
    res += "</em></strong>";
    return res;
}
function HandleText(text: Text): string {
    return text.content;
}

function HandleParagraph(paragraph: Paragraph): string {
    let res: string = "";
    res += "<p>";
    res += HandleContent(paragraph);
    res += "</p>";
    return res;
}

function HandleHeading(heading: HeadingElement): string {
    let res: string = "";
    res += "<h" + heading.level + ">";
    res += HandleContent(heading);
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