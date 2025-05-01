import { IVisitor } from "./IVisitor";
import * as pm from "../PresentationModel";

/**
 * Class that converts the node structure into a markdown format.
 * 
 * The class implements the IVisitor interface.
 */
export class MarkdownVisitor implements IVisitor {
    private result: string = "";
    private listLevel: number = 0;
    private blockQuoteLevel: number = 0;
    private paragraphNewLine: boolean = true;
    
    /**
     * Adds metadata to the result string for wrapper elements and the slide element.
     * @param element - The element for which metadata is added.
     */
    private addMetadata(element: pm.OuterElement): void {
        if (element.getGlobalMetadata().length === 0 && Object.keys(element.getMetadata()).length === 0) {
            return;
        }
        element.getGlobalMetadata().forEach(m => {
            this.result += "<!-- " + m + " -->\n";
        });
        let metadata = element.getMetadata();
        Object.keys(metadata).forEach(k => {
            this.result += "<!-- " + k + ": " + metadata[k] + " -->\n";
        });
    }

    /**
     * Visits a table element and appends it and its content to the result.
     * @param element The table element to visit.
     */
    visitTableNode(element: pm.TableElement): void {
        this.addMetadata(element);
        element.getContent().forEach(c => {
            c.accept(this);
        });
        this.result += "\n";
    }

    /**
     * Visits a table row element and appends it and its content to the result.
     * @param element The table row element to visit.
     */
    visitTableRowNode(element: pm.TableRowElement): void {
        let headingRow = element.getContent()[0] instanceof pm.TableHeadingElement;
        this.result += "|";
        element.getContent().forEach(c => {
            this.result += " ";
            c.accept(this);
            this.result += " |";
        });

        if (headingRow) {
            this.result += "\n";
            this.result += "|";
            for (let i = 0; i < element.getContent().length; ++i) {
                this.result += " --- |";
            }
        }
        this.result += "\n";
    }

    visitTableHeadingNode(element: pm.TableHeadingElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }

    visitTableDataNode(element: pm.TableDataElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }

    /**
     * Visits a horizontal line element and appends it to the result.
     * @param element - The horizontal line element to visit
     */
    visitHorizontalLineNode(element: pm.HorizontalLineElement): void {
        this.result += "___\n\n";
    }

    /**
     * Visits a text node and appends its content to the result.
     * @param element - The text element to visit.
     */
    visitTextNode(element: pm.TextElement): void {
        if (element.getContent() === "\n") {
            this.paragraphNewLine = true;
        }
        this.result += element.getContent();
    }

    /**
     * Visits a bold node and wraps its content in ** tags.
     * @param element - The bold element to visit.
     */
    visitBoldNode(element: pm.BoldElement): void {
        this.result += "**";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "**";
    }

    /**
     * Visits an italic node and wraps its content in * tags.
     * @param element - The italic element to visit.
     */
    visitItalicNode(element: pm.ItalicElement): void {
        this.result += "*";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "*";
    }

    /**
     * Visits a code node and wraps its content in ` tags.
     * @param element - The code element to visit.
     */
    visitCodeNode(element: pm.CodeElement): void {
        this.result += "`";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "`";
    }

    /**
     * Visits an image node and creates a Markdown image syntax.
     * @param element - The image element to visit.
     */
    visitImageNode(element: pm.ImageElement): void {
        this.result += "![" + element.getAlias() + "](" + element.getContent() + ")";
    }

    /**
     * Visits a link node and creates a Markdown link syntax.
     * @param element - The link element to visit.
     */
    visitLinkNode(element: pm.LinkElement): void {
        this.result += "[" + element.getAlias()+ "](" + element.getContent()+ ")";
    }

    /**
     * Visits a section node, adds the tag and its metadata tags to the result.
     * @param element - The section element to visit.
     */
    visitSectionNode(element: pm.Section): void {
        this.addMetadata(element);
        this.result += `<!-- +${element.getKey()}: ${element.getValue()} -->\n\n`;
        element.getContent().forEach(c => c.accept(this));
        this.result += "<!-- / -->\n\n";
    }

