import { IVisitor } from "./IVisitor";
import * as pm from "../PresentationModel";

/**
 * Represents the results of analyzing the node structure.
 */
export class AnalysisResult {
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
        this.result.words += element.getContent().split(" ").length;
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
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits a table row element. No analysis is performed.
     * @param element - The table row element to visit.
     */
    visitTableRowNode(element: pm.TableRowElement): void {
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits a table heading element. No analysis is performed.
     * @param element - The table heading element to visit.
     */
    visitTableHeadingNode(element: pm.TableHeadingElement): void {
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits a table data element. No analysis is performed.
     * @param element - The table data element to visit.
     */
    visitTableDataNode(element: pm.TableDataElement): void {
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits a bold node. No analysis is performed.
     * @param element - The bold element to visit.
     */
    visitBoldNode(element: pm.BoldElement): void {
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits an italic node. No analysis is performed.
     * @param element - The italic element to visit.
     */
    visitItalicNode(element: pm.ItalicElement): void {
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits a code node. No analysis is performed.
     * @param element - The code element to visit.
     */
    visitCodeNode(element: pm.CodeElement): void {
        element.getContent().forEach((c) => c.accept(this));
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
        this.result.characters += element.getAlias().length;
        this.result.words += element.getAlias().split(" ").length;
    }

    /**
     * Visists a section node, recursively analyzing its content.
     * @param element - The section element to visit.
     */
    visitSectionNode(element: pm.Section): void {
        element.getContent().forEach((c) => c.accept(this));
    }

    /**
     * Visits a paragraph node, recursively analyzing its content.
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        element.getContent().forEach((c) => {
            c.accept(this);
        });
    }

    /**
     * Visits a heading node, incrementing the heading count and recursively analyzing its content.
     * @param element - The heading element to visit.
     */
    visitHeadingNode(element: pm.HeadingElement): void {
        this.result.headings++;
        element.getContent().forEach((c) => {
            c.accept(this);
        });
    }

    /**
     * Visits a list node, recursively analyzing its content.
     * @param element - The list element to visit.
     */
    visitListNode(element: pm.ListElement): void {
        element.getContent().forEach((c) => {
            c.accept(this);
        });
    }

    /**
     * Visits a list item node, incrementing the bullet point count and recursively analyzing its content.
     * @param element - The list item element to visit.
     */
    visitListItemNode(element: pm.ListItemElement): void {
        this.result.bullet_points++;
        element.getContent().forEach((c) => {
            c.accept(this);
        });
    }

    /**
     * Visits a blockquote node, recursively analyzing its content.
     * @param element - The blockquote element to visit.
     */
    visitBlockQuoteNode(element: pm.BlockQuoteElement): void {
        element.getContent().forEach((c) => {
            c.accept(this);
        });
    }

    /**
     * Visits a slide node, recursively analyzing its content.
     * @param element - The slide element to visit.
     */
    visitSlideNode(element: pm.SlideElement): void {
        element.getContent().forEach((c) => {
            c.accept(this);
        });
    }

    /**
     * Visits a lane node, recursively analyzing its slides.
     * @param element - The lane element to visit.
     */
    visitLaneNode(element: pm.Lane): void {
        element.getContent().forEach((slide) => {
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
