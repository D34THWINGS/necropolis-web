let bonesImageUrl: string = [%bs.raw
  {| require('../../assets/images/bones.png') |}
];
let resourcesImageUrl: string = [%bs.raw
  {| require('../../assets/images/resources.png') |}
];
let meatImageUrl: string = [%bs.raw
  {| require('../../assets/images/meat.png') |}
];
let soulsImageUrl: string = [%bs.raw
  {| require('../../assets/images/souls.png') |}
];
let settingsImageUrl: string = [%bs.raw
  {| require('../../assets/images/settings.png') |}
];
let spellImageUrl: string = [%bs.raw
  {| require('../../assets/images/spell.png') |}
];

module Styles = {
  open Css;

  let headerContainer = style([display(flexBox), alignItems(center)]);

  let countersWrapper =
    style([
      display(flexBox),
      flexWrap(wrap),
      alignItems(center),
      marginLeft(rem(0.5)),
    ]);

  let counter = image =>
    Cn.make([
      style([backgroundImage(url(image))]),
      style([
        marginRight(rem(0.8)),
        padding2(~v=rem(0.8), ~h=rem(1.0)),
        width(rem(5.0)),
        height(rem(3.0)),
        flexGrow(0.0),
        flexShrink(0.0),
        flexBasis(auto),
        backgroundSize(cover),
        backgroundPosition(center),
        textAlign(`right),
        color(Theme.Colors.white),
        textShadows(Theme.Shadows.text),
      ]),
    ]);

  let headerButton = image =>
    Cn.make([
      HelperClasses.resetButton,
      style([backgroundImage(url(image))]),
      style([
        marginLeft(rem(3.0)),
        flexGrow(0.0),
        flexShrink(0.0),
        flexBasis(auto),
        width(rem(3.5)),
        height(rem(3.5)),
        backgroundSize(cover),
        backgroundPosition(center),
      ]),
    ]);
};

[@react.component]
let make = () =>
  <div className=Styles.headerContainer>
    <SkullCounter value=4 />
    <div className=Styles.countersWrapper>
      <div className={Styles.counter(resourcesImageUrl)}>
        {ReasonReact.string("8")}
      </div>
      <div className={Styles.counter(meatImageUrl)}>
        {ReasonReact.string("4")}
      </div>
      <button className={Styles.headerButton(settingsImageUrl)} />
      <div className={Styles.counter(soulsImageUrl)}>
        {ReasonReact.string("6")}
      </div>
      <div className={Styles.counter(bonesImageUrl)}>
        {ReasonReact.string("3")}
      </div>
      <button className={Styles.headerButton(spellImageUrl)} />
    </div>
  </div>;