import * as pm from "./PresentationModel";
import * as pt from "./PresentationTypes";

export interface IVisitor {
    visitTextNode(element: pm.TextElement): void;
    visitBoldNode(element: pm.BoldElement): void;
    visitItalicNode(element: pm.ItalicElement): void;
    visitBoldItalicNode(element: pm.BoldItalicElement): void;
    visitCodeNode(element: pm.CodeElement): void;
    visitImageNode(element: pm.ImageElement): void;
    visitLinkNode(element: pm.LinkElement): void;
    visitParagraphNode(element: pm.ParagraphElement): void;
    visitHeadingNode(element: pm.HeadingElement): void;
    visitListNode(element: pm.ListElement): void;
    visitListItemNode(element: pm.ListItemElement): void;
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void;
    visitSlideNode(element: pm.SlideElement): void;
    visitLaneNode(element: pm.Lane): void;
}

export interface IVisitable {
    accept(visitor: IVisitor): void;
}

export class HtmlVisitor implements IVisitor {
    result: string = "";

    visitTextNode(element: pm.TextElement): void {
        this.result += element.content;
    }

    visitBoldNode(element: pm.BoldElement): void {
        this.result += "<strong>";
        element.content.forEach((c) => c.accept(this));
        this.result += "</strong>";
    }

    visitItalicNode(element: pm.ItalicElement): void {
        this.result += "<em>";
        element.content.forEach((c) => c.accept(this));
        this.result += "</em>";
    }

    visitBoldItalicNode(element: pm.BoldItalicElement): void {
        this.result += "<strong><em>";
        element.content.forEach((c) => c.accept(this));
        this.result += "</em></strong>";
    }

    visitCodeNode(element: pm.CodeElement): void {
        this.result += "<code>";
        element.content.forEach((c) => c.accept(this));
        this.result += "</code>";
    }

    visitImageNode(element: pm.ImageElement): void {
        this.result +=
            '<img src="' + element.content + '" alt="' + element.alias + '">';
    }

    visitLinkNode(element: pm.LinkElement): void {
        this.result += '<a href="' + element.content + '">';
        this.result += element.alias;
        this.result += "</a>";
    }

    visitParagraphNode(element: pm.ParagraphElement): void {
        this.result += "<p>";
        element.content.forEach((c) => c.accept(this));
        this.result += "</p>";
    }

    visitHeadingNode(element: pm.HeadingElement): void {
        this.result += "<h" + element.level + ">";
        element.content.forEach((c) => c.accept(this));
        this.result += "</h" + element.level + ">";
    }

    visitListNode(element: pm.ListElement): void {
        this.result += element.listType === "ordered" ? "<ol>" : "<ul>";
        element.content.forEach((c) => {
            c.accept(this);
        });
        this.result += element.listType === "ordered" ? "</ol>" : "</ul>";
    }

    visitListItemNode(element: pm.ListItemElement): void {
        this.result += "<li>";
        element.content.forEach((c) => {
            c.accept(this);
        });
        this.result += "</li>";
    }

    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        this.result += "<blockquote>";
        element.content.forEach((c) => {
            c.accept(this);
        });
        this.result += "</blockquote>";
    }

    visitSlideNode(element: pm.SlideElement): void {
        element.content.forEach((c) => {
            c.accept(this);
        });
    }
    
    visitLaneNode(element: pm.Lane): void {
        element.slides.forEach((slide) => {
           if (slide == null) {
                return;
           }
           slide.accept(this);
        });  
    }

    getResult(): string {
        return this.result;
    }
}

export class MarkdownVisitor implements IVisitor {
    result: string = "";
    listLevel: number = 0;

    visitTextNode(element: pm.TextElement): void {
        this.result += element.content;
    }
    visitBoldNode(element: pm.BoldElement): void {
        this.result += "**";
        element.content.forEach((c) => c.accept(this));
        this.result += "**";
    }
    visitItalicNode(element: pm.ItalicElement): void {
        this.result += "*";
        element.content.forEach((c) => c.accept(this));
        this.result += "*";
    }
    visitBoldItalicNode(element: pm.BoldItalicElement): void {
        this.result += "***";
        element.content.forEach((c) => c.accept(this));
        this.result += "***";
    }
    visitCodeNode(element: pm.CodeElement): void {
        this.result += "`";
        element.content.forEach((c) => c.accept(this));
        this.result += "`";
    }
    visitImageNode(element: pm.ImageElement): void {
        this.result += "![" + element.alias + "](" + element.content + ")";
    }
    visitLinkNode(element: pm.LinkElement): void {
        this.result += "[" + element.alias + "](" + element.content + ")";
    }
    visitParagraphNode(element: pm.ParagraphElement): void {
        element.content.forEach((c) => c.accept(this));
        this.result += "\n\n";
    }
    visitHeadingNode(element: pm.HeadingElement): void {
        for (let i = 0; i < element.level; ++i) {
            this.result += "#";
        }
        this.result += " ";
        element.content.forEach((c) => c.accept(this));
        this.result += "\n";
    }

