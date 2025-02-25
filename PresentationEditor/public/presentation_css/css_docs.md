# Default CSS documentation
Open presentation editor provides several default CSS files you can chose from.
Styles from these files will get applied based on metadata provided in the markdown source code of the presentation.
## Choosing the file
You can choose a CSS file for each slide of your presentation.
To do so, you need to specify the `style` attribute in the front matter of the slide.
You can also specify the layout of the slide with the keyword `layout`.
## Styles
TODO
## Layouts
There are three supported layouts.
### Single column
Value `column_1`. This is the default layout. Elements will be displayed under one another on the slide.
### Two columns
Value `column_2`. The slide will be split into two halves. You can specify what elements go where by defining the following two sections:
```markdown
<!-- +col: 1 -->
    Elements here will be displayed in the left column.
<!-- +col: 2 -->
    Elements here will be displayed in the right column.
```
### Three columns
Value `column_3` The slide will be split into three columns. You can specify what elements go where by defining the following three sections:
```markdown
<!-- +col: 1 -->
    Elements here will be displayed in the left most column.
<!-- +col: 2 -->
    Elements here will be displayed in the middle column.
<!-- +col: 3 -->
    Elements here will be displayed in the right most column.
```
