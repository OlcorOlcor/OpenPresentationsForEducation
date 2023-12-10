import { isConstructorDeclaration } from "typescript";
import { OpenTagToken, CloseTagToken, Token } from "./AreaTokenizer";

/**
 * Gets thrown when user defined custom areas are not correctly paired
 *
 * `areaName`: contains name of the incorrectly paired area
 */
export class AreaParenthesizationError extends Error {
    public static IMPROPER_PARENTHESIZATION = "ONE OF THE CUSTOM AREAS HAS NOT BEEN PROPERLY CLOSED.";
    public areaName: string;
    constructor(message: string, areaName: string) {
        super(message);
        this.areaName = areaName;
    }
}

function isOpenTagToken(token: Token): token is OpenTagToken {
    return (token as OpenTagToken).id !== undefined && (token as OpenTagToken).name !== undefined;
}

function isCloseTagToken(token: Token): token is CloseTagToken {
    return (token as OpenTagToken).id === undefined && (token as CloseTagToken).name !== undefined;
}

function handleOpenTagToken(token: OpenTagToken, tagStack: (OpenTagToken | CloseTagToken)[]): string {
    tagStack.push(token);
    let annotatedTag: string = "";
    // TODO: make more unique
    annotatedTag += "<";
    annotatedTag += token.name;
    annotatedTag += ">";

    return annotatedTag;
}

function handleCloseTagToken(token: CloseTagToken, tagStack: (OpenTagToken | CloseTagToken)[]): string {
    let openToken = tagStack.pop();

    if (openToken === undefined) {
        throw new AreaParenthesizationError(AreaParenthesizationError.IMPROPER_PARENTHESIZATION, token.name);
    }
    let annotatedTag: string = "";

    annotatedTag += "</";
    annotatedTag += token.name;
    annotatedTag += ">";

    return annotatedTag;
}

function getLines(text: string): string[] {
    return text.split("\n");
}

function getLeadingWhiteChars(line: string): string {
    let currentChar = line[0];
    let index: number = 1;
    let whole: string = "";
    while ((currentChar === " " || currentChar === "\t") && index !== line.length) {
        whole += currentChar;
        currentChar = line[index];
        index++;
    }
    return whole;
}

function getHeadingLevel(line: string): number | null {
    let currentChar = line[0];
    let index = 1;
    while (currentChar === "#") {
        currentChar = line[index];
        index++;
    }

    // 6 is the smallest heading
    return index <= 6 ? index : null;
}

function processLine(line: string): string {
    let annotatedLine: string = "";

    let whiteChars = getLeadingWhiteChars(line);
    let whiteSpaceLen = whiteChars.length;
    // # counts as a heading only at the beginning of the line (excluding white characters)
    let headingLevel: number | null = null;
    if (line[whiteSpaceLen] === "#") {
        headingLevel = getHeadingLevel(line.substring(whiteSpaceLen + 1));
    }

    annotatedLine += headingLevel !== null ? "<heading" + headingLevel + ">" : whiteChars;

    let trailingWhiteCharsLen = 1;
    if (headingLevel !== null) {
        let trailingWhiteChars = getLeadingWhiteChars(line.substring(whiteSpaceLen + headingLevel));
        trailingWhiteCharsLen = trailingWhiteChars.length;
    }

    let normalTextStart = headingLevel !== null ? whiteSpaceLen + headingLevel + trailingWhiteCharsLen : whiteSpaceLen;
    for (let i = normalTextStart; i < line.length; i++) {
        let char = line[i];

        // TODO: detect inline annotation (bolded text, underlines,...)

        annotatedLine += char;
    }

    if (headingLevel !== null) {
        annotatedLine += "</heading" + headingLevel + ">";
    }

    return annotatedLine;
}

function handleMarkdownText(text: string): string {
    let lines: string[] = getLines(text);
    let annotatedText: string = "";

    let lineCount = 0;
    lines.forEach((line) => {
        annotatedText += processLine(line);
        if (lineCount != lines.length - 1) {
            annotatedText += "\n";
        }
        lineCount++;
    });

    return annotatedText;
}

/**
 * Parses an array of Tokens created by the AreaTokenizer.
 * Checks if the custom area tokens are correctly paired.
 *
 * @param tokenArray Array of tokens that will get parsed into an annotated text.
 * @returns annotated text.
 * @throws `AreaParenthesizationError` when custom areas are not correctly paired.
 */
export function annotateText(tokenArray: Token[]): string {
    let annotatedText: string = "";
    let tagStack: (OpenTagToken | CloseTagToken)[] = [];

    // Check proper parenthesization of custom areas
    // Transform markdown tags into annotation

    tokenArray.forEach((token) => {
        if (isOpenTagToken(token)) {
            annotatedText += handleOpenTagToken(token, tagStack);
            return; //continue
        } else if (isCloseTagToken(token)) {
            annotatedText += handleCloseTagToken(token, tagStack);
            return; //continue
        }
        annotatedText += handleMarkdownText(token);
    });

    if (tagStack.length !== 0) {
        let token = tagStack.pop();
        // token should never be undefined, the if statement just silenced the compiler
        if (token !== undefined) {
            throw new AreaParenthesizationError(AreaParenthesizationError.IMPROPER_PARENTHESIZATION, token.name);
        }
        throw new AreaParenthesizationError(AreaParenthesizationError.IMPROPER_PARENTHESIZATION, "");
    }
    console.log(annotatedText);
    return annotatedText;
}
