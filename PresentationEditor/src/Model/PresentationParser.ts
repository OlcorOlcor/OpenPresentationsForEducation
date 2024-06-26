import * as pt from "./PresentationTypes";
import * as pm from "./PresentationModel";
import { Checker, Result } from "./StructureChecker";

export class PresentationParser {

    private getTextElement(textJson: pt.Text): pm.TextElement {
        let content: string = "";
        textJson.content.forEach((t) => (content += t));
        return new pm.TextElement(content);
    }

    private getInlineContent(contentJson: (pt.Text | pt.TextAnnotation)[]) {
        let content: (pm.TextElement | pm.InlineElement)[] = [];
        contentJson.forEach((c) => {
            switch (c.type) {
                case "bold":
                    content.push(this.getBoldElement(c as pt.TextAnnotation));
                    break;
                case "italic":
                    content.push(this.getItalicElement(c as pt.TextAnnotation));
                    break;
                case "code":
                    content.push(this.GetCodeElement(c as pt.TextAnnotation));
                    break;
                case "link":
                    content.push(this.getLinkElement(c as pt.Link));
                    break;
                case "image":
                    content.push(this.getImageElement(c as pt.Image));
                    break;
                case "text":
                    content.push(this.getTextElement(c as pt.Text));
                    break;
            }
        });
        return content;
    }

    private getBoldElement(boldJson: pt.TextAnnotation): pm.BoldElement {
        return new pm.BoldElement(this.getInlineContent(boldJson.content));
    }

    private getItalicElement(italicJson: pt.TextAnnotation): pm.ItalicElement {
        return new pm.ItalicElement(this.getInlineContent(italicJson.content));
    }

    private GetCodeElement(codeJson: pt.TextAnnotation): pm.CodeElement {
        return new pm.CodeElement(this.getInlineContent(codeJson.content));
    }

    private getLinkElement(linkJson: pt.Link): pm.LinkElement {
        let content: string = "";
        linkJson.content.forEach((c) => (content += c));
        return new pm.LinkElement(content, linkJson.attributes.alias);
    }

    private getImageElement(imageJson: pt.Image): pm.ImageElement {
        let content: string = "";
        imageJson.content.forEach((c) => (content += c));
        return new pm.ImageElement(content, imageJson.attributes.alias, imageJson.metadataTags);
    }

    private getParagraphElement(paragraphJson: pt.Paragraph): pm.ParagraphElement {
        let elements = this.getInlineContent(paragraphJson.content);
        return new pm.ParagraphElement(elements, paragraphJson.metadataTags);
    }

    private getHeadingElement(headingJson: pt.HeadingElement): pm.HeadingElement {
        let level: number = headingJson.attributes.level;
        let content = this.getInlineContent(headingJson.content);
        return new pm.HeadingElement(level, content, headingJson.metadataTags);
    }

    private getListItemElement(listItemJson: pt.ListItem): pm.ListItemElement {
        return new pm.ListItemElement(
            this.getInlineContent(listItemJson.content),
        );
    }

    private getListElement(listJson: pt.List): pm.ListElement {
        let listType = listJson.attributes.listType;
        let content: (pm.ListItemElement | pm.ListElement)[] = [];
        listJson.content.forEach((c) => {
            switch (c.type) {
                case "list":
                    content.push(this.getListElement(c as pt.List));
                    break;
                case "listItem":
                    content.push(this.getListItemElement(c as pt.ListItem));
                    break;
            }
        });
        return new pm.ListElement(listType, content, listJson.metadataTags);
    }

    private getOuterElementContent(contentJson: pt.OuterElement[]): pm.OuterElement[] {
        let content: pm.OuterElement[] = [];
        contentJson.forEach((jsonElement) => {
            switch (jsonElement.type) {
                case "paragraph":
                    content.push(
                        this.getParagraphElement(jsonElement as pt.Paragraph),
                    );
                    break;
                case "heading":
                    content.push(
                        this.getHeadingElement(
                            jsonElement as pt.HeadingElement,
                        ),
                    );
                    break;
                case "list":
                    content.push(this.getListElement(jsonElement as pt.List));
                    break;
                case "blockquote":
                    content.push(
                        this.getBlockQuoteElement(jsonElement as pt.BlockQuote),
                    );
                    break;
            }
        });
        return content;
    }

    private getBlockQuoteElement(blockQuoteJson: pt.BlockQuote): pm.BlockQuoteElement {
        let content = this.getOuterElementContent(blockQuoteJson.content);
        return new pm.BlockQuoteElement(content, blockQuoteJson.metadataTags);
    }

    private createSlide(jsonSlide: pt.Slide): pm.SlideElement {
        let elements = this.getOuterElementContent(jsonSlide.content);
        let slide = new pm.SlideElement(elements);
        slide.active = jsonSlide.attributes.active;
        slide.metadata = jsonSlide.metadataTags;
        slide.refs = jsonSlide.refs;
        return slide;
    }

    public getSlides(slides: (pt.Slide | null)[]): (pm.SlideElement | null)[] {
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
            object_slides.push(this.createSlide(slide));
        });
        return object_slides;
    }

    public getLanes(lanes: pt.Lane[]): pm.Lane[] {
        // TODO: properly return result
        let object_lanes: pm.Lane[] = [];
        lanes.forEach((lane) => {
            object_lanes.push(
                new pm.Lane(
                    this.getSlides(lane.content),
                    lane.attributes.name,
                    lane.attributes.compile,
                ),
            );
        });
        return object_lanes;
    }
}
