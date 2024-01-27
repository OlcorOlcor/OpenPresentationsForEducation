"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToHtmlFromFile = void 0;
var readFileSync = require('fs').readFileSync;
function ToHtmlFromFile(fileName) {
    var stringJson = readFileSync(fileName, 'utf8');
    var data = JSON.parse(stringJson);
    return ToHtmlFromJson(data);
}
exports.ToHtmlFromFile = ToHtmlFromFile;
function HandleInlineElement(element) {
    var res = "";
    var content = element.content;
    switch (element.type) {
        case "bold":
            res += HandleBold(element);
            break;
        case "italic":
            res += HandleItalic(element);
            break;
        case "boldItalic":
            res += HandleBoldItalic(element);
            break;
        default:
            console.log("Unrecognised element");
            break;
    }
    content.forEach(function (c) {
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
            default:
                console.log("Unrecognised element");
                break;
        }
    });
    return res;
}
function HandleBold(element) {
    var res = "";
    res += "<strong>";
    res += HandleInlineElement(element);
    res += "</strong>";
    return res;
}
function HandleItalic(element) {
    var res = "";
    res += "<em>";
    res += HandleInlineElement(element);
    res += "</em>";
    return res;
}
function HandleBoldItalic(element) {
    var res = "";
    res += "<em><strong>";
    res += HandleInlineElement(element);
    res += "</em></strong>";
    return res;
}
function HandleText(text) {
    return text.content;
}
function HandleParagraph(paragraph) {
    var res = "";
    res += "<p>";
    var content = paragraph.content;
    content.forEach(function (c) {
        res += (c.type == "text") ? HandleText(c) : HandleInlineElement(c);
    });
    res += "</p>";
    return res;
}
function HandleHeading(heading) {
    var res = "";
    res += "<h" + heading.level + ">";
    var content = heading.content;
    content.forEach(function (c) {
        res += (c.type == "text") ? HandleText(c) : HandleInlineElement(c);
    });
    res += "</h" + heading.level + ">";
    return res;
}
function HandleSlide(slide) {
    var res = "";
    var content = slide.content;
    content.forEach(function (c) {
        switch (c.type) {
            case "paragraph":
                res += HandleParagraph(c);
                break;
            case "heading":
                res += HandleHeading(c);
                break;
        }
    });
    return res;
}
function ToHtmlFromJson(json) {
    var res = "";
    json.forEach(function (slide) {
        res += HandleSlide(slide);
    });
    return res;
}
