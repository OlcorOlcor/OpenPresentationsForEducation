import * as pm from "../PresentationModel";

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
