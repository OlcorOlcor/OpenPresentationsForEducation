import * as pm from "./PresentationModel";
import * as pt from "./PresentationTypes";

/**
 * Interface that defines methods for visiting different types of nodes that the visitor will process.
 */
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
    visitTableNode(element: pm.TableElement): void;
    visitTableRowNode(element: pm.TableRowElement): void;
    visitTableHeadingNode(element: pm.TableHeadingElement): void;
    visitTableDataNode(element: pm.TableDataElement): void;
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void;
    visitSectionNode(element: pm.Section): void;
    visitHorizontalLineNode(element: pm.HorizontalLineElement): void;
    visitSlideNode(element: pm.SlideElement): void;
    visitLaneNode(element: pm.Lane): void;
}


/**
 * Interface that defines a method for accepting visitors.
 */
export interface IVisitable {
    accept(visitor: IVisitor): void;
}

/**
 * Class that converts the node structure into an HTML format.
 * 
 * The class implements the IVisitor interface.
 */
export class HtmlVisitor implements IVisitor {
    private result: string = "";
    private revealOutput: boolean;
    private images: pt.ImageFile[] = [];
    /**
     * Constructor for HtmlVisitor
     * @param reveal_output - Determines whether the output should be formatted as Reveal.js presentation.
     */
    constructor(reveal_output: boolean = false, images: pt.ImageFile[] = []) {
        this.revealOutput = reveal_output;
        this.images = images;
    }
    
    /**
     * Visits table element and appends it and its content to the result.
     * @param element The table element to visit
     */
    visitTableNode(element: pm.TableElement): void {
        this.result += "<table>";
        element.getContent().forEach(c => {
            c.accept(this);
        });
        this.result += "</table>";
    }

    /**
     * Visits table row element and appends it and its content to the result.
     * @param element The table row element to visit.
     */
    visitTableRowNode(element: pm.TableRowElement): void {
        this.result += "<tr>";
        element.getContent().forEach(c => {
            c.accept(this);
        });
        this.result += "</tr>";
    }

    /**
     * Visits table heading element and appends it and its content to the result.
     * @param element The table heading element to visit.
     */
    visitTableHeadingNode(element: pm.TableHeadingElement): void {
        this.result += "<th>";
        element.getContent().forEach(c => {
            c.accept(this);
        });
        this.result += "</th>";
    }

    /**
     * Visits table data element and appends it and its content to the result.
     * @param element The table data element to visit.
     */
    visitTableDataNode(element: pm.TableDataElement): void {
        this.result += "<td>";
        element.getContent().forEach(c => {
            c.accept(this);
        });
        this.result += "</td>";
    }

    /**
     * Visits a horizontal line and appends it to the result.
     * @param elements - The horizontal line element to visit.
     */
    visitHorizontalLineNode(element: pm.HorizontalLineElement): void {
        this.result += "<hr />";
    }

    /**
     * Visits a text node and appends its content to the result.
     * @param element - The text element to visit.
     */
    visitTextNode(element: pm.TextElement): void {
        this.result += element.getContent();
    }

    /**
     * Visits a bold node and wraps its content in <strong> tags.
     * @param element - The bold element to visit.
     */
    visitBoldNode(element: pm.BoldElement): void {
        this.result += "<strong>";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</strong>";
    }

    /**
     * Visits an italic node and wraps its content in <em> tags.
     * @param element - The italic element to visit.
     */
    visitItalicNode(element: pm.ItalicElement): void {
        this.result += "<em>";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</em>";
    }

    /**
     * Visits a code node and wraps its content in <code> tags.
     * @param element - The code element to visit.
     */
    visitCodeNode(element: pm.CodeElement): void {
        this.result += "<code>";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</code>";
    }