    /**
     * Visits a paragraph node, adds metadata tags to the result and blockquote tags, if blockQouteLevel is above 0.
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        this.addMetadata(element);
        element.getContent().forEach((c) => { 
            if (this.paragraphNewLine) {
                for (let blockQuoteCounter = 0; blockQuoteCounter < this.blockQuoteLevel; blockQuoteCounter++) {
                    this.result += "> ";
                }
                this.paragraphNewLine = false;
            }
            c.accept(this);
        });
        this.result += "\n\n";
    }


    /**
     * Visits a heading node and wraps its content in Markdown heading syntax.
     * 
     * Also adds blockquote tags, if blockQouteLevel is above 0.
     * @param element - The heading element to visit.
     */
    visitHeadingNode(element: pm.HeadingElement): void {
        this.addMetadata(element);
        for (let blockQuoteCounter = 0; blockQuoteCounter < this.blockQuoteLevel; blockQuoteCounter++) {
            this.result += "> ";
        }
        for (let i = 0; i < element.getLevel(); ++i) {
            this.result += "#";
        }
        this.result += " ";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "\n\n";
    }

    /**
     * Visits a list node and wraps its content in Markdown list syntax.
     * 
     * Also adds blockquote tags, if blockQouteLevel is above 0.
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        this.addMetadata(element);
        let counter = 1;
        this.listLevel++;
        element.getContent().forEach((c) => {
            for (let blockQuoteCounter = 0; blockQuoteCounter < this.blockQuoteLevel; blockQuoteCounter++) {
                this.result += "> ";
            }
            for (let indentCounter = 0; indentCounter < this.listLevel - 1; indentCounter++) {
                this.result += "\t";
            }
            if (c instanceof pm.ListItemElement) {
                this.result +=
                    element.getListType() === "ordered" ? counter + ". " : "- ";
            }
            c.accept(this);
            counter++;
            if (c instanceof pm.ListItemElement) {
                this.result += "\n";
            }
        });
        this.result += "\n";
        this.listLevel--;
    }

    /**
     * Visits a list item node and processes its content.
     * @param element - The list item element to visit.
     */
    visitListItemNode(element: pm.ListItemElement): void {
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits a blockquote node and adds its metadata tags to the result.
     * 
     * Increases blockQuoteLevel which is used in other methods to add blockquote tags.
     * @param element - The blockquote element to visit.
     */
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        this.addMetadata(element);
        ++this.blockQuoteLevel;
        element.getContent().forEach((c) => {
            c.accept(this);
        });
        --this.blockQuoteLevel;
    }

    /**
     * Visits a slide node and processes its content.
     * 
     * Adds reference tags if there are any.
     * @param element - The slide element to visit.
     */
    visitSlideNode(element: pm.SlideElement): void {
        const frontMatter = element.getFrontMatter();
        if (Object.keys(frontMatter).length !== 0) {

            this.result += "---\n";
            Object.keys(frontMatter).forEach(key => {
                this.result += key + ": " + frontMatter[key] + "\n";
            })
            this.result += "---\n\n";
        }
        
        if (element.getGlobalMetadata().length !== 0) {
            //this.addMetadata(element);
        }
        element.getContent().forEach((c) => c.accept(this));
        if (element.getRefs().length > 0) {
            this.result += "\n";
            element.getRefs().forEach(ref => {
                this.result += "->[" + ref + "]";
                this.result += "\n";
            });
        }
    }

    /**
     * Visits a lane node and processes its slides.
     * @param element - The lane element to visit.
     */
    visitLaneNode(element: pm.Lane): void {
        element.getContent().forEach((slide) => {
           if (slide == null) {
                return;
           }
           slide.accept(this);
        });  
    }

    /**
     * Returns the generated Markdown result.
     * @returns The Markdown result as a string.
     */
    getResult(): string {
        return this.result;
    }

    /**
     * Sets the result to an empty string.
     */
    clearResult(): void {
        this.result = "";
    }
}