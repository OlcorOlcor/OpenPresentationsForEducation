class Preprocessor {
  private readonly slideDiv: string = '<div class="Slide">';
  private readonly regex: string = "/# ?Slide/";
  start(src: string): number {
    return src.match(this.regex)?.index;
  }
  handleSlides(code: string): string {
    //begin first slide
    code = this.slideDiv + code;
    //replace slides
    code = code.replace(/^# ?Slide$/g, "</div>" + this.slideDiv);
    //end last slide
    code += "</div>";
    return code;
  }

  lexInline(src: string, tokens: Token[]): void {}
}
