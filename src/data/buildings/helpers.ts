import {
  ARSENAL_MAX_LEVEL,
  ARSENAL_TRAPS_COUNT,
  ARSENAL_UPGRADE_COST,
  BuildingType,
  CATACOMBS_MAX_LEVEL,
  CATACOMBS_MAX_UNDEAD,
  CATACOMBS_SOUL_COST,
  CATACOMBS_UPGRADE_COST,
  CHARNEL_HOUSE_BONES_PRODUCTION,
  CHARNEL_HOUSE_MAX_LEVEL,
  CHARNEL_HOUSE_MEAT_PRODUCTION,
  CHARNEL_HOUSE_PRODUCTION_TURNS,
  CHARNEL_HOUSE_UPGRADE_COST,
  OSSUARY_BONES_COST,
  OSSUARY_MAX_LEVEL,
  OSSUARY_UPGRADE_BONUS_BONES,
  OSSUARY_UPGRADE_BONUS_MEAT,
  OSSUARY_UPGRADE_COST,
  SOUL_WELL_MAX_LEVEL,
  SOUL_WELL_SOUL_PRODUCTION,
  SOUL_WELL_UPGRADE_COST,
} from '../../config/constants'

const assertUnhandledBuilding = (type: never) => {
  throw new Error(`Unknown building ${type}`)
}

export const getBuildingUpgradeCost = (type: BuildingType, level: number) => {
  switch (type) {
    case BuildingType.CharnelHouse:
      return CHARNEL_HOUSE_UPGRADE_COST[level]
    case BuildingType.Catacombs:
      return CATACOMBS_UPGRADE_COST[level]
    case BuildingType.SoulWell:
      return SOUL_WELL_UPGRADE_COST[level]
    case BuildingType.Ossuary:
      return OSSUARY_UPGRADE_COST[level]
    case BuildingType.Arsenal:
      return ARSENAL_UPGRADE_COST[level]
    default:
      return assertUnhandledBuilding(type)
  }
}

export const getBuildingMaxLevel = (type: BuildingType) => {
  switch (type) {
    case BuildingType.CharnelHouse:
      return CHARNEL_HOUSE_MAX_LEVEL
    case BuildingType.Catacombs:
      return CATACOMBS_MAX_LEVEL
    case BuildingType.SoulWell:
      return SOUL_WELL_MAX_LEVEL
    case BuildingType.Ossuary:
      return OSSUARY_MAX_LEVEL
    case BuildingType.Arsenal:
      return ARSENAL_MAX_LEVEL
    default:
      return assertUnhandledBuilding(type)
  }
}

export const getArsenalTrapsCount = (level: number) => ARSENAL_TRAPS_COUNT[level]

export const getRaiseUndeadSoulCost = (level: number) => CATACOMBS_SOUL_COST[level]

export const getMaxUndeadRaising = (level: number) => CATACOMBS_MAX_UNDEAD[level]

export const getCharnelHouseMeatProduction = (level: number) => CHARNEL_HOUSE_MEAT_PRODUCTION[level]

export const getCharnelHouseBonesProduction = (level: number) => CHARNEL_HOUSE_BONES_PRODUCTION[level]

export const getCharnelHouseProductionTurns = (level: number) => CHARNEL_HOUSE_PRODUCTION_TURNS[level]

export const getOssuaryBonesCost = (level: number) => OSSUARY_BONES_COST[level]

export const getOssuaryUpgradeBonusMeat = (level: number) => OSSUARY_UPGRADE_BONUS_MEAT[level]

export const getOssuaryUpgradeBonusBones = (level: number) => OSSUARY_UPGRADE_BONUS_BONES[level]

export const getSoulWellSoulProduction = (level: number) => SOUL_WELL_SOUL_PRODUCTION[level]
