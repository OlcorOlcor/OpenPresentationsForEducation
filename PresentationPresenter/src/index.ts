const { readFileSync } = require("fs");
import * as prettier from "@prettier/sync";
import { NewLineKind } from "typescript";

const unrecognisedElementMessage: string = "Unrecognised element: ";
const missingFieldMessage: string = "Element is missing a field: "

type Element = TextAnnotation | Paragraph | HeadingElement | ListItem;

type OuterElement = Paragraph | HeadingElement | List | BlockQuote;

type InlineElement = TextAnnotation | Link | Image;

type Text = {
    type: string;
    content: string;
};

type TextAnnotation = {
    type: string;
    content: [Text | TextAnnotation];
};

type Link = {
    type: string;
    address: string;
    content: string;
};

type Image = {
    type: string;
    address: string;
    alias: string;
};

type ListItem = {
    type: string;
    content: [Text | TextAnnotation];
};

type List = {
    type: string;
    listType: string;
    items: [List | ListItem];
};

type Paragraph = {
    type: string;
    content: [Text | InlineElement];
};

type HeadingElement = {
    type: string;
    level: number;
    content: [Text | InlineElement];
};

type BlockQuote = {
    type: string;
    content: [OuterElement];
};

type Slide = {
    type: string;
    content: [OuterElement];
};

function CheckOuterElementStructure(element: OuterElement) {
    if (!element.hasOwnProperty("type")) {
        throw new Error(missingFieldMessage + "type");
    }
    // TODO: list should be in its own category
    if ((element.type !== "list" && !element.hasOwnProperty("content"))) {
        throw new Error(missingFieldMessage + "content");
    }
}

function CheckImageStructure(image: Image) {
    if (!image.hasOwnProperty("address")) {
        throw new Error(missingFieldMessage + "address")
    }
    if (!image.hasOwnProperty("alias")) { 
        throw new Error(missingFieldMessage + "alias")
    }
}

function CheckLinkStructure(link: Link) {
    if (!link.hasOwnProperty("address")) {
        throw new Error(missingFieldMessage + "address");
    }
    if (!link.hasOwnProperty("content")) {
        throw new Error(missingFieldMessage + "content");
    }
}

function CheckContentStructure(element: Text | InlineElement) {
    if (!element.hasOwnProperty("type")) {
        throw new Error(missingFieldMessage + "type");
    }
    // TODO: image and link shouldn't be bundled with the rest
    if (element.type == "image" || element.type == "link") {
        return;
    }
    if (!element.hasOwnProperty("content")) {
        throw new Error(missingFieldMessage + "content");
    }
}

function HandleContent(element: Element): string {
    let res: string = "";
    let content = element.content;
    content.forEach((c) => {
        CheckContentStructure(c);
        switch (c.type) {
            case "bold":
                res += HandleBold(c as TextAnnotation);
                break;
            case "italic":
                res += HandleItalic(c as TextAnnotation);
                break;
            case "boldItalic":
                res += HandleBoldItalic(c as TextAnnotation);
                break;
            case "code":
                res += HandleInlineCode(c as TextAnnotation);
                break;
            case "text":
                res += HandleText(c as Text);
                break;
            case "link":
                res += HandleLink(c as Link);
                break;
            case "image":
                res += HandleImage(c as Image);
                break;
            default:
                throw new Error(unrecognisedElementMessage + c.type);
        }
    });
    return res;
}

function HandleLink(link: Link): string {
    let res: string = "";
    CheckLinkStructure(link);
    res += '<a href="' + link.address + '">';
    res += link.content !== "" ? link.content : link.address;
    res += "</a>";
    return res;
}

function HandleImage(image: Image): string {
    let res: string = "";
    CheckImageStructure(image);
    res += '<img src="' + image.address + '" alt="' + image.alias + '">';
    return res;
}

function HandleInlineCode(element: TextAnnotation) {
    let res: string = "";
    res += "<code>";
    res += HandleContent(element);
    res += "</code>";
    return res;
}

function HandleBold(element: TextAnnotation): string {
    let res: string = "";
    res += "<strong>";
    res += HandleContent(element);
    res += "</strong>";
    return res;
}

function HandleItalic(element: TextAnnotation): string {
    let res: string = "";
    res += "<em>";
    res += HandleContent(element);
    res += "</em>";
    return res;
}

function HandleBoldItalic(element: TextAnnotation): string {
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
    if (!heading.hasOwnProperty("level")) {
        throw new Error(missingFieldMessage + "level");
    }
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
    if (!list.hasOwnProperty("items")) {
        throw new Error(missingFieldMessage + "items");
    }
    list.items.forEach((item) => {
        res += "<li>";
        switch (item.type) {
            case "list":
                res += HandleList(item as List);
                break;
            case "listItem":
                res += HandleListItem(item as ListItem);
                break;
            default:
                throw new Error(unrecognisedElementMessage + item.type);
        }
        res += "</li>";
    });
    return res;
}

function HandleList(list: List): string {
    let res: string = "";
    res += list.listType === "unordered" ? "<ul>" : "<ol>";
    res += HandleListItems(list);
    res += list.listType === "unordered" ? "</ul>" : "</ol>";
    return res;
}

function HandleBlockQuote(blockquote: BlockQuote): string {
    let res: string = "";
    res += "<blockquote>";
    blockquote.content.forEach((c) => {
        res += HandleOuterElement(c);
    });
    res += "</blockquote>";
    return res;
}

function HandleOuterElement(element: OuterElement): string {
    let res: string = "";
    CheckOuterElementStructure(element);
    switch (element.type) {
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
            throw new Error(unrecognisedElementMessage + element.type);
    }
    return res;
}

function HandleSlide(slide: Slide): string {
    let res: string = "";
    let content = slide.content;
    content.forEach((c) => {
        res += HandleOuterElement(c);
    });
    return res;
}

export function ToHtmlFromJson(json: Slide[]): string {
    let res = "";
    json.forEach((slide) => {
        CheckOuterElementStructure(slide);
        if (slide.type !== "slide") {
            throw new Error(unrecognisedElementMessage + slide.type);
        }
        res += HandleSlide(slide);
    });
    return prettier.format(res, { parser: 'html' }); 
}

export function ToHtmlFromFile(fileName: string): string {
    let stringJson = readFileSync(fileName, "utf8");
    let data = JSON.parse(stringJson);
    return ToHtmlFromJson(data);
}