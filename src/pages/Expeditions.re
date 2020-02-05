let mapBackgroundUrl: string = [%bs.raw
  {| require('../assets/images/old-map.jpg') |}
];

module Styles = {
  open Css;

  let expeditionsWrapper =
    style([
      height(`percent(100.)),
      backgroundImage(url(mapBackgroundUrl)),
      backgroundSize(cover),
      backgroundPosition(center),
    ]);
};

[@react.component]
let make = () => {
  <div className=Styles.expeditionsWrapper>
    {ReasonReact.string("Foo")}
  </div>;
};