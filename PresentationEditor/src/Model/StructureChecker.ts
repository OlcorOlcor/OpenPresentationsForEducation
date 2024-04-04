import * as pt from "./PresentationTypes";

const missingFieldMessage: string = "Element is missing a field: ";
const levelMessage: string = "Level should be a positive integer.";
const textMessage: string = "Text element content can only contain string literals";
const incorrectTypeMessage = (type: string) => "Type " + type + " is incorrect.";
const incorrectListTypeMessage = (type: string) => "List type " + type + " is incorrect.";

export type Result = {
    success: boolean;
    errors: string[];
}

export class Checker {
    private result: Result = { success: true, errors: [] };

    private CheckProperty(element: any, property: string): boolean {
        if (!element.hasOwnProperty(property)) {
            this.result.success = false;
            this.result.errors.push(missingFieldMessage + property);
            return false;
        }
        return true;
    }

    private CheckParagraphStructure(paragraph: pt.Paragraph) {
        paragraph.content.forEach(el => this.CheckInlineElementStructure(el));
    }

    private CheckLinkElementStructure(element: pt.Link) {
        if (!this.CheckProperty(element, "attributes")) {
            return;
        }
        if (!this.CheckProperty(element.attributes, "alias")) {
            return
        }
    }

    private CheckImageElementStructure(element: pt.Image) {
        if (!this.CheckProperty(element, "attributes")) {
            return;
        }
        if (!this.CheckProperty(element.attributes, "alias")) {
            return;
        }
    }

    private CheckTextElementStructure(element: pt.Text) {
        if (!this.CheckProperty(element, "type")) {
            return;
        }
        if (!this.CheckProperty(element, "content")) {
            return;
        }
        element.content.forEach(s => {
            if (typeof s !== "string") {
                this.result.errors.push(textMessage);
                this.result.success = false;
                return;
            }
        })
    }

    private CheckInlineElementStructure(element: pt.InlineElement | pt.Text) {
        if (!this.CheckProperty(element, "type")) {
            return;
        }
        if (!this.CheckProperty(element, "content")) {
            return;
        }
        switch (element.type) {
            case "bold":
            case "italic":
            case "boldItalic":
            case "code":
                element.content.forEach(textAnnotation => {
                    if ((textAnnotation as pt.TextAnnotation).type === "text") {
                        this.CheckTextElementStructure(textAnnotation as pt.Text);
                    } else {
                        this.CheckInlineElementStructure(textAnnotation as pt.InlineElement);
                    }
                });
            break;
            case "link":
                this.CheckLinkElementStructure(element as pt.Link);
            break;
            case "image":
                this.CheckImageElementStructure(element as pt.Image);
            break;
            case "text":
                this.CheckTextElementStructure(element as pt.Text);
            break;
            default:
                this.result.errors.push(incorrectTypeMessage(element.type));
                this.result.success = false;
            break;
        }
    }

    private CheckHeadingElementStructure(element: pt.HeadingElement) {
        if (!this.CheckProperty(element, "attributes")) {
            return;
        }
        if (!this.CheckProperty(element.attributes, "level")) {
            return;
        } 
        if (isNaN(Number(element.attributes.level)) || element.attributes.level < 1) {
            this.result.errors.push(levelMessage);
            this.result.success = false;
            return;
        }
        if (!this.CheckProperty(element, "content")) {
            return;
        }
        element.content.forEach(el => this.CheckInlineElementStructure(el));
    }

    private CheckListItemStructure(element: pt.ListItem) {
        if (!this.CheckProperty(element, "type")) {
            return;
        }
        if (!this.CheckProperty(element, "content")) {
            return;
        }
        let child = element.content[0];
        if (!this.CheckProperty(child, "type")) {
            return;
        }
        if (child.type === "text") {
            this.CheckTextElementStructure(child as pt.Text);
        } else {
            this.CheckInlineElementStructure(child as pt.InlineElement);
        }
    }

    private CheckListElementStructure(element: pt.List) {
        if (!this.CheckProperty(element, "attributes")) {
            return;
        }
        if (!this.CheckProperty(element.attributes, "listType")) {
            return;
        }
        if (element.attributes.listType !== "unordered" && element.attributes.listType !== "ordered") {
            this.result.errors.push(incorrectListTypeMessage(element.attributes.listType));
            this.result.success = false;
            return;
        }
        element.content.forEach(el => {
            if (!this.CheckProperty(el, "type")) {
                return;
            }
            if (el.type === "list") {
                this.CheckListElementStructure(el as pt.List);
            } else {
                this.CheckListItemStructure(el as pt.ListItem);
            }
        });
    }

    private CheckOuterElementStructure(element: pt.OuterElement) {
        if (!this.CheckProperty(element, "type")) {
            return;
        }
        if (!this.CheckProperty(element, "content")) {
            return;
        }
        switch (element.type) {
            case "paragraph":
                this.CheckParagraphStructure(element as pt.Paragraph);
            break;
            case "heading":
                this.CheckHeadingElementStructure(element as pt.HeadingElement);
            break;
            case "list":
                this.CheckListElementStructure(element as pt.List);
            break;
            case "blockquote":
                element.content.forEach(el => this.CheckOuterElementStructure(el as pt.OuterElement));
            break;
            default:
                this.result.errors.push(incorrectTypeMessage(element.type));
                this.result.success = false;
            break;
        }
    }

    private CheckSlideStructure(slide: pt.Slide) {
        if (this.CheckProperty(slide, "type")) {
            if (slide.type !== "slide") {
                this.result.errors.push(incorrectTypeMessage(slide.type));
                this.result.success = false;
            }
        }
        if (this.CheckProperty(slide, "content")) {
            slide.content.forEach(el => {
                this.CheckOuterElementStructure(el);
            });
        }
    }

    public CheckJsonStructure(slides: pt.Slide[]): Result {
        slides.forEach(slide => this.CheckSlideStructure(slide));
        return this.result;
    }

}