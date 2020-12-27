import {
  ARSENAL_TRAPS_COUNT,
  BuildingType,
  CATACOMBS_MAX_UNDEAD,
  CATACOMBS_SOUL_COST,
  CHARNEL_HOUSE_MEAT_PRODUCTION,
  ResourceType,
  SOUL_WELL_SOUL_PRODUCTION,
} from '../../config/constants'

type BaseBuilding = { level: number; maxLevel: number; collapsed: boolean; upgradeCost: number }

type ProducingBuilding = { produces: { [K in ResourceType]?: number } }

const makeBaseBuilding = (level: number): BaseBuilding => ({
  collapsed: false,
  level,
  maxLevel: 3,
  upgradeCost: 1,
})

export type Ossuary = BaseBuilding & { type: BuildingType.Ossuary }
export const makeOssuary = (level = 0): Ossuary => ({
  ...makeBaseBuilding(level),
  type: BuildingType.Ossuary,
})
export const isOssuary = (building: Building): building is Ossuary => building.type === BuildingType.Ossuary

export type Catacombs = BaseBuilding & {
  type: BuildingType.Catacombs
  raiseUndeadSoulCost: number
  maxRaisedUndead: number
}
export const makeCatacombs = (level = 0): Catacombs => ({
  ...makeBaseBuilding(level),
  type: BuildingType.Catacombs,
  raiseUndeadSoulCost: CATACOMBS_SOUL_COST[level],
  maxRaisedUndead: CATACOMBS_MAX_UNDEAD[level],
})
export const isCatacombs = (building: Building): building is Catacombs => building.type === BuildingType.Catacombs

export type Arsenal = BaseBuilding & { type: BuildingType.Arsenal; trapsPerAssault: number }
export const makeArsenal = (level = 0): Arsenal => ({
  ...makeBaseBuilding(level),
  type: BuildingType.Arsenal,
  trapsPerAssault: ARSENAL_TRAPS_COUNT[level],
})
export const isArsenal = (building: Building): building is Arsenal => building.type === BuildingType.Arsenal

export type SoulWell = BaseBuilding & ProducingBuilding & { type: BuildingType.SoulWell }
export const makeSoulWell = (level = 0): SoulWell => ({
  ...makeBaseBuilding(level),
  type: BuildingType.SoulWell,
  produces: { [ResourceType.Souls]: SOUL_WELL_SOUL_PRODUCTION[level] ?? 0 },
})
export const isSoulWell = (building: Building): building is SoulWell => building.type === BuildingType.SoulWell

export type CharnelHouse = BaseBuilding & ProducingBuilding & { type: BuildingType.CharnelHouse }
export const makeCharnelHouse = (level = 0): CharnelHouse => ({
  ...makeBaseBuilding(level),
  type: BuildingType.CharnelHouse,
  produces: { [ResourceType.Meat]: CHARNEL_HOUSE_MEAT_PRODUCTION[level] ?? 0 },
})
export const isCharnelHouse = (building: Building): building is CharnelHouse =>
  building.type === BuildingType.CharnelHouse

export type Building = Ossuary | Catacombs | Arsenal | SoulWell | CharnelHouse

export const makeInitialBuildings = () => [
  makeCharnelHouse(),
  makeSoulWell(),
  makeCatacombs(),
  makeOssuary(),
  makeArsenal(),
]

export const makeUpgradedBuilding = <T extends Building>(building: T): T => {
  switch (building.type) {
    case BuildingType.Arsenal:
      return makeArsenal(building.level + 1) as T
    case BuildingType.CharnelHouse:
      return makeCharnelHouse(building.level + 1) as T
    case BuildingType.Ossuary:
      return makeOssuary(building.level + 1) as T
    case BuildingType.SoulWell:
      return makeSoulWell(building.level + 1) as T
    case BuildingType.Catacombs:
      return makeCatacombs(building.level + 1) as T
  }
}

export const isProducingBuilding = (building: unknown): building is ProducingBuilding =>
  !!(building as ProducingBuilding).produces

export const getProducingBuildings = (buildings: Building[]) =>
  buildings.filter(isProducingBuilding) as ProducingBuilding[]

export const isBuildingConstructed = (building: Building) => building.level > 0

export const isBuildingFullyUpgraded = (building: Building) => building.level === building.maxLevel
