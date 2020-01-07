let skullImageUrl: string = [%bs.raw
  {| require('../../assets/images/skull.png') |}
];

module Styles = {
  open Css;

  let counter =
    style([
      display(flexBox),
      alignItems(center),
      justifyContent(center),
      marginLeft(rem(0.5)),
      paddingTop(rem(1.0)),
      flexGrow(0.0),
      flexShrink(0.0),
      flexBasis(auto),
      width(rem(6.0)),
      height(rem(8.0)),
      color(Theme.Colors.white),
      backgroundImage(url(skullImageUrl)),
      backgroundPosition(center),
      backgroundSize(cover),
      fontSize(rem(1.8)),
      textShadows(Theme.Shadows.text),
    ]);
};

[@react.component]
let make = (~value=0) =>
  <div className=Styles.counter>
    {ReasonReact.string(Belt.Int.toString(value))}
  </div>;