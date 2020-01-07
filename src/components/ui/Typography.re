type typographyVariant =
  | H1
  | H2
  | H3
  | H4
  | TextSmall
  | TextMedium
  | TextBig;

let getTypographySize = variant =>
  switch (variant) {
  | H1 => 1.8
  | H2 => 1.6
  | H3 => 1.4
  | H4 => 1.2
  | TextBig => 1.
  | TextMedium => 0.9
  | TextSmall => 0.8
  };

let getTypographyWeight = variant =>
  switch (variant) {
  | H1 => Css.bold
  | H2 => Css.bold
  | H3 => Css.bold
  | H4 => Css.bold
  | _ => Css.normal
  };

module Styles = {
  open Css;

  let typographyBase = variant =>
    style([
      fontSize(rem(getTypographySize(variant))),
      fontWeight(getTypographyWeight(variant)),
      lineHeight(`abs(1.4)),
    ]);

  let typographyInlineBlock = style([display(inline)]);

  let typographyShadow = shadow =>
    switch (shadow) {
    | Some(value) => style([textShadows(value)])
    | None => style([textShadows(Theme.Shadows.textSolid)])
    };

  let typographyColor = color =>
    switch (color) {
    | Some(value) => Some(style([Css.color(value)]))
    | None => None
    };

  let typographyMargin = margin =>
    switch (margin) {
    | Some(value) => Some(style([Css.marginBottom(rem(value))]))
    | None => None
    };
};

[@react.component]
let make =
    (
      ~children,
      ~inline=false,
      ~shadow=?,
      ~variant=TextMedium,
      ~color=?,
      ~marginBottom=?,
    ) =>
  <div
    className={Cn.make([
      Styles.typographyBase(variant),
      Styles.typographyInlineBlock->Cn.ifTrue(inline),
      Styles.typographyShadow(shadow),
      Styles.typographyColor(color)->Cn.unpack,
      Styles.typographyMargin(marginBottom)->Cn.unpack,
    ])}>
    children
  </div>;