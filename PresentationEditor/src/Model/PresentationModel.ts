import { IVisitor, IVisitable } from "./Visitors";

class BaseElement {}

export class ListItemElement extends BaseElement implements IVisitable {
    content: (TextElement | InlineElement)[];
    public constructor(content: (TextElement | InlineElement)[]) {
        super();
        this.content = content;
    }

    accept(visitor: IVisitor): void {
        visitor.visitListItemNode(this);
    }
}

export class TextElement extends BaseElement implements IVisitable {
    content: string;
    public constructor(content: string) {
        super();
        this.content = content;
    }
    accept(visitor: IVisitor): void {
        visitor.visitTextNode(this);
    }
}

export abstract class InlineElement extends BaseElement implements IVisitable {
    abstract accept(visitor: IVisitor): void;
}

export abstract class InlineWrapperElement extends InlineElement {
    content: (TextElement | InlineElement)[];
    public constructor(content: (TextElement | InlineElement)[]) {
        super();
        this.content = content;
    }

    abstract accept(visitor: IVisitor): void;
}

export abstract class InlineLeafElement extends InlineElement {
    abstract accept(visitor: IVisitor): void;
}

export class BoldElement extends InlineWrapperElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitBoldNode(this);
    }
}

export class ItalicElement extends InlineWrapperElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitItalicNode(this);
    }
}

export class CodeElement extends InlineWrapperElement implements IVisitable {
    accept(visitor: IVisitor): void {
        visitor.visitCodeNode(this);
    }
}

export class LinkElement extends InlineLeafElement implements IVisitable {
    metadata: string[] = [];
    content: string;
    alias: string;

    public constructor(content: string, alias: string) {
        super();
        this.content = content;
        this.alias = alias;
    }

    accept(visitor: IVisitor): void {
        visitor.visitLinkNode(this);
    }
}

export class ImageElement extends InlineLeafElement implements IVisitable {
    content: string;
    alias: string;
    metadata: string[];

    public constructor(content: string, alias: string, metadata: string[]) {
        super();
        this.content = content;
        this.alias = alias;
        this.metadata = metadata;
    }

    accept(visitor: IVisitor): void {
        visitor.visitImageNode(this);
    }
}

export abstract class OuterElement extends BaseElement implements IVisitable {
    abstract accept(visitor: IVisitor): void;
}

export class ParagraphElement extends OuterElement implements IVisitable {
    content: (TextElement | InlineElement)[];
    metadata: string[];
    public constructor(content: (TextElement | InlineElement)[], metadata: string[]) {
        super();
        this.content = content;
        this.metadata = metadata;
    }

    accept(visitor: IVisitor): void {
        visitor.visitParagraphNode(this);
    }
}

export class HeadingElement extends OuterElement implements IVisitable {
    content: (TextElement | InlineElement)[];
    level: number;
    metadata: string[];
    public constructor(level: number, content: (TextElement | InlineElement)[], metadata: string[]) {
        super();
        this.content = content;
        this.level = level;
        this.metadata = metadata;
    }

    accept(visitor: IVisitor): void {
        visitor.visitHeadingNode(this);
    }
}

export class ListElement extends OuterElement implements IVisitable {
    content: (ListItemElement | ListElement)[];
    listType: string;
    metadata: string[];

    public constructor(listType: string, content: (ListItemElement | ListElement)[], metadata: string[]) {
        super();
        this.content = content;
        this.listType = listType;
        this.metadata = metadata;
    }

    accept(visitor: IVisitor): void {
        visitor.visitListNode(this);
    }
}

export class BlockQuoteElement extends OuterElement implements IVisitable {
    content: OuterElement[];
    metadata: string[] = [];

    public constructor(content: OuterElement[], metadata: string[]) {
        super();
        this.content = content;
        this.metadata = metadata;
    }

    accept(visitor: IVisitor): void {
        visitor.visitBlockQuoteNode(this);
    }
}

export class SlideElement extends BaseElement implements IVisitable {
    content: OuterElement[];
    active: boolean = false;
    public constructor(content: OuterElement[]) {
        super();
        this.content = content;
    }

    accept(visitor: IVisitor): void {
        visitor.visitSlideNode(this);
    }
}

export class Lane {
    slides: (SlideElement | null)[];
    name: string;
    outputAsPresentation: boolean;
    constructor(slides: (SlideElement | null)[], name: string, output: boolean = true) {
        this.slides = slides;
        this.name = name;
        this.outputAsPresentation = output;
    }
}
