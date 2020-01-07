module Styles = {
  open Css;

  let buildWrapper = style([padding2(~v=rem(0.), ~h=rem(2.))]);
};

[@react.component]
let make = () => {
  let t = I18n.useTranslation();
  <div className=Styles.buildWrapper>
    <Building
      title={t(I18nKeys.BuildCharnelHouseName)}
      level=0
      upgradeCost=1
      description={t(
        I18nKeys.BuildCharnelHouseDescription(
          <Titles.TextMedium inline=true color=Theme.Colors.red>
            {t(I18nKeys.FleshAmount(1))}
          </Titles.TextMedium>,
        ),
      )}
    />
    <Building
      title={t(I18nKeys.BuildCatacombName)}
      level=0
      upgradeCost=1
      description={t(
        I18nKeys.BuildCatacombDescription(
          <Titles.TextMedium inline=true color=Theme.Colors.purple>
            {t(I18nKeys.UndeadAmount(3))}
          </Titles.TextMedium>,
        ),
      )}
    />
    <Building
      title={t(I18nKeys.BuildSoulWellName)}
      level=0
      upgradeCost=1
      description={t(
        I18nKeys.BuildSoulWellDescription(
          <Titles.TextMedium inline=true color=Theme.Colors.cyan>
            {t(I18nKeys.SoulAmount(1))}
          </Titles.TextMedium>,
        ),
      )}
    />
    <Building
      title={t(I18nKeys.BuildOssuaryName)}
      level=0
      upgradeCost=1
      description={t(I18nKeys.BuildOssuaryDescription)}
    />
    <Building
      title={t(I18nKeys.BuildBattlementsName)}
      level=0
      upgradeCost=1
      description={t(
        I18nKeys.BuildBattlementsDescription(
          <Titles.TextMedium inline=true color=Theme.Colors.lime>
            {t(I18nKeys.DefenseBonus(4))}
          </Titles.TextMedium>,
        ),
      )}
    />
  </div>;
};