    /**
     * Visits an image node and creates an <img> tag with the source and alt attributes.
     * @param element - The image element to visit.
     */
    visitImageNode(element: pm.ImageElement): void {
        let src = element.getContent();
        if (element.getContent().substring(0, 4) === "img:") {
            let name = element.getContent().substring(4)
            this.images.forEach(img => {
                if (img.name === name) {
                    src = img.fileBase64;
                    return;
                }
            })
        }
        this.result +=
            '<img src="' + src + '" alt="' + element.getAlias() + '">';
    }

    /**
     * Visits a link node and creates an <a> tag with the href attribute and alias text.
     * @param element - The link element to visit.
     */
    visitLinkNode(element: pm.LinkElement): void {
        this.result += '<a href="' + element.getContent() + '">';
        this.result += element.getAlias();
        this.result += "</a>";
    }

    /**
     * Visits a paragraph node and wraps its content in <p> tags.
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        this.result += "<p>";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</p>";
    }

    /**
     * Visits a heading node and wraps its content in <h1>-<h6> tags based on its level.
     * @param element - The heading element to visit.
     */
    visitHeadingNode(element: pm.HeadingElement): void {
        this.result += "<h" + element.getLevel() + ">";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</h" + element.getLevel() + ">";
    }

    /**
     * Visits a list node and wraps its content in <ol> or <ul> tags based on the list type.
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        this.result += element.getListType() === "ordered" ? "<ol>" : "<ul>";
        element.getContent().forEach((c) => {
            c.accept(this);
        });
        this.result += element.getListType() === "ordered" ? "</ol>" : "</ul>";
    }

    /**
     * Visits a list item node and wraps its content in <li> tags.
     * @param element - The list item element to visit.
     */
    visitListItemNode(element: pm.ListItemElement): void {
        this.result += "<li>";
        element.getContent().forEach((c) => {
            c.accept(this);
        });
        this.result += "</li>";
    }

    /**
     * Visits a section node and wraps its content in <div> tag with its value.
     * @param element - The block quote element to visit.
     */
    visitSectionNode(element: pm.Section): void {
        this.result += `<div data-${element.getKey()}=${element.getValue()}>`;
        element.getContent().forEach(c => c.accept(this));
        this.result += "</div>";
    }

