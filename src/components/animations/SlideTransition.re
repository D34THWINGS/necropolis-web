module Styles = {
  open Css;

  let slideBase = style([height(`percent(100.))]);
  let slideIn = style([transform(translateX(`percent(100.)))]);
  let slideEntering =
    style([
      position(absolute),
      top(zero),
      width(`percent(100.)),
      transition(~duration=400, "transform"),
    ]);
  let slideOut =
    style([
      transform(translateX(`percent(-100.))),
      transition(~duration=400, "transform"),
    ]);
};

[@react.component]
let make = (~animationKey, ~children) => {
  <Transition
    animationKey
    render={(elem, state) =>
      <div
        className={Cn.make([
          Styles.slideBase,
          switch (state) {
          | Transition.In => Cn.make([Styles.slideIn, Styles.slideEntering])
          | Transition.Entering => Styles.slideEntering
          | Transition.Out => Styles.slideOut
          | Transition.Idle => ""
          },
        ])}>
        elem
      </div>
    }>
    children
  </Transition>;
};