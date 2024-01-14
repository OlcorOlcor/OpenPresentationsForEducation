#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 48
#define LARGE_STATE_COUNT 6
#define SYMBOL_COUNT 37
#define ALIAS_COUNT 0
#define TOKEN_COUNT 14
#define EXTERNAL_TOKEN_COUNT 2
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 3
#define PRODUCTION_ID_COUNT 1

enum {
  anon_sym_POUND = 1,
  anon_sym_POUND_POUND = 2,
  anon_sym_POUND_POUND_POUND = 3,
  anon_sym_POUND_POUND_POUND_POUND = 4,
  anon_sym_POUND_POUND_POUND_POUND_POUND = 5,
  anon_sym_POUND_POUND_POUND_POUND_POUND_POUND = 6,
  anon_sym_DASH = 7,
  sym_italic_marker = 8,
  sym_bold_marker = 9,
  sym_bold_italic_marker = 10,
  aux_sym_text_token1 = 11,
  sym_line_end = 12,
  sym_file_end = 13,
  sym_document = 14,
  sym_paragraphs = 15,
  sym_paragraph = 16,
  sym_heading = 17,
  sym_heading1 = 18,
  sym_heading2 = 19,
  sym_heading3 = 20,
  sym_heading4 = 21,
  sym_heading5 = 22,
  sym_heading6 = 23,
  sym_unordered_list = 24,
  sym_unordered_list_item = 25,
  sym_text_line = 26,
  sym_inline_element = 27,
  sym_italic_text = 28,
  sym_bolded_text = 29,
  sym_bolded_italic_text = 30,
  sym_text = 31,
  aux_sym_document_repeat1 = 32,
  aux_sym_paragraphs_repeat1 = 33,
  aux_sym_paragraph_repeat1 = 34,
  aux_sym_unordered_list_repeat1 = 35,
  aux_sym_text_line_repeat1 = 36,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_POUND] = "# ",
  [anon_sym_POUND_POUND] = "## ",
  [anon_sym_POUND_POUND_POUND] = "### ",
  [anon_sym_POUND_POUND_POUND_POUND] = "#### ",
  [anon_sym_POUND_POUND_POUND_POUND_POUND] = "##### ",
  [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = "###### ",
  [anon_sym_DASH] = "- ",
  [sym_italic_marker] = "italic_marker",
  [sym_bold_marker] = "bold_marker",
  [sym_bold_italic_marker] = "bold_italic_marker",
  [aux_sym_text_token1] = "text_token1",
  [sym_line_end] = "line_end",
  [sym_file_end] = "file_end",
  [sym_document] = "document",
  [sym_paragraphs] = "paragraphs",
  [sym_paragraph] = "paragraph",
  [sym_heading] = "heading",
  [sym_heading1] = "heading1",
  [sym_heading2] = "heading2",
  [sym_heading3] = "heading3",
  [sym_heading4] = "heading4",
  [sym_heading5] = "heading5",
  [sym_heading6] = "heading6",
  [sym_unordered_list] = "unordered_list",
  [sym_unordered_list_item] = "unordered_list_item",
  [sym_text_line] = "text_line",
  [sym_inline_element] = "inline_element",
  [sym_italic_text] = "italic_text",
  [sym_bolded_text] = "bolded_text",
  [sym_bolded_italic_text] = "bolded_italic_text",
  [sym_text] = "text",
  [aux_sym_document_repeat1] = "document_repeat1",
  [aux_sym_paragraphs_repeat1] = "paragraphs_repeat1",
  [aux_sym_paragraph_repeat1] = "paragraph_repeat1",
  [aux_sym_unordered_list_repeat1] = "unordered_list_repeat1",
  [aux_sym_text_line_repeat1] = "text_line_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_POUND] = anon_sym_POUND,
  [anon_sym_POUND_POUND] = anon_sym_POUND_POUND,
  [anon_sym_POUND_POUND_POUND] = anon_sym_POUND_POUND_POUND,
  [anon_sym_POUND_POUND_POUND_POUND] = anon_sym_POUND_POUND_POUND_POUND,
  [anon_sym_POUND_POUND_POUND_POUND_POUND] = anon_sym_POUND_POUND_POUND_POUND_POUND,
  [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
  [anon_sym_DASH] = anon_sym_DASH,
  [sym_italic_marker] = sym_italic_marker,
  [sym_bold_marker] = sym_bold_marker,
  [sym_bold_italic_marker] = sym_bold_italic_marker,
  [aux_sym_text_token1] = aux_sym_text_token1,
  [sym_line_end] = sym_line_end,
  [sym_file_end] = sym_file_end,
  [sym_document] = sym_document,
  [sym_paragraphs] = sym_paragraphs,
  [sym_paragraph] = sym_paragraph,
  [sym_heading] = sym_heading,
  [sym_heading1] = sym_heading1,
  [sym_heading2] = sym_heading2,
  [sym_heading3] = sym_heading3,
  [sym_heading4] = sym_heading4,
  [sym_heading5] = sym_heading5,
  [sym_heading6] = sym_heading6,
  [sym_unordered_list] = sym_unordered_list,
  [sym_unordered_list_item] = sym_unordered_list_item,
  [sym_text_line] = sym_text_line,
  [sym_inline_element] = sym_inline_element,
  [sym_italic_text] = sym_italic_text,
  [sym_bolded_text] = sym_bolded_text,
  [sym_bolded_italic_text] = sym_bolded_italic_text,
  [sym_text] = sym_text,
  [aux_sym_document_repeat1] = aux_sym_document_repeat1,
  [aux_sym_paragraphs_repeat1] = aux_sym_paragraphs_repeat1,
  [aux_sym_paragraph_repeat1] = aux_sym_paragraph_repeat1,
  [aux_sym_unordered_list_repeat1] = aux_sym_unordered_list_repeat1,
  [aux_sym_text_line_repeat1] = aux_sym_text_line_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_POUND] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_POUND_POUND] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_POUND_POUND_POUND] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_POUND_POUND_POUND_POUND] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_POUND_POUND_POUND_POUND_POUND] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DASH] = {
    .visible = true,
    .named = false,
  },
  [sym_italic_marker] = {
    .visible = true,
    .named = true,
  },
  [sym_bold_marker] = {
    .visible = true,
    .named = true,
  },
  [sym_bold_italic_marker] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_text_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_line_end] = {
    .visible = true,
    .named = true,
  },
  [sym_file_end] = {
    .visible = true,
    .named = true,
  },
  [sym_document] = {
    .visible = true,
    .named = true,
  },
  [sym_paragraphs] = {
    .visible = true,
    .named = true,
  },
  [sym_paragraph] = {
    .visible = true,
    .named = true,
  },
  [sym_heading] = {
    .visible = true,
    .named = true,
  },
  [sym_heading1] = {
    .visible = true,
    .named = true,
  },
  [sym_heading2] = {
    .visible = true,
    .named = true,
  },
  [sym_heading3] = {
    .visible = true,
    .named = true,
  },
  [sym_heading4] = {
    .visible = true,
    .named = true,
  },
  [sym_heading5] = {
    .visible = true,
    .named = true,
  },
  [sym_heading6] = {
    .visible = true,
    .named = true,
  },
  [sym_unordered_list] = {
    .visible = true,
    .named = true,
  },
  [sym_unordered_list_item] = {
    .visible = true,
    .named = true,
  },
  [sym_text_line] = {
    .visible = true,
    .named = true,
  },
  [sym_inline_element] = {
    .visible = true,
    .named = true,
  },
  [sym_italic_text] = {
    .visible = true,
    .named = true,
  },
  [sym_bolded_text] = {
    .visible = true,
    .named = true,
  },
  [sym_bolded_italic_text] = {
    .visible = true,
    .named = true,
  },
  [sym_text] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_document_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_paragraphs_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_paragraph_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_unordered_list_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_text_line_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 12,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 24,
  [27] = 27,
  [28] = 28,
  [29] = 29,
  [30] = 30,
  [31] = 31,
  [32] = 32,
  [33] = 33,
  [34] = 34,
  [35] = 35,
  [36] = 36,
  [37] = 37,
  [38] = 38,
  [39] = 39,
  [40] = 40,
  [41] = 41,
  [42] = 42,
  [43] = 43,
  [44] = 34,
  [45] = 34,
  [46] = 34,
  [47] = 47,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(9);
      if (lookahead == '\n') SKIP(0)
      if (lookahead == '#') ADVANCE(23);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(18);
      if (lookahead == '-') ADVANCE(24);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(30);
      if (lookahead != 0) ADVANCE(33);
      END_STATE();
    case 1:
      if (lookahead == '\n') SKIP(1)
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(18);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(31);
      if (lookahead != 0) ADVANCE(33);
      END_STATE();
    case 2:
      if (lookahead == '\n') SKIP(2)
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(32);
      if (lookahead != 0) ADVANCE(33);
      END_STATE();
    case 3:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(7);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(3)
      END_STATE();
    case 4:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(21);
      END_STATE();
    case 5:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(19);
      END_STATE();
    case 6:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(17);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(6)
      END_STATE();
    case 7:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(4);
      END_STATE();
    case 8:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(5);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(8)
      END_STATE();
    case 9:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(anon_sym_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(anon_sym_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_DASH);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(sym_italic_marker);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(sym_italic_marker);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_bold_marker);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_bold_marker);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(22);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(sym_bold_italic_marker);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(sym_bold_italic_marker);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(10);
      if (lookahead == '#') ADVANCE(25);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(16);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(11);
      if (lookahead == '#') ADVANCE(26);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(12);
      if (lookahead == '#') ADVANCE(27);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(13);
      if (lookahead == '#') ADVANCE(28);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(14);
      if (lookahead == '#') ADVANCE(29);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(15);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '#') ADVANCE(23);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(18);
      if (lookahead == '-') ADVANCE(24);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(30);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(18);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(31);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(32);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(33);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0, .external_lex_state = 1},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0, .external_lex_state = 2},
  [5] = {.lex_state = 0, .external_lex_state = 2},
  [6] = {.lex_state = 0, .external_lex_state = 2},
  [7] = {.lex_state = 0, .external_lex_state = 2},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0, .external_lex_state = 2},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0, .external_lex_state = 2},
  [12] = {.lex_state = 0, .external_lex_state = 2},
  [13] = {.lex_state = 1},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 0},
  [16] = {.lex_state = 0},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 1},
  [24] = {.lex_state = 1, .external_lex_state = 2},
  [25] = {.lex_state = 1},
  [26] = {.lex_state = 1, .external_lex_state = 2},
  [27] = {.lex_state = 1},
  [28] = {.lex_state = 1},
  [29] = {.lex_state = 1, .external_lex_state = 2},
  [30] = {.lex_state = 1},
  [31] = {.lex_state = 1},
  [32] = {.lex_state = 1},
  [33] = {.lex_state = 1, .external_lex_state = 2},
  [34] = {.lex_state = 1, .external_lex_state = 2},
  [35] = {.lex_state = 1, .external_lex_state = 2},
  [36] = {.lex_state = 1, .external_lex_state = 2},
  [37] = {.lex_state = 1, .external_lex_state = 2},
  [38] = {.lex_state = 2},
  [39] = {.lex_state = 2},
  [40] = {.lex_state = 2},
  [41] = {.lex_state = 3},
  [42] = {.lex_state = 8},
  [43] = {.lex_state = 6},
  [44] = {.lex_state = 6},
  [45] = {.lex_state = 8},
  [46] = {.lex_state = 3},
  [47] = {.lex_state = 0},
};