    /**
     * Visits a block quote node and wraps its content in <blockquote> tags.
     * @param element - The block quote element to visit.
     */
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        this.result += "<blockquote>";
        element.getContent().forEach((c) => {
            c.accept(this);
        });
        this.result += "</blockquote>";
    }

    /**
     * Visits a slide node and wraps its content in <section> tags if revealOutput is set to true.
     * @param element - The slide element to visit.
     */
    visitSlideNode(element: pm.SlideElement): void {
        if (this.revealOutput) {
            this.result += "<section>";
        }
        element.getContent().forEach((c) => {
            c.accept(this);
        });
        if (this.revealOutput) {
            this.result += "</section>";
        }
    }
    
    /**
     * Visits a lane node and wraps its content in reveal.js structure if revealOutput is true.
     * @param element - The lane element to visit.
     */
    visitLaneNode(element: pm.Lane): void {
        this.result = "";
        if (this.revealOutput) {
            this.result += "<div class=\"reveal\"><div class=\"slides\">";
        }
        element.getContent().forEach((slide) => {
           if (slide == null) {
                return;
           }
           slide.accept(this);
        });  
        if (this.revealOutput) {
            this.result += "</div></div>";
        }
    }

    /**
     * Returns the generated HTML result.
     * @returns The HTML result as a string.
     */
    getResult(): string {
        return this.result;
    }
}

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
    private addMetadata(element: pm.BlockQuoteElement | pm.ParagraphElement | pm.HeadingElement | pm.ListElement | pm.SlideElement | pm.Section): void {
        if (!(element instanceof pm.SlideElement)) {
            this.result += "#";
        }
        this.result += "[";
        let first = true;
        element.getMetadata().forEach(m => {
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

    /**
     * Visits a table element and appends it and its content to the result.
     * @param element The table element to visit.
     */
    visitTableNode(element: pm.TableElement): void {
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
        if (element.getMetadata().length !== 0) {
            this.addMetadata(element);
        }
        this.result += `<!-- ${element.getKey}: ${element.getValue} -->\n`;
        element.getContent().forEach(c => c.accept(this));
    }

    /**
     * Visits a paragraph node, adds metadata tags to the result and blockquote tags, if blockQouteLevel is above 0.
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        if (element.getMetadata().length !== 0) {
            this.addMetadata(element);
        }
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
        if (element.getMetadata().length !== 0) {
            this.addMetadata(element);
        }
        for (let blockQuoteCounter = 0; blockQuoteCounter < this.blockQuoteLevel; blockQuoteCounter++) {
            this.result += "> ";
        }
        for (let i = 0; i < element.getLevel(); ++i) {
            this.result += "#";
        }
        this.result += " ";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "\n";
    }

    /**
     * Visits a list node and wraps its content in Markdown list syntax.
     * 
     * Also adds blockquote tags, if blockQouteLevel is above 0.
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        if (element.getMetadata().length !== 0) {
            this.addMetadata(element);
        }
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
        if (element.getMetadata().length !== 0) {
            this.addMetadata(element);
        }
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
        
        if (element.getMetadata().length !== 0) {
            this.addMetadata(element);
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

/**
 * Class that converts the node structure into JSON format.
 * 
 * The class implements the IVisitor interface.
 */
export class JsonVisitor implements IVisitor {
    private lane: pt.Lane = {type: "lane", content: [], attributes: {name: "", compile: true} };
    private stack: any[] = [];

    /**
     * Visits a text node and adds its content to the stack.
     * @param element - The text element to visit.
     */
    visitTextNode(element: pm.TextElement): void {
        let text: pt.Text = {type: "text", content: [element.getContent()]};
        this.stack.push(text);
    }

    /**
     * Visits a bold node and adds its content to the stack wrapped in a bold annotation.
     * @param element - The bold element to visit.
     */
    visitBoldNode(element: pm.BoldElement): void {
        let bold: pt.TextAnnotation = {type: "bold", content: []};
        element.getContent().forEach(c => {
            c.accept(this);
            bold.content.push(this.stack.pop()!);
        });
        this.stack.push(bold);
    }

    /**
     * Visits a horizontal line element and adds it on the stack.
     * @param element - The horizontal line element to visit.
     */
    visitHorizontalLineNode(element: pm.HorizontalLineElement): void {
        let hr: pt.HorizontalLine = { type: "horizontal_line", metadataTags: element.getMetadata() };
        this.stack.push(hr);
    }

    /**
     * Visits a table element and adds it and its content to the stack.
     * @param element The table element to visit.
     */
    visitTableNode(element: pm.TableElement): void {
        let table: pt.Table = {type: "table", content: [], attributes: { metadataTags: element.getMetadata()}};
        element.getContent().forEach(c => {
            c.accept(this);
            table.content.push(this.stack.pop());
        });
        this.stack.push(table);
    }

    /**
     * Visits a table row element and adds it and its content to the stack.
     * @param element The table row element to visit.
     */
    visitTableRowNode(element: pm.TableRowElement): void {
        let tableRow: pt.TableRow = {type: "tableRow", content: []}
        element.getContent().forEach(c => {
            c.accept(this);
            tableRow.content.push(this.stack.pop());
        });
        this.stack.push(tableRow);
    }

    /**
     * Visits a table heading element and adds it and its content to the stack.
     * @param element The table heading element to visit.
     */
    visitTableHeadingNode(element: pm.TableHeadingElement): void {
        let tableHeading: pt.TableHeading = {type: "tableHeading", content: []}
        element.getContent().forEach(c => {
            c.accept(this);
            tableHeading.content.push(this.stack.pop());
        });
        this.stack.push(tableHeading);
    }

    /**
     * Visits a table data element and adds it and its content to the stack.
     * @param element The table data element to visit.
     */
    visitTableDataNode(element: pm.TableDataElement): void {
        let tableData: pt.TableData = {type: "tableData", content: []}
        element.getContent().forEach(c => {
            c.accept(this);
            tableData.content.push(this.stack.pop());
        });
        this.stack.push(tableData);
    }

    /**
     * Visits an italic node and adds its content to the stack wrapped in an italic annotation.
     * @param element - The italic element to visit.
     */
    visitItalicNode(element: pm.ItalicElement): void {
        let italic: pt.TextAnnotation = {type: "italic", content: []};
        element.getContent().forEach(c => {
            c.accept(this);
            italic.content.push(this.stack.pop()!);
        });
        this.stack.push(italic);
    }
    
    /**
     * Visits a code node and adds its content to the stack wrapped in a code annotation.
     * @param element - The code element to visit.
     */
    visitCodeNode(element: pm.CodeElement): void {
        let code: pt.TextAnnotation = {type: "code", content: []};
        element.getContent().forEach(c => {
            c.accept(this);
            code.content.push(this.stack.pop()!);
        });
        this.stack.push(code);
    }

    /**
     * Visits an image node and adds its content to the stack wrapped in an image element.
     * @param element - The image element to visit.
     */
    visitImageNode(element: pm.ImageElement): void {
        let image: pt.Image = {type: "image", content: [element.getContent()], attributes: { alias: element.getAlias()}, metadataTags: element.getMetadata()}
        this.stack.push(image);
    }

    /**
     * Visits a link node and adds its content to the stack wrapped in a link element.
     * @param element - The link element to visit.
     */
    visitLinkNode(element: pm.LinkElement): void {
        let link: pt.Link = {type: "link", content: [element.getContent()], attributes: { alias: element.getAlias() }, metadataTags: element.getMetadata()};
        this.stack.push(link);
    }

    /**
     * Visits a paragraph node and adds its content to the stack wrapped in a paragraph element. 
     * For each child element processed pops one element out of the stack.
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        let paragraph: pt.Paragraph = {type: "paragraph", content: [], attributes: {metadataTags: element.getMetadata()}};
        element.getContent().forEach(c => {
            c.accept(this);
            paragraph.content.push(this.stack.pop()!);
        });
        this.stack.push(paragraph);
    }

    /**
     * Visits a heading node and adds its content to the stack wrapped in a heading element.
     * For each child element processed pops one element out of the stack.
     * @param element - The heading element to visit.
     */
    visitHeadingNode(element: pm.HeadingElement): void {
       let heading: pt.HeadingElement = { type: "heading", content: [], attributes: { level: element.getLevel(), metadataTags: element.getMetadata() }};
       element.getContent().forEach(c => {
            c.accept(this);
            heading.content.push(this.stack.pop()!);
       });
       this.stack.push(heading);
    }

    /**
     * Visits a list node and adds its content to the stack wrapped in a list element.
     * For each child element processed pops one element out of the stack.
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        let list: pt.List = {type: "list", content: [], attributes: { listType: element.getListType()}, metadataTags: element.getMetadata() };
        element.getContent().forEach(c => {
            c.accept(this);
            list.content.push(this.stack.pop()!);
        });
        this.stack.push(list);
    }

    /**
     * Visits a list item node and adds its content to the stack wrapped in a listItem element.
     * For each child element processed pops one element out of the stack.
     * @param element - The list item element to visit.
     */
    visitListItemNode(element: pm.ListItemElement): void {
        let item: pt.ListItem = {type: "listItem", content: []};
        element.getContent().forEach(c => {
            c.accept(this);
            item.content.push(this.stack.pop()!);
        });
        this.stack.push(item);
    }

    /**
     * Visits a section element and adds its content to the stack wrapped in a section element.
     * For each child element processed pops one element out of the stack.
     * @param element - The section element to visit.
     */
    visitSectionNode(element: pm.Section): void {
        let section: pt.Section = {type: "section", content: [], attributes: {key: element.getKey(), value: element.getValue(), metadataTags: element.getMetadata()}}
        element.getContent().forEach(c => {
            c.accept(this);
            section.content.push(this.stack.pop());
        });
        this.stack.push(section);
    }

    /**
     * Visits a blockquote node and adds its content to the stack wrapped in a blockquote element.
     * For each child element processed pops one element out of the stack.
     * @param element - The blockquote element to visit.
     */
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        let bq: pt.BlockQuote = {type: "blockquote", content: [], attributes: {metadataTags: element.getMetadata()}};
        element.getContent().forEach(c => {
            c.accept(this);
            bq.content.push(this.stack.pop()!);
        });
        this.stack.push(bq);
    }

    /**
     * Visits a slide node and adds its content to the stack wrapped in a slide element.
     * For each child element processed pops one element out of the stack.
     * @param element - The slide element to visit.
     */
    visitSlideNode(element: pm.SlideElement): void {
        let slide: pt.Slide = {type: "slide", content: [], attributes: { metadataTags: element.getMetadata(), refs: element.getRefs(), frontMatter: element.getFrontMatter()}};
        element.getContent().forEach(c => {
            c.accept(this);
            slide.content.push(this.stack.pop()!);
        });
        this.stack.push(slide);
    }
    
    /**
     * Visits a lane node, processes its slides, and adds them to the lane.
     * For each non null child pops one element out of the stack.
     * @param element - The lane element to visit.
     */
    visitLaneNode(element: pm.Lane): void {
        this.lane = {type: "lane", content: [], attributes: {name: element.getName(), compile: element.outputsAsPresentation()} };
        element.getContent().forEach(slide => {
            if (slide == null || slide.isActive() === false) {
                this.lane.content.push(null);
                return;
            }
            slide.accept(this);
            this.lane.content.push(this.stack.pop()!);
        });
    }

    /**
     * Returns the resulting lane with all processed elements.
     * @returns The resulting lane as a pt.Lane object.
     */
    getResult(): pt.Lane {
        return this.lane;
    }
}

/**
 * Represents the results of analyzing the node structure.
 */
class AnalysisResult {
    words: number = 0;
    characters: number = 0;
    images: number = 0;
    links: number = 0;
    headings: number = 0;
    bullet_points: number = 0;
    tables: number = 0;
}

/**
 * Class that analyzes the node structure and counts each element.
 * 
 * The class implements the IVisitor interface.
 */
export class AnalysisVisitor implements IVisitor {
    private result: AnalysisResult = new AnalysisResult();

    /**
     * Visits a text node, updating the character and word counts.
     * @param element - The text element to visit.
     */
    visitTextNode(element: pm.TextElement): void {
        this.result.characters += element.getContent().length;
        this.result.words += element.getContent().split(' ').length;
    }
    
    /**
     * Visits a horizontal line element. No analysis is performed.
     * @param element - The horizontal line element to visit.
     */
    visitHorizontalLineNode(element: pm.HorizontalLineElement): void {
        return;
    }

    /**
     * Visits a table element, incrementing the table count.
     * @param element - The table element to visit.
     */
    visitTableNode(element: pm.TableElement): void {
        this.result.tables++;
    }

    /**
     * Visits a table row element. No analysis is performed.
     * @param element - The table row element to visit.
     */
    visitTableRowNode(element: pm.TableRowElement): void {
        return;    
    }

    /**
     * Visits a table heading element. No analysis is performed.
     * @param element - The table heading element to visit.
     */
    visitTableHeadingNode(element: pm.TableHeadingElement): void {
        return;
    }

    /**
     * Visits a table data element. No analysis is performed.
     * @param element - The table data element to visit.
     */
    visitTableDataNode(element: pm.TableDataElement): void {
        return;
    }

    /**
     * Visits a bold node. No analysis is performed.
     * @param element - The bold element to visit.
     */
    visitBoldNode(element: pm.BoldElement): void {
        return;
    }

    /**
     * Visits an italic node. No analysis is performed.
     * @param element - The italic element to visit.
     */
    visitItalicNode(element: pm.ItalicElement): void {
        return;
    }

    /**
     * Visits a code node. No analysis is performed.
     * @param element - The code element to visit.
     */
    visitCodeNode(element: pm.CodeElement): void {
        return;
    }

    /**
     * Visits an image node, incrementing the image count.
     * @param element - The image element to visit.
     */
    visitImageNode(element: pm.ImageElement): void {
        this.result.images++;
    }

    /**
     * Visits a link node, incrementing the link count.
     * @param element - The link element to visit.
     */
    visitLinkNode(element: pm.LinkElement): void {
        this.result.links++;
    }

    /**
     * Visists a section node, recursively analyzing its content.
     * @param element - The section element to visit.
     */
    visitSectionNode(element: pm.Section): void {
        element.getContent().forEach(c => c.accept(this));
    }

    /**
     * Visits a paragraph node, recursively analyzing its content.
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }

    /**
     * Visits a heading node, incrementing the heading count and recursively analyzing its content.
     * @param element - The heading element to visit.
     */
    visitHeadingNode(element: pm.HeadingElement): void {
        this.result.headings++;
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }
    
    /**
     * Visits a list node, recursively analyzing its content.
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }

    /**
     * Visits a list item node, incrementing the bullet point count and recursively analyzing its content.
     * @param element - The list item element to visit.
     */
    visitListItemNode(element: pm.ListItemElement): void {
        this.result.bullet_points++;
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }

    /**
     * Visits a blockquote node, recursively analyzing its content.
     * @param element - The blockquote element to visit.
     */
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }

    /**
     * Visits a slide node, recursively analyzing its content.
     * @param element - The slide element to visit.
     */
    visitSlideNode(element: pm.SlideElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
        });
    }

    /**
     * Visits a lane node, recursively analyzing its slides.
     * @param element - The lane element to visit.
     */
    visitLaneNode(element: pm.Lane): void {
        element.getContent().forEach(slide => {
            slide?.accept(this);
        });
    }

    /**
     * Returns the analysis results.
     * @returns The analysis results as an AnalysisResult object.
     */
    getResult(): AnalysisResult {
        return this.result;
    }

}

