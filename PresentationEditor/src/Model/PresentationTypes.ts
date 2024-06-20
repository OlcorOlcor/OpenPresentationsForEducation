export type Element = InlineElement | OuterElement | Slide | Text;

export type OuterElement = Paragraph | HeadingElement | List | BlockQuote;

export type InlineElement = TextAnnotation | Link | Image | CustomTag;

export type Text = {
    type: string;
    content: string[];
};

export type TextAnnotation = {
    type: string;
    content: (Text | InlineElement)[];
};

export type Link = {
    type: string;
    content: string[];
    attributes: { alias: string };
    metadataTags: string[]
};

export type CustomTag = {
    type: string;
    content: [string];
}

export type Image = {
    type: string;
    content: string[];
    attributes: { alias: string };
    metadataTags: string[]
};

export type ListItem = {
    type: string;
    content: (Text | TextAnnotation)[];
};

export type List = {
    type: string;
    content: (List | ListItem)[];
    attributes: { listType: string };
    metadataTags: string[]
};

export type Paragraph = {
    type: string;
    content: (Text | InlineElement)[];
    metadataTags: string[]
};

export type HeadingElement = {
    type: string;
    content: (Text | InlineElement)[];
    attributes: { level: number };
    metadataTags: string[]
};

export type BlockQuote = {
    type: string;
    content: OuterElement[];
    metadataTags: string[]
};

export type Slide = {
    type: string;
    content: OuterElement[];
    attributes: { active: boolean };
};

export type Lane = {
    type: string;
    content: (Slide | null)[];
    attributes: { name: string; compile: boolean };
};

export type Metadata = {
    name: string;
    source: string;
}