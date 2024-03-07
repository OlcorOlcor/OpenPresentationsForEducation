import * as pt from "./presentationTypes";
import * as pm from "./presentationModel";
import { Checker } from "./structureChecker";

export class PresentationParser {
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