/**
 * Class that filters slides based on keywords and metadata tags.
 * 
 * The class implements the IVisitor interface.
 */
export class ReductionVisitor implements IVisitor {
    private keywords: string[];
    private metadataTags: string[];
    private isSlideCompliant: boolean = false;
    private complientSlides: pm.SlideElement[] = [];
    /**
     * Constructor for ReductionVisitor
     * @param keywords - The list of keywords to check within text elements.
     * @param metadataTags - The list of metadata tags to check within elements.
     */
    constructor(keywords: string[], metadataTags: string[]) {
        this.keywords = keywords;
        this.metadataTags = metadataTags;
    }

    /**
     * Checks if any of the metadata tags match the specified tags.
     * @param elementMetadata - The metadata of the element.
     */
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

    /**
     * Visits a text node, checking for keyword compliance.
     * 
     * @param element - The text element to visit.
     */
    visitTextNode(element: pm.TextElement): void {
        this.keywords.forEach(k => {
            if (element.getContent().includes(k)) {
                this.isSlideCompliant = true;
                return;
            }
        });
    }

    /**
     * Visits a horizontal line element, checking for metadata compliance.
     * 
     * @param element - The horizontal line element to visit.
     */
    visitHorizontalLineNode(element: pm.HorizontalLineElement): void {
        this.checkMetadata(element.getMetadata());
        if (this.isSlideCompliant) {
            return;
        }
    }

