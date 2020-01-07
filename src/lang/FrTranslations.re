let getKey = key =>
  switch (key) {
  | I18nKeys.FleshAmount(value) =>
    React.string(Js.Int.toString(value) ++ " de chair")
  | I18nKeys.UndeadAmount(value) =>
    React.string(
      Js.Int.toString(value)
      ++ (
        switch (value) {
        | 1 => " mort-vivant"
        | _ => " mort-vivants"
        }
      ),
    )
  | I18nKeys.SoulAmount(value) =>
    React.string(
      Js.Int.toString(value)
      ++ (
        switch (value) {
        | 1 => " ame"
        | _ => " ames"
        }
      ),
    )
  | I18nKeys.DefenseBonus(value) =>
    React.string(Js.Int.toString(value) ++ " en defense")
  | I18nKeys.BuilingLevel(value) =>
    React.string("niv. " ++ Js.Int.toString(value))
  | I18nKeys.BuildCharnelHouseName => React.string("Charnier")
  | I18nKeys.BuildCharnelHouseDescription(value) =>
    <> {React.string("- Produit ")} value {React.string(" par tour.")} </>
  | I18nKeys.BuildCatacombName => React.string("Catacombes")
  | I18nKeys.BuildCatacombDescription(value) =>
    <>
      {React.string("- Abrite jusqu'a ")}
      value
      {React.string(".")}
      <br />
      {React.string("- Action: Reanimer un mort-vivant.")}
    </>
  | I18nKeys.BuildSoulWellName => React.string("Puit des ames")
  | I18nKeys.BuildSoulWellDescription(value) =>
    <>
      {React.string("- Produit ")}
      value
      {React.string(" par tour.")}
      <br />
      {React.string("- Action: Lancer un sort.")}
    </>
  | I18nKeys.BuildOssuaryName => React.string("Ossuaire")
  | I18nKeys.BuildOssuaryDescription =>
    React.string("- Action: Decouvrir un sort.")
  | I18nKeys.BuildBattlementsName => React.string("Remparts")
  | I18nKeys.BuildBattlementsDescription(value) =>
    <>
      {React.string("- Confere ")}
      value
      {React.string(" contre les attaques de paladins.")}
    </>
  };