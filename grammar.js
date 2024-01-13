module.exports = grammar({
    name: 'markdown_slides',
  
    rules: {
      document: $ => repeat(choice($.heading, $.unordered_list, $.text_line)),

      
      // Headings
      heading: $ => choice($.heading1, $.heading2, $.heading3, $.heading4, $.heading5, $.heading6),

      heading1: $ => seq('# ', $.text_line),
      heading2: $ => seq('## ', $.text_line),
      heading3: $ => seq('### ', $.text_line),
      heading4: $ => seq('#### ', $.text_line),
      heading5: $ => seq('##### ', $.text_line),
      heading6: $ => seq('###### ', $.text_line),

      // Unordered list
      
      unordered_list: $ => prec.right(seq(repeat1($.unordered_list_item))),
      unordered_list_item: $ => seq('- ', $.text_line),

      text_line: $ => seq(repeat(choice($.text, $.inline_element)), $.line_end),
      
      // Inline elements
      inline_element: $ => choice($.bolded_text, $.italic_text, $.bolded_italic_text),
      italic_text: $ => seq('*', $.text, '*'),
      bolded_text: $ => seq('**', $.text, '**'),
      bolded_italic_text: $ => seq('***', $.text, '***'),
      

      text: $ => /[A-Za-z0-9]+/,
      line_end: $ => '\n',
    }
  });