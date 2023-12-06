import { OpenTagToken, CloseTagToken, Token } from "./AreaTokenizer";

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

function handleOpenTagToken(annotatedText: string, token: OpenTagToken, tagStack: (OpenTagToken | CloseTagToken)[]): string {
    tagStack.push(token);

    // TODO: make more unique
    annotatedText += "<";
    annotatedText += token.name; 
    annotatedText += ">";

    return annotatedText;
}

function handleCloseTagToken(annotatedText: string, token: CloseTagToken, tagStack: (OpenTagToken | CloseTagToken)[]): string {
    let openToken = tagStack.pop();

    if (openToken === undefined || openToken.name !== token.name) {
        throw new AreaParenthesizationError(AreaParenthesizationError.IMPROPER_PARENTHESIZATION, token.name);
    }

    annotatedText += "</";
    annotatedText += token.name;
    annotatedText += ">";

    return annotatedText;
}
export function annotateText(tokenArray: Token[]): string {
    let annotatedText: string = "";
    let tagStack: (OpenTagToken | CloseTagToken)[] = [];
    // Check proper parenthesization of custom areas
    // Transform markdown tags into annotation

    tokenArray.forEach((token) => {
        console.log(token);
        if (isOpenTagToken(token)) {
            annotatedText = handleOpenTagToken(annotatedText, token, tagStack);
            return; //continue
        } else if (isCloseTagToken(token)) {
            annotatedText = handleCloseTagToken(annotatedText, token, tagStack);
            return; //continue
        }
        annotatedText += token;
    });

    if (tagStack.length !== 0) {
        let token = tagStack.pop();
        // token should never underfined, the if statement just silenced the compiler
        if (token !== undefined) {
            throw new AreaParenthesizationError(AreaParenthesizationError.IMPROPER_PARENTHESIZATION, token.name);
        }
        throw new AreaParenthesizationError(AreaParenthesizationError.IMPROPER_PARENTHESIZATION, "");
    }
    console.log(annotatedText);
    return annotatedText;
}