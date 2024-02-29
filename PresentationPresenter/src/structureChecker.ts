import * as pt from "./presentationTypes";
import * as pm from "./presentationModel"

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
    private result: Result = { success: true, errors: [], slides: [] };

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

    public CheckJsonStructure(slides: pt.Slide[]): Result {
        slides.forEach(slide => this.CheckSlideStructure(slide));
        return this.result;
    }

}

class PresentationParser {
    private slides: pt.Slide[];

    public constructor(slides: pt.Slide[]) {
        let checker = new Checker();
        let result = checker.CheckJsonStructure(slides);
        if (!result.success) {
            // TODO
        }
        this.slides = slides;
    }

    private GetTextElement(textJson: pt.Text): pm.TextElement {
        let content: string = "";
        textJson.content.forEach(t => content += t);
        return new pm.TextElement(content);
    }

    private GetInlineContent(contentJson: (pt.Text | pt.TextAnnotation)[]) {
        let content: (pm.TextElement | pm.InlineElement)[] = [];
        contentJson.forEach(c => {
            switch(c.type) {
                case "bold":
                    content.push(this.GetBoldElement(c as pt.TextAnnotation));
                break;
                case "italic":
                    content.push(this.GetItalicElement(c as pt.TextAnnotation));
                break;
                case "boldItalic":
                    content.push(this.GetBoldItalicElement(c as pt.TextAnnotation));
                break;
                case "code":
                    content.push(this.GetCodeElement(c as pt.TextAnnotation));
                break;
                case "link":
                    content.push(this.GetLinkElement(c as pt.Link));
                break;
                case "image":
                    content.push(this.GetImageElement(c as pt.Image));
                break;
                case "text":
                    content.push(this.GetTextElement(c as pt.Text));
                break;
            }
        });
        return content;
    }

    private GetBoldElement(boldJson: pt.TextAnnotation): pm.BoldElement {
        return new pm.BoldElement(this.GetInlineContent(boldJson.content));
    }

    private GetItalicElement(italicJson: pt.TextAnnotation): pm.ItalicElement {
        return new pm.ItalicElement(this.GetInlineContent(italicJson.content));
    }

    private GetBoldItalicElement(boldItalicElement: pt.TextAnnotation): pm.BoldItalicElement {
        return new pm.BoldItalicElement(this.GetInlineContent(boldItalicElement.content));
    }

    private GetCodeElement(codeJson: pt.TextAnnotation): pm.CodeElement {
        return new pm.CodeElement(this.GetInlineContent(codeJson.content));
    }

    private GetLinkElement(linkJson: pt.Link): pm.LinkElement {
        let content: string = "";
        linkJson.content.forEach(c => content += c);
        return new pm.LinkElement(content, linkJson.attributes.alias);
    }

    private GetImageElement(imageJson: pt.Image): pm.ImageElement {
        let content: string = "";
        imageJson.content.forEach(c => content += c);
        return new pm.LinkElement(content, imageJson.attributes.alias);
    }

    private GetParagraphElement(jsonParagraph: pt.Paragraph): pm.ParagraphElement {
        let elements = this.GetInlineContent(jsonParagraph.content);
        return new pm.ParagraphElement(elements);
    }

    private GetHeadingElement(headingJson: pt.HeadingElement): pm.HeadingElement {
       let level: number = headingJson.attributes.level;
       let content = this.GetInlineContent(headingJson.content);
       return new pm.HeadingElement(level, content); 
    }

    private GetListItemElement(listItemJson: pt.ListItem): pm.ListItemElement {
        return new pm.ListItemElement(this.GetInlineContent(listItemJson.content));
    }

    private GetListElement(listJson: pt.List): pm.ListElement {
        let listType = listJson.attributes.listType;
        let content: (pm.ListItemElement | pm.ListElement)[] = [];
        listJson.content.forEach(c => {
            switch(c.type) {
                case "list":
                    content.push(this.GetListElement(c as pt.List));
                break;
                case "listItem":
                    content.push(this.GetListItemElement(c as pt.ListItem));
                break;
            }
        });
        return new pm.ListElement(listType, content);
    }

    private GetOuterElementContent(contentJson: pt.OuterElement[]): pm.OuterElement[] {
        let content: pm.OuterElement[] = [];
        contentJson.forEach(jsonElement => {
            switch (jsonElement.type) {
                case "paragraph":
                    content.push(this.GetParagraphElement(jsonElement as pt.Paragraph));
                break;
                case "heading":
                    content.push(this.GetHeadingElement(jsonElement as pt.HeadingElement));
                break;
                case "list":
                    content.push(this.GetListElement(jsonElement as pt.List));
                break;
                case "blockQuote":
                    content.push(this.GetBlockQuoteElement(jsonElement as pt.BlockQuote));
                break;
            }
        });
        return content;
    }

    private GetBlockQuoteElement(blockQuoteJson: pt.BlockQuote): pm.BlockQuoteElement {
        let content = this.GetOuterElementContent(blockQuoteJson.content);
        return new pm.BlockQuoteElement(content);
    }

    private CreateSlide(jsonSlide: pt.Slide): pm.SlideElement {
        let elements = this.GetOuterElementContent(jsonSlide.content);
        return new pm.SlideElement(elements);
    }

    private GetSlides(): pm.SlideElement[] {
        let slides: pm.SlideElement[] = [];
        this.slides.forEach(slide => {
            slides.push(this.CreateSlide(slide));
        });
        return slides;
    }

    public GetPresentation(): pm.Presentation {
        return new pm.Presentation(this.GetSlides());
    }
}