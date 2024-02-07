"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToHtmlFromFile = exports.ToHtmlFromJson = void 0;
var readFileSync = require("fs").readFileSync;
var prettier = require("@prettier/sync");
var unrecognisedElementMessage = "Unrecognised element: ";
var missingFieldMessage = "Element is missing a field: ";
function CheckOuterElementStructure(element) {
    if (!element.hasOwnProperty("type")) {
        throw new Error(missingFieldMessage + "type");
    }
    // TODO: list should be in its own category
    if ((element.type !== "list" && !element.hasOwnProperty("content"))) {
        throw new Error(missingFieldMessage + "content");
    }
}
function CheckImageStructure(image) {
    if (!image.hasOwnProperty("address")) {
        throw new Error(missingFieldMessage + "address");
    }
    if (!image.hasOwnProperty("alias")) {
        throw new Error(missingFieldMessage + "alias");
    }
}
function CheckLinkStructure(link) {
    if (!link.hasOwnProperty("address")) {
        throw new Error(missingFieldMessage + "address");
    }
    if (!link.hasOwnProperty("content")) {
        throw new Error(missingFieldMessage + "content");
    }
}
function CheckContentStructure(element) {
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
function HandleContent(element) {
    var res = "";
    var content = element.content;
    content.forEach(function (c) {
        CheckContentStructure(c);
        switch (c.type) {
            case "bold":
                res += HandleBold(c);
                break;
            case "italic":
                res += HandleItalic(c);
                break;
            case "boldItalic":
                res += HandleBoldItalic(c);
                break;
            case "code":
                res += HandleInlineCode(c);
                break;
            case "text":
                res += HandleText(c);
                break;
            case "link":
                res += HandleLink(c);
                break;
            case "image":
                res += HandleImage(c);
                break;
            default:
                throw new Error(unrecognisedElementMessage + c.type);
        }
    });
    return res;
}
function HandleLink(link) {
    var res = "";
    CheckLinkStructure(link);
    res += '<a href="' + link.address + '">';
    res += link.content !== "" ? link.content : link.address;
    res += "</a>";
    return res;
}
function HandleImage(image) {
    var res = "";
    CheckImageStructure(image);
    res += '<img src="' + image.address + '" alt="' + image.alias + '">';
    return res;
}
function HandleInlineCode(element) {
    var res = "";
    res += "<code>";
    res += HandleContent(element);
    res += "</code>";
    return res;
}
function HandleBold(element) {
    var res = "";
    res += "<strong>";
    res += HandleContent(element);
    res += "</strong>";
    return res;
}
function HandleItalic(element) {
    var res = "";
    res += "<em>";
    res += HandleContent(element);
    res += "</em>";
    return res;
}
function HandleBoldItalic(element) {
    var res = "";
    res += "<em><strong>";
    res += HandleContent(element);
    res += "</strong></em>";
    return res;
}
function HandleText(text) {
    return text.content;
}
function HandleParagraph(paragraph) {
    var res = "";
    res += "<p>";
    res += HandleContent(paragraph);
    res += "</p>";
    return res;
}
function HandleHeading(heading) {
    var res = "";
    if (!heading.hasOwnProperty("level")) {
        throw new Error(missingFieldMessage + "level");
    }
    res += "<h" + heading.level + ">";
    res += HandleContent(heading);
    res += "</h" + heading.level + ">";
    return res;
}
function HandleListItem(item) {
    var res = "";
    res += HandleContent(item);
    return res;
}
function HandleListItems(list) {
    var res = "";
    if (!list.hasOwnProperty("items")) {
        throw new Error(missingFieldMessage + "items");
    }
    list.items.forEach(function (item) {
        res += "<li>";
        switch (item.type) {
            case "list":
                res += HandleList(item);
                break;
            case "listItem":
                res += HandleListItem(item);
                break;
            default:
                throw new Error(unrecognisedElementMessage + item.type);
        }
        res += "</li>";
    });
    return res;
}
function HandleList(list) {
    var res = "";
    res += list.listType === "unordered" ? "<ul>" : "<ol>";
    res += HandleListItems(list);
    res += list.listType === "unordered" ? "</ul>" : "</ol>";
    return res;
}
function HandleBlockQuote(blockquote) {
    var res = "";
    res += "<blockquote>";
    blockquote.content.forEach(function (c) {
        res += HandleOuterElement(c);
    });
    res += "</blockquote>";
    return res;
}
function HandleOuterElement(element) {
    var res = "";
    CheckOuterElementStructure(element);
    switch (element.type) {
        case "paragraph":
            res += HandleParagraph(element);
            break;
        case "heading":
            res += HandleHeading(element);
            break;
        case "list":
            res += HandleList(element);
            break;
        case "blockquote":
            res += HandleBlockQuote(element);
            break;
        default:
            throw new Error(unrecognisedElementMessage + element.type);
    }
    return res;
}
function HandleSlide(slide) {
    var res = "";
    var content = slide.content;
    content.forEach(function (c) {
        res += HandleOuterElement(c);
    });
    return res;
}
function ToHtmlFromJson(json) {
    var res = "";
    json.forEach(function (slide) {
        CheckOuterElementStructure(slide);
        if (slide.type !== "slide") {
            throw new Error(unrecognisedElementMessage + slide.type);
        }
        res += HandleSlide(slide);
    });
    return prettier.format(res, { parser: 'html' });
}
exports.ToHtmlFromJson = ToHtmlFromJson;
function ToHtmlFromFile(fileName) {
    var stringJson = readFileSync(fileName, "utf8");
    var data = JSON.parse(stringJson);
    return ToHtmlFromJson(data);
}
exports.ToHtmlFromFile = ToHtmlFromFile;
