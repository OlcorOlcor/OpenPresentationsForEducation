"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToHtmlFromJson = exports.ToHtmlFromFile = void 0;
var readFileSync = require('fs').readFileSync;
function ToHtmlFromFile(fileName) {
    var stringJson = readFileSync(fileName, 'utf8');
    var data = JSON.parse(stringJson);
    return ToHtmlFromJson(data);
}
exports.ToHtmlFromFile = ToHtmlFromFile;
function HandleContent(element) {
    var res = "";
    var content = element.content;
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
            case "text":
                res += HandleText(c);
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
                console.log("Unrecognised list element");
                break;
        }
        res += "</li>";
    });
    return res;
}
function HandleList(list) {
    var res = "";
    res += (list.listType === "unordered") ? "<ul>" : "<ol>";
    res += HandleListItems(list);
    res += (list.listType === "unordered") ? "</ul>" : "</ol>";
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
            case "list":
                res += HandleList(c);
                break;
            default:
                console.log("Unrecognised slide element");
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
exports.ToHtmlFromJson = ToHtmlFromJson;