enum {
  ts_external_token_line_end = 0,
  ts_external_token_file_end = 1,
};

static const TSSymbol ts_external_scanner_symbol_map[EXTERNAL_TOKEN_COUNT] = {
  [ts_external_token_line_end] = sym_line_end,
  [ts_external_token_file_end] = sym_file_end,
};

static const bool ts_external_scanner_states[3][EXTERNAL_TOKEN_COUNT] = {
  [1] = {
    [ts_external_token_line_end] = true,
    [ts_external_token_file_end] = true,
  },
  [2] = {
    [ts_external_token_line_end] = true,
  },
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_POUND] = ACTIONS(1),
    [anon_sym_POUND_POUND] = ACTIONS(1),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(1),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(1),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(1),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(1),
    [anon_sym_DASH] = ACTIONS(1),
    [sym_italic_marker] = ACTIONS(1),
    [sym_bold_marker] = ACTIONS(1),
    [sym_bold_italic_marker] = ACTIONS(1),
    [aux_sym_text_token1] = ACTIONS(1),
    [sym_line_end] = ACTIONS(1),
    [sym_file_end] = ACTIONS(1),
  },
  [1] = {
    [sym_document] = STATE(47),
    [sym_paragraphs] = STATE(3),
    [sym_paragraph] = STATE(6),
    [sym_heading] = STATE(3),
    [sym_heading1] = STATE(16),
    [sym_heading2] = STATE(16),
    [sym_heading3] = STATE(16),
    [sym_heading4] = STATE(16),
    [sym_heading5] = STATE(16),
    [sym_heading6] = STATE(16),
    [sym_unordered_list] = STATE(3),
    [sym_unordered_list_item] = STATE(10),
    [sym_text_line] = STATE(5),
    [sym_inline_element] = STATE(26),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(26),
    [aux_sym_document_repeat1] = STATE(3),
    [aux_sym_paragraph_repeat1] = STATE(5),
    [aux_sym_unordered_list_repeat1] = STATE(10),
    [aux_sym_text_line_repeat1] = STATE(26),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_POUND] = ACTIONS(5),
    [anon_sym_POUND_POUND] = ACTIONS(7),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(9),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(11),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(13),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(15),
    [anon_sym_DASH] = ACTIONS(17),
    [sym_italic_marker] = ACTIONS(19),
    [sym_bold_marker] = ACTIONS(21),
    [sym_bold_italic_marker] = ACTIONS(23),
    [aux_sym_text_token1] = ACTIONS(25),
  },
  [2] = {
    [sym_paragraphs] = STATE(2),
    [sym_paragraph] = STATE(6),
    [sym_heading] = STATE(2),
    [sym_heading1] = STATE(16),
    [sym_heading2] = STATE(16),
    [sym_heading3] = STATE(16),
    [sym_heading4] = STATE(16),
    [sym_heading5] = STATE(16),
    [sym_heading6] = STATE(16),
    [sym_unordered_list] = STATE(2),
    [sym_unordered_list_item] = STATE(10),
    [sym_text_line] = STATE(5),
    [sym_inline_element] = STATE(26),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(26),
    [aux_sym_document_repeat1] = STATE(2),
    [aux_sym_paragraph_repeat1] = STATE(5),
    [aux_sym_unordered_list_repeat1] = STATE(10),
    [aux_sym_text_line_repeat1] = STATE(26),
    [ts_builtin_sym_end] = ACTIONS(27),
    [anon_sym_POUND] = ACTIONS(29),
    [anon_sym_POUND_POUND] = ACTIONS(32),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(35),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(38),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(41),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(44),
    [anon_sym_DASH] = ACTIONS(47),
    [sym_italic_marker] = ACTIONS(50),
    [sym_bold_marker] = ACTIONS(53),
    [sym_bold_italic_marker] = ACTIONS(56),
    [aux_sym_text_token1] = ACTIONS(59),
  },
  [3] = {
    [sym_paragraphs] = STATE(2),
    [sym_paragraph] = STATE(6),
    [sym_heading] = STATE(2),
    [sym_heading1] = STATE(16),
    [sym_heading2] = STATE(16),
    [sym_heading3] = STATE(16),
    [sym_heading4] = STATE(16),
    [sym_heading5] = STATE(16),
    [sym_heading6] = STATE(16),
    [sym_unordered_list] = STATE(2),
    [sym_unordered_list_item] = STATE(10),
    [sym_text_line] = STATE(5),
    [sym_inline_element] = STATE(26),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(26),
    [aux_sym_document_repeat1] = STATE(2),
    [aux_sym_paragraph_repeat1] = STATE(5),
    [aux_sym_unordered_list_repeat1] = STATE(10),
    [aux_sym_text_line_repeat1] = STATE(26),
    [ts_builtin_sym_end] = ACTIONS(62),
    [anon_sym_POUND] = ACTIONS(5),
    [anon_sym_POUND_POUND] = ACTIONS(7),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(9),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(11),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(13),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(15),
    [anon_sym_DASH] = ACTIONS(17),
    [sym_italic_marker] = ACTIONS(19),
    [sym_bold_marker] = ACTIONS(21),
    [sym_bold_italic_marker] = ACTIONS(23),
    [aux_sym_text_token1] = ACTIONS(25),
  },
  [4] = {
    [sym_text_line] = STATE(4),
    [sym_inline_element] = STATE(26),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(26),
    [aux_sym_paragraph_repeat1] = STATE(4),
    [aux_sym_text_line_repeat1] = STATE(26),
    [ts_builtin_sym_end] = ACTIONS(64),
    [anon_sym_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_DASH] = ACTIONS(66),
    [sym_italic_marker] = ACTIONS(68),
    [sym_bold_marker] = ACTIONS(71),
    [sym_bold_italic_marker] = ACTIONS(74),
    [aux_sym_text_token1] = ACTIONS(77),
    [sym_line_end] = ACTIONS(64),
  },
  [5] = {
    [sym_text_line] = STATE(4),
    [sym_inline_element] = STATE(26),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(26),
    [aux_sym_paragraph_repeat1] = STATE(4),
    [aux_sym_text_line_repeat1] = STATE(26),
    [ts_builtin_sym_end] = ACTIONS(80),
    [anon_sym_POUND] = ACTIONS(82),
    [anon_sym_POUND_POUND] = ACTIONS(82),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(82),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(82),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(82),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(82),
    [anon_sym_DASH] = ACTIONS(82),
    [sym_italic_marker] = ACTIONS(82),
    [sym_bold_marker] = ACTIONS(82),
    [sym_bold_italic_marker] = ACTIONS(82),
    [aux_sym_text_token1] = ACTIONS(82),
    [sym_line_end] = ACTIONS(80),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 4,
    ACTIONS(84), 1,
      ts_builtin_sym_end,
    ACTIONS(88), 1,
      sym_line_end,
    STATE(9), 1,
      aux_sym_paragraphs_repeat1,
    ACTIONS(86), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [23] = 4,
    ACTIONS(90), 1,
      ts_builtin_sym_end,
    ACTIONS(94), 1,
      sym_line_end,
    STATE(7), 1,
      aux_sym_paragraphs_repeat1,
    ACTIONS(92), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [46] = 4,
    ACTIONS(97), 1,
      ts_builtin_sym_end,
    ACTIONS(101), 1,
      anon_sym_DASH,
    STATE(8), 2,
      sym_unordered_list_item,
      aux_sym_unordered_list_repeat1,
    ACTIONS(99), 10,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [69] = 4,
    ACTIONS(88), 1,
      sym_line_end,
    ACTIONS(104), 1,
      ts_builtin_sym_end,
    STATE(7), 1,
      aux_sym_paragraphs_repeat1,
    ACTIONS(106), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [92] = 4,
    ACTIONS(17), 1,
      anon_sym_DASH,
    ACTIONS(108), 1,
      ts_builtin_sym_end,
    STATE(8), 2,
      sym_unordered_list_item,
      aux_sym_unordered_list_repeat1,
    ACTIONS(110), 10,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [115] = 2,
    ACTIONS(90), 2,
      sym_line_end,
      ts_builtin_sym_end,
    ACTIONS(92), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [133] = 2,
    ACTIONS(112), 2,
      sym_line_end,
      ts_builtin_sym_end,
    ACTIONS(114), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [151] = 8,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(11), 1,
      sym_paragraph,
    STATE(5), 2,
      sym_text_line,
      aux_sym_paragraph_repeat1,
    STATE(26), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [181] = 2,
    ACTIONS(116), 1,
      ts_builtin_sym_end,
    ACTIONS(118), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [198] = 2,
    ACTIONS(112), 1,
      ts_builtin_sym_end,
    ACTIONS(114), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [215] = 2,
    ACTIONS(120), 1,
      ts_builtin_sym_end,
    ACTIONS(122), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [232] = 2,
    ACTIONS(124), 1,
      ts_builtin_sym_end,
    ACTIONS(126), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [249] = 2,
    ACTIONS(128), 1,
      ts_builtin_sym_end,
    ACTIONS(130), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [266] = 2,
    ACTIONS(132), 1,
      ts_builtin_sym_end,
    ACTIONS(134), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [283] = 2,
    ACTIONS(136), 1,
      ts_builtin_sym_end,
    ACTIONS(138), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [300] = 2,
    ACTIONS(140), 1,
      ts_builtin_sym_end,
    ACTIONS(142), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [317] = 2,
    ACTIONS(144), 1,
      ts_builtin_sym_end,
    ACTIONS(146), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [334] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(21), 1,
      sym_text_line,
    STATE(24), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [360] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    ACTIONS(148), 1,
      sym_line_end,
    STATE(29), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [386] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(18), 1,
      sym_text_line,
    STATE(24), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [412] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    ACTIONS(150), 1,
      sym_line_end,
    STATE(29), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [438] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(17), 1,
      sym_text_line,
    STATE(24), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [464] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(19), 1,
      sym_text_line,
    STATE(24), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [490] = 7,
    ACTIONS(152), 1,
      sym_italic_marker,
    ACTIONS(155), 1,
      sym_bold_marker,
    ACTIONS(158), 1,
      sym_bold_italic_marker,
    ACTIONS(161), 1,
      aux_sym_text_token1,
    ACTIONS(164), 1,
      sym_line_end,
    STATE(29), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [516] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(14), 1,
      sym_text_line,
    STATE(24), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [542] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(20), 1,
      sym_text_line,
    STATE(24), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [568] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(22), 1,
      sym_text_line,
    STATE(24), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [594] = 2,
    ACTIONS(168), 1,
      sym_line_end,
    ACTIONS(166), 4,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [604] = 2,
    ACTIONS(172), 1,
      sym_line_end,
    ACTIONS(170), 4,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [614] = 2,
    ACTIONS(176), 1,
      sym_line_end,
    ACTIONS(174), 4,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [624] = 2,
    ACTIONS(180), 1,
      sym_line_end,
    ACTIONS(178), 4,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [634] = 2,
    ACTIONS(184), 1,
      sym_line_end,
    ACTIONS(182), 4,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [644] = 2,
    ACTIONS(186), 1,
      aux_sym_text_token1,
    STATE(43), 1,
      sym_text,
  [651] = 2,
    ACTIONS(188), 1,
      aux_sym_text_token1,
    STATE(42), 1,
      sym_text,
  [658] = 2,
    ACTIONS(190), 1,
      aux_sym_text_token1,
    STATE(41), 1,
      sym_text,
  [665] = 1,
    ACTIONS(192), 1,
      sym_bold_italic_marker,
  [669] = 1,
    ACTIONS(194), 1,
      sym_bold_marker,
  [673] = 1,
    ACTIONS(196), 1,
      sym_italic_marker,
  [677] = 1,
    ACTIONS(172), 1,
      sym_italic_marker,
  [681] = 1,
    ACTIONS(172), 1,
      sym_bold_marker,
  [685] = 1,
    ACTIONS(172), 1,
      sym_bold_italic_marker,
  [689] = 1,
    ACTIONS(198), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(6)] = 0,
  [SMALL_STATE(7)] = 23,
  [SMALL_STATE(8)] = 46,
  [SMALL_STATE(9)] = 69,
  [SMALL_STATE(10)] = 92,
  [SMALL_STATE(11)] = 115,
  [SMALL_STATE(12)] = 133,
  [SMALL_STATE(13)] = 151,
  [SMALL_STATE(14)] = 181,
  [SMALL_STATE(15)] = 198,
  [SMALL_STATE(16)] = 215,
  [SMALL_STATE(17)] = 232,
  [SMALL_STATE(18)] = 249,
  [SMALL_STATE(19)] = 266,
  [SMALL_STATE(20)] = 283,
  [SMALL_STATE(21)] = 300,
  [SMALL_STATE(22)] = 317,
  [SMALL_STATE(23)] = 334,
  [SMALL_STATE(24)] = 360,
  [SMALL_STATE(25)] = 386,
  [SMALL_STATE(26)] = 412,
  [SMALL_STATE(27)] = 438,
  [SMALL_STATE(28)] = 464,
  [SMALL_STATE(29)] = 490,
  [SMALL_STATE(30)] = 516,
  [SMALL_STATE(31)] = 542,
  [SMALL_STATE(32)] = 568,
  [SMALL_STATE(33)] = 594,
  [SMALL_STATE(34)] = 604,
  [SMALL_STATE(35)] = 614,
  [SMALL_STATE(36)] = 624,
  [SMALL_STATE(37)] = 634,
  [SMALL_STATE(38)] = 644,
  [SMALL_STATE(39)] = 651,
  [SMALL_STATE(40)] = 658,
  [SMALL_STATE(41)] = 665,
  [SMALL_STATE(42)] = 669,
  [SMALL_STATE(43)] = 673,
  [SMALL_STATE(44)] = 677,
  [SMALL_STATE(45)] = 681,
  [SMALL_STATE(46)] = 685,
  [SMALL_STATE(47)] = 689,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_document, 0),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(27),
  [7] = {.entry = {.count = 1, .reusable = false}}, SHIFT(25),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(28),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(30),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(31),
  [15] = {.entry = {.count = 1, .reusable = false}}, SHIFT(23),
  [17] = {.entry = {.count = 1, .reusable = false}}, SHIFT(32),
  [19] = {.entry = {.count = 1, .reusable = false}}, SHIFT(38),
  [21] = {.entry = {.count = 1, .reusable = false}}, SHIFT(39),
  [23] = {.entry = {.count = 1, .reusable = false}}, SHIFT(40),
  [25] = {.entry = {.count = 1, .reusable = false}}, SHIFT(34),
  [27] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_document_repeat1, 2),
  [29] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(27),
  [32] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(25),
  [35] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(28),
  [38] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(30),
  [41] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(31),
  [44] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(23),
  [47] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(32),
  [50] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(38),
  [53] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(39),
  [56] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(40),
  [59] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(34),
  [62] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_document, 1),
  [64] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_paragraph_repeat1, 2),
  [66] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2),
  [68] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(38),
  [71] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(39),
  [74] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(40),
  [77] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(34),
  [80] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_paragraph, 1),
  [82] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_paragraph, 1),
  [84] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_paragraphs, 1),
  [86] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_paragraphs, 1),
  [88] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [90] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_paragraphs_repeat1, 2),
  [92] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_paragraphs_repeat1, 2),
  [94] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_paragraphs_repeat1, 2), SHIFT_REPEAT(13),
  [97] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_unordered_list_repeat1, 2),
  [99] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_unordered_list_repeat1, 2),
  [101] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_unordered_list_repeat1, 2), SHIFT_REPEAT(32),
  [104] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_paragraphs, 2),
  [106] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_paragraphs, 2),
  [108] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unordered_list, 1),
  [110] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_unordered_list, 1),
  [112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_text_line, 2),
  [114] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_text_line, 2),
  [116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading4, 2),
  [118] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading4, 2),
  [120] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading, 1),
  [122] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading, 1),
  [124] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading1, 2),
  [126] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading1, 2),
  [128] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading2, 2),
  [130] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading2, 2),
  [132] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading3, 2),
  [134] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading3, 2),
  [136] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading5, 2),
  [138] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading5, 2),
  [140] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading6, 2),
  [142] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading6, 2),
  [144] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unordered_list_item, 2),
  [146] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_unordered_list_item, 2),
  [148] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [150] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [152] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(38),
  [155] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(39),
  [158] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(40),
  [161] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(34),
  [164] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_text_line_repeat1, 2),
  [166] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bolded_text, 3),
  [168] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bolded_text, 3),
  [170] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_text, 1),
  [172] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_text, 1),
  [174] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_italic_text, 3),
  [176] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_italic_text, 3),
  [178] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bolded_italic_text, 3),
  [180] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bolded_italic_text, 3),
  [182] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_inline_element, 1),
  [184] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_inline_element, 1),
  [186] = {.entry = {.count = 1, .reusable = true}}, SHIFT(44),
  [188] = {.entry = {.count = 1, .reusable = true}}, SHIFT(45),
  [190] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [192] = {.entry = {.count = 1, .reusable = true}}, SHIFT(36),
  [194] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [196] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [198] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
};

#ifdef __cplusplus
extern "C" {
#endif
void *tree_sitter_markdown_slides_external_scanner_create(void);
void tree_sitter_markdown_slides_external_scanner_destroy(void *);
bool tree_sitter_markdown_slides_external_scanner_scan(void *, TSLexer *, const bool *);
unsigned tree_sitter_markdown_slides_external_scanner_serialize(void *, char *);
void tree_sitter_markdown_slides_external_scanner_deserialize(void *, const char *, unsigned);

#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_markdown_slides(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .external_scanner = {
      &ts_external_scanner_states[0][0],
      ts_external_scanner_symbol_map,
      tree_sitter_markdown_slides_external_scanner_create,
      tree_sitter_markdown_slides_external_scanner_destroy,
      tree_sitter_markdown_slides_external_scanner_scan,
      tree_sitter_markdown_slides_external_scanner_serialize,
      tree_sitter_markdown_slides_external_scanner_deserialize,
    },
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
