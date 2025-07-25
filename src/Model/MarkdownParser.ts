import * as pt from "./PresentationTypes";
import markdownit, { Token } from "markdown-it";
/**
 * helper class used for keeping track of an index across functions.
 */
class RefIndex {
    public index: number = 0;
}

/**
 * Class designed for taking in Markdown code and returning JSON structure.
 */
export class MarkdownParser {
    private slideTag: string = "";
    private slideRefs: string[] = [];
    private globalMetadataTags: string[] = [];
    private metadataTags: { [key: string]: string } = {};
    private firstParagraph: boolean = true;

    /**
     * Custom rule to handle metadata in markdown.
     * @param state - The state of the markdown parser.
     * @param startLine - The line where the rule starts.
     * @param endLine - The line where the rule ends.
     * @param silent - If true, the rule will be applied silently.
     * @returns True if the rule was successfully applied, false otherwise.
     */
    metadataRule(
        state: any,
        startLine: any,
        endLine: any,
        silent: any,
    ): boolean {
        const startPos = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];
        if (state.src.slice(startPos, startPos + 4) !== "<!--") {
            return false;
        }
        if (state.src.slice(startPos, endLine).indexOf(":") >= 0) {
            return false;
        }
        const match: string[] = state.src
            .slice(startPos, max)
            .match(/^<!-- ([^:]+) -->$/);
        if (!match) {
            return false;
        }
        if (silent) {
            return true;
        }
        state.line = startLine + 1;
        let token = state.push("global_metadata", "", 0);
        token.hidden = true;
        token.meta = { ...token.meta, name: match[1] };
        return true;
    }

    /**
     * Custom rule to handle metadata tags.
     * @param state - The state of the markdown parser.
     * @param startLine - The line where the rule starts.
     * @param endLine - The line where the rule ends.
     * @param silent - If true, the rule will be applied silently.
     * @returns True if the rule was successfully applied, false otherwise.
     */
    metadataTagRule(
        state: any,
        startLine: any,
        endLine: any,
        silent: any,
    ): boolean {
        const startPos = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];

        if (state.src.slice(startPos, startPos + 4) !== "<!--") {
            return false;
        }

        const match: string[] = state.src
            .slice(startPos, max)
            .match(/^<!--(.*): +(.*)-->$/);

        if (!match) {
            return false;
        }

        if (silent) {
            return true;
        }

        state.line = startLine + 1;
        let token = state.push("metadata_tag", "", 0);
        token.hidden = true;
        token.meta = {
            ...token.meta,
            key: match[1].trim(),
            val: match[2].trim(),
        };
        return true;
    }
    /**
     * Custom rule for section closing tag in markdown.
     * @param state - The state of the markdown parser.
     * @param startLine - The line where the rule starts.
     * @param endLine - The line where the rule ends.
     * @param silent - If true, the rule will be applied silently.
     * @returns True if the rule was successfully applied, false otherwise.
     */
    sectionTagRule(
        state: any,
        startLine: any,
        endLine: any,
        silent: any,
    ): boolean {
        const startPos = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];

        if (state.src.slice(startPos, startPos + 4) !== "<!--") {
            return false;
        }

        const match: string[] = state.src
            .slice(startPos, max)
            .match(/^<!-- \+(.*): +(.*)-->$/);

        if (!match) {
            return false;
        }

        if (silent) {
            return true;
        }

        state.line = startLine + 1;
        let comment = { key: match[1].trim(), val: match[2].trim() };
        let token = state.push("section_tag", "", 0);
        token.hidden = true;
        token.meta = { ...token.meta, section_tag: comment };
        return true;
    }

    /**
     * Custom rule for section closing tag in markdown.
     * @param state - The state of the markdown parser.
     * @param startLine - The line where the rule starts.
     * @param endLine - The line where the rule ends.
     * @param silent - If true, the rule will be applied silently.
     * @returns True if the rule was successfully applied, false otherwise.
     */
    sectionCloseTagRule(
        state: any,
        startLine: any,
        endLine: any,
        silent: any,
    ): boolean {
        const startPos = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];

        const match: string[] = state.src
            .slice(startPos, max)
            .match(/^<!-- \/ -->$/);

        if (!match) {
            return false;
        }

        if (silent) {
            return true;
        }

        state.line = startLine + 1;
        let token = state.push("section_close_tag", "", 0);
        token.hidden = true;
        return true;
    }

    /**
     * Custom rule to handle front matter in markdown.
     * @param state - The state of the markdown parser.
     * @param startLine - The line where the rule starts.
     * @param endLine - The line where the rule ends.
     * @param silent - If true, the rule will be applied silently.
     * @returns True if the rule was successfully applied, false otherwise.
     */
    frontMatterRule(state: any, startLine: any, endLine: any, silent: any) {
        if (startLine !== 0) {
            return false;
        }

        const startPos = state.bMarks[startLine] + state.tShift[startLine];
        const frontMatterBorder = "---";
        if (state.src.slice(startPos, startPos + 3) !== frontMatterBorder) {
            return false;
        }

        let line = startLine + 1;
        let content: string[] = [];

        while (line < endLine) {
            const lineStart = state.bMarks[line] + state.tShift[line];
            const lineEnd = state.eMarks[line];
            const lineText = state.src.slice(lineStart, lineEnd);

            if (lineText === frontMatterBorder) {
                break;
            }

            content.push(lineText);
            ++line;
        }

        if (
            line >= endLine ||
            state.src.slice(
                state.bMarks[line] + state.tShift[line],
                state.eMarks[line],
            ) !== "---"
        ) {
            return false;
        }

        if (silent) {
            return true;
        }

        let frontMatter: { [key: string]: string } = {};
        content.forEach((line) => {
            const match = line.match(/^([A-Za-z0-9_-]+):\s(.*)$/);
            if (match) {
                frontMatter[match[1].trim()] = match[2].trim();
            }
        });

        state.line = line + 1;
        const token = state.push("front_matter", "", 0);
        token.hidden = true;
        token.meta = { ...token.meta, front_matter: frontMatter };
        return true;
    }

    /**
     * Parses the given markdown string into an array of slides.
     * Markdownit is used to parse the markdown into an array of tokens from which the JSON is created.
     * @param markdown - The markdown string to parse.
     * @returns An array of parsed slides.
     */
    public parseMarkdown(markdown: string): pt.Slide {
        let mdit = markdownit();
        mdit.block.ruler.before(
            "paragraph",
            "global_metadata",
            this.metadataRule,
        );
        mdit.block.ruler.before(
            "paragraph",
            "metadata_tag",
            this.metadataTagRule,
        );
        mdit.block.ruler.before(
            "metadata_tag",
            "section_tag",
            this.sectionTagRule,
        );
        mdit.block.ruler.before(
            "global_metadata",
            "section_close_tag",
            this.sectionCloseTagRule,
        );
        mdit.block.ruler.before("hr", "front_matter", this.frontMatterRule);
        let array = mdit.parse(markdown, {});
        let slide = this.handleArray(array);
        if (this.slideTag !== "") {
            slide.attributes.globalMetadataTags.push(this.slideTag);
        }
        slide.attributes.refs = this.slideRefs;
        return slide;
    }

    /**
     * Parses the given token array and turns them into an outer element.
     * @param array - The array of markdown tokens.
     * @param index - Index within the array.
     * @returns The createed outer element.
     */
    private getOuterElement(
        array: Token[],
        index: RefIndex,
    ): pt.OuterElement | null {
        switch (array[index.index].type) {
            case "bullet_list_open":
                index.index += 1;
                return this.handleList(array, index, false);
            case "ordered_list_open":
                index.index += 1;
                return this.handleList(array, index, true);
            case "paragraph_open":
                let paragraph = this.handleParagraph(array, index);
                if (paragraph.content.length === 0) {
                    break;
                }
                return paragraph;
            case "heading_open":
                return this.handleHeading(
                    array,
                    index,
                    array[index.index].markup.length,
                );
            case "blockquote_open":
                index.index += 1;
                return this.handleBlockQuote(array, index);
            case "table_open":
                return this.handleTable(array, index);
            case "global_metadata":
                const tag_name: string = array[index.index].meta["name"];
                this.globalMetadataTags.push(tag_name);
                break;
            case "metadata_tag":
                this.metadataTags[array[index.index].meta["key"]] =
                    array[index.index].meta["val"];
                break;
            case "section_tag":
                return this.handleSection(array, index);
            case "hr":
                const hr: pt.HorizontalLine = {
                    type: "horizontal_line",
                    attributes: {
                        globalMetadataTags: this.globalMetadataTags,
                        metadata: {},
                    },
                };
                this.globalMetadataTags = [];
                return hr;
            default:
                break;
        }
        return null;
    }

    /**
     * Handles an array of markdown tokens and converts them into a slide.
     * @param array - The array of markdown tokens.
     * @returns The parsed slide.
     */
    private handleArray(array: Token[]): pt.Slide {
        let slide: pt.Slide = {
            type: "slide",
            content: [],
            attributes: {
                globalMetadataTags: [],
                metadata: {},
                refs: [],
                frontMatter: {},
            },
        };
        for (
            let index: RefIndex = new RefIndex();
            index.index < array.length;
            ++index.index
        ) {
            if (array[index.index].type === "front_matter") {
                const pairs = array[index.index].meta.front_matter;
                slide.attributes.frontMatter = pairs;
                continue;
            }
            const outerElement = this.getOuterElement(array, index);
            if (outerElement !== null) {
                slide.content.push(outerElement);
            }
        }
        return slide;
    }

    private sectionStack: string[] = [];
    /**
     * Handles an array of markdown tokens and turns them into a section element.
     * @param array array of markdown tokens.
     * @param index current index of the array index.
     * @returns section element.
     */
    private handleSection(array: Token[], index: RefIndex): pt.Section {
        let section: pt.Section = {
            type: "section",
            content: [],
            attributes: {
                key: array[index.index].meta["section_tag"].key,
                value: array[index.index].meta["section_tag"].val,
                globalMetadataTags: this.globalMetadataTags,
                metadata: this.metadataTags,
            },
        };
        this.globalMetadataTags = [];
        this.metadataTags = {};
        index.index += 1;
        for (index.index + 1; index.index < array.length; ++index.index) {
            if (array[index.index].type === "section_tag") {
                if (
                    array[index.index].meta["section_tag"].key ===
                        this.sectionStack[this.sectionStack.length - 1] ||
                    array[index.index].meta["section_tag"].key ===
                        section.attributes.key
                ) {
                    this.sectionStack.pop();
                    index.index -= 1;
                    return section;
                }
            }
            if (array[index.index].type === "section_close_tag") {
                this.sectionStack.pop();
                console.log("here pop");
                return section;
            }
            this.sectionStack.push(section.attributes.key);
            const outerElement = this.getOuterElement(array, index);
            if (outerElement !== null) {
                section.content.push(outerElement);
            }
        }
        return section;
    }

    /**
     * Handles an array of markdown tokens and turns them into a table element.
     * @param array - The array of markdown tokens.
     * @param index - Index within the array.
     * @returns The parsed table element.
     */
    private handleTable(array: Token[], index: RefIndex): pt.Table {
        let table: pt.Table = {
            type: "table",
            content: [],
            attributes: {
                globalMetadataTags: this.globalMetadataTags,
                metadata: this.metadataTags,
            },
        };
        this.globalMetadataTags = [];
        this.metadataTags = {};
        let row = -1;
        let col = -1;
        while (index.index < array.length) {
            index.index++;
            switch (array[index.index].type) {
                case "tr_open":
                    row++;
                    col = -1;
                    table.content.push({ type: "tableRow", content: [] });
                    break;
                case "th_open":
                    col++;
                    table.content[row].content.push({
                        type: "tableHeading",
                        content: [],
                    });
                    break;
                case "td_open":
                    col++;
                    table.content[row].content.push({
                        type: "tableData",
                        content: [],
                    });
                    break;
                case "inline":
                    const currentCell = table.content[row].content[col];
                    this.getInline(array[index.index]).forEach((inline) => {
                        currentCell.content.push(inline);
                    });
                    break;
                case "table_close":
                    return table;
                case "tr_close":
                case "td_close":
                case "th_close":
                default:
                    break;
            }
        }

        return table;
    }

    /**
     * Handles a blockquote token and converts it into a BlockQuote element.
     * @param array - The array of markdown tokens.
     * @param index - The current index in the token array.
     * @returns The parsed BlockQuote element.
     */
    private handleBlockQuote(array: Token[], index: RefIndex): pt.BlockQuote {
        let blockQuote: pt.BlockQuote = {
            type: "blockquote",
            content: [],
            attributes: {
                globalMetadataTags: this.globalMetadataTags,
                metadata: this.metadataTags,
            },
        };
        this.globalMetadataTags = [];
        this.metadataTags = {};
        let done: boolean = false;
        for (; index.index < array.length; ++index.index) {
            switch (array[index.index].type) {
                case "bullet_list_open":
                    index.index += 1;
                    blockQuote.content.push(
                        this.handleList(array, index, false),
                    );
                    break;
                case "ordered_list_open":
                    index.index += 1;
                    blockQuote.content.push(
                        this.handleList(array, index, true),
                    );
                    break;
                case "paragraph_open":
                    blockQuote.content.push(this.handleParagraph(array, index));
                    break;
                case "heading_open":
                    blockQuote.content.push(
                        this.handleHeading(
                            array,
                            index,
                            array[index.index].markup.length,
                        ),
                    );
                    break;
                case "blockquote_open":
                    index.index += 1;
                    blockQuote.content.push(
                        this.handleBlockQuote(array, index),
                    );
                    break;
                case "blockquote_close":
                    done = true;
                    break;
            }
            if (done) {
                break;
            }
        }
        return blockQuote;
    }

    /**
     * Handles a paragraph token and converts it into a Paragraph element.
     * @param array - The array of markdown tokens.
     * @param index - The current index in the token array.
     * @returns The parsed Paragraph element.
     */
    private handleParagraph(array: Token[], index: RefIndex): pt.Paragraph {
        let paragraph: pt.Paragraph = {
            type: "paragraph",
            content: [],
            attributes: {
                globalMetadataTags: this.globalMetadataTags,
                metadata: this.metadataTags,
            },
        };
        this.globalMetadataTags = [];
        this.metadataTags = {};
        for (index.index + 1; index.index < array.length; ++index.index) {
            if (array[index.index].type === "paragraph_close") {
                break;
            }
            if (array[index.index].type === "inline") {
                // eslint-disable-next-line no-loop-func
                this.getInline(array[index.index]).forEach((item) => {
                    if (this.firstParagraph) {
                        if (item.type === "text") {
                            let content: string = "";
                            (item as pt.Text).content.forEach(
                                (s) => (content += s),
                            );
                            if (/^\[.*\]$/.test(content)) {
                                this.slideTag = content.slice(
                                    1,
                                    content.length - 1,
                                );
                                return;
                            }
                        }
                    }
                    if (item.type === "text") {
                        let content: string = "";
                        (item as pt.Text).content.forEach(
                            (s) => (content += s),
                        );
                        if (/^->\[.*\]$/.test(content)) {
                            this.slideRefs.push(
                                content.slice(3, content.length - 1),
                            );
                            return;
                        }
                    }
                    paragraph.content.push(item);
                    this.firstParagraph = false;
                });
            }
        }
        return paragraph;
    }

    /**
     * Handles a heading token and converts it into a Heading element.
     * @param array - The array of markdown tokens.
     * @param index - The current index in the token array.
     * @param level - The heading level.
     * @returns The parsed Heading element.
     */
    private handleHeading(
        array: Token[],
        index: RefIndex,
        level: number,
    ): pt.HeadingElement {
        let heading: pt.HeadingElement = {
            type: "heading",
            content: [],
            attributes: {
                level: level,
                globalMetadataTags: this.globalMetadataTags,
                metadata: this.metadataTags,
            },
        };
        this.globalMetadataTags = [];
        this.metadataTags = {};
        for (index.index + 1; index.index < array.length; ++index.index) {
            if (array[index.index].type === "heading_close") {
                break;
            }
            if (array[index.index].type === "inline") {
                this.getInline(array[index.index]).forEach((item) =>
                    heading.content.push(item),
                );
            }
        }
        return heading;
    }

    /**
     * Handles a list token and converts it into a List element.
     * @param array - The array of markdown tokens.
     * @param index - The current index in the token array.
     * @param ordered - Boolean indicating if the list is ordered.
     * @returns The parsed List element.
     */
    private handleList(
        array: Token[],
        index: RefIndex,
        ordered: boolean,
    ): pt.List {
        let list: pt.List = {
            type: "list",
            content: [],
            attributes: {
                listType: ordered ? "ordered" : "unordered",
                globalMetadataTags: this.globalMetadataTags,
                metadata: this.metadataTags,
            },
        };
        this.globalMetadataTags = [];
        this.metadataTags = {};
        let done: boolean = false;
        for (index.index + 1; index.index < array.length; ++index.index) {
            switch (array[index.index].type) {
                case "bullet_list_close":
                case "ordered_list_close":
                    done = true;
                    break;
                case "bullet_list_open":
                    index.index += 1;
                    list.content.push(this.handleList(array, index, false));
                    break;
                case "ordered_list_open":
                    index.index += 1;
                    list.content.push(this.handleList(array, index, true));
                    break;
                case "list_item_open":
                    index.index++; // paragraph_open
                    index.index++; // inline
                    let listItem: pt.ListItem = {
                        type: "listItem",
                        content: [],
                    };
                    this.getInline(array[index.index]).forEach((item) =>
                        listItem.content.push(item),
                    );
                    list.content.push(listItem);
                    break;
            }
            if (done) {
                break;
            }
        }
        return list;
    }

    /**
     * Extracts inline elements from a given token.
     * @param inline - The token containing inline elements.
     * @returns An array of inline elements.
     */
    private getInline(inline: Token): (pt.InlineElement | pt.Text)[] {
        let inlineElements: (pt.InlineElement | pt.Text)[] = [];
        let stack: pt.TextAnnotation[] = [];
        let current: pt.TextAnnotation;
        let isLinkAlias: boolean = false;
        inline.children?.forEach((child) => {
            switch (child.type) {
                case "text":
                case "softbreak":
                    if (child.type === "softbreak") {
                        child.content = "\n";
                    }
                    if (isLinkAlias) {
                        isLinkAlias = false;
                        if (stack.length === 0) {
                            (
                                inlineElements[
                                    inlineElements.length - 1
                                ] as pt.Link
                            ).attributes.alias = child.content;
                            break;
                        }
                        (
                            stack[stack.length - 1].content[
                                stack[stack.length - 1].content.length - 1
                            ] as pt.Link
                        ).attributes.alias = child.content;
                        break;
                    }
                    if (child.content === "") {
                        break;
                    }

                    let element = { type: "text", content: [child.content] };
                    if (stack.length === 0) {
                        inlineElements.push(element);
                        break;
                    }
                    stack[stack.length - 1].content.push(element);
                    break;
                case "strong_open":
                    current = { type: "bold", content: [] };
                    if (stack.length !== 0) {
                        stack[stack.length - 1].content.push(current);
                    }
                    stack.push(current);
                    break;
                case "em_open":
                    current = { type: "italic", content: [] };
                    if (stack.length !== 0) {
                        stack[stack.length - 1].content.push(current);
                    }
                    stack.push(current);
                    break;
                case "link_open":
                    let link_href = child.attrGet("href");
                    if (link_href != null) {
                        isLinkAlias = true;
                        let link: pt.Link = {
                            type: "link",
                            content: [link_href],
                            attributes: { alias: child.content },
                        };
                        this.globalMetadataTags = [];
                        if (stack.length === 0) {
                            inlineElements.push(link);
                            break;
                        }
                        stack[stack.length - 1].content.push(link);
                    }
                    break;
                case "image":
                    let img_href = child.attrGet("src");
                    if (img_href != null) {
                        let image: pt.Image = {
                            type: "image",
                            content: [img_href],
                            attributes: { alias: child.content },
                        };
                        this.globalMetadataTags = [];
                        if (stack.length === 0) {
                            inlineElements.push(image);
                            break;
                        }
                        stack[stack.length - 1].content.push(image);
                    }
                    break;
                case "code_inline":
                    let code = {
                        type: "code",
                        content: [{ type: "text", content: [child.content] }],
                    };
                    if (stack.length === 0) {
                        inlineElements.push(code);
                        break;
                    }
                    stack[stack.length - 1].content.push(code);
                    break;
                case "strong_close":
                case "em_close":
                    if (stack.length === 1) {
                        inlineElements.push(stack[0]);
                    }
                    stack.pop();
                    break;
                case "link_close":
                    break;
                case "section_close_tag":
                    console.log("closing");
                    break;
                default:
                    break;
            }
        });

        return inlineElements;
    }
}
