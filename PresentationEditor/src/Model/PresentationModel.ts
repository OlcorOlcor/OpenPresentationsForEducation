import { IVisitor, IVisitable } from "./Visitors";

/**
 * Base class for all elements.
 */
class BaseElement {}

/**
 * Class representing a list item element.
 * 
 * The class implements the IVisitable interface.
 */
export class ListItemElement extends BaseElement implements IVisitable {
    content: (TextElement | InlineElement)[];

    /**
     * ListItemElement constructor.
     * 
     * @param content - The content of the list item.
     */
    public constructor(content: (TextElement | InlineElement)[]) {
        super();
        this.content = content;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitListItemNode(this);
    }
}

/**
 * Class Representing a text element.
 * 
 * The class implements the IVisitable interface.
 */
export class TextElement extends BaseElement implements IVisitable {
    content: string;

    /**
     * TextElement constructor.
     * 
     * @param content - The text content.
     */
    public constructor(content: string) {
        super();
        this.content = content;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitTextNode(this);
    }
}

/**
 * Abstract class for inline elements.
 * 
 * The class implements the IVisitable interface.
 */
export abstract class InlineElement extends BaseElement implements IVisitable {
    abstract accept(visitor: IVisitor): void;
}

/**
 * Abstract class for inline elements that contain other inline elements or text.
 */
export abstract class InlineWrapperElement extends InlineElement {
    content: (TextElement | InlineElement)[];
    /**
     * Constructs an InlineWrapperElement.
     * 
     * @param content - The content of the element.
     */
    public constructor(content: (TextElement | InlineElement)[]) {
        super();
        this.content = content;
    }

    abstract accept(visitor: IVisitor): void;
}

/**
 * Abstract class for inline elements that do not contain other inline elements or text.
 */
export abstract class InlineLeafElement extends InlineElement {
    abstract accept(visitor: IVisitor): void;
}

/**
 * Represents a bold element.
 * 
 * This class implements the IVisitable interface.
 */
export class BoldElement extends InlineWrapperElement implements IVisitable {
    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitBoldNode(this);
    }
}

/**
 * Represents an italic element.
 * 
 * This class implements the IVisitable interface.
 */
export class ItalicElement extends InlineWrapperElement implements IVisitable {
    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitItalicNode(this);
    }
}

/**
 * Represents a code element.
 */
export class CodeElement extends InlineWrapperElement implements IVisitable {
    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitCodeNode(this);
    }
}

/**
 * Represents a link element.
 * 
 * This class implements the IVistable interface.
 */
export class LinkElement extends InlineLeafElement implements IVisitable {
    metadata: string[] = [];
    content: string;
    alias: string;
    
    /**
     * Constructs a LinkElement.
     * 
     * @param content - The link text.
     * @param alias - The alias for the link.
     */
    public constructor(content: string, alias: string) {
        super();
        this.content = content;
        this.alias = alias;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitLinkNode(this);
    }
}

/**
 * Represents an image element.
 * 
 * This class implement the IVisitable interface.
 */  
export class ImageElement extends InlineLeafElement implements IVisitable {
    content: string;
    alias: string;

    /**
     * Constructs an ImageElement.
     * 
     * @param content - The image source URL.
     * @param alias - The alias for the image.
     */
    public constructor(content: string, alias: string) {
        super();
        this.content = content;
        this.alias = alias;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitImageNode(this);
    }
}

/**
 * Abstract class for outer elements.
 * 
 * Outer elements can be contain directly within a slide element.
 */
export abstract class OuterElement extends BaseElement implements IVisitable {
    abstract accept(visitor: IVisitor): void;
}

/**
 * Represents a paragraph element.
 * 
 * This class implements the IVisitable interface.
 */
export class ParagraphElement extends OuterElement implements IVisitable {
    content: (TextElement | InlineElement)[];
    metadata: string[];

    /**
     * Constructs a ParagraphElement.
     * 
     * @param content - The content of the paragraph.
     * @param metadata - The metadata tags for the paragraph.
     */
    public constructor(content: (TextElement | InlineElement)[], metadata: string[]) {
        super();
        this.content = content;
        this.metadata = metadata;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitParagraphNode(this);
    }
}

/**
 * Represents a heading element.
 * 
 * This class implements the IVistable interface.
 */
export class HeadingElement extends OuterElement implements IVisitable {
    content: (TextElement | InlineElement)[];
    level: number;
    metadata: string[];

    /**
     * Constructs a HeadingElement.
     * 
     * @param level - The level of the heading.
     * @param content - The content of the heading.
     * @param metadata - The metadata tags for the heading.
     */
    public constructor(level: number, content: (TextElement | InlineElement)[], metadata: string[]) {
        super();
        this.content = content;
        this.level = level;
        this.metadata = metadata;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitHeadingNode(this);
    }
}

/**
 * Represents a list element.
 * 
 * This class implements the IVisitable interface.
 */
export class ListElement extends OuterElement implements IVisitable {
    content: (ListItemElement | ListElement)[];
    listType: string;
    metadata: string[];

    /**
     * Constructs a ListElement.
     * 
     * @param listType - The type of the list ("ordered" or "unordered").
     * @param content - The content of the list.
     * @param metadata - The metadata tags for the list.
     */
    public constructor(listType: string, content: (ListItemElement | ListElement)[], metadata: string[]) {
        super();
        this.content = content;
        this.listType = listType;
        this.metadata = metadata;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitListNode(this);
    }
}

/**
 * Represents a blockquote element.
 * 
 * This class implements the IVisitable interface.
 */
export class BlockQuoteElement extends OuterElement implements IVisitable {
    content: OuterElement[];
    metadata: string[] = [];

    /**
     * Constructs a BlockQuoteElement.
     * 
     * @param content - The content of the blockquote.
     * @param metadata - The metadata tags for the blockquote.
     */
    public constructor(content: OuterElement[], metadata: string[]) {
        super();
        this.content = content;
        this.metadata = metadata;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitBlockQuoteNode(this);
    }
}

/**
 * Represents a slide element.
 * 
 * This class implements the IVisitable interface.
 */
export class SlideElement extends BaseElement implements IVisitable {
    content: OuterElement[];
    active: boolean = false;
    metadata: string[] = [];
    refs: string[] = [];

    /**
     * Constructs a SlideElement.
     * 
     * @param content - The content of the slide.
     */
    public constructor(content: OuterElement[]) {
        super();
        this.content = content;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitSlideNode(this);
    }
}

/**
 * Represents a lane element.
 */
export class Lane {
    slides: (SlideElement | null)[];
    name: string;
    outputAsPresentation: boolean;

    /**
     * Constructs a Lane.
     * 
     * @param slides - The slides in the lane.
     * @param name - The name of the lane.
     * @param output - Whether to output as a presentation.
     */
    constructor(slides: (SlideElement | null)[], name: string, output: boolean = true) {
        this.slides = slides;
        this.name = name;
        this.outputAsPresentation = output;
    }
}
