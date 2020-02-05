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

  let middleSection =
    style([position(relative), flex(`num(1.0)), overflowY(auto)]);
};

[@react.component]
let make = () => {
  let isFullScreen = () =>
    switch (Routes.getCurrentRouteName()) {
    | Expeditions => true
    | _ => false
    };

  <div className=Styles.appContainer>
    <div className=Styles.gameContainer>
      <Header />
      <div className=Styles.middleSection>
        <SlideTransition animationKey={Routes.getCurrentRouteName()}>
          {switch (Routes.getCurrentRouteName()) {
           | Build => <Build />
           | Expeditions => <Expeditions />
           | _ => <div> {ReasonReact.string("404 Not found :(")} </div>
           }}
        </SlideTransition>
      </div>
      <Footer />
    </div>
  </div>;
};