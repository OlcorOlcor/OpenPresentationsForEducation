import * as pm from "./presentationModel";


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
    visitSlideNode(element: pm.SlideElement): string;
}

export interface IVisitable {
    accept(visitor: IVisitor): void;
}

class HtmlVisitor implements IVisitor {
    result: string = "";

    visitTextNode(element: pm.TextElement): void {
        this.result += element.content;
    }

    visitBoldNode(element: pm.BoldElement): void {
        this.result += "<strong>";
        element.content.forEach(c => c.accept(this));
        this.result += "</strong>";
    }

    visitItalicNode(element: pm.ItalicElement): void {
        this.result += "<em>";
        element.content.forEach(c => c.accept(this));
        this.result += "</em>";
    }

    visitBoldItalicNode(element: pm.BoldItalicElement): void {
        this.result += "<strong><em>";
        element.content.forEach(c => c.accept(this));
        this.result += "</em></strong>";
    }

    visitCodeNode(element: pm.CodeElement): void {
        this.result += "<code>";
        element.content.forEach(c => c.accept(this));
        this.result += "</code>";
    }

    visitImageNode(element: pm.ImageElement): void {
        this.result += "<img src=\"" + element.content + "\" alt=\"" + element.alias + "\">";
    }

    visitLinkNode(element: pm.LinkElement): void {
        this.result += "<a href=\"" + element.content +"\">";
        this.result += element.alias;
        this.result+= "</a>";
    }

    visitParagraphNode(element: pm.ParagraphElement): void {
        this.result += "<p>";
        element.content.forEach(c => c.accept(this));
        this.result+= "</p>";
    }

    visitHeadingNode(element: pm.HeadingElement): void {
        this.result += "<h" + element.level + ">";
        element.content.forEach(c => c.accept(this));
        this.result += "</h" + element.level + ">";
    }

    visitListNode(element: pm.ListElement): void {
        this.result += (element.listType === "ordered") ? "<ol>" : "<ul>";
        element.content.forEach(c => { c.accept(this); });
        this.result += (element.listType === "ordered") ? "</ol>" : "</ul>";
    }

    visitListItemNode(element: pm.ListItemElement): void {
        this.result += "<li>";
        element.content.forEach(c => { c.accept(this); });
        this.result += "</li>";
    }

    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        this.result += "<blockquote>";
        element.content.forEach(c => { c.accept(this); });
        this.result += "</blockquote>";
    }

    visitSlideNode(element: pm.SlideElement): string {
        element.content.forEach(c => { c.accept(this) });
        return this.result;
    }
}

class MarkdownVisitor implements IVisitor {
    result: string = "";
    listLevel: number = 0;

    visitTextNode(element: pm.TextElement): void {
        this.result += element.content;
    }
    visitBoldNode(element: pm.BoldElement): void {
        this.result += "**";
        element.content.forEach(c => c.accept(this));
        this.result += "**";
    }
    visitItalicNode(element: pm.ItalicElement): void {
        this.result += "*";
        element.content.forEach(c => c.accept(this));
        this.result += "*";
    }
    visitBoldItalicNode(element: pm.BoldItalicElement): void {
        this.result += "***";
        element.content.forEach(c => c.accept(this));
        this.result += "***";
    }
    visitCodeNode(element: pm.CodeElement): void {
        this.result += "```\n";
        element.content.forEach(c => c.accept(this));
        this.result += "```\n";
    }
    visitImageNode(element: pm.ImageElement): void {
        this.result += "![" + element.alias + "](" + element.content + ")";
    }
    visitLinkNode(element: pm.LinkElement): void {
        this.result += "[" + element.alias + "](" + element.content + ")";
    }
    visitParagraphNode(element: pm.ParagraphElement): void {
        element.content.forEach(c => c.accept(this));
        this.result += "\n\n";
    }
    visitHeadingNode(element: pm.HeadingElement): void {
        for (let i = 0; i < element.level; ++i) {
            this.result += "#";
        }
        this.result += " ";
        element.content.forEach(c => c.accept(this));
        this.result += "\n";
    }

    visitListNode(element: pm.ListElement): void {
        let counter = 1;
        this.listLevel++;
        element.content.forEach(c => {
            for (let indentCounter = 0; indentCounter < this.listLevel; indentCounter++) {
                this.result += "\t";
            }
            this.result += (element.listType === "ordered") ? counter + ". " : "-";
            c.accept(this);
            this.result += "\n";
        });
        this.listLevel--;
    }

    visitListItemNode(element: pm.ListItemElement): void {
        element.content.forEach(c => c.accept(this));
    }
    
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        element.content.forEach(c => {
            this.result += "> ";
            c.accept(this);
            this.result += "\n";
        })
    }

    visitSlideNode(element: pm.SlideElement): string {
        element.content.forEach(c => c.accept(this));
        return this.result;    
    }
}