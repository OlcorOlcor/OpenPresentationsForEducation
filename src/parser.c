#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 36
#define LARGE_STATE_COUNT 4
#define SYMBOL_COUNT 31
#define ALIAS_COUNT 0
#define TOKEN_COUNT 13
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
  anon_sym_STAR = 8,
  anon_sym_STAR_STAR = 9,
  anon_sym_STAR_STAR_STAR = 10,
  sym_text = 11,
  sym_line_end = 12,
  sym_document = 13,
  sym_heading = 14,
  sym_heading1 = 15,
  sym_heading2 = 16,
  sym_heading3 = 17,
  sym_heading4 = 18,
  sym_heading5 = 19,
  sym_heading6 = 20,
  sym_unordered_list = 21,
  sym_unordered_list_item = 22,
  sym_text_line = 23,
  sym_inline_element = 24,
  sym_italic_text = 25,
  sym_bolded_text = 26,
  sym_bolded_italic_text = 27,
  aux_sym_document_repeat1 = 28,
  aux_sym_unordered_list_repeat1 = 29,
  aux_sym_text_line_repeat1 = 30,
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
  [anon_sym_STAR] = "*",
  [anon_sym_STAR_STAR] = "**",
  [anon_sym_STAR_STAR_STAR] = "***",
  [sym_text] = "text",
  [sym_line_end] = "line_end",
  [sym_document] = "document",
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
  [aux_sym_document_repeat1] = "document_repeat1",
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
  [anon_sym_STAR] = anon_sym_STAR,
  [anon_sym_STAR_STAR] = anon_sym_STAR_STAR,
  [anon_sym_STAR_STAR_STAR] = anon_sym_STAR_STAR_STAR,
  [sym_text] = sym_text,
  [sym_line_end] = sym_line_end,
  [sym_document] = sym_document,
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
  [aux_sym_document_repeat1] = aux_sym_document_repeat1,
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
  [anon_sym_STAR] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_STAR_STAR] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_STAR_STAR_STAR] = {
    .visible = true,
    .named = false,
  },
  [sym_text] = {
    .visible = true,
    .named = true,
  },
  [sym_line_end] = {
    .visible = true,
    .named = true,
  },
  [sym_document] = {
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
  [aux_sym_document_repeat1] = {
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
  [15] = 15,
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
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(14);
      if (lookahead == '\n') ADVANCE(28);
      if (lookahead == '#') ADVANCE(1);
      if (lookahead == '*') ADVANCE(23);
      if (lookahead == '-') ADVANCE(2);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(27);
      END_STATE();
    case 1:
      if (lookahead == ' ') ADVANCE(15);
      if (lookahead == '#') ADVANCE(3);
      END_STATE();
    case 2:
      if (lookahead == ' ') ADVANCE(21);
      END_STATE();
    case 3:
      if (lookahead == ' ') ADVANCE(16);
      if (lookahead == '#') ADVANCE(4);
      END_STATE();
    case 4:
      if (lookahead == ' ') ADVANCE(17);
      if (lookahead == '#') ADVANCE(5);
      END_STATE();
    case 5:
      if (lookahead == ' ') ADVANCE(18);
      if (lookahead == '#') ADVANCE(6);
      END_STATE();
    case 6:
      if (lookahead == ' ') ADVANCE(19);
      if (lookahead == '#') ADVANCE(7);
      END_STATE();
    case 7:
      if (lookahead == ' ') ADVANCE(20);
      END_STATE();
    case 8:
      if (lookahead == '*') ADVANCE(26);
      END_STATE();
    case 9:
      if (lookahead == '*') ADVANCE(10);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(9)
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(27);
      END_STATE();
    case 10:
      if (lookahead == '*') ADVANCE(24);
      END_STATE();
    case 11:
      if (lookahead == '*') ADVANCE(22);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(11)
      END_STATE();
    case 12:
      if (lookahead == '*') ADVANCE(13);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(12)
      END_STATE();
    case 13:
      if (lookahead == '*') ADVANCE(8);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_POUND);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_POUND_POUND);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND_POUND);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_POUND_POUND_POUND_POUND_POUND_POUND);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_DASH);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_STAR);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_STAR);
      if (lookahead == '*') ADVANCE(25);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_STAR_STAR);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_STAR_STAR);
      if (lookahead == '*') ADVANCE(26);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_STAR_STAR_STAR);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(sym_text);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(27);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(sym_line_end);
      if (lookahead == '\n') ADVANCE(28);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 0},
  [16] = {.lex_state = 0},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 0},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 9},
  [30] = {.lex_state = 9},
  [31] = {.lex_state = 12},
  [32] = {.lex_state = 11},
  [33] = {.lex_state = 9},
  [34] = {.lex_state = 0},
  [35] = {.lex_state = 9},
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
    [anon_sym_STAR] = ACTIONS(1),
    [anon_sym_STAR_STAR] = ACTIONS(1),
    [anon_sym_STAR_STAR_STAR] = ACTIONS(1),
    [sym_text] = ACTIONS(1),
    [sym_line_end] = ACTIONS(1),
  },
  [1] = {
    [sym_document] = STATE(34),
    [sym_heading] = STATE(3),
    [sym_heading1] = STATE(14),
    [sym_heading2] = STATE(14),
    [sym_heading3] = STATE(14),
    [sym_heading4] = STATE(14),
    [sym_heading5] = STATE(14),
    [sym_heading6] = STATE(14),
    [sym_unordered_list] = STATE(3),
    [sym_unordered_list_item] = STATE(5),
    [sym_text_line] = STATE(3),
    [sym_inline_element] = STATE(23),
    [sym_italic_text] = STATE(25),
    [sym_bolded_text] = STATE(25),
    [sym_bolded_italic_text] = STATE(25),
    [aux_sym_document_repeat1] = STATE(3),
    [aux_sym_unordered_list_repeat1] = STATE(5),
    [aux_sym_text_line_repeat1] = STATE(23),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_POUND] = ACTIONS(5),
    [anon_sym_POUND_POUND] = ACTIONS(7),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(9),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(11),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(13),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(15),
    [anon_sym_DASH] = ACTIONS(17),
    [anon_sym_STAR] = ACTIONS(19),
    [anon_sym_STAR_STAR] = ACTIONS(21),
    [anon_sym_STAR_STAR_STAR] = ACTIONS(23),
    [sym_text] = ACTIONS(25),
    [sym_line_end] = ACTIONS(27),
  },
  [2] = {
    [sym_heading] = STATE(2),
    [sym_heading1] = STATE(14),
    [sym_heading2] = STATE(14),
    [sym_heading3] = STATE(14),
    [sym_heading4] = STATE(14),
    [sym_heading5] = STATE(14),
    [sym_heading6] = STATE(14),
    [sym_unordered_list] = STATE(2),
    [sym_unordered_list_item] = STATE(5),
    [sym_text_line] = STATE(2),
    [sym_inline_element] = STATE(23),
    [sym_italic_text] = STATE(25),
    [sym_bolded_text] = STATE(25),
    [sym_bolded_italic_text] = STATE(25),
    [aux_sym_document_repeat1] = STATE(2),
    [aux_sym_unordered_list_repeat1] = STATE(5),
    [aux_sym_text_line_repeat1] = STATE(23),
    [ts_builtin_sym_end] = ACTIONS(29),
    [anon_sym_POUND] = ACTIONS(31),
    [anon_sym_POUND_POUND] = ACTIONS(34),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(37),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(40),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(43),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(46),
    [anon_sym_DASH] = ACTIONS(49),
    [anon_sym_STAR] = ACTIONS(52),
    [anon_sym_STAR_STAR] = ACTIONS(55),
    [anon_sym_STAR_STAR_STAR] = ACTIONS(58),
    [sym_text] = ACTIONS(61),
    [sym_line_end] = ACTIONS(64),
  },
  [3] = {
    [sym_heading] = STATE(2),
    [sym_heading1] = STATE(14),
    [sym_heading2] = STATE(14),
    [sym_heading3] = STATE(14),
    [sym_heading4] = STATE(14),
    [sym_heading5] = STATE(14),
    [sym_heading6] = STATE(14),
    [sym_unordered_list] = STATE(2),
    [sym_unordered_list_item] = STATE(5),
    [sym_text_line] = STATE(2),
    [sym_inline_element] = STATE(23),
    [sym_italic_text] = STATE(25),
    [sym_bolded_text] = STATE(25),
    [sym_bolded_italic_text] = STATE(25),
    [aux_sym_document_repeat1] = STATE(2),
    [aux_sym_unordered_list_repeat1] = STATE(5),
    [aux_sym_text_line_repeat1] = STATE(23),
    [ts_builtin_sym_end] = ACTIONS(67),
    [anon_sym_POUND] = ACTIONS(5),
    [anon_sym_POUND_POUND] = ACTIONS(7),
    [anon_sym_POUND_POUND_POUND] = ACTIONS(9),
    [anon_sym_POUND_POUND_POUND_POUND] = ACTIONS(11),
    [anon_sym_POUND_POUND_POUND_POUND_POUND] = ACTIONS(13),
    [anon_sym_POUND_POUND_POUND_POUND_POUND_POUND] = ACTIONS(15),
    [anon_sym_DASH] = ACTIONS(17),
    [anon_sym_STAR] = ACTIONS(19),
    [anon_sym_STAR_STAR] = ACTIONS(21),
    [anon_sym_STAR_STAR_STAR] = ACTIONS(23),
    [sym_text] = ACTIONS(25),
    [sym_line_end] = ACTIONS(27),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 4,
    ACTIONS(73), 1,
      anon_sym_DASH,
    ACTIONS(69), 2,
      ts_builtin_sym_end,
      sym_line_end,
    STATE(4), 2,
      sym_unordered_list_item,
      aux_sym_unordered_list_repeat1,
    ACTIONS(71), 10,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [24] = 4,
    ACTIONS(17), 1,
      anon_sym_DASH,
    ACTIONS(76), 2,
      ts_builtin_sym_end,
      sym_line_end,
    STATE(4), 2,
      sym_unordered_list_item,
      aux_sym_unordered_list_repeat1,
    ACTIONS(78), 10,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [48] = 2,
    ACTIONS(80), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(82), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [66] = 2,
    ACTIONS(84), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(86), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [84] = 2,
    ACTIONS(88), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(90), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [102] = 2,
    ACTIONS(92), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(94), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [120] = 2,
    ACTIONS(96), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(98), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [138] = 2,
    ACTIONS(100), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(102), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [156] = 2,
    ACTIONS(104), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(106), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [174] = 2,
    ACTIONS(108), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(110), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [192] = 2,
    ACTIONS(112), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(114), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [210] = 2,
    ACTIONS(116), 2,
      ts_builtin_sym_end,
      sym_line_end,
    ACTIONS(118), 11,
      anon_sym_POUND,
      anon_sym_POUND_POUND,
      anon_sym_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND,
      anon_sym_POUND_POUND_POUND_POUND_POUND_POUND,
      anon_sym_DASH,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [228] = 8,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(25), 1,
      sym_text,
    ACTIONS(27), 1,
      sym_line_end,
    STATE(15), 1,
      sym_text_line,
    STATE(23), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [256] = 8,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(25), 1,
      sym_text,
    ACTIONS(27), 1,
      sym_line_end,
    STATE(7), 1,
      sym_text_line,
    STATE(23), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [284] = 8,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(25), 1,
      sym_text,
    ACTIONS(27), 1,
      sym_line_end,
    STATE(11), 1,
      sym_text_line,
    STATE(23), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [312] = 8,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(25), 1,
      sym_text,
    ACTIONS(27), 1,
      sym_line_end,
    STATE(9), 1,
      sym_text_line,
    STATE(23), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [340] = 8,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(25), 1,
      sym_text,
    ACTIONS(27), 1,
      sym_line_end,
    STATE(6), 1,
      sym_text_line,
    STATE(23), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [368] = 8,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(25), 1,
      sym_text,
    ACTIONS(27), 1,
      sym_line_end,
    STATE(13), 1,
      sym_text_line,
    STATE(23), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [396] = 8,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(25), 1,
      sym_text,
    ACTIONS(27), 1,
      sym_line_end,
    STATE(10), 1,
      sym_text_line,
    STATE(23), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [424] = 7,
    ACTIONS(19), 1,
      anon_sym_STAR,
    ACTIONS(21), 1,
      anon_sym_STAR_STAR,
    ACTIONS(23), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(120), 1,
      sym_text,
    ACTIONS(122), 1,
      sym_line_end,
    STATE(24), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [449] = 7,
    ACTIONS(124), 1,
      anon_sym_STAR,
    ACTIONS(127), 1,
      anon_sym_STAR_STAR,
    ACTIONS(130), 1,
      anon_sym_STAR_STAR_STAR,
    ACTIONS(133), 1,
      sym_text,
    ACTIONS(136), 1,
      sym_line_end,
    STATE(24), 2,
      sym_inline_element,
      aux_sym_text_line_repeat1,
    STATE(25), 3,
      sym_italic_text,
      sym_bolded_text,
      sym_bolded_italic_text,
  [474] = 2,
    ACTIONS(140), 1,
      sym_line_end,
    ACTIONS(138), 4,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [484] = 2,
    ACTIONS(144), 1,
      sym_line_end,
    ACTIONS(142), 4,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [494] = 2,
    ACTIONS(148), 1,
      sym_line_end,
    ACTIONS(146), 4,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [504] = 2,
    ACTIONS(152), 1,
      sym_line_end,
    ACTIONS(150), 4,
      anon_sym_STAR,
      anon_sym_STAR_STAR,
      anon_sym_STAR_STAR_STAR,
      sym_text,
  [514] = 1,
    ACTIONS(154), 1,
      sym_text,
  [518] = 1,
    ACTIONS(156), 1,
      anon_sym_STAR_STAR,
  [522] = 1,
    ACTIONS(158), 1,
      anon_sym_STAR_STAR_STAR,
  [526] = 1,
    ACTIONS(160), 1,
      anon_sym_STAR,
  [530] = 1,
    ACTIONS(162), 1,
      sym_text,
  [534] = 1,
    ACTIONS(164), 1,
      ts_builtin_sym_end,
  [538] = 1,
    ACTIONS(166), 1,
      sym_text,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(4)] = 0,
  [SMALL_STATE(5)] = 24,
  [SMALL_STATE(6)] = 48,
  [SMALL_STATE(7)] = 66,
  [SMALL_STATE(8)] = 84,
  [SMALL_STATE(9)] = 102,
  [SMALL_STATE(10)] = 120,
  [SMALL_STATE(11)] = 138,
  [SMALL_STATE(12)] = 156,
  [SMALL_STATE(13)] = 174,
  [SMALL_STATE(14)] = 192,
  [SMALL_STATE(15)] = 210,
  [SMALL_STATE(16)] = 228,
  [SMALL_STATE(17)] = 256,
  [SMALL_STATE(18)] = 284,
  [SMALL_STATE(19)] = 312,
  [SMALL_STATE(20)] = 340,
  [SMALL_STATE(21)] = 368,
  [SMALL_STATE(22)] = 396,
  [SMALL_STATE(23)] = 424,
  [SMALL_STATE(24)] = 449,
  [SMALL_STATE(25)] = 474,
  [SMALL_STATE(26)] = 484,
  [SMALL_STATE(27)] = 494,
  [SMALL_STATE(28)] = 504,
  [SMALL_STATE(29)] = 514,
  [SMALL_STATE(30)] = 518,
  [SMALL_STATE(31)] = 522,
  [SMALL_STATE(32)] = 526,
  [SMALL_STATE(33)] = 530,
  [SMALL_STATE(34)] = 534,
  [SMALL_STATE(35)] = 538,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_document, 0),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [7] = {.entry = {.count = 1, .reusable = false}}, SHIFT(21),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(17),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(18),
  [15] = {.entry = {.count = 1, .reusable = false}}, SHIFT(22),
  [17] = {.entry = {.count = 1, .reusable = false}}, SHIFT(19),
  [19] = {.entry = {.count = 1, .reusable = false}}, SHIFT(29),
  [21] = {.entry = {.count = 1, .reusable = false}}, SHIFT(33),
  [23] = {.entry = {.count = 1, .reusable = false}}, SHIFT(35),
  [25] = {.entry = {.count = 1, .reusable = false}}, SHIFT(23),
  [27] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [29] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_document_repeat1, 2),
  [31] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(16),
  [34] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(21),
  [37] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(20),
  [40] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(17),
  [43] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(18),
  [46] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(22),
  [49] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(19),
  [52] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(29),
  [55] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(33),
  [58] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(35),
  [61] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(23),
  [64] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_document_repeat1, 2), SHIFT_REPEAT(12),
  [67] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_document, 1),
  [69] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_unordered_list_repeat1, 2),
  [71] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_unordered_list_repeat1, 2),
  [73] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_unordered_list_repeat1, 2), SHIFT_REPEAT(19),
  [76] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unordered_list, 1),
  [78] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_unordered_list, 1),
  [80] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading3, 2),
  [82] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading3, 2),
  [84] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading4, 2),
  [86] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading4, 2),
  [88] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_text_line, 2),
  [90] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_text_line, 2),
  [92] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unordered_list_item, 2),
  [94] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_unordered_list_item, 2),
  [96] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading6, 2),
  [98] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading6, 2),
  [100] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading5, 2),
  [102] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading5, 2),
  [104] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_text_line, 1),
  [106] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_text_line, 1),
  [108] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading2, 2),
  [110] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading2, 2),
  [112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading, 1),
  [114] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading, 1),
  [116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_heading1, 2),
  [118] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_heading1, 2),
  [120] = {.entry = {.count = 1, .reusable = false}}, SHIFT(24),
  [122] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [124] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(29),
  [127] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(33),
  [130] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(35),
  [133] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_text_line_repeat1, 2), SHIFT_REPEAT(24),
  [136] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_text_line_repeat1, 2),
  [138] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_inline_element, 1),
  [140] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_inline_element, 1),
  [142] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_italic_text, 3),
  [144] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_italic_text, 3),
  [146] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bolded_text, 3),
  [148] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bolded_text, 3),
  [150] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bolded_italic_text, 3),
  [152] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bolded_italic_text, 3),
  [154] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [156] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [158] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [160] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [162] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [164] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [166] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
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
