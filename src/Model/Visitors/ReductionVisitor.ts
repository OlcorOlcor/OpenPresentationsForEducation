import { IVisitor } from "./IVisitor";
import * as pm from "../PresentationModel";

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
        this.checkMetadata(element.getGlobalMetadata());
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
        this.checkMetadata(element.getGlobalMetadata());
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
        this.checkMetadata(element.getGlobalMetadata());
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
        this.checkMetadata(element.getGlobalMetadata());
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
        this.checkMetadata(element.getGlobalMetadata());
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
        this.checkMetadata(element.getGlobalMetadata());
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
        this.checkMetadata(element.getGlobalMetadata());
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