import * as pt from "./presentationTypes";
import { Presentation } from "./presentationModel"

const unrecognisedElementMessage: string = "Unrecognised element: ";
const missingFieldMessage: string = "Element is missing a field: ";
const levelMessage: string = "Level should be a positive integer.";
const textMessage: string = "Text element content can only contain string literals";
const incorrectTypeMessage = (type: string) => "Type $type is incorrect.";
const incorrectListTypeMessage = (type: string) => "List type $type is incorrect.";

type Result = {
    success: boolean;
    errors: string[];
    slides: Presentation[]
}

class Checker {
    result: Result = { success: true, errors: [], slides: [] };

    private CheckProperty(element: any, property: string): boolean {
        if (!element.hasOwnProperty(property)) {
            this.result.success = false;
            this.result.errors.push(missingFieldMessage + property);
            return false;
        }
        return true;
    }

    private CheckParagraph(paragraph: pt.Paragraph) {
        paragraph.content.forEach(el => {
            if (!this.CheckProperty(el, "type")) {
                return;
            }
            if (el.type === "text") {
                this.CheckTextElementStructure(el as pt.Text);
            } else {
                this.CheckInlineElementStructure(el as pt.InlineElement);
            }
        });
    }

    private CheckLinkElementStructure(element: pt.Link) {
        if (!this.CheckProperty(element, "attributes")) {
            return;
        }
        if (!this.CheckProperty(element, "alias")) {
            return
        }
    }

    private CheckImageElementStructure(element: pt.Image) {
        if (!this.CheckProperty(element, "attributes")) {
            return;
        }
        if (!this.CheckProperty(element, "alias")) {
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

    private CheckInlineElementStructure(element: pt.InlineElement) {
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
            default:
                this.result.errors.push(incorrectTypeMessage(element.type));
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
        if (isNaN(Number(element.attributes.level))) {
            this.result.errors.push(levelMessage);
            this.result.success = false;
            return;
        }
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
            return;
        }
        element.content.forEach(el => {
            if (!this.CheckProperty(el, "type")) {
                return;
            }
            if (el.type === "List") {
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
                element.content.forEach(el => this.CheckInlineElementStructure(el as pt.InlineElement));
            case "heading":
                this.CheckHeadingElementStructure(element as pt.HeadingElement);
            break;
            case "list":
                this.CheckListElementStructure(element as pt.List);
            break;
            case "blockQuote":
                element.content.forEach(el => this.CheckOuterElementStructure(el as pt.OuterElement));
            break;
            default:
                this.result.errors.push(incorrectTypeMessage(element.type));
            break;
        }
    }

    private CheckSlideStructure(slide: pt.Slide) {
        if (this.CheckProperty(slide, "type")) {
            if (slide.type !== "slide") {
                this.result.errors.push(incorrectTypeMessage("slide"));
                this.result.success = false;
            }
        }
        if (this.CheckProperty(slide, "content")) {
            slide.content.forEach(el => {
                this.CheckOuterElementStructure(el);
            });
        }
    }

    public CheckJsonStructure(slides: pt.Slide[]) {
        slides.forEach(slide => this.CheckSlideStructure(slide));
    }
}