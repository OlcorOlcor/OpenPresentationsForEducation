import * as pt from "./PresentationTypes";
import * as pm from "./PresentationModel";
import { Checker, Result } from "./StructureChecker";

export class PresentationParser {
    private slides: pt.Slide[];
    private checkerResult: Result;
    public constructor(slides: pt.Slide[]) {
        let checker = new Checker();
        this.checkerResult = checker.CheckJsonStructure(slides);
        this.slides = slides;
    }

    private GetTextElement(textJson: pt.Text): pm.TextElement {
        let content: string = "";
        textJson.content.forEach((t) => (content += t));
        return new pm.TextElement(content);
    }

    private GetInlineContent(contentJson: (pt.Text | pt.TextAnnotation)[]) {
        let content: (pm.TextElement | pm.InlineElement)[] = [];
        contentJson.forEach((c) => {
            switch (c.type) {
                case "bold":
                    content.push(this.GetBoldElement(c as pt.TextAnnotation));
                    break;
                case "italic":
                    content.push(this.GetItalicElement(c as pt.TextAnnotation));
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

    private GetCodeElement(codeJson: pt.TextAnnotation): pm.CodeElement {
        return new pm.CodeElement(this.GetInlineContent(codeJson.content));
    }

    private GetLinkElement(linkJson: pt.Link): pm.LinkElement {
        let content: string = "";
        linkJson.content.forEach((c) => (content += c));
        return new pm.LinkElement(content, linkJson.attributes.alias);
    }

    private GetImageElement(imageJson: pt.Image): pm.ImageElement {
        let content: string = "";
        imageJson.content.forEach((c) => (content += c));
        return new pm.ImageElement(content, imageJson.attributes.alias);
    }

    private GetParagraphElement(
        jsonParagraph: pt.Paragraph,
    ): pm.ParagraphElement {
        let elements = this.GetInlineContent(jsonParagraph.content);
        return new pm.ParagraphElement(elements);
    }

    private GetHeadingElement(
        headingJson: pt.HeadingElement,
    ): pm.HeadingElement {
        let level: number = headingJson.attributes.level;
        let content = this.GetInlineContent(headingJson.content);
        return new pm.HeadingElement(level, content);
    }

    private GetListItemElement(listItemJson: pt.ListItem): pm.ListItemElement {
        return new pm.ListItemElement(
            this.GetInlineContent(listItemJson.content),
        );
    }

    private GetListElement(listJson: pt.List): pm.ListElement {
        let listType = listJson.attributes.listType;
        let content: (pm.ListItemElement | pm.ListElement)[] = [];
        listJson.content.forEach((c) => {
            switch (c.type) {
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

    private GetOuterElementContent(
        contentJson: pt.OuterElement[],
    ): pm.OuterElement[] {
        let content: pm.OuterElement[] = [];
        contentJson.forEach((jsonElement) => {
            switch (jsonElement.type) {
                case "paragraph":
                    content.push(
                        this.GetParagraphElement(jsonElement as pt.Paragraph),
                    );
                    break;
                case "heading":
                    content.push(
                        this.GetHeadingElement(
                            jsonElement as pt.HeadingElement,
                        ),
                    );
                    break;
                case "list":
                    content.push(this.GetListElement(jsonElement as pt.List));
                    break;
                case "blockquote":
                    content.push(
                        this.GetBlockQuoteElement(jsonElement as pt.BlockQuote),
                    );
                    break;
            }
        });
        return content;
    }

    private GetBlockQuoteElement(
        blockQuoteJson: pt.BlockQuote,
    ): pm.BlockQuoteElement {
        let content = this.GetOuterElementContent(blockQuoteJson.content);
        return new pm.BlockQuoteElement(content);
    }

    private CreateSlide(jsonSlide: pt.Slide): pm.SlideElement {
        let elements = this.GetOuterElementContent(jsonSlide.content);
        let slide = new pm.SlideElement(elements);
        slide.active = jsonSlide.attributes.active;
        return slide;
    }

    public GetSlides(slides: (pt.Slide | null)[]): (pm.SlideElement | null)[] {
        let object_slides: (pm.SlideElement | null)[] = [];
        slides.forEach((slide) => {
            // slide is empty (this lane doesn't have it defined)
            if (slide == null) {
                object_slides.push(null);
                return;
            }
            if (Object.keys(slide).length === 0) {
                let s = new pm.SlideElement([]);
                s.active = false;
                object_slides.push(s);
                return;
            }
            object_slides.push(this.CreateSlide(slide));
        });
        return object_slides;
    }

    public GetLanes(lanes: pt.Lane[]): pm.Lane[] {
        // TODO: properly return result
        let object_lanes: pm.Lane[] = [];
        lanes.forEach((lane) => {
            object_lanes.push(
                new pm.Lane(
                    this.GetSlides(lane.content),
                    lane.attributes.name,
                    lane.attributes.compile,
                ),
            );
        });
        return object_lanes;
    }
}
