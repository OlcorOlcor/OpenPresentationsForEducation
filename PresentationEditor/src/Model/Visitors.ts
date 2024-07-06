import { RestoreOutlined, ThreeGMobiledataSharp } from "@mui/icons-material";
import * as pm from "./PresentationModel";
import * as pt from "./PresentationTypes";

export interface IVisitor {
    visitTextNode(element: pm.TextElement): void;
    visitBoldNode(element: pm.BoldElement): void;
    visitItalicNode(element: pm.ItalicElement): void;
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
    reveal_output: boolean;
    constructor(reveal_output: boolean = false) {
        this.reveal_output = reveal_output;
    }
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
        if (this.reveal_output) {
            this.result += "<section>";
        }
        element.content.forEach((c) => {
            c.accept(this);
        });
        if (this.reveal_output) {
            this.result += "</section>";
        }
    }
    
    visitLaneNode(element: pm.Lane): void {
        this.result = "";
        if (this.reveal_output) {
            this.result += "<div class=\"reveal\"><div class=\"slides\">";
        }
        element.slides.forEach((slide) => {
           if (slide == null) {
                return;
           }
           slide.accept(this);
        });  
        if (this.reveal_output) {
            this.result += "</div></div>";
        }
    }

    getResult(): string {
        console.log(this.result);
        return this.result;
    }
}

export class MarkdownVisitor implements IVisitor {
    result: string = "";
    listLevel: number = 0;
    blockQuoteLevel: number = 0;
    paragraphNewLine: boolean = true;
    addMetadata(element: pm.BlockQuoteElement | pm.ParagraphElement | pm.HeadingElement | pm.ListElement | pm.SlideElement): void {
        if (!(element instanceof pm.SlideElement)) {
            this.result += "#";
        }
        this.result += "[";
        let first = true;
        element.metadata.forEach(m => {
            if (!first) {
                this.result += ", ";
            }
            this.result += `${m}`;
            first = false;
        });
        this.result += "]\n";
        if ((element instanceof pm.SlideElement)) {
            this.result += "\n";
        }
    }

    visitTextNode(element: pm.TextElement): void {
        if (element.content === "\n") {
            this.paragraphNewLine = true;
        }
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
        if (element.metadata.length !== 0) {
            this.addMetadata(element);
        }
        element.content.forEach((c) => { 
            if (this.paragraphNewLine) {
                for (let blockQuoteCounter = 0; blockQuoteCounter < this.blockQuoteLevel; blockQuoteCounter++) {
                    this.result += "> ";
                }
                this.paragraphNewLine = false;
            }
            c.accept(this) 
        });
        this.result += "\n\n";
    }

    visitHeadingNode(element: pm.HeadingElement): void {
        if (element.metadata.length !== 0) {
            this.addMetadata(element);
        }
        for (let blockQuoteCounter = 0; blockQuoteCounter < this.blockQuoteLevel; blockQuoteCounter++) {
            this.result += "> ";
        }
        for (let i = 0; i < element.level; ++i) {
            this.result += "#";
        }
        this.result += " ";
        element.content.forEach((c) => c.accept(this));
        this.result += "\n";
    }

