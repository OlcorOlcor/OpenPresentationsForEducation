export interface AreaToken {
    type: 'area';
    id: string;
    content: string;
}
  
export function AreaTokenizer(src: string): AreaToken[] {
  const tokens: AreaToken[] = [];
  // Matches <foo: 1> lorem </foo>
  //TODO: Doesn't match overlapping areas
  const customAreaRegex = /<([\s\S]+): (.+)>([\s\S]*)<\/\1>/g;
  let match;
  // Iterates the matches and creates tokens
  while ((match = customAreaRegex.exec(src)) !== null) {
    const content = match[3];
    const id = match[2];

    const customToken: AreaToken = {
      type: 'area',
      id: id,
      content: content
    };
    tokens.push(customToken);
  }

  return tokens;
};