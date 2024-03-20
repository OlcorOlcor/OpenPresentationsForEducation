import * as pt from "./presentationTypes"; 
import markdownit, { Token } from "markdown-it";

class RefIndex {
    public index: number = 0;
}

// TODO: Whole class needs refactoring
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
        for (let index: RefIndex = new RefIndex(); index.index < array.length; ++index.index) {
            switch (array[index.index].type) {
                case "bullet_list_open":
                    index.index += 1;
                    slide.content.push(this.handleList(array, index, false));
                break;
                case "ordered_list_open":
                    index.index += 1;
                    slide.content.push(this.handleList(array, index, true));
                break;
                case "paragraph_open":
                    slide.content.push(this.handleParagraph(array, index));
                break;
                case "heading_open":
                    slide.content.push(this.handleHeading(array, index, array[index.index].markup.length));
                break;
                case "blockquote_open":
                    index.index += 1;
                    slide.content.push(this.handleBlockQuote(array, index));
                break;
                default:
                break;
            }
        }
        return slide;
    }

    private handleBlockQuote(array: Token[], index: RefIndex): pt.BlockQuote {
        let blockQuote: pt.BlockQuote = { type: "blockquote", content: [] };
        let done: boolean = false;
        for (; index.index < array.length; ++index.index) {
            switch (array[index.index].type) {
                case "bullet_list_open":
                    index.index += 1;
                    blockQuote.content.push(this.handleList(array, index, false));
                break;
                case "ordered_list_open":
                    index.index += 1;
                    blockQuote.content.push(this.handleList(array, index, true));
                break;
                case "paragraph_open":
                    blockQuote.content.push(this.handleParagraph(array, index));
                break;
                case "heading_open":
                    blockQuote.content.push(this.handleHeading(array, index, array[index.index].markup.length));
                break;
                case "blockquote_open":
                    index.index += 1;
                    blockQuote.content.push(this.handleBlockQuote(array, index));
                break;
                case "blockquote_close":
                    done = true;
                break;
            }
            if (done) {
                break;
            }
        }
        return blockQuote;
    }
    
    private handleParagraph(array: Token[], index: RefIndex): pt.Paragraph {
        let paragraph: pt.Paragraph = {type: "paragraph", content: []};
        for (index.index + 1; index.index < array.length; ++index.index) {
            if (array[index.index].type === "paragraph_close") {
                break;
            }
            if (array[index.index].type === "inline") {
                this.getInline(array[index.index]).forEach(item => paragraph.content.push(item));
            }
        }
        return paragraph;
    }

    private handleHeading(array: Token[], index: RefIndex, level: number): pt.HeadingElement {
        let heading: pt.HeadingElement = {type: "heading", content: [], attributes: {level: level}}
        for (index.index + 1; index.index < array.length; ++index.index) {
            if (array[index.index].type === "heading_close") {
                break;
            }
            if (array[index.index].type === "inline") {
                this.getInline(array[index.index]).forEach(item => heading.content.push(item));
            }
        }
        return heading;
    }

    private handleList(array: Token[], index: RefIndex, ordered: boolean): pt.List {
        let list: pt.List = { type: "list", content: [], attributes: { listType: (ordered) ? "ordered" : "unordered"}};
        let done: boolean = false;
        for (index.index + 1; index.index < array.length; ++index.index) {
            switch (array[index.index].type) {
                case "bullet_list_close":
                case "ordered_list_close":
                    done = true;
                break;
                case "bullet_list_open":
                    index.index += 1;
                    list.content.push(this.handleList(array, index, false));
                break;
                case "ordered_list_open":
                    index.index += 1;
                    list.content.push(this.handleList(array, index, true));
                break;
                case "list_item_open":
                    index.index++; // paragraph_open
                    index.index++; // inline
                    let listItem: pt.ListItem = { type: "listItem", content: []};
                    this.getInline(array[index.index]).forEach(item => listItem.content.push(item));
                    list.content.push(listItem);
                break;
            }
            if (done) {
                break;
            }
        }
        return list;
    }

    private getInline(inline: Token): (pt.InlineElement | pt.Text)[] {
        let inlineElements: (pt.InlineElement | pt.Text)[] = [];
        let stack: (pt.TextAnnotation)[] = [];
        let current: pt.TextAnnotation;
        if (inline.children == null) {
            return [];
        }
        for (let i = 0; i < inline.children.length; ++i) {
            let child = inline.children[i];
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
                case "softbreak":
                    if (stack.length === 0) {
                        inlineElements.push({type: "text", content: ["\n"]});
                        break;
                    }
                    stack[stack.length - 1].content.push({type: "text", content: ["\n"]});
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
                    ++i;
                    let linkAlias = inline.children[i];
                    let linkContent = child.attrGet("href");
                    if (linkContent == null) {
                        break;
                    }
                    let link: pt.InlineElement = { type: "link", content: [linkContent], attributes: {alias: linkAlias.content}}
                    if (stack.length === 0) {
                        inlineElements.push(link);
                    }
                break;
                case "image":
                    let imgHref = child.attrGet("src");
                    if (imgHref != null) {
                        let image: pt.Image = {type: "image", content: [imgHref], attributes: {alias: child.content}};
                        if (stack.length === 0) {
                            inlineElements.push(image);
                            break;
                        }
                        stack[stack.length - 1].content.push(image);
                    }
                break;
                case "code_inline":
                    let code = {type: "code", content: [child.content]};
                    if (stack.length === 0) {
                        inlineElements.push(code);
                        break;
                    }
                    stack[stack.length - 1].content.push(code);
                break;
                case "strong_close":
                case "em_close":
                    if (stack.length === 1) {
                        inlineElements.push(stack[0]);
                    }
                    stack.pop();
                break;
                case "link_close":
                break;
                default:
                    throw "Markdown failed to compile: " + child.type;
            }
        }
        return inlineElements;
    }

}