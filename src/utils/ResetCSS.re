let resetCss = () => {
  Css.(global("html", [boxSizing(borderBox), fontSize(`percent(100.0))]));

  Css.(
    global(
      "*",
      [boxSizing(inherit_), fontFamily("inherit"), fontSize(inherit_)],
    )
  );

  Css.(global("a, button", [lineHeight(`abs(1.0))]));

  Css.(
    global(
      "body",
      [
        margin(zero),
        padding(zero),
        lineHeight(`abs(1.5)),
        fontFamily("Greywall, Arial, Helvetica, sans-serif"),
        fontStyle(normal),
        fontWeight(normal),
        fontSize(rem(1.0)),
        unsafe("-webkit-font-smoothing", "antialiased"),
        unsafe("-moz-osx-font-smoothing", "grayscale"),
        overflowX(hidden),
      ],
    )
  );
};
