open Css;

module Colors = {
  let white = hex("ffffff");
  let black = hex("000000");
  let green = hex("41837c");
  let red = hex("fb5d46");
  let cyan = hex("80f4d2");
  let purple = hex("9a58fd");
  let blue = hex("12c1f4");
  let lime = hex("2bfd02");
};

module Shadows = {
  let textFlat = [
    Shadow.text(~x=px(-1), ~y=px(1), Colors.black),
    Shadow.text(~x=px(1), ~y=px(1), Colors.black),
    Shadow.text(~x=px(1), ~y=px(-1), Colors.black),
    Shadow.text(~x=px(-1), ~y=px(-1), Colors.black),
  ];
  let text = [
    Shadow.text(~y=px(3), ~blur=px(2), rgba(0, 0, 0, 0.8)),
    ...textFlat,
  ];
  let textSolid = [
    Shadow.text(~x=px(1), ~y=px(3), Colors.black),
    ...textFlat,
  ];
};