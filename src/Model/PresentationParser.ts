import * as pt from "./PresentationTypes";
import * as pm from "./PresentationModel";

/**
 * Class designed for converting JSON representation of the presentation data model into its class representation.
 */
export class PresentationParser {

    /**
     * Converts a Text JSON object to a TextElement.
     * @param textJson - The Text JSON object.
     * @returns The corresponding TextElement.
     */
    private getTextElement(textJson: pt.Text): pm.TextElement {
        let content: string = "";
        textJson.content.forEach((t) => (content += t));
        return new pm.TextElement(content);
    }

    /**
     * Converts inline content JSON objects to InlineElement or TextElement objects.
     * @param contentJson - The array of Text or TextAnnotation JSON objects.
     * @returns The corresponding array of InlineElement or TextElement objects.
     */
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

    /**
     * Converts a Bold JSON object to a BoldElement.
     * @param boldJson - The Bold JSON object.
     * @returns The corresponding BoldElement.
     */
    private getBoldElement(boldJson: pt.TextAnnotation): pm.BoldElement {
        return new pm.BoldElement(this.getInlineContent(boldJson.content));
    }

    /**
     * Converts an Italic JSON object to an ItalicElement.
     * @param italicJson - The Italic JSON object.
     * @returns The corresponding ItalicElement.
     */
    private getItalicElement(italicJson: pt.TextAnnotation): pm.ItalicElement {
        return new pm.ItalicElement(this.getInlineContent(italicJson.content));
    }

    /**
     * Converts a Code JSON object to a CodeElement.
     * @param codeJson - The Code JSON object.
     * @returns The corresponding CodeElement.
     */
    private GetCodeElement(codeJson: pt.TextAnnotation): pm.CodeElement {
        return new pm.CodeElement(this.getInlineContent(codeJson.content));
    }

    /**
     * Converts a Link JSON object to a LinkElement.
     * @param linkJson - The Link JSON object.
     * @returns The corresponding LinkElement.
     */
    private getLinkElement(linkJson: pt.Link): pm.LinkElement {
        let content: string = "";
        linkJson.content.forEach((c) => (content += c));
        return new pm.LinkElement(content, linkJson.attributes.alias);
    }

    /**
     * Converts an Image JSON object to an ImageElement.
     * @param imageJson - The Image JSON object.
     * @returns The corresponding ImageElement.
     */
    private getImageElement(imageJson: pt.Image): pm.ImageElement {
        let content: string = "";
        imageJson.content.forEach((c) => (content += c));
        return new pm.ImageElement(content, imageJson.attributes.alias);
    }

    /**
     * Converts a Paragraph JSON object to a ParagraphElement.
     * @param paragraphJson - The Paragraph JSON object.
     * @returns The corresponding ParagraphElement.
     */
    private getParagraphElement(paragraphJson: pt.Paragraph): pm.ParagraphElement {
        let elements = this.getInlineContent(paragraphJson.content);
        return new pm.ParagraphElement(elements, paragraphJson.attributes.globalMetadataTags, paragraphJson.attributes.metadata);
    }

    /**
     * Converts a Heading JSON object to a HeadingElement.
     * @param headingJson - The Heading JSON object.
     * @returns The corresponding HeadingElement.
     */
    private getHeadingElement(headingJson: pt.HeadingElement): pm.HeadingElement {
        let level: number = headingJson.attributes.level;
        let content = this.getInlineContent(headingJson.content);
        return new pm.HeadingElement(level, content, headingJson.attributes.globalMetadataTags, headingJson.attributes.metadata);
    }

    /**
     * Converts a ListItem JSON object to a ListItemElement.
     * @param listItemJson - The ListItem JSON object.
     * @returns The corresponding ListItemElement.
     */
    private getListItemElement(listItemJson: pt.ListItem): pm.ListItemElement {
        return new pm.ListItemElement(
            this.getInlineContent(listItemJson.content),
        );
    }

