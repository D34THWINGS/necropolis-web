let backgroundImageUrl: string = [%bs.raw
  {| require('../assets/images/background.jpg') |}
];

module Styles = {
  open Css;

  let appContainer =
    style([
      display(flexBox),
      alignItems(center),
      justifyContent(center),
      minHeight(vh(100.0)),
    ]);

  let gameContainer =
    style([
      display(flexBox),
      flexDirection(column),
      position(relative),
      width(vh(55.0)),
      maxWidth(rem(27.5)),
      height(vh(100.0)),
      maxHeight(rem(50.0)),
      backgroundImage(url(backgroundImageUrl)),
      backgroundPosition(center),
      backgroundSize(cover),
      backgroundRepeat(noRepeat),
    ]);

  let middleSection = style([flex(`num(1.0)), overflowY(auto)]);
};

[@react.component]
let make = () =>
  <div className=Styles.appContainer>
    <div className=Styles.gameContainer>
      <Header />
      <div className=Styles.middleSection>
        {switch (Routes.getCurrentRouteName()) {
         | Build => <Build />
         | _ => <div> {ReasonReact.string("404 Not found :(")} </div>
         }}
      </div>
      <Footer />
    </div>
  </div>;