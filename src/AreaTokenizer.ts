export type Token = (string | OpenTagToken | CloseTagToken);
interface TokenParsingContainer {
  token: OpenTagToken | CloseTagToken;
  length: number;
}
export interface OpenTagToken {
  id: string;
  name: string;
}

export interface CloseTagToken {
  name: string;
}

function getTokenString(text: string, index: number): string | null {
  let endIndex: number = -1;
  for (let i = index + 1; i < text.length; ++i) {
    if (text[i] === ">") {
      endIndex = i + 1;
      break;
    }
  }
  if (endIndex !== -1) {
    return text.substring(index, endIndex);
  }
  return null;
}

function validateOpenTagToken(token: string): boolean {
  const regex = /^<[a-zA-Z]+: id="[0-9a-zA-Z]+">$/;
  return regex.test(token);
}

function createOpenTagToken(token: string): OpenTagToken {
  let gettingName = true;
  let gettingId = false;
  let name: string = "";
  let id: string = "";
  // We can parse the token like this, because we know its in the correct format.
  for (let char of token) {
    if (char === "<") {
      continue;
    } else if (char === ":") {
      gettingName = false;
    } else if (gettingName) {
      name += char;
    } else if (!gettingName && !gettingId && char === '"') {
      gettingId = true;
    } else if (gettingId && char !== '"') {
      id += char;
    } else if (gettingId && char === '"') {
      break;
    }
  }
  return { id, name };
}

function validateCloseTagToken(token: string): boolean {
  const regex = /^<\/[a-zA-Z0-9]+>$/;
  return regex.test(token);
}

function createCloseTagToken(token: string): CloseTagToken {
  let name: string = "";
  for (let i = 2; i < token.length - 1; ++i) {
    name += token[i];
  }
  return { name };
}

function getToken(text: string, index: number): TokenParsingContainer | null {
  let tokenString = getTokenString(text, index);

  //We didn't find a token valid, so we continue parsing the text normally
  if (tokenString === null) {
    return null;
  }

  let length = tokenString.length;
  if (validateOpenTagToken(tokenString)) {
    let token = createOpenTagToken(tokenString);
    return { token, length };
  } else if (validateCloseTagToken(tokenString)) {
    let token = createCloseTagToken(tokenString);
    return { token, length };
  }
  return null;
}

function processText(text: string): Token[] {
  let array: (string | OpenTagToken | CloseTagToken)[] = [];
  let current: string = "";
  for (let index = 0; index < text.length; ++index) {
    let char = text[index];
    if (char === "<") {
      let token = getToken(text, index);
      if (token !== null) {
        if (current !== "") {
          array.push(current);
          current = "";
        }
        array.push(token.token);
        index += token.length - 1;
        continue;
      }
    }
    current += char;
  }
  if (current !== "") {
    array.push(current);
  }
  return array;
}

export function tokenizeText(
  text: string,
): Token[] {
  let array: Token[] = [];
  array = processText(text);
  return array;
}
