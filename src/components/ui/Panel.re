let panelBorderUrl: string = [%bs.raw
  {| require('../../assets/images/panel.png') |}
];

module Styles = {
  open Css;

  let panel =
    style([
      position(relative),
      margin2(~v=rem(0.5), ~h=zero),
      border(px(15), solid, transparent),
      unsafe("border-image", "url(" ++ panelBorderUrl ++ ") 70 round"),
    ]);

  let panelInner =
    style([
      backgroundColor(Theme.Colors.green),
      margin(rem(-0.2)),
      padding3(~top=zero, ~h=zero, ~bottom=rem(0.3)),
    ]);
};

[@react.component]
let make = (~children, ~className="") =>
  <div className={Cn.make([Styles.panel, className])}>
    <div className=Styles.panelInner> children </div>
  </div>;