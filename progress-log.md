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