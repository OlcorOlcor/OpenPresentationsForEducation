/**
 * Represents any type of element that can be part of a presentation.
 */
export type Element = InlineElement | OuterElement | Slide | Text;

/**
 * Represents elements that can exist at the outermost level of a presentation.
 */
export type OuterElement =
    | Paragraph
    | HeadingElement
    | List
    | BlockQuote
    | HorizontalLine
    | Table
    | Section;

/**
 * Represents elements that can exist inline within other elements.
 */
export type InlineElement = TextAnnotation | Link | Image;

/**
 * Represents a block of text.
 */
export type Text = {
    type: string;
    content: string[];
};

/**
 * Represents a text annotation, such as bold or italic text.
 */
export type TextAnnotation = {
    type: string;
    content: (Text | InlineElement)[];
};

/**
 * Represents a hyperlink.
 */
export type Link = {
    type: string;
    content: string[];
    attributes: {
        alias: string;
    };
};

/**
 * Represents an image.
 */
export type Image = {
    type: string;
    content: string[];
    attributes: {
        alias: string;
    };
};

/**
 * Represents a horizontal line.
 */
export type HorizontalLine = {
    type: string;
    attributes: {
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represents an item within a list.
 */
export type ListItem = {
    type: string;
    content: (Text | TextAnnotation)[];
};

/**
 * Represents a list of items.
 */
export type List = {
    type: string;
    content: (List | ListItem)[];
    attributes: {
        listType: string;
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represents a paragraph of text.
 */
export type Paragraph = {
    type: string;
    content: (Text | InlineElement)[];
    attributes: {
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represent a table.
 */
export type Table = {
    type: string;
    content: TableRow[];
    attributes: {
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represents a table row.
 */
export type TableRow = {
    type: string;
    content: (TableData | TableHeading)[];
};

/**
 * Represents table data cell.
 */
export type TableData = {
    type: string;
    content: (Text | InlineElement)[];
};

/**
 * Represents table heading cell.
 */
export type TableHeading = {
    type: string;
    content: (Text | InlineElement)[];
};

/**
 * Represents a heading element.
 */
export type HeadingElement = {
    type: string;
    content: (Text | InlineElement)[];
    attributes: {
        level: number;
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represents a section element.
 */
export type Section = {
    type: string;
    content: OuterElement[];
    attributes: {
        key: string;
        value: string;
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represents a block quote element.
 */
export type BlockQuote = {
    type: string;
    content: OuterElement[];
    attributes: {
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represents a slide in the presentation.
 */
export type Slide = {
    type: string;
    content: OuterElement[];
    attributes: {
        refs: string[];
        frontMatter: { [key: string]: any };
        globalMetadataTags: string[];
        metadata: { [key: string]: string };
    };
};

/**
 * Represents a lane in the presentation, which contains slides.
 */
export type Lane = {
    type: string;
    content: (Slide | null)[];
    attributes: {
        name: string;
    };
};

/**
 * Represents metadata associated with an element.
 */
export type Metadata = {
    name: string;
    attributes: { [key: string]: any };
};

/**
 * Represents styles used in the presentation.
 */
export type Styles = {
    name: string;
    content: string;
};

/**
 * Represents constraints that apply to each slide.
 */
export type Constraints = {
    words: number | null;
    characters: number | null;
    images: number | null;
    links: number | null;
    headings: number | null;
    bullet_points: number | null;
    tables: number | null;
};

export type ImageFile = {
    name: string;
    fileBase64: string;
};

/**
 * Represents the whole presentation.
 */
export type Presentation = {
    lanes: Lane[];
    metadata: Metadata[];
    constraints: Constraints;
    imageFiles: ImageFile[];
    styles: Styles;
};