    /**
     * Converts a List JSON object to a ListElement.
     * @param listJson - The List JSON object.
     * @returns The corresponding ListElement.
     */
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
        return new pm.ListElement(listType, content, listJson.attributes.globalMetadataTags, listJson.attributes.metadata);
    }

    private getTableHeadingElement(tableHeadingElement: pt.TableHeading): pm.TableHeadingElement {
        return new pm.TableHeadingElement(this.getInlineContent(tableHeadingElement.content));
    }

    private getTableDataElement(tableDataElement: pt.TableData): pm.TableDataElement {
        return new pm.TableDataElement(this.getInlineContent(tableDataElement.content));
    }

    private getTableRow(tableRowJson: pt.TableRow) : pm.TableRowElement {
        let content: (pm.TableDataElement | pm.TableHeadingElement)[] = [];
        tableRowJson.content.forEach(c => {
            switch (c.type) {
                case "tableHeading":
                    content.push(this.getTableHeadingElement(c as pt.TableHeading));
                    break;
                case "tableData":
                    content.push(this.getTableDataElement(c as pt.TableData));
                    break;
            }
        });
        return new pm.TableRowElement(content);
    }

    private getTableElement(tableJson: pt.Table): pm.TableElement {
        let content: pm.TableRowElement[] = [];
        tableJson.content.forEach(c => {
            content.push(this.getTableRow(c));
        });
        return new pm.TableElement(content, tableJson.attributes.globalMetadataTags, tableJson.attributes.metadata);
    }

    /**
     * Converts an array of OuterElement JSON objects to an array of OuterElement objects.
     * @param contentJson - The array of OuterElement JSON objects.
     * @returns The corresponding array of OuterElement objects.
     */
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
                case "horizontal_line":
                    content.push(new pm.HorizontalLineElement((jsonElement as pt.HorizontalLine).attributes.globalMetadataTags, (jsonElement as pt.HorizontalLine).attributes.metadata));
                    break;
                case "section":
                    content.push(this.getSectionElement(jsonElement as pt.Section));
                    break;
                case "table":
                    content.push(this.getTableElement(jsonElement as pt.Table));
                    break;
            }
        });
        return content;
    }

    /**
     * Converts a Section JSON object to a SectionElement
     * @param sectionJson - The Section JSON object.
     * @returns The corresponding SecitionElement
     */
    private getSectionElement(sectionJson: pt.Section): pm.Section {
        let content = this.getOuterElementContent(sectionJson.content);
        return new pm.Section(sectionJson.attributes.key, sectionJson.attributes.value, content, sectionJson.attributes.globalMetadataTags, sectionJson.attributes.metadata);
    }

    /**
     * Converts a BlockQuote JSON object to a BlockQuoteElement.
     * @param blockQuoteJson - The BlockQuote JSON object.
     * @returns The corresponding BlockQuoteElement.
     */
    private getBlockQuoteElement(blockQuoteJson: pt.BlockQuote): pm.BlockQuoteElement {
        let content = this.getOuterElementContent(blockQuoteJson.content);
        return new pm.BlockQuoteElement(content, blockQuoteJson.attributes.globalMetadataTags, blockQuoteJson.attributes.metadata);
    }

    /**
     * Converts a Slide JSON object to a SlideElement.
     * @param jsonSlide - The Slide JSON object.
     * @returns The corresponding SlideElement.
     */
    private createSlide(jsonSlide: pt.Slide): pm.SlideElement {
        let elements = this.getOuterElementContent(jsonSlide.content);
        let slide = new pm.SlideElement(elements, true, jsonSlide.attributes.globalMetadataTags, jsonSlide.attributes.refs, jsonSlide.attributes.frontMatter);
        return slide;
    }

    /**
     * Converts an array of Slide JSON objects to an array of SlideElement objects.
     * @param slides - The array of Slide JSON objects.
     * @returns The corresponding array of SlideElement objects.
     */
    public getSlides(slides: (pt.Slide | null)[]): (pm.SlideElement | null)[] {
        let object_slides: (pm.SlideElement | null)[] = [];
        slides.forEach((slide) => {
            // slide is empty (this lane doesn't have it defined)
            if (slide == null) {
                object_slides.push(null);
                return;
            }
            if (Object.keys(slide).length === 0) {
                let s = new pm.SlideElement([], false);
                object_slides.push(s);
                return;
            }
            object_slides.push(this.createSlide(slide));
        });
        return object_slides;
    }

    /**
     * Converts an array of Lane JSON objects to an array of Lane objects.
     * @param lanes - The array of Lane JSON objects.
     * @returns The corresponding array of Lane objects.
     */
    public getLanes(lanes: pt.Lane[]): pm.Lane[] {
        let object_lanes: pm.Lane[] = [];
        lanes.forEach((lane) => {
            object_lanes.push(
                new pm.Lane(
                    this.getSlides(lane.content),
                    lane.attributes.name
                )
            );
        });
        return object_lanes;
    }
}
