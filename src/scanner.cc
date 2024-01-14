#include <tree_sitter/parser.h>
#include <cstdio>

enum TokenType {
    NEW_LINE,
    FILE_END
};

struct Scanner {
    bool recovering(const bool *valid_symbols) {
        return valid_symbols[FILE_END] && valid_symbols[NEW_LINE];
    }
    
    bool scan(TSLexer *lexer, const bool *valid_symbols) {
        if (recovering(valid_symbols)) {
            return false;
        }
        
        if (lexer->eof(lexer)) {
            lexer->result_symbol = FILE_END;
            return true;
        } 

        if (valid_symbols[NEW_LINE] && lexer->lookahead == '\n') {
            lexer->mark_end(lexer);
            lexer->result_symbol = NEW_LINE;
            lexer->advance(lexer, false);
            return true;
        }
    
        return false;
    }
};


extern "C" {
    void * tree_sitter_markdown_slides_external_scanner_create() {
        return new Scanner();
    }

    void tree_sitter_markdown_slides_external_scanner_destroy(void *payload) {
        delete static_cast<Scanner*>(payload);
    }

    unsigned tree_sitter_markdown_slides_external_scanner_serialize(void *payload, char *buffer) {
        return 0;
    }

    void tree_sitter_markdown_slides_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
        return;
    }

    bool tree_sitter_markdown_slides_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
        Scanner* scanner = static_cast<Scanner*>(payload);
        scanner->scan(lexer, valid_symbols);
    }
}