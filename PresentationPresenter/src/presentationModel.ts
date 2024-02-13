import { NullLiteral } from "typescript";

export type Element = TextAnnotation | Paragraph | HeadingElement | ListItem;

export type OuterElement = Paragraph | HeadingElement | List | BlockQuote;

export type InlineElement = TextAnnotation | Link | Image;

export type Text = {
    type: string;
    content: [string];
    attributes?: {};
};

export type TextAnnotation = {
    type: string;
    content: [Text | TextAnnotation];
    attributes?: {};
};

export type Link = {
    type: string;
    content: [string];
    attributes: {
        alias: string;
    };
};

export type Image = {
    type: string;
    content: [string];
    attributes: {
        alias: string;
    };
};

export type ListItem = {
    type: string;
    content: [Text | TextAnnotation];
    attributes?: {};
};

export type List = {
    type: string;
    content: [List | ListItem];
    attributes: {
        listType: string;
    };
};

export type Paragraph = {
    type: string;
    content: [Text | InlineElement];
    attributes?: {};
};

export type HeadingElement = {
    type: string;
    content: [Text | InlineElement];
    attributes: {
        level: number;
    };
};

export type BlockQuote = {
    type: string;
    content: [OuterElement];
    attributes?: {};
};

export type Slide = {
    type: string;
    content: [OuterElement];
    attributes?: {};
};
