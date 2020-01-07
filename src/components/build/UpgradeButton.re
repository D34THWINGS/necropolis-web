let upgradeButtonBackgroundUrl: string = [%bs.raw
  {| require('../../assets/images/upgrade-button.png') |}
];

let upgradeButtonArrowUrl: string = [%bs.raw
  {| require('../../assets/images/upgrade-arrow.png') |}
];

let resourcesImageUrl: string = [%bs.raw
  {| require('../../assets/images/resources.png') |}
];

module Styles = {
  open Css;

  let upgradeButtonOuter =
    Cn.make([
      HelperClasses.resetButton,
      style([
        border(px(15), solid, transparent),
        unsafe(
          "border-image",
          "url(" ++ upgradeButtonBackgroundUrl ++ ") 100 round",
        ),
        marginLeft(rem(0.1)),
      ]),
    ]);

  let upgradeButtonInner =
    style([
      display(flexBox),
      alignItems(center),
      background(
        linearGradient(
          deg(180.),
          [(zero, hex("d0ffc0")), (rem(1.), hex("9af480"))],
        ),
      ),
    ]);

  let upgradeCost =
    style([
      display(flexBox),
      alignItems(center),
      justifyContent(flexEnd),
      marginLeft(rem(-0.6)),
      paddingRight(rem(0.6)),
      width(rem(3.3)),
      height(rem(2.5)),
      backgroundImage(url(resourcesImageUrl)),
      backgroundSize(contain),
      backgroundPosition(center),
      backgroundRepeat(noRepeat),
    ]);

  let upgradeArrow =
    style([marginRight(rem(-0.5)), width(rem(1.5)), height(rem(1.5))]);
};

[@react.component]
let make = (~cost) => {
  <button className=Styles.upgradeButtonOuter>
    <span className=Styles.upgradeButtonInner>
      <span className=Styles.upgradeCost>
        <Typography color=Theme.Colors.white shadow=Theme.Shadows.textFlat>
          {React.string(Js.Int.toString(cost))}
        </Typography>
      </span>
      <img src=upgradeButtonArrowUrl className=Styles.upgradeArrow />
    </span>
  </button>;
};