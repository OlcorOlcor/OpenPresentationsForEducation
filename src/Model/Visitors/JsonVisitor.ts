import { IVisitor } from "./IVisitor";
import * as pm from "../PresentationModel";
import * as pt from "../PresentationTypes";

/**
 * Class that converts the node structure into JSON format.
 *
 * The class implements the IVisitor interface.
 */
export class JsonVisitor implements IVisitor {
    private lane: pt.Lane = {
        type: "lane",
        content: [],
        attributes: { name: "" },
    };
    private stack: any[] = [];

    /**
     * Visits a text node and adds its content to the stack.
     * @param element - The text element to visit.
     */
    visitTextNode(element: pm.TextElement): void {
        let text: pt.Text = { type: "text", content: [element.getContent()] };
        this.stack.push(text);
    }

    /**
     * Visits a bold node and adds its content to the stack wrapped in a bold annotation.
     * @param element - The bold element to visit.
     */
    visitBoldNode(element: pm.BoldElement): void {
        let bold: pt.TextAnnotation = { type: "bold", content: [] };
        element.getContent().forEach((c) => {
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
        let hr: pt.HorizontalLine = {
            type: "horizontal_line",
            attributes: {
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        this.stack.push(hr);
    }

    /**
     * Visits a table element and adds it and its content to the stack.
     * @param element The table element to visit.
     */
    visitTableNode(element: pm.TableElement): void {
        let table: pt.Table = {
            type: "table",
            content: [],
            attributes: {
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        element.getContent().forEach((c) => {
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
        let tableRow: pt.TableRow = { type: "tableRow", content: [] };
        element.getContent().forEach((c) => {
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
        let tableHeading: pt.TableHeading = {
            type: "tableHeading",
            content: [],
        };
        element.getContent().forEach((c) => {
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
        let tableData: pt.TableData = { type: "tableData", content: [] };
        element.getContent().forEach((c) => {
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
        let italic: pt.TextAnnotation = { type: "italic", content: [] };
        element.getContent().forEach((c) => {
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
        let code: pt.TextAnnotation = { type: "code", content: [] };
        element.getContent().forEach((c) => {
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
        let image: pt.Image = {
            type: "image",
            content: [element.getContent()],
            attributes: { alias: element.getAlias() },
        };
        this.stack.push(image);
    }

    /**
     * Visits a link node and adds its content to the stack wrapped in a link element.
     * @param element - The link element to visit.
     */
    visitLinkNode(element: pm.LinkElement): void {
        let link: pt.Link = {
            type: "link",
            content: [element.getContent()],
            attributes: { alias: element.getAlias() },
        };
        this.stack.push(link);
    }

    /**
     * Visits a paragraph node and adds its content to the stack wrapped in a paragraph element.
     * For each child element processed pops one element out of the stack.
     * @param element - The paragraph element to visit.
     */
    visitParagraphNode(element: pm.ParagraphElement): void {
        let paragraph: pt.Paragraph = {
            type: "paragraph",
            content: [],
            attributes: {
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        element.getContent().forEach((c) => {
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
        let heading: pt.HeadingElement = {
            type: "heading",
            content: [],
            attributes: {
                level: element.getLevel(),
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        element.getContent().forEach((c) => {
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
        let list: pt.List = {
            type: "list",
            content: [],
            attributes: {
                listType: element.getListType(),
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        element.getContent().forEach((c) => {
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
        let item: pt.ListItem = { type: "listItem", content: [] };
        element.getContent().forEach((c) => {
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
        let section: pt.Section = {
            type: "section",
            content: [],
            attributes: {
                key: element.getKey(),
                value: element.getValue(),
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        element.getContent().forEach((c) => {
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
        let bq: pt.BlockQuote = {
            type: "blockquote",
            content: [],
            attributes: {
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        element.getContent().forEach((c) => {
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
        let slide: pt.Slide = {
            type: "slide",
            content: [],
            attributes: {
                refs: element.getRefs(),
                frontMatter: element.getFrontMatter(),
                globalMetadataTags: element.getGlobalMetadata(),
                metadata: element.getMetadata(),
            },
        };
        element.getContent().forEach((c) => {
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
        this.lane = {
            type: "lane",
            content: [],
            attributes: { name: element.getName() },
        };
        element.getContent().forEach((slide) => {
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
