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
    private content: (TextElement | InlineElement)[];

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
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): (TextElement | InlineElement)[] {
        return this.content;
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
 * Class representing a heading cell in a table
 * 
 * The class implements the IVisitable interface.
 */
export class TableHeadingElement extends BaseElement implements IVisitable {
    private content: (TextElement | InlineElement)[];
    
    /**
     * TableHeadingElement constructor.
     * 
     * @param content - content of the table heading.
     */
    constructor(content: (TextElement | InlineElement)[]) {
        super();
        this.content = content;
    }

    /**
     * Retrieves the content of the element.
     * @returns content of the element.
     */
    getContent() {
        return this.content;
    }

    /**
     * Accepts the visitor to process this element.
     * 
     * @param visitor - the visitor processing the element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitTableHeadingNode(this);
    }
}

/**
 * Class representing a data cell in a table.
 * 
 * The class implements the IVisitable interface.
 */
export class TableDataElement extends BaseElement implements IVisitable {
    private content: (TextElement | InlineElement)[];
    
    /**
     * TableDataElement constructor.
     * 
     * @param content - content of the table data.
     */
    constructor(content: (TextElement | InlineElement)[]) {
        super();
        this.content = content;
    }

    /**
     * Retrieves the content of the element.
     * @returns content of the element.
     */
    getContent() {
        return this.content;
    }

    /**
     * Accepts the visitor to process this element.
     * 
     * @param visitor - the visitor processing the element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitTableDataNode(this);
    }
}

/**
 * Class representing a table row.
 * 
 * The class implements the IVisitable interface.
 */
export class TableRowElement extends BaseElement implements IVisitable {
    private content: (TableDataElement | TableHeadingElement)[];
    
    /**
     * TableRowElement constructor.
     * 
     * @param content - content of the table row.
     */
    constructor(content: (TableDataElement | TableHeadingElement)[]) {
        super();
        this.content = content;
    }

    /**
     * Retrieves the content of the element.
     * @returns content of the element.
     */
    getContent() {
        return this.content;
    }

    /**
     * Accepts the visitor to process this element.
     * 
     * @param visitor - the visitor processing the element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitTableRowNode(this);
    }
}

/**
 * Class Representing a text element.
 * 
 * The class implements the IVisitable interface.
 */
export class TextElement extends BaseElement implements IVisitable {
    private content: string;

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
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): string {
        return this.content;
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
    private content: (TextElement | InlineElement)[];
    /**
     * Constructs an InlineWrapperElement.
     * 
     * @param content - The content of the element.
     */
    public constructor(content: (TextElement | InlineElement)[]) {
        super();
        this.content = content;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): (TextElement | InlineElement)[] {
        return this.content;
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
    private content: string;
    private alias: string;
    /**
     * Constructs a LinkElement.
     * 
     * @param content - The link text.
     * @param alias - The alias for the link.
     * @parama metadata
     */
    public constructor(content: string, alias: string) {
        super();
        this.content = content;
        this.alias = alias;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): string {
        return this.content;
    }

    /**
     * Retrieves alias of the element.
     * @returns Alias of the element.
     */
    getAlias(): string {
        return this.alias;
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
 * This class implements the IVisitable interface.
 */  
export class ImageElement extends InlineLeafElement implements IVisitable {
    private content: string;
    private alias: string;
    /**
     * Constructs an ImageElement.
     * 
     * @param content - The image source URL.
     * @param alias - The alias for the image.
     * @param metadata - The metadata of the image.
     */
    public constructor(content: string, alias: string) {
        super();
        this.content = content;
        this.alias = alias;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): string {
        return this.content;
    }
    
    /**
     * Retrieves alias of the element.
     * @returns Alias of the element.
     */
    getAlias(): string {
        return this.alias;
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
 * Outer elements can be contained directly within a slide element.
 */
export abstract class OuterElement extends BaseElement implements IVisitable {
    protected globalMetadataTags: string[] = [];
    protected metadata: {[key: string]: string} = {};

    /**
     * Retrieves global metadata tags of the element.
     * @returns Global metadata tags of the element.
     */
    getGlobalMetadata() {
        return this.globalMetadataTags;
    }

    /**
     * Retrieves metadata of the element.
     * @returns metadata of the element.
     */
    getMetadata() {
        return this.metadata;
    }

    abstract accept(visitor: IVisitor): void;
}

export class Section extends OuterElement implements IVisitable {
    private content: OuterElement[];
    private key: string;
    private value: string;

    /**
     * Section constructor.
     * 
     * @param content - content of the section.
     * @param globalMetadataTags - metadata tags fo the section.
     */
    constructor(key: string, value: string, content: OuterElement[], globalMetadataTags: string[], metadata: {[key: string]: string}) {
        super();
        this.key = key;
        this.value = value;
        this.content = content;
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
    }

    /**
     * Retrieves the key of the section.
     * @returns key of the section.
     */
    getKey(): string {
        return this.key;
    }

    /**
     * Retrieves the value of the section.
     * @return value of the section.
     */
    getValue(): string {
        return this.value;
    }

    /**
     * Retrieves the content of the element.
     * @returns content of the element.
     */
    getContent() {
        return this.content;
    }

    /**
     * Accepts the visitor to process this element.
     * 
     * @param visitor - the visitor processing the element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitSectionNode(this);
    }
}

/**
 * Class representing a table.
 * 
 * The class implements the IVisitable interface.
 */
export class TableElement extends OuterElement implements IVisitable {
    private content: TableRowElement[];

    /**
     * TableElement constructor.
     * 
     * @param content - content of the table.
     */
    constructor(content: TableRowElement[], globalMetadataTags: string[], metadata: {[key: string]: string}) {
        super();
        this.content = content;
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
    }

    /**
     * Retrieves the content of the element.
     * @returns content of the element.
     */
    getContent() {
        return this.content;
    }

    /**
     * Accepts the visitor to process this element.
     * 
     * @param visitor - the visitor processing the element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitTableNode(this);
    }
}

/**
 * Class for horizontal line elements.
 * 
 * The class implements the IVisitable interface
 */
export class HorizontalLineElement extends OuterElement implements IVisitable {

    constructor(globalMetadataTags: string[], metadata: {[key: string]: string}) {
        super();
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitHorizontalLineNode(this);   
    }
}

/**
 * Represents a paragraph element.
 * 
 * This class implements the IVisitable interface.
 */
export class ParagraphElement extends OuterElement implements IVisitable {
    private content: (TextElement | InlineElement)[];

    /**
     * Constructs a ParagraphElement.
     * 
     * @param content - The content of the paragraph.
     * @param globalMetadataTags - The metadata tags for the paragraph.
     */
    public constructor(content: (TextElement | InlineElement)[], globalMetadataTags: string[], metadata: {[key: string]: string}) {
        super();
        this.content = content;
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): (TextElement | InlineElement)[] {
        return this.content;
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
    private content: (TextElement | InlineElement)[];
    private level: number;

    /**
     * Constructs a HeadingElement.
     * 
     * @param level - The level of the heading.
     * @param content - The content of the heading.
     * @param globalMetadataTags - The metadata tags for the heading.
     */
    public constructor(level: number, content: (TextElement | InlineElement)[], globalMetadataTags: string[], metadata: {[key: string]: string}) {
        super();
        this.content = content;
        this.level = level;
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): (TextElement | InlineElement)[] {
        return this.content;
    }

    /**
     * Retrieves the level of the heading.
     * @returns Level of the heading.
     */
    getLevel(): number {
        return this.level;
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
    private content: (ListItemElement | ListElement)[];
    private listType: string;

    /**
     * Constructs a ListElement.
     * 
     * @param listType - The type of the list ("ordered" or "unordered").
     * @param content - The content of the list.
     * @param globalMetadataTags - The metadata tags for the list.
     */
    public constructor(listType: string, content: (ListItemElement | ListElement)[], globalMetadataTags: string[], metadata: {[key: string]: string}) {
        super();
        this.content = content;
        this.listType = listType;
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): (TextElement | InlineElement)[] {
        return this.content;
    }

    /**
     * Retrieves the list type.
     * @return List type.
     */
    getListType(): string {
        return this.listType;
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
    private content: OuterElement[];

    /**
     * Constructs a BlockQuoteElement.
     * 
     * @param content - The content of the blockquote.
     * @param globalMetadataTags - The metadata tags for the blockquote.
     */
    public constructor(content: OuterElement[], globalMetadataTags: string[], metadata: {[key: string]: string}) {
        super();
        this.content = content;
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): OuterElement[] {
        return this.content;
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
    private content: OuterElement[];
    private active: boolean = false;
    private globalMetadataTags: string[] = [];
    private metadata: {[key: string]: string};
    private refs: string[] = [];
    private frontMatter: {[key: string]: any};

    /**
     * Constructs a SlideElement.
     * 
     * @param content - The content of the slide.
     */
    public constructor(content: OuterElement[], active: boolean = false, globalMetadataTags: string[] = [], refs: string[] = [], frontMatter: {[key: string]: string} = {}, metadata: {[key: string]: string} = {}) {
        super();
        this.content = content;
        this.active = active;
        this.globalMetadataTags = globalMetadataTags;
        this.metadata = metadata;
        this.refs = refs;
        this.frontMatter = frontMatter;
    }

    /**
     * Retrieves the contents of the element.
     * @returns Content of the element.
     */
    getContent(): OuterElement[] {
        return this.content;
    }

    /**
     * Retrieves global metadata tags of the element.
     * @returns Global metadata tags of the element.
     */
    getGlobalMetadata(): string[] {
        return this.globalMetadataTags;
    }

    /**
     * Retrieves metadata of the element.
     * @returns metadata of the element.
     */
    getMetadata() {
        return this.metadata;
    }

    /**
     * Retrieves the front matter of the slide.
     * @returns The front matter of the slide.
     */
    getFrontMatter(): {[key: string]: any} {
        return this.frontMatter;
    }

    /**
     * Check whether the slide is active.
     * @returns True if the slide is active, false if its inactive.
     */
    isActive(): boolean {
        return this.active;
    }

    /**
     * Retrieves references to other slides.
     * @returns References to other slides.
     */
    getRefs(): string[] {
        return this.refs;
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
export class Lane implements IVisitable {
    private content: (SlideElement | null)[];
    private name: string;
    private outputAsPresentation: boolean;

    /**
     * Constructs a Lane.
     * 
     * @param content - The slides in the lane.
     * @param name - The name of the lane.
     * @param output - Whether to output as a presentation.
     */
    constructor(content: (SlideElement | null)[], name: string, output: boolean = true) {
        this.content = content;
        this.name = name;
        this.outputAsPresentation = output;
    }

    /**
     * Retrieves the contents of the lane.
     * @returns Content of the lane.
     */
    getContent(): (SlideElement | null)[] {
        return this.content;
    }
    
    /**
     * Retrieves the name of the lane.
     * @returns Name of the lane.
     */
    getName(): string {
        return this.name;
    }

    /**
     * Check whether the lane outputs as presentation.
     * @returns True if the lane should output as presentation, false if not.
     */
    outputsAsPresentation(): boolean {
        return this.outputAsPresentation;
    }

    /**
     * Accepts a visitor to process this element.
     * 
     * @param visitor - The visitor processing this element.
     */
    accept(visitor: IVisitor): void {
        visitor.visitLaneNode(this);
    }
}
