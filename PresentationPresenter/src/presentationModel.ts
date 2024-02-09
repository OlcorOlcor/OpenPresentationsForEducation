export type Element = TextAnnotation | Paragraph | HeadingElement | ListItem;

export type OuterElement = Paragraph | HeadingElement | List | BlockQuote;

export type InlineElement = TextAnnotation | Link | Image;

export type Text = {
    type: string;
    content: string;
};

export type TextAnnotation = {
    type: string;
    content: [Text | TextAnnotation];
};

export type Link = {
    type: string;
    address: string;
    content: string;
};

export type Image = {
    type: string;
    address: string;
    alias: string;
};

export type ListItem = {
    type: string;
    content: [Text | TextAnnotation];
};

export type List = {
    type: string;
    listType: string;
    items: [List | ListItem];
};

export type Paragraph = {
    type: string;
    content: [Text | InlineElement];
};

export type HeadingElement = {
    type: string;
    level: number;
    content: [Text | InlineElement];
};

export type BlockQuote = {
    type: string;
    content: [OuterElement];
};

export type Slide = {
    type: string;
    content: [OuterElement];
};
