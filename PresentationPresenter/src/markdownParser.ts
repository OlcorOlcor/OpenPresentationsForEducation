import { getPositionOfLineAndCharacter } from "typescript";
import * as pt from "./presentationTypes"; 
import markdownit, { Token } from "markdown-it";


export class MarkdownParser {

    public parseMarkdown(markdown: string): pt.Slide[] {
        let slides: pt.Slide[] = [];

        let mdit = markdownit();

        let array = mdit.parse(markdown, {});
        slides.push(this.handleArray(array));
        return slides;
    }

    private handleArray(array: Token[]): pt.Slide {
        let slide: pt.Slide = { type: "slide", content: []};
        for (let i = 0; i < array.length; ++i) {
            switch (array[i].type) {
                case "bullet_list_open":
                    // TODO
                break;
                case "ordered_list_open":
                    // TODO
                break;
                case "paragraph_open":
                    slide.content.push(this.handleParagraph(array, i));
                break;
                case "heading_open":
                    // TODO
                break;
                case "blockquote_open":
                    // TODO
                break;
                default:
                break;
            }
        }
        return slide;
    }

    private handleParagraph(array: Token[], index: number): pt.Paragraph {
        let paragraph: pt.Paragraph = {type: "paragraph", content: []};
        for (index + 1; index < array.length; ++index) {
            if (array[index].type == "paragraph_close") {
                break;
            }
            if (array[index].type == "inline") {
                this.getInline(array[index]).forEach(item => paragraph.content.push(item));
            }
        }
        return paragraph;
    }

    private getInline(inline: Token): (pt.InlineElement | pt.Text)[] {
        let inlineElements: (pt.InlineElement | pt.Text)[] = [];
        let stack: (pt.TextAnnotation)[] = [];
        let current: pt.TextAnnotation;
        inline.children?.forEach(child => {
            switch (child.type) {
                case "text":
                    if (child.content === "") {
                        break;
                    }
                    if (stack.length === 0) {
                        inlineElements.push({type: "text", content: [child.content]});
                        break;
                    }
                    stack[stack.length - 1].content.push({type: "text", content: [child.content]});
                break;
                case "strong_open":
                    current = { type: "bold", content: [] };
                    if (stack.length !== 0) {
                        stack[stack.length - 1].content.push(current);
                    }
                    stack.push(current);
                break;
                case "em_open":
                    current = { type: "italic", content: [] };
                    if (stack.length !== 0) {
                        stack[stack.length - 1].content.push(current);
                    }
                    stack.push(current);
                break;
                case "link_open":
                    let link_href = child.attrGet("href");
                    if (link_href != null) {
                        let link: pt.Link = {type: "link", content: [link_href], attributes: {alias: child.content}};
                        stack[stack.length - 1].content.push(link);
                    }
                break;
                case "image":
                    let img_href = child.attrGet("src");
                    if (img_href != null) {
                        let link: pt.Link = {type: "link", content: [img_href], attributes: {alias: child.content}};
                        stack[stack.length - 1].content.push(link);
                    }
                break;
                case "code_inline":
                    stack[stack.length - 1].content.push({type: "code", content: [child.content]});
                break;
                case "strong_close":
                case "em_close":
                    if (stack.length === 1) {
                        inlineElements.push(stack[0]);
                    } 
                    stack.pop();
                break;
                default:
                    throw "unexpected";
            }
        });
        
        return inlineElements;
    }

    private handleList(array: Token[], index: number, ordered: boolean): pt.List {
        let list: pt.List = { type: "list", content: [], attributes: { listType: (ordered) ? "ordered" : "unordered"}};
        // TODO
        return list;
    }
}