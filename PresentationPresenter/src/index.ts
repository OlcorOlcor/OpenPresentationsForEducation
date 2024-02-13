const { readFileSync } = require("fs");
import * as prettier from "@prettier/sync";
import * as pt from "./presentationModel";

function HandleContent(element: pt.Element): string {
    let res: string = "";
    let content = element.content;
    content.forEach((c) => {
        // CheckContentStructure(c);
        switch (c.type) {
            case "bold":
                res += HandleBold(c as pt.TextAnnotation);
                break;
            case "italic":
                res += HandleItalic(c as pt.TextAnnotation);
                break;
            case "boldItalic":
                res += HandleBoldItalic(c as pt.TextAnnotation);
                break;
            case "code":
                res += HandleInlineCode(c as pt.TextAnnotation);
                break;
            case "text":
                res += HandleText(c as pt.Text);
                break;
            case "link":
                res += HandleLink(c as pt.Link);
                break;
            case "image":
                res += HandleImage(c as pt.Image);
                break;
            default:
            // throw new Error(unrecognisedElementMessage + c.type);
        }
    });
    return res;
}

function HandleLink(link: pt.Link): string {
    let res: string = "";
    // CheckLinkStructure(link);
    res += '<a href="' + link.content[0] + '">';
    res +=
        link.attributes.alias === "" ? link.content[0] : link.attributes.alias;
    res += "</a>";
    return res;
}

function HandleImage(image: pt.Image): string {
    let res: string = "";
    // CheckImageStructure(image);
    res +=
        '<img src="' +
        image.content[0] +
        '" alt="' +
        image.attributes.alias +
        '">';
    return res;
}

function HandleInlineCode(element: pt.TextAnnotation) {
    let res: string = "";
    res += "<code>";
    res += HandleContent(element);
    res += "</code>";
    return res;
}

function HandleBold(element: pt.TextAnnotation): string {
    let res: string = "";
    res += "<strong>";
    res += HandleContent(element);
    res += "</strong>";
    return res;
}

function HandleItalic(element: pt.TextAnnotation): string {
    let res: string = "";
    res += "<em>";
    res += HandleContent(element);
    res += "</em>";
    return res;
}

function HandleBoldItalic(element: pt.TextAnnotation): string {
    let res: string = "";
    res += "<em><strong>";
    res += HandleContent(element);
    res += "</strong></em>";
    return res;
}
function HandleText(text: pt.Text): string {
    let res: string = "";
    text.content.forEach((s) => (res += s));
    return res;
}

function HandleParagraph(paragraph: pt.Paragraph): string {
    let res: string = "";
    res += "<p>";
    res += HandleContent(paragraph);
    res += "</p>";
    return res;
}

function HandleHeading(heading: pt.HeadingElement): string {
    let res: string = "";
    if (!heading.hasOwnProperty("level")) {
        //throw new Error(missingFieldMessage + "level");
    }
    res += "<h" + heading.attributes.level + ">";
    res += HandleContent(heading);
    res += "</h" + heading.attributes.level + ">";
    return res;
}

function HandleListItem(item: pt.ListItem) {
    let res: string = "";
    res += HandleContent(item);
    return res;
}

function HandleListItems(list: pt.List): string {
    let res: string = "";
    if (!list.hasOwnProperty("items")) {
        //throw new Error(missingFieldMessage + "items");
    }
    list.content.forEach((item) => {
        res += "<li>";
        switch (item.type) {
            case "list":
                res += HandleList(item as pt.List);
                break;
            case "listItem":
                res += HandleListItem(item as pt.ListItem);
                break;
            default:
            //throw new Error(unrecognisedElementMessage + item.type);
        }
        res += "</li>";
    });
    return res;
}

function HandleList(list: pt.List): string {
    let res: string = "";
    res += list.attributes.listType === "unordered" ? "<ul>" : "<ol>";
    res += HandleListItems(list);
    res += list.attributes.listType === "unordered" ? "</ul>" : "</ol>";
    return res;
}

function HandleBlockQuote(blockquote: pt.BlockQuote): string {
    let res: string = "";
    res += "<blockquote>";
    blockquote.content.forEach((c) => {
        res += HandleOuterElement(c);
    });
    res += "</blockquote>";
    return res;
}

function HandleOuterElement(element: pt.OuterElement): string {
    let res: string = "";
    //CheckOuterElementStructure(element);
    switch (element.type) {
        case "paragraph":
            res += HandleParagraph(element as pt.Paragraph);
            break;
        case "heading":
            res += HandleHeading(element as pt.HeadingElement);
            break;
        case "list":
            res += HandleList(element as pt.List);
            break;
        case "blockquote":
            res += HandleBlockQuote(element as pt.BlockQuote);
            break;
        default:
        //throw new Error(unrecognisedElementMessage + element.type);
    }
    return res;
}

function HandleSlide(slide: pt.Slide): string {
    let res: string = "";
    let content = slide.content;
    content.forEach((c) => {
        res += HandleOuterElement(c);
    });
    return res;
}

export function ToHtmlFromJson(json: pt.Slide[]): string {
    let res = "";
    json.forEach((slide) => {
        //CheckOuterElementStructure(slide);
        if (slide.type !== "slide") {
            //throw new Error(unrecognisedElementMessage + slide.type);
        }
        res += HandleSlide(slide);
    });
    return prettier.format(res, { parser: "html" });
}

export function ToHtmlFromFile(fileName: string): string {
    let stringJson = readFileSync(fileName, "utf8");
    let data = JSON.parse(stringJson);
    return ToHtmlFromJson(data);
}
