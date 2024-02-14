interface IVisitor {
    visitTextNode(element: TextElement): string;
    visitBoldNode(element: BoldElement): string;
    visitItalicNode(element: ItalicElement): string;
    visitBoldItalicNode(element: BoldItalicElement): string;
    visitCodeNode(element: CodeElement): string;
    visitImageNode(element: ImageElement): string;
    visitLinkNode(element: LinkElement): string;
    visitParagraphNode(element: ParagraphElement): string;
    visitHeadingNode(element: HeadingElement): string;
    visitListNode(element: ListElement): string;
    visitListItemNode(element: ListItemElement): string;
    visitBlockQuoteNode(element: BlockQuoteElement): string;
    visitSlideNode(element: SlideElement): string;
}

interface IVisitable {
    accept(visitor: IVisitor): void;
}

class Element { }

class ListItemElement extends Element {
    content: [Text | InlineElement];
    public constructor(content: [Text | InlineElement]) {
        super();
        this.content = content;
    }
}

class TextElement extends Element {
    content: string;
    public constructor(content: string) {
        super();
        this.content = content;
    }
}

class InlineElement extends Element {
    content: [Text | InlineElement];
    public constructor(content: [Text | InlineElement]) {
        super();
        this.content = content;
    }
 }
class BoldElement extends InlineElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitBoldNode(this);
    }
    
}

class ItalicElement extends InlineElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitItalicNode(this);
    }

}

class BoldItalicElement extends InlineElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitBoldItalicNode(this);
    }
}

class CodeElement extends InlineElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitCodeNode(this);
    }
}

class LinkElement extends InlineElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitLinkNode(this);
    }
}

class ImageElement extends InlineElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitImageNode(this);
    }
}

class OuterElement extends Element { }
class ParagraphElement extends OuterElement implements IVisitable {
    content: [TextElement | InlineElement];
    public constructor(content: [TextElement | InlineElement]) {
        super();
        this.content = content;
    }
    accept(visitor: IVisitor): void {
        visitor.visitParagraphNode(this);
    }
}

class HeadingElement extends OuterElement implements IVisitable {
    content: [TextElement | InlineElement];
    level: number;

    public constructor(level: number, content: [TextElement | InlineElement]) {
        super();
        this.content = content;
        this.level = level;
    }

    accept(visitor: IVisitor): void {
        visitor.visitHeadingNode(this);
    }
}

class ListElement extends OuterElement implements IVisitable {
    content: [ListItemElement | ListElement];
    listType: string;

    public constructor(listType: string, content: [ListItemElement | ListElement]) {
        super();
        this.content = content;
        this.listType = listType;
    }

    accept(visitor: IVisitor): void {
        visitor.visitListNode(this);
    }
}

class BlockQuoteElement extends OuterElement implements IVisitable {
    content: [OuterElement];

    public constructor(content: [OuterElement]) {
        super();
        this.content = content;
    }

    accept(visitor: IVisitor): void {
        visitor.visitBlockQuoteNode(this);
    }
}

class SlideElement extends Element implements IVisitable {
    content: [OuterElement];
    
    public constructor(content: [OuterElement]) {
        super();
        this.content = content;
    }

    accept(visitor: IVisitor): void {
        visitor.visitSlideNode(this);
    }
}
