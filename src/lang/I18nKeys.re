type keys =
  | FleshAmount(int)
  | UndeadAmount(int)
  | SoulAmount(int)
  | DefenseBonus(int)
  | BuilingLevel(int)
  | BuildCharnelHouseName
  | BuildCharnelHouseDescription(React.element)
  | BuildCatacombName
  | BuildCatacombDescription(React.element)
  | BuildSoulWellName
  | BuildSoulWellDescription(React.element)
  | BuildOssuaryName
  | BuildOssuaryDescription
  | BuildBattlementsName
  | BuildBattlementsDescription(React.element);