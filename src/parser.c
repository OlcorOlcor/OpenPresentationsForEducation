#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 51
#define LARGE_STATE_COUNT 6
#define SYMBOL_COUNT 39
#define ALIAS_COUNT 0
#define TOKEN_COUNT 15
#define EXTERNAL_TOKEN_COUNT 0
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
  anon_sym_LF = 12,
  anon_sym_CR = 13,
  anon_sym_LF_CR = 14,
  sym_document = 15,
  sym_paragraphs = 16,
  sym_paragraph = 17,
  sym_heading = 18,
  sym_heading1 = 19,
  sym_heading2 = 20,
  sym_heading3 = 21,
  sym_heading4 = 22,
  sym_heading5 = 23,
  sym_heading6 = 24,
  sym_unordered_list = 25,
  sym_unordered_list_item = 26,
  sym_text_line = 27,
  sym_inline_element = 28,
  sym_italic_text = 29,
  sym_bolded_text = 30,
  sym_bolded_italic_text = 31,
  sym_text = 32,
  sym_line_end = 33,
  aux_sym_document_repeat1 = 34,
  aux_sym_paragraphs_repeat1 = 35,
  aux_sym_paragraph_repeat1 = 36,
  aux_sym_unordered_list_repeat1 = 37,
  aux_sym_text_line_repeat1 = 38,
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
  [anon_sym_LF] = "\n",
  [anon_sym_CR] = "\r",
  [anon_sym_LF_CR] = "\n\r",
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
  [sym_line_end] = "line_end",
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
  [anon_sym_LF] = anon_sym_LF,
  [anon_sym_CR] = anon_sym_CR,
  [anon_sym_LF_CR] = anon_sym_LF_CR,
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
  [sym_line_end] = sym_line_end,
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
  [anon_sym_LF] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_CR] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LF_CR] = {
    .visible = true,
    .named = false,
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
  [sym_line_end] = {
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
  [19] = 11,
  [20] = 20,
  [21] = 9,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 26,
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
  [40] = 9,
  [41] = 41,
  [42] = 42,
  [43] = 43,
  [44] = 44,
  [45] = 45,
  [46] = 36,
  [47] = 36,
  [48] = 48,
  [49] = 36,
  [50] = 50,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(11);
      if (lookahead == '\n') ADVANCE(38);
      if (lookahead == '\r') ADVANCE(40);
      if (lookahead == '#') ADVANCE(27);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '-') ADVANCE(28);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(25);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 1:
      if (lookahead == '\n') SKIP(1)
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(35);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 2:
      if (lookahead == '\n') SKIP(2)
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(36);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 3:
      if (lookahead == '\n') ADVANCE(39);
      if (lookahead == '\r') ADVANCE(41);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(26);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 4:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(8);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(4)
      END_STATE();
    case 5:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(23);
      END_STATE();
    case 6:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(19);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(6)
      END_STATE();
    case 7:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(21);
      END_STATE();
    case 8:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(5);
      END_STATE();
    case 9:
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(7);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(9)
      END_STATE();
    case 10:
      if (eof) ADVANCE(11);
      if (lookahead == '\n') SKIP(10)
      if (lookahead == '#') ADVANCE(27);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '-') ADVANCE(28);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(34);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND_POUND_POUND);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_DASH);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_italic_marker);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_italic_marker);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(22);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(sym_bold_marker);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(sym_bold_marker);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(24);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(sym_bold_italic_marker);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(sym_bold_italic_marker);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '\n') ADVANCE(38);
      if (lookahead == '\r') ADVANCE(40);
      if (lookahead == '#') ADVANCE(27);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '-') ADVANCE(28);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(25);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '\n') ADVANCE(39);
      if (lookahead == '\r') ADVANCE(41);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(26);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(12);
      if (lookahead == '#') ADVANCE(29);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(18);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(13);
      if (lookahead == '#') ADVANCE(30);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(14);
      if (lookahead == '#') ADVANCE(31);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(15);
      if (lookahead == '#') ADVANCE(32);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(16);
      if (lookahead == '#') ADVANCE(33);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == ' ') ADVANCE(17);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '#') ADVANCE(27);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '-') ADVANCE(28);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(34);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '*' ||
          lookahead == '_') ADVANCE(20);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(35);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 36:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(36);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 37:
      ACCEPT_TOKEN(aux_sym_text_token1);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 38:
      ACCEPT_TOKEN(anon_sym_LF);
      if (lookahead == '\n') ADVANCE(38);
      if (lookahead == '\r') ADVANCE(40);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(25);
      END_STATE();
    case 39:
      ACCEPT_TOKEN(anon_sym_LF);
      if (lookahead == '\n') ADVANCE(39);
      if (lookahead == '\r') ADVANCE(41);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(26);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(anon_sym_CR);
      if (lookahead == '\n') ADVANCE(38);
      if (lookahead == '\r') ADVANCE(40);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(25);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_CR);
      if (lookahead == '\n') ADVANCE(39);
      if (lookahead == '\r') ADVANCE(41);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(26);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 10},
  [2] = {.lex_state = 10},
  [3] = {.lex_state = 10},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 3},
  [13] = {.lex_state = 10},
  [14] = {.lex_state = 10},
  [15] = {.lex_state = 3},
  [16] = {.lex_state = 3},
  [17] = {.lex_state = 1},
  [18] = {.lex_state = 10},
  [19] = {.lex_state = 10},
  [20] = {.lex_state = 10},
  [21] = {.lex_state = 10},
  [22] = {.lex_state = 10},
  [23] = {.lex_state = 10},
  [24] = {.lex_state = 10},
  [25] = {.lex_state = 10},
  [26] = {.lex_state = 10},
  [27] = {.lex_state = 10},
  [28] = {.lex_state = 1},
  [29] = {.lex_state = 1},
  [30] = {.lex_state = 1},
  [31] = {.lex_state = 1},
  [32] = {.lex_state = 1},
  [33] = {.lex_state = 1},
  [34] = {.lex_state = 1},
  [35] = {.lex_state = 3},
  [36] = {.lex_state = 3},
  [37] = {.lex_state = 3},
  [38] = {.lex_state = 3},
  [39] = {.lex_state = 3},
  [40] = {.lex_state = 1},
  [41] = {.lex_state = 2},
  [42] = {.lex_state = 2},
  [43] = {.lex_state = 2},
  [44] = {.lex_state = 4},
  [45] = {.lex_state = 0},
  [46] = {.lex_state = 6},
  [47] = {.lex_state = 9},
  [48] = {.lex_state = 6},
  [49] = {.lex_state = 4},
  [50] = {.lex_state = 9},
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
    [anon_sym_LF] = ACTIONS(1),
    [anon_sym_CR] = ACTIONS(1),
    [anon_sym_LF_CR] = ACTIONS(1),
  },
  [1] = {
    [sym_document] = STATE(45),
    [sym_paragraphs] = STATE(3),
    [sym_paragraph] = STATE(8),
    [sym_heading] = STATE(3),
    [sym_heading1] = STATE(20),
    [sym_heading2] = STATE(20),
    [sym_heading3] = STATE(20),
    [sym_heading4] = STATE(20),
    [sym_heading5] = STATE(20),
    [sym_heading6] = STATE(20),
    [sym_unordered_list] = STATE(3),
    [sym_unordered_list_item] = STATE(14),
    [sym_text_line] = STATE(4),
    [sym_inline_element] = STATE(15),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(15),
    [aux_sym_document_repeat1] = STATE(3),
    [aux_sym_paragraph_repeat1] = STATE(4),
    [aux_sym_unordered_list_repeat1] = STATE(14),
    [aux_sym_text_line_repeat1] = STATE(15),
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
    [sym_paragraph] = STATE(8),
    [sym_heading] = STATE(2),
    [sym_heading1] = STATE(20),
    [sym_heading2] = STATE(20),
    [sym_heading3] = STATE(20),
    [sym_heading4] = STATE(20),
    [sym_heading5] = STATE(20),
    [sym_heading6] = STATE(20),
    [sym_unordered_list] = STATE(2),
    [sym_unordered_list_item] = STATE(14),
    [sym_text_line] = STATE(4),
    [sym_inline_element] = STATE(15),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(15),
    [aux_sym_document_repeat1] = STATE(2),
    [aux_sym_paragraph_repeat1] = STATE(4),
    [aux_sym_unordered_list_repeat1] = STATE(14),
    [aux_sym_text_line_repeat1] = STATE(15),
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
    [sym_paragraph] = STATE(8),
    [sym_heading] = STATE(2),
    [sym_heading1] = STATE(20),
    [sym_heading2] = STATE(20),
    [sym_heading3] = STATE(20),
    [sym_heading4] = STATE(20),
    [sym_heading5] = STATE(20),
    [sym_heading6] = STATE(20),
    [sym_unordered_list] = STATE(2),
    [sym_unordered_list_item] = STATE(14),
    [sym_text_line] = STATE(4),
    [sym_inline_element] = STATE(15),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(15),
    [aux_sym_document_repeat1] = STATE(2),
    [aux_sym_paragraph_repeat1] = STATE(4),
    [aux_sym_unordered_list_repeat1] = STATE(14),
    [aux_sym_text_line_repeat1] = STATE(15),
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
    [sym_text_line] = STATE(5),
    [sym_inline_element] = STATE(15),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(15),
    [aux_sym_paragraph_repeat1] = STATE(5),
    [aux_sym_text_line_repeat1] = STATE(15),
    [ts_builtin_sym_end] = ACTIONS(64),
    [anon_sym_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(66),
    [anon_sym_DASH] = ACTIONS(66),
    [sym_italic_marker] = ACTIONS(66),
    [sym_bold_marker] = ACTIONS(66),
    [sym_bold_italic_marker] = ACTIONS(66),
    [aux_sym_text_token1] = ACTIONS(66),
    [anon_sym_LF] = ACTIONS(66),
    [anon_sym_CR] = ACTIONS(66),
    [anon_sym_LF_CR] = ACTIONS(66),
  },
  [5] = {
    [sym_text_line] = STATE(5),
    [sym_inline_element] = STATE(15),
    [sym_italic_text] = STATE(37),
    [sym_bolded_text] = STATE(37),
    [sym_bolded_italic_text] = STATE(37),
    [sym_text] = STATE(15),
    [aux_sym_paragraph_repeat1] = STATE(5),
    [aux_sym_text_line_repeat1] = STATE(15),
    [ts_builtin_sym_end] = ACTIONS(68),
    [anon_sym_POUND] = ACTIONS(70),
    [anon_sym_POUND_POUND] = ACTIONS(70),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(70),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(70),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(70),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(70),
    [anon_sym_DASH] = ACTIONS(70),
    [sym_italic_marker] = ACTIONS(72),
    [sym_bold_marker] = ACTIONS(75),
    [sym_bold_italic_marker] = ACTIONS(78),
    [aux_sym_text_token1] = ACTIONS(81),
    [anon_sym_LF] = ACTIONS(70),
    [anon_sym_CR] = ACTIONS(70),
    [anon_sym_LF_CR] = ACTIONS(70),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 5,
    ACTIONS(84), 1,
      ts_builtin_sym_end,
    STATE(6), 1,
      aux_sym_paragraphs_repeat1,
    STATE(17), 1,
      sym_line_end,
    ACTIONS(88), 3,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
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
  [28] = 5,
    ACTIONS(91), 1,
      ts_builtin_sym_end,
    STATE(6), 1,
      aux_sym_paragraphs_repeat1,
    STATE(17), 1,
      sym_line_end,
    ACTIONS(95), 3,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
    ACTIONS(93), 11,
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
  [56] = 5,
    ACTIONS(97), 1,
      ts_builtin_sym_end,
    STATE(7), 1,
      aux_sym_paragraphs_repeat1,
    STATE(17), 1,
      sym_line_end,
    ACTIONS(95), 3,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
    ACTIONS(99), 11,
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
  [84] = 2,
    ACTIONS(101), 1,
      ts_builtin_sym_end,
    ACTIONS(103), 14,
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
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [104] = 2,
    ACTIONS(84), 1,
      ts_builtin_sym_end,
    ACTIONS(86), 14,
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
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [124] = 2,
    ACTIONS(105), 1,
      ts_builtin_sym_end,
    ACTIONS(107), 14,
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
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [144] = 8,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(19), 1,
      sym_line_end,
    ACTIONS(109), 3,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
    STATE(16), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [175] = 4,
    ACTIONS(111), 1,
      ts_builtin_sym_end,
    ACTIONS(115), 1,
      anon_sym_DASH,
    STATE(13), 2,
      sym_unordered_list_item,
      aux_sym_unordered_list_repeat1,
    ACTIONS(113), 10,
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
  [198] = 4,
    ACTIONS(17), 1,
      anon_sym_DASH,
    ACTIONS(118), 1,
      ts_builtin_sym_end,
    STATE(13), 2,
      sym_unordered_list_item,
      aux_sym_unordered_list_repeat1,
    ACTIONS(120), 10,
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
  [221] = 8,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(11), 1,
      sym_line_end,
    ACTIONS(122), 3,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
    STATE(16), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [252] = 7,
    ACTIONS(124), 1,
      sym_italic_marker,
    ACTIONS(127), 1,
      sym_bold_marker,
    ACTIONS(130), 1,
      sym_bold_italic_marker,
    ACTIONS(133), 1,
      aux_sym_text_token1,
    ACTIONS(136), 3,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
    STATE(16), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [280] = 8,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(10), 1,
      sym_paragraph,
    STATE(4), 2,
      sym_text_line,
      aux_sym_paragraph_repeat1,
    STATE(15), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [310] = 2,
    ACTIONS(138), 1,
      ts_builtin_sym_end,
    ACTIONS(140), 11,
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
  [327] = 2,
    ACTIONS(105), 1,
      ts_builtin_sym_end,
    ACTIONS(107), 11,
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
  [344] = 2,
    ACTIONS(142), 1,
      ts_builtin_sym_end,
    ACTIONS(144), 11,
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
  [361] = 2,
    ACTIONS(101), 1,
      ts_builtin_sym_end,
    ACTIONS(103), 11,
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
  [378] = 2,
    ACTIONS(146), 1,
      ts_builtin_sym_end,
    ACTIONS(148), 11,
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
  [395] = 2,
    ACTIONS(150), 1,
      ts_builtin_sym_end,
    ACTIONS(152), 11,
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
  [412] = 2,
    ACTIONS(154), 1,
      ts_builtin_sym_end,
    ACTIONS(156), 11,
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
  [429] = 2,
    ACTIONS(158), 1,
      ts_builtin_sym_end,
    ACTIONS(160), 11,
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
  [446] = 2,
    ACTIONS(162), 1,
      ts_builtin_sym_end,
    ACTIONS(164), 11,
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
  [463] = 2,
    ACTIONS(166), 1,
      ts_builtin_sym_end,
    ACTIONS(168), 11,
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
  [480] = 7,
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
    STATE(12), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [506] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(23), 1,
      sym_text_line,
    STATE(12), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [532] = 7,
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
    STATE(12), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [558] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(24), 1,
      sym_text_line,
    STATE(12), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [584] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(25), 1,
      sym_text_line,
    STATE(12), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [610] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(27), 1,
      sym_text_line,
    STATE(12), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [636] = 7,
    ACTIONS(19), 1,
      sym_italic_marker,
    ACTIONS(21), 1,
      sym_bold_marker,
    ACTIONS(23), 1,
      sym_bold_italic_marker,
    ACTIONS(25), 1,
      aux_sym_text_token1,
    STATE(26), 1,
      sym_text_line,
    STATE(12), 3,
      sym_inline_element,
      sym_text,
      aux_sym_text_line_repeat1,
    STATE(37), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [662] = 1,
    ACTIONS(170), 7,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [672] = 1,
    ACTIONS(172), 7,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [682] = 1,
    ACTIONS(174), 7,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [692] = 1,
    ACTIONS(176), 7,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [702] = 1,
    ACTIONS(178), 7,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
      anon_sym_LF,
      anon_sym_CR,
      anon_sym_LF_CR,
  [712] = 1,
    ACTIONS(103), 4,
      sym_italic_marker,
      sym_bold_marker,
      sym_bold_italic_marker,
      aux_sym_text_token1,
  [719] = 2,
    ACTIONS(180), 1,
      aux_sym_text_token1,
    STATE(44), 1,
      sym_text,
  [726] = 2,
    ACTIONS(182), 1,
      aux_sym_text_token1,
    STATE(48), 1,
      sym_text,
  [733] = 2,
    ACTIONS(184), 1,
      aux_sym_text_token1,
    STATE(50), 1,
      sym_text,
  [740] = 1,
    ACTIONS(186), 1,
      sym_bold_italic_marker,
  [744] = 1,
    ACTIONS(188), 1,
      ts_builtin_sym_end,
  [748] = 1,
    ACTIONS(190), 1,
      sym_italic_marker,
  [752] = 1,
    ACTIONS(190), 1,
      sym_bold_marker,
  [756] = 1,
    ACTIONS(192), 1,
      sym_italic_marker,
  [760] = 1,
    ACTIONS(190), 1,
      sym_bold_italic_marker,
  [764] = 1,
    ACTIONS(194), 1,
      sym_bold_marker,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(6)] = 0,
  [SMALL_STATE(7)] = 28,
  [SMALL_STATE(8)] = 56,
  [SMALL_STATE(9)] = 84,
  [SMALL_STATE(10)] = 104,
  [SMALL_STATE(11)] = 124,
  [SMALL_STATE(12)] = 144,
  [SMALL_STATE(13)] = 175,
  [SMALL_STATE(14)] = 198,
  [SMALL_STATE(15)] = 221,
  [SMALL_STATE(16)] = 252,
  [SMALL_STATE(17)] = 280,
  [SMALL_STATE(18)] = 310,
  [SMALL_STATE(19)] = 327,
  [SMALL_STATE(20)] = 344,
  [SMALL_STATE(21)] = 361,
  [SMALL_STATE(22)] = 378,
  [SMALL_STATE(23)] = 395,
  [SMALL_STATE(24)] = 412,
  [SMALL_STATE(25)] = 429,
  [SMALL_STATE(26)] = 446,
  [SMALL_STATE(27)] = 463,
  [SMALL_STATE(28)] = 480,
  [SMALL_STATE(29)] = 506,
  [SMALL_STATE(30)] = 532,
  [SMALL_STATE(31)] = 558,
  [SMALL_STATE(32)] = 584,
  [SMALL_STATE(33)] = 610,
  [SMALL_STATE(34)] = 636,
  [SMALL_STATE(35)] = 662,
  [SMALL_STATE(36)] = 672,
  [SMALL_STATE(37)] = 682,
  [SMALL_STATE(38)] = 692,
  [SMALL_STATE(39)] = 702,
  [SMALL_STATE(40)] = 712,
  [SMALL_STATE(41)] = 719,
  [SMALL_STATE(42)] = 726,
  [SMALL_STATE(43)] = 733,
  [SMALL_STATE(44)] = 740,
  [SMALL_STATE(45)] = 744,
  [SMALL_STATE(46)] = 748,
  [SMALL_STATE(47)] = 752,
  [SMALL_STATE(48)] = 756,
  [SMALL_STATE(49)] = 760,
  [SMALL_STATE(50)] = 764,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_document, 0),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(30),
  [7] = {.entry = {.count = 1, .reusable = false}}, SHIFT(29),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(31),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(28),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(32),
  [15] = {.entry = {.count = 1, .reusable = false}}, SHIFT(34),
  [17] = {.entry = {.count = 1, .reusable = false}}, SHIFT(33),
  [19] = {.entry = {.count = 1, .reusable = false}}, SHIFT(42),
  [21] = {.entry = {.count = 1, .reusable = false}}, SHIFT(43),
  [23] = {.entry = {.count = 1, .reusable = false}}, SHIFT(41),
  [25] = {.entry = {.count = 1, .reusable = false}}, SHIFT(36),
  [27] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_document_repeat1, 2),
  [29] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(30),
  [32] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(29),
  [35] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(31),
  [38] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(28),
  [41] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(32),
  [44] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(34),
  [47] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(33),
  [50] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(42),
  [53] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(43),
  [56] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(41),
  [59] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(36),
  [62] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_document, 1),
  [64] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_paragraph, 1),
  [66] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_paragraph, 1),
  [68] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_paragraph_repeat1, 2),
  [70] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2),
  [72] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(42),
  [75] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(43),
  [78] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(41),
  [81] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraph_repeat1, 2), SHIFT_REPEAT(36),
  [84] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_paragraphs_repeat1, 2),
  [86] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_paragraphs_repeat1, 2),
  [88] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_paragraphs_repeat1, 2), SHIFT_REPEAT(40),
  [91] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_paragraphs, 2),
  [93] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_paragraphs, 2),
  [95] = {.entry = {.count = 1, .reusable = false}}, SHIFT(40),
  [97] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_paragraphs, 1),
  [99] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_paragraphs, 1),
  [101] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_line_end, 1),
  [103] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_line_end, 1),
  [105] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_text_line, 2),
  [107] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_text_line, 2),
  [109] = {.entry = {.count = 1, .reusable = false}}, SHIFT(21),
  [111] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_unordered_list_repeat1, 2),
  [113] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_unordered_list_repeat1, 2),
  [115] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_unordered_list_repeat1, 2), SHIFT_REPEAT(33),
  [118] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unordered_list, 1),
  [120] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_unordered_list, 1),
  [122] = {.entry = {.count = 1, .reusable = false}}, SHIFT(9),
  [124] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(42),
  [127] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(43),
  [130] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(41),
  [133] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(36),
  [136] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2),
  [138] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading4, 2),
  [140] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading4, 2),
  [142] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading, 1),
  [144] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading, 1),
  [146] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading1, 2),
  [148] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading1, 2),
  [150] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading2, 2),
  [152] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading2, 2),
  [154] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading3, 2),
  [156] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading3, 2),
  [158] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading5, 2),
  [160] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading5, 2),
  [162] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading6, 2),
  [164] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading6, 2),
  [166] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unordered_list_item, 2),
  [168] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_unordered_list_item, 2),
  [170] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bolded_italic_text, 3),
  [172] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_text, 1),
  [174] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_inline_element, 1),
  [176] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_italic_text, 3),
  [178] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bolded_text, 3),
  [180] = {.entry = {.count = 1, .reusable = true}}, SHIFT(49),
  [182] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [184] = {.entry = {.count = 1, .reusable = true}}, SHIFT(47),
  [186] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [188] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [190] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_text, 1),
  [192] = {.entry = {.count = 1, .reusable = true}}, SHIFT(38),
  [194] = {.entry = {.count = 1, .reusable = true}}, SHIFT(39),
};

#ifdef __cplusplus
extern "C" {
#endif
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
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
