let buttonBackgroundUrl: string = [%bs.raw
  {| require('../../assets/images/footer/button.png') |}
];
let buildIconUrl: string = [%bs.raw
  {| require('../../assets/images/footer/build.png') |}
];
let expeditionsIconUrl: string = [%bs.raw
  {| require('../../assets/images/footer/expeditions.png') |}
];
let researchIconUrl: string = [%bs.raw
  {| require('../../assets/images/footer/research.png') |}
];
let spellsIconUrl: string = [%bs.raw
  {| require('../../assets/images/footer/spells.png') |}
];

module Styles = {
  open Css;

  let footerContainer =
    style([
      display(flexBox),
      alignItems(center),
      justifyContent(spaceBetween),
      padding2(~v=rem(0.5), ~h=rem(1.)),
    ]);

  let footerButton =
    style([
      display(flexBox),
      alignItems(center),
      justifyContent(center),
      backgroundImage(url(buttonBackgroundUrl)),
      backgroundPosition(center),
      backgroundSize(cover),
      cursor(`pointer),
    ]);

  let footerButtonIcon = iconUrl =>
    Cn.make([
      style([backgroundImage(url(iconUrl))]),
      style([
        display(block),
        margin3(~top=rem(0.8), ~h=rem(1.3), ~bottom=rem(1.8)),
        width(rem(3.4)),
        height(rem(3.4)),
        backgroundPosition(center),
        backgroundSize(contain),
        backgroundRepeat(noRepeat),
        ...CustomStyles.flexAuto,
      ]),
    ]);
};

[@react.component]
let make = () =>
  <div className=Styles.footerContainer>
    <Link name=Routes.Build className=Styles.footerButton>
      <span className={Styles.footerButtonIcon(buildIconUrl)} />
    </Link>
    <Link name=Routes.Expeditions className=Styles.footerButton>
      <span className={Styles.footerButtonIcon(expeditionsIconUrl)} />
    </Link>
    <Link name=Routes.Spells className=Styles.footerButton>
      <span className={Styles.footerButtonIcon(spellsIconUrl)} />
    </Link>
    <Link name=Routes.Research className=Styles.footerButton>
      <span className={Styles.footerButtonIcon(researchIconUrl)} />
    </Link>
  </div>;