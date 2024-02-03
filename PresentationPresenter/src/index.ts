import { listenerCount } from "process";

const { readFileSync } = require('fs');

type Element = InlineElement | Paragraph | HeadingElement | ListItem;

type OuterElement = Paragraph | HeadingElement | List | BlockQuote;

type Text = {
    type: string,
    content: string
}

type InlineElement = {
    "type": string,
    "content": [Text | InlineElement]
}

type ListItem = {
    "type": string,
    "content": [Text | InlineElement],
}

type List = {
    "type": string,
    "listType": string,
    "items": [List | ListItem]
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

type BlockQuote = {
    "type": string,
    "content": [OuterElement]
}

type Slide = {
    "type": string,
    "content": [OuterElement]
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
            case "code":
                res += HandleInlineCode(c as InlineElement);
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

function HandleInlineCode(element: InlineElement) {
    let res: string = "";
    res += "<code>";
    res += HandleContent(element);
    res += "</code>";
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
    res += "</strong></em>";
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

function HandleListItem(item: ListItem) {
    let res: string = "";
    res += HandleContent(item);
    return res;
}

function HandleListItems(list: List): string {
    let res: string = "";
    list.items.forEach(item => {
        res += "<li>";
        switch (item.type) {
            case "list":
                res += HandleList(item as List);
            break;
            case "listItem":
                res += HandleListItem(item as ListItem);
            break;
            default:
                console.log("Unrecognised list element");
            break;
        }
        res += "</li>";
    });
    return res;
}

function HandleList(list: List): string {
    let res: string = "";
    res += (list.listType === "unordered") ? "<ul>" : "<ol>";
    res += HandleListItems(list);
    res += (list.listType === "unordered") ? "</ul>" : "</ol>";
    return res;
}

function HandleBlockQuote(blockquote: BlockQuote): string {
    let res: string = "";
    res += "<blockquote>";
    blockquote.content.forEach(c => {
        res += HandleOuterElement(c);
    });
    res += "</blockquote>";
    return res;
}

function HandleOuterElement(element: OuterElement): string {
    let res: string = "";
    switch(element.type) {
        case "paragraph":
            res += HandleParagraph(element as Paragraph);
        break;
        case "heading":
            res += HandleHeading(element as HeadingElement);
        break;
        case "list":
            res += HandleList(element as List);
        break;
        case "blockquote":
            res += HandleBlockQuote(element as BlockQuote);
        break;
        default:
            console.log("Unrecognised slide element");
        break;
    }
    return res;
} 

function HandleSlide(slide: Slide): string {
    let res: string = "";
    let content = slide.content;
    content.forEach(c => {
       res += HandleOuterElement(c);
    });
    return res;
}

export function ToHtmlFromJson(json: Slide[]): string {
    let res = "";
    json.forEach(slide => {
        res += HandleSlide(slide);
    });
    return res;
}