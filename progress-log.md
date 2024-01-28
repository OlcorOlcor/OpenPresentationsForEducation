# Progress Log

The idea of this file is to keep track of my learning and thought process when developing my app

## 9.10.2023

- Managed to successfully add Marked into the project
- Changed the way the apps works - right now it parses markdown into html and displays it on the right side of the screen
- Learned about React Props and how to correctly pass down functions into child components

## 29.10.2023

- Added mui to the project
- Added a grid layout to App.tsx
- Tried to get a custom extension for marked working, so far without any luck
- To do so I followed marked [official documentation](https://marked.js.org/using_pro)

## 5.11.2023

- Created custom tokenizer that matches user defined areas in markdown
  - Areas currently can't overlap
    - possible solution: regex lookahead
- Said tokenizer is currently not compatible with the marked library.

## 10.11.2023

- Spent 3 hours trying to fix bugs regarding docker.
  - On desktop the wsl image took up physical memory everytime docker was run.
  - On laptop there were issues with npm packages.
  - For now I will continue developing on windows where everything seems to work without any issues.
- Made a new class `CustomArea` to represent a user defined area.
  - The area has its own `metadata` for cusomising text inside it.
  - The class `CustomAreaProcessor` has a list of all defined areas and provides crud style functions for them.
- Editor container now creates CustomAreas from AreaTokens.
  - It also removes user defined tags from markdown before it gets parsed.
- As it stands instead of changing an id, an entirely new area replaces the old one, meaning the metadata gets reset.
  - Possible solution: don't parse text after every change, but on a button press.

## 12.11.2023

- Worked on linking EditorContainer with MetadataContainer
  - Learned about useEffect and useImperativeHandle
- Right now it doesn't work quite right
- I also sketched out roughly how the MetadataContainer should look like.
  - My main inspiration is the Properties window in Visual Studio 2022.

## 14.11.2023

- After some trial and error I fixed assignment to areas in MetadataContainer using `useImperativeHandle`
  - https://dev.to/collegewap/how-to-call-the-child-component-function-from-the-parent-component-in-react-3559
  - https://stackoverflow.com/questions/62210286/declare-type-with-react-useimperativehandle

## 30.11.2023

- Reworked tokenizer
  - Text is now parsed by hand, removed marked from the project
- Added jest to the project and wrote unit tests for tokenizing process

## 06.12.2023

- Began work on annotizer
  - Annotizer takes the array created by the tokeziner and transpills it into an annotized text (text with tags around it)
 - Added comments to code that gets exported in annotizer and tokenizer
   - I followed the tsdoc standard - https://tsdoc.org/
  
## 08.12.2023
- Added annotation of markdown headings
- Added unit tests for annotation of headings and custom areas

## 09.12.2023
- Added more unit tests for annotation

## 11.12.2023
- Sketched out a possible redesign of annotator.
  - The current implementation is clunky when it comes to detecting paragraphs.
  - It also doesn't support inline custom user areas.
- The new approach will use a State class for keeping track of where the annotator currently is in the markdown code.
- It will also ditch the line by line parsing in favor of char by char.
  - It will also be more flexible for detecting inline markdown code like bolded text or underlined text

## 12.12.2023 (meeting with the thesis supervisor)
- We agreed on focusing more on a OOP/tree DOM-like structure for the annotated text
  - The text annotation I was currently working on will be constructed from the DOM-like structure instead.
 
## 11.1.2024
- Began learning how to work with tree-sitter

## 12.1.2024
- Began writing my own grammar for my markdown extension.
- Currently the grammar detects headings and inline elements like bolded text.

## 13.1.2024
- Grammar now detects unordered lists.
- Tried detecting paragraphs, but there are some issues with detecting end of lines.
  - Tree splitter seems to 'combine' multiple eol into one character.
  - Possible solution: writing an external scanner in C to detect these tokens.

## 14.1.2024
- Added a lexer in c++ that should detect new line and end of file characters.
  - Lexer is not yet done

## 15.1.2024 (meeting with the thesis supervisor)
- We agreed on shifting the currect focus away from parsing.
- From now on I will focus on how the presentation will be displayed.
  - The 'displaying algorithm' will take the tree structure returned from the parsing process and turn it into the presentation itself.

## 28.1.2024 && 29.1.2024
- Worked on 'Presenter'
- Presenter takes in a json file (that will be created by the Annotator class) and outputs a valid html
  - Currently paragraphs, headings and inline text elements are working and unit tested
