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

    private getInline(inline: Token): pt.InlineElement[] {
        let inlineElements: pt.InlineElement[] = [];
        let current: any;
        inline.children?.forEach(child => {
            switch (child.type) {
                case "text":
                    current.content.push({type: "text", content: [child.content]});
                break;
                case "bold":
                    // TODO
                break;
                // TODO
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