    visitListNode(element: pm.ListElement): void {
        if (element.metadata.length !== 0) {
            this.addMetadata(element);
        }
        let counter = 1;
        this.listLevel++;
        element.content.forEach((c) => {
            for (let blockQuoteCounter = 0; blockQuoteCounter < this.blockQuoteLevel; blockQuoteCounter++) {
                this.result += "> ";
            }
            for (let indentCounter = 0; indentCounter < this.listLevel - 1; indentCounter++) {
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
        this.result += "\n";
        this.listLevel--;
    }

    visitListItemNode(element: pm.ListItemElement): void {
        element.content.forEach((c) => c.accept(this));
    }

    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        if (element.metadata.length !== 0) {
            this.addMetadata(element);
        }
        ++this.blockQuoteLevel;
        element.content.forEach((c) => {
            c.accept(this);
        });
        --this.blockQuoteLevel;
    }

    visitSlideNode(element: pm.SlideElement): void {
        if (element.metadata.length !== 0) {
            this.addMetadata(element);
        }
        element.content.forEach((c) => c.accept(this));
        if (element.refs.length > 0) {
            this.result += "\n";
            element.refs.forEach(ref => {
                this.result += "->[" + ref + "]";
                this.result += "\n";
            });
        }
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
    
    visitCodeNode(element: pm.CodeElement): void {
        let code: pt.TextAnnotation = {type: "code", content: []};
        element.content.forEach(c => {
            c.accept(this);
            code.content.push(this.stack.pop()!);
        });
        this.stack.push(code);
    }

    visitImageNode(element: pm.ImageElement): void {
        let image: pt.Image = {type: "image", content: [element.content], attributes: { alias: element.alias }}
        this.stack.push(image);
    }

    visitLinkNode(element: pm.LinkElement): void {
        let link: pt.Link = {type: "link", content: [element.content], attributes: { alias: element.alias }};
        this.stack.push(link);
    }

    visitParagraphNode(element: pm.ParagraphElement): void {
        let paragraph: pt.Paragraph = {type: "paragraph", content: [], attributes: {metadataTags: element.metadata}};
        element.content.forEach(c => {
            c.accept(this);
            paragraph.content.push(this.stack.pop()!);
        });
        this.stack.push(paragraph);
    }

    visitHeadingNode(element: pm.HeadingElement): void {
       let heading: pt.HeadingElement = { type: "heading", content: [], attributes: { level: element.level, metadataTags: element.metadata }};
       element.content.forEach(c => {
            c.accept(this);
            heading.content.push(this.stack.pop()!);
       });
       this.stack.push(heading);
    }

    visitListNode(element: pm.ListElement): void {
        let list: pt.List = {type: "list", content: [], attributes: { listType: element.listType, metadataTags: element.metadata }};
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
        let bq: pt.BlockQuote = {type: "blockquote", content: [], attributes: {metadataTags: element.metadata}};
        element.content.forEach(c => {
            c.accept(this);
            bq.content.push(this.stack.pop()!);
        });
        this.stack.push(bq);
    }

    visitSlideNode(element: pm.SlideElement): void {
        let slide: pt.Slide = {type: "slide", content: [], attributes: { metadataTags: element.metadata, refs: element.refs }};
        element.content.forEach(c => {
            c.accept(this);
            slide.content.push(this.stack.pop()!);
        });
        this.stack.push(slide);
    }
    
    visitLaneNode(element: pm.Lane): void {
        this.lane = {type: "lane", content: [], attributes: {name: element.name, compile: element.outputAsPresentation} };
        element.slides.forEach(slide => {
            if (slide == null || slide.active === false) {
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

class AnalysisResult {
    words: number = 0;
    characters: number = 0;
    images: number = 0;
    links: number = 0;
    headings: number = 0;
    bullet_points: number = 0;
}

export class AnalysisVisitor implements IVisitor {

    result: AnalysisResult = new AnalysisResult();

    visitTextNode(element: pm.TextElement): void {
        this.result.characters += element.content.length;
        this.result.words += element.content.split(' ').length;
    }
    
    visitBoldNode(element: pm.BoldElement): void {
        return;
    }

    visitItalicNode(element: pm.ItalicElement): void {
        return;
    }

    visitCodeNode(element: pm.CodeElement): void {
        return;
    }

    visitImageNode(element: pm.ImageElement): void {
        this.result.images++;
    }

    visitLinkNode(element: pm.LinkElement): void {
        this.result.links++;
    }

    visitParagraphNode(element: pm.ParagraphElement): void {
        element.content.forEach(c => {
            c.accept(this);
        });
    }

    visitHeadingNode(element: pm.HeadingElement): void {
        this.result.headings++;
        element.content.forEach(c => {
            c.accept(this);
        });
    }
    
    visitListNode(element: pm.ListElement): void {
        element.content.forEach(c => {
            c.accept(this);
        });
    }

    visitListItemNode(element: pm.ListItemElement): void {
        this.result.bullet_points++;
        element.content.forEach(c => {
            c.accept(this);
        });
    }

    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        element.content.forEach(c => {
            c.accept(this);
        });
    }

    visitSlideNode(element: pm.SlideElement): void {
        element.content.forEach(c => {
            c.accept(this);
        });
    }

    visitLaneNode(element: pm.Lane): void {
        element.slides.forEach(slide => {
            slide?.accept(this);
        });
    }

    getResult(): AnalysisResult {
        return this.result;
    }

}

export class ReductionVisitor implements IVisitor {
    keywords: string[];
    metadataTags: string[];
    isSlideCompliant: boolean = false;
    compliantLane: pm.Lane;

    constructor(keywords: string[], metadataTags: string[]) {
        this.keywords = keywords;
        this.metadataTags = metadataTags;
        this.compliantLane = new pm.Lane([], "complient lane");
    }

    private checkMetadata(elementMetadata: string[]) {
        elementMetadata.forEach(elementMetadata => {
            this.metadataTags.forEach(metadata => {
                if (elementMetadata === metadata) {
                    this.isSlideCompliant = true;
                    return;
                }
            });
        });
    }

    visitTextNode(element: pm.TextElement): void {
        this.keywords.forEach(k => {
            if (element.content.includes(k)) {
                this.isSlideCompliant = true;
                return;
            }
        });
    }

    visitBoldNode(element: pm.BoldElement): void {
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitItalicNode(element: pm.ItalicElement): void {
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitCodeNode(element: pm.CodeElement): void {
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitImageNode(element: pm.ImageElement): void {
        this.keywords.forEach(k => {
            if (element.content.includes(k)) {
                this.isSlideCompliant = true;
                return;
            }
        });
    }

    visitLinkNode(element: pm.LinkElement): void {
        this.keywords.forEach(k => {
            if (element.content.includes(k)) {
                this.isSlideCompliant = true;
                return;
            }
        });
    }

    visitParagraphNode(element: pm.ParagraphElement): void {
        this.checkMetadata(element.metadata);
        if (this.isSlideCompliant) {
            return;
        }
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitHeadingNode(element: pm.HeadingElement): void {
        this.checkMetadata(element.metadata);
        if (this.isSlideCompliant) {
            return;
        }
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitListNode(element: pm.ListElement): void {
        this.checkMetadata(element.metadata);
        if (this.isSlideCompliant) {
            return;
        }
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitListItemNode(element: pm.ListItemElement): void {
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        this.checkMetadata(element.metadata);
        if (this.isSlideCompliant) {
            return;
        }
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    visitSlideNode(element: pm.SlideElement): void {
        element.content.forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                this.compliantLane.slides.push(element);
                return;
            }
        })
    }

    visitLaneNode(element: pm.Lane): void {
        element.slides.forEach(c => {
            this.isSlideCompliant = false;
            c?.accept(this);
        });
    }
}