    visitListNode(element: pm.ListElement): void {
        let counter = 1;
        this.listLevel++;
        element.content.forEach((c) => {
            for (
                let indentCounter = 0;
                indentCounter < this.listLevel - 1;
                indentCounter++
            ) {
                this.result += "\t";
            }
            if (c instanceof pm.ListItemElement) {
                this.result +=
                    element.listType === "ordered" ? counter + ". " : "- ";
            }
            c.accept(this);
            if (c instanceof pm.ListItemElement) {
                this.result += "\n";
            }
        });
        this.listLevel--;
    }

    visitListItemNode(element: pm.ListItemElement): void {
        element.content.forEach((c) => c.accept(this));
    }

    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        element.content.forEach((c) => {
            this.result += "> ";
            c.accept(this);
        });
    }

    visitSlideNode(element: pm.SlideElement): void {
        element.content.forEach((c) => c.accept(this));
    }

    visitLaneNode(element: pm.Lane): void {
        element.slides.forEach((slide) => {
           if (slide == null) {
                return;
           }
           slide.accept(this);
        });  
    }

    getResult(): string {
        return this.result;
    }
}

export class JsonVisitor implements IVisitor {
    private lane: pt.Lane = {type: "lane", content: [], attributes: {name: "", compile: true} };
    private stack: any[] = [];
    visitTextNode(element: pm.TextElement): void {
        let text: pt.Text = {type: "text", content: [element.content]};
        this.stack.push(text);
    }

    visitBoldNode(element: pm.BoldElement): void {
        let bold: pt.TextAnnotation = {type: "bold", content: []};
        element.content.forEach(c => {
            c.accept(this);
            bold.content.push(this.stack.pop()!);
        });
        this.stack.push(bold);
    }

    visitItalicNode(element: pm.ItalicElement): void {
        let italic: pt.TextAnnotation = {type: "italic", content: []};
        element.content.forEach(c => {
            c.accept(this);
            italic.content.push(this.stack.pop()!);
        });
        this.stack.push(italic);
    }

    visitBoldItalicNode(element: pm.BoldItalicElement): void {
        let bi: pt.TextAnnotation = {type: "boldItalic", content: []};
        element.content.forEach(c => {
            c.accept(this);
            bi.content.push(this.stack.pop()!);
        });
        this.stack.push(bi);
    }

    visitCodeNode(element: pm.CodeElement): void {
        let code: pt.TextAnnotation = {type: "code", content: []};
        element.content.forEach(c => {
            c.accept(this);
            code.content.push(this.stack.pop()!);
        });
        this.stack.push(code);
    }

    visitImageNode(element: pm.ImageElement): void {
        let image: pt.Image = {type: "images", content: [element.content], attributes: { alias: element.alias }}
        this.stack.push(image);
    }

    visitLinkNode(element: pm.LinkElement): void {
        let link: pt.Link = {type: "link", content: [element.content], attributes: { alias: element.alias }};
        this.stack.push(link);
    }

    visitParagraphNode(element: pm.ParagraphElement): void {
        let paragraph: pt.Paragraph = {type: "paragraph", content: [] };
        element.content.forEach(c => {
            c.accept(this);
            paragraph.content.push(this.stack.pop()!);
        });
        this.stack.push(paragraph);
    }

    visitHeadingNode(element: pm.HeadingElement): void {
       let heading: pt.HeadingElement = { type: "heading", content: [], attributes: { level: element.level }};
       element.content.forEach(c => {
            c.accept(this);
            heading.content.push(this.stack.pop()!);
       });
       this.stack.push(heading);
    }

    visitListNode(element: pm.ListElement): void {
        let list: pt.List = {type: "list", content: [], attributes: { listType: element.listType }};
        element.content.forEach(c => {
            c.accept(this);
            list.content.push(this.stack.pop()!);
        });
        this.stack.push(list);
    }

    visitListItemNode(element: pm.ListItemElement): void {
        let item: pt.ListItem = {type: "listItem", content: []};
        element.content.forEach(c => {
            c.accept(this);
            item.content.push(this.stack.pop()!);
        });
        this.stack.push(item);
    }

    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        let bq: pt.BlockQuote = {type: "blockquote", content: []};
        element.content.forEach(c => {
            c.accept(this);
            bq.content.push(this.stack.pop()!);
        });
        this.stack.push(bq);
    }

    visitSlideNode(element: pm.SlideElement): void {
        let slide: pt.Slide = {type: "slide", content: [], attributes: {active: element.active}};
        element.content.forEach(c => {
            c.accept(this);
            slide.content.push(this.stack.pop()!);
        });
        this.stack.push(slide);
    }
    
    visitLaneNode(element: pm.Lane): void {
        this.lane = {type: "lane", content: [], attributes: {name: element.name, compile: element.outputAsPresentation} };
        element.slides.forEach(slide => {
            if (slide == null) {
                this.lane.content.push(null);
                return;
            }
            slide.accept(this);
            this.lane.content.push(this.stack.pop()!);
        });
    }

    getResult(): pt.Lane {
        return this.lane;
    }
}