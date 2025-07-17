import { IVisitor } from "./IVisitor";
import * as pm from "../PresentationModel";
import * as pt from "../PresentationTypes";

/**
 * Class that converts the node structure into an HTML format.
 *
 * The class implements the IVisitor interface.
 */
export class HtmlVisitor implements IVisitor {
    private result: string = "";
    private images: pt.ImageFile[] = [];
    private globalMetadata: pt.Metadata[];
    /**
     * Constructor for HtmlVisitor
     */
    constructor(images: pt.ImageFile[] = [], globalMetadata: pt.Metadata[]) {
        this.images = images;
        this.globalMetadata = globalMetadata;
    }

    private addMetadata(element: pm.OuterElement): void {
        let metadata = element.getMetadata();
        Object.keys(metadata).forEach((k) => {
            this.result += " data-" + k + "=" + metadata[k];
        });
        let localGlobalMetadata = element.getGlobalMetadata();
        if (localGlobalMetadata.length === 0) {
            return;
        }
        this.globalMetadata.forEach((gm) => {
            localGlobalMetadata.forEach((lgm) => {
                if (gm.name === lgm) {
                    Object.keys(gm.attributes).forEach((k) => {
                        this.result += " data-" + k + "=" + gm.attributes[k];
                    });
                }
            });
        });
    }

    /**
     * Visits table element and appends it and its content to the result.
     * @param element The table element to visit
     */
    visitTableNode(element: pm.TableElement): void {
        this.result += "<table";
        this.addMetadata(element);
        this.result += ">";
        element.getContent().forEach((c) => {
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
        element.getContent().forEach((c) => {
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
        element.getContent().forEach((c) => {
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
        element.getContent().forEach((c) => {
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
            let name = element.getContent().substring(4);
            this.images.forEach((img) => {
                if (img.name === name) {
                    src = img.fileBase64;
                    console.log("HERE" + src);
                    return;
                }
            });
        }
        console.log(src);
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
        this.result += "<p";
        this.addMetadata(element);
        this.result += ">";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</p>";
    }

    /**
     * Visits a heading node and wraps its content in <h1>-<h6> tags based on its level.
     * @param element - The heading element to visit.
     */
    visitHeadingNode(element: pm.HeadingElement): void {
        this.result += "<h" + element.getLevel();
        this.addMetadata(element);
        this.result += ">";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</h" + element.getLevel() + ">";
    }

    /**
     * Visits a list node and wraps its content in <ol> or <ul> tags based on the list type.
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        this.result += element.getListType() === "ordered" ? "<ol" : "<ul";
        this.addMetadata(element);
        this.result += ">";
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
        this.result += `<div data-${element.getKey()}=${element.getValue()}`;
        this.addMetadata(element);
        this.result += ">";
        element.getContent().forEach((c) => c.accept(this));
        this.result += "</div>";
    }

    /**
     * Visits a block quote node and wraps its content in <blockquote> tags.
     * @param element - The block quote element to visit.
     */
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        this.result += "<blockquote";
        this.addMetadata(element);
        this.result += ">";
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
        this.result += "<div";
        const fm = element.getFrontMatter();
        Object.keys(element.getFrontMatter()).forEach((k) => {
            this.result += " data-" + k + "=" + fm[k];
        });

        element.getRefs().forEach((ref) => {
            this.result += " data-points_to=" + ref;
        });

        this.result += ">";
        element.getContent().forEach((c) => {
            c.accept(this);
        });
        this.result += "</div>";
    }

    /**
     * Visits a lane node and wraps its content in reveal.js structure if revealOutput is true.
     * @param element - The lane element to visit.
     */
    visitLaneNode(element: pm.Lane): void {
        this.result = "";
        this.result += "<div data-lane=" + element.getName() + ">";
        element.getContent().forEach((slide) => {
            if (slide == null) {
                return;
            }
            slide.accept(this);
        });
        this.result += "</div>";
    }

    /**
     * Returns the generated HTML result.
     * @returns The HTML result as a string.
     */
    getResult(): string {
        return this.result;
    }
}
