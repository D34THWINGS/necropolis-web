let helpButtonBackgroundUrl: string = [%bs.raw
  {| require('../../assets/images/help-button.png') |}
];

let upgradeButtonBackgroundUrl: string = [%bs.raw
  {| require('../../assets/images/upgrade-button.png') |}
];

module Styles = {
  open Css;

  let buildingRow = style([display(flexBox), alignItems(center)]);

  let buildingPanel = style([flex(`num(1.))]);

  let buildingHeader =
    style([
      display(flexBox),
      alignItems(center),
      justifyContent(spaceBetween),
    ]);

  let helpButton =
    Cn.make([
      HelperClasses.resetButton,
      style([
        position(absolute),
        bottom(zero),
        right(zero),
        width(rem(3.)),
        height(rem(3.)),
        transform(translate(`percent(50.), `percent(50.))),
        backgroundImage(url(helpButtonBackgroundUrl)),
        backgroundPosition(center),
        backgroundSize(cover),
      ]),
    ]);

  let buildingDescription = style([paddingRight(rem(1.5))]);
};

[@react.component]
let make = (~title, ~description, ~level, ~upgradeCost) => {
  let t = I18n.useTranslation();
  <div className=Styles.buildingRow>
    <Panel className=Styles.buildingPanel>
      <div className=Styles.buildingHeader>
        <Titles.H4 color=Theme.Colors.cyan marginBottom=0.2> title </Titles.H4>
        <Titles.H4 color=Theme.Colors.white marginBottom=0.2>
          {t(I18nKeys.BuilingLevel(level))}
        </Titles.H4>
      </div>
      <div className=Styles.buildingDescription>
        <Titles.TextMedium inline=true color=Theme.Colors.white>
          description
        </Titles.TextMedium>
      </div>
      <button className=Styles.helpButton>
        <Typography variant=Typography.H3 color=Theme.Colors.white>
          {React.string("?")}
        </Typography>
      </button>
    </Panel>
    <UpgradeButton cost=upgradeCost />
  </div>;
};