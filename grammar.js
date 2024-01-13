module.exports = grammar({
    name: 'markdown_slides',
    rules: {
      document: $ => prec(1000, repeat(choice($.heading, $.unordered_list, $.paragraphs))),

      // Paragraph
      paragraphs: $ => prec.right(seq($.paragraph, repeat(seq($.line_end, $.paragraph)))),
      paragraph: $ => prec(50, prec.right(seq(repeat1($.text_line)))),

      // Headings
      heading: $ => prec(100, choice($.heading1, $.heading2, $.heading3, $.heading4, $.heading5, $.heading6)),

      heading1: $ => seq('# ', $.text_line),
      heading2: $ => seq('## ', $.text_line),
      heading3: $ => seq('### ', $.text_line),
      heading4: $ => seq('#### ', $.text_line),
      heading5: $ => seq('##### ', $.text_line),
      heading6: $ => seq('###### ', $.text_line),


      // Unordered list
      unordered_list: $ => prec.right(seq(repeat1($.unordered_list_item))),
      unordered_list_item: $ => seq('- ', $.text_line),

      text_line: $ => seq(repeat1(choice($.text, $.inline_element)), $.line_end),

      // Inline elements
      inline_element: $ => choice($.bolded_text, $.italic_text, $.bolded_italic_text),

      italic_text: $ => prec(100, seq($.italic_marker, $.text, $.italic_marker)),
      italic_marker: $ => /[\*_]/,
      bolded_text: $ => prec(100, seq($.bold_marker, $.text, $.bold_marker)),
      bold_marker: $ => /(\*|_){2}/,
      bolded_italic_text: $ => prec(100, seq($.bold_italic_marker, $.text, $.bold_italic_marker)),
      bold_italic_marker: $ => /[\*_]{3}/,

      text: $ => prec(10, /[^\n]+/),
      line_ends: $ => seq($.line_end, repeat1($.line_end)),
      line_end: $ => choice('\n', '\r', '\n\r'),
    }
  });