    /**
     * Visits table element and checks for compliance.
     * 
     * @param element - The table element to visit.
     */
    visitTableNode(element: pm.TableElement): void {
        this.checkMetadata(element.getMetadata());
        if (this.isSlideCompliant) {
            return;
        }
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits table row element and checks for compliance.
     * 
     * @param element - The table row element to visit.
     */
    visitTableRowNode(element: pm.TableRowElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits table heading element and checks for compliance.
     * 
     * @param element - The table heading element to visit.
     */
    visitTableHeadingNode(element: pm.TableHeadingElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits table data element and checks for compliance.
     * 
     * @param element - The table data element to visit.
     */
    visitTableDataNode(element: pm.TableDataElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a bold node, checking its content for compliance.
     * 
     * @param element - The bold element to visit.
     */
    visitBoldNode(element: pm.BoldElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits an italic node, checking its content for compliance.
     * 
     * @param element - The italic element to visit.
     */
    visitItalicNode(element: pm.ItalicElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a code node, checking its content for compliance.
     * 
     * @param element - The code element to visit.
     */
    visitCodeNode(element: pm.CodeElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits an image node, checking for keyword compliance.
     * 
     * @param element - The image element to visit.
     */
    visitImageNode(element: pm.ImageElement): void {
        this.keywords.forEach(k => {
            if (element.getContent().includes(k)) {
                this.isSlideCompliant = true;
                return;
            }
        });
    }

    /**
     * Visits a link node, checking for keyword compliance.
     * 
     * @param element - The link element to visit.
     */
    visitLinkNode(element: pm.LinkElement): void {
        this.keywords.forEach(k => {
            if (element.getContent().includes(k)) {
                this.isSlideCompliant = true;
                return;
            }
        });
    }
    /**
     * Visits a section node, checking its metadata and content for compliance.
     * 
     * @param element - The section element to visit.
     */
    visitSectionNode(element: pm.Section): void {
        this.checkMetadata(element.getMetadata());
        if (this.isSlideCompliant) {
            return;
        }
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a paragraph node, checking its metadata and content for compliance.
     * 
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        this.checkMetadata(element.getMetadata());
        if (this.isSlideCompliant) {
            return;
        }
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a heading node, checking its metadata and content for compliance.
     * 
     * @param element - The heading element to visit.
     */
    visitHeadingNode(element: pm.HeadingElement): void {
        this.checkMetadata(element.getMetadata());
        if (this.isSlideCompliant) {
            return;
        }
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a list node, checking its metadata and content for compliance.
     * 
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        this.checkMetadata(element.getMetadata());
        if (this.isSlideCompliant) {
            return;
        }
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a list item node, checking its content for compliance.
     * 
     * @param element - The list item element to visit.
     */
    visitListItemNode(element: pm.ListItemElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a blockquote node, checking its metadata and content for compliance.
     * 
     * @param element - The blockquote element to visit.
     */
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        this.checkMetadata(element.getMetadata());
        if (this.isSlideCompliant) {
            return;
        }
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                return;
            }
        });
    }

    /**
     * Visits a slide node, checking its content for compliance and adding it to the compliant lane if it is compliant.
     * 
     * @param element - The slide element to visit.
     */
    visitSlideNode(element: pm.SlideElement): void {
        element.getContent().forEach(c => {
            c.accept(this);
            if (this.isSlideCompliant) {
                this.complientSlides.push(element);
                return;
            }
        })
    }

    /**
     * Visits a lane node, checking each slide for compliance.
     * 
     * @param element - The lane element to visit.
     */
    visitLaneNode(element: pm.Lane): void {
        element.getContent().forEach(c => {
            this.isSlideCompliant = false;
            c?.accept(this);
        });
    }

    /**
     * Returns the resulting lane with all complient slides.
     * @returns The resulting lane as a pm.Lane object.
     */
    getResult(): pm.Lane {
        return new pm.Lane(this.complientSlides, "complient lane");
    }
}