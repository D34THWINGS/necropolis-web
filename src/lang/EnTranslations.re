let getKey = key =>
  switch (key) {
  | I18nKeys.FleshAmount(value) =>
    React.string(
      Js.Int.toString(value)
      ++ (
        switch (value) {
        | 1 => " flesh morsel"
        | _ => " flesh morsels"
        }
      ),
    )
  | I18nKeys.UndeadAmount(value) =>
    React.string(
      Js.Int.toString(value)
      ++ (
        switch (value) {
        | 1 => " undead"
        | _ => " undeads"
        }
      ),
    )
  | I18nKeys.SoulAmount(value) =>
    React.string(
      Js.Int.toString(value)
      ++ (
        switch (value) {
        | 1 => " soul"
        | _ => " souls"
        }
      ),
    )
  | I18nKeys.DefenseBonus(value) =>
    React.string(Js.Int.toString(value) ++ " bonus defense")
  | I18nKeys.BuilingLevel(value) =>
    React.string("lvl. " ++ Js.Int.toString(value))
  | I18nKeys.BuildCharnelHouseName => React.string("Charnel house")
  | I18nKeys.BuildCharnelHouseDescription(value) =>
    <> {React.string("- Produce ")} value {React.string(" per round.")} </>
  | I18nKeys.BuildCatacombName => React.string("Catacomb")
  | I18nKeys.BuildCatacombDescription(value) =>
    <>
      {React.string("- Hosts up to ")}
      value
      {React.string(".")}
      <br />
      {React.string("- Action: Reanimate a corpse.")}
    </>
  | I18nKeys.BuildSoulWellName => React.string("Soul well")
  | I18nKeys.BuildSoulWellDescription(value) =>
    <>
      {React.string("- Produces ")}
      value
      {React.string(" per round.")}
      <br />
      {React.string("- Action: Cast a spell.")}
    </>
  | I18nKeys.BuildOssuaryName => React.string("Ossuary")
  | I18nKeys.BuildOssuaryDescription =>
    React.string("- Action: Discover a new spell.")
  | I18nKeys.BuildBattlementsName => React.string("Battlements")
  | I18nKeys.BuildBattlementsDescription(value) =>
    <>
      {React.string("- Grants ")}
      value
      {React.string(" against paladin assaults.")}
    </>
  };