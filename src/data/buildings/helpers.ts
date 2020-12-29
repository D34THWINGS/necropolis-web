import { BuildingType, ResourceType } from '../../config/constants'
import { Secret } from './secrets'
import { makeUndeadPool, Undead } from '../undeads/helpers'

const CHARNEL_HOUSE_MEAT_PRODUCTION = [0, 3, 3, 5]

const SOUL_WELL_SOUL_PRODUCTION = [0, 2, 3, 4]

const CATACOMBS_SOUL_COST = [0, 3, 3, 3]

const OSSUARY_SECRETS_AMOUNT = [0, 2, 4, 4]

const ARSENAL_TRAPS_COUNT = [0, 3, 5, 7]

type BaseBuilding = { level: number; maxLevel: number; collapsed: boolean; upgradeCost: number }

type ProducingBuilding = { produces: { [K in ResourceType]?: number } }

const makeBaseBuilding = (level: number): BaseBuilding => ({
  collapsed: false,
  level,
  maxLevel: 3,
  upgradeCost: 1,
})

export type Ossuary = BaseBuilding & {
  type: BuildingType.Ossuary
  secrets: Secret[]
  secretsAmount: number
  reRollSecretsEvery: number
  bonesCostMultiplier: number
}
export const makeOssuary = (level = 0, secrets: Secret[] = []): Ossuary => ({
  ...makeBaseBuilding(level),
  type: BuildingType.Ossuary,
  secrets,
  secretsAmount: OSSUARY_SECRETS_AMOUNT[level],
  reRollSecretsEvery: 3,
  bonesCostMultiplier: level < 3 ? 1 : 0.5,
})
export const isOssuary = (building: Building): building is Ossuary => building.type === BuildingType.Ossuary

export type Catacombs = BaseBuilding & {
  type: BuildingType.Catacombs
  raiseUndeadSoulCost: number
  fortifyBonus: number
  undeadPool: Undead[]
}
export const makeCatacombs = (level = 0, undeadPool = makeUndeadPool()): Catacombs => ({
  ...makeBaseBuilding(level),
  type: BuildingType.Catacombs,
  raiseUndeadSoulCost: CATACOMBS_SOUL_COST[level],
  fortifyBonus: level < 3 ? 0 : 1,
  undeadPool,
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
      return makeOssuary(building.level + 1, (building as Ossuary).secrets) as T
    case BuildingType.SoulWell:
      return makeSoulWell(building.level + 1) as T
    case BuildingType.Catacombs:
      return makeCatacombs(building.level + 1, (building as Catacombs).undeadPool) as T
  }
}

export const isProducingBuilding = (building: unknown): building is ProducingBuilding =>
  !!(building as ProducingBuilding).produces

export const getProducingBuildings = (buildings: Building[]) =>
  buildings.filter(isProducingBuilding) as ProducingBuilding[]

export const isBuildingConstructed = (building: Building) => building.level > 0

export const isBuildingFullyUpgraded = (building: Building) => building.level === building.maxLevel
