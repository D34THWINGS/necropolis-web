export const CHARNEL_HOUSE_MEAT_PRODUCTION = [0, 3, 3, 5]
export const CHARNEL_HOUSE_BONES_PRODUCTION = [0, 0, 1, 1]
export const CHARNEL_HOUSE_PRODUCTION_TURNS = [0, 0, 3, 3]
export const CHARNEL_HOUSE_UPGRADE_COST = [0, 4, 1, 3]
export const CHARNEL_HOUSE_MAX_LEVEL = 3

export const SOUL_WELL_SOUL_PRODUCTION = [0, 1, 1, 2]
export const SOUL_WELL_UPGRADE_COST = [0, 3, 2, 3]
export const SOUL_WELL_MAX_LEVEL = 3

export const CATACOMBS_SOUL_COST = [0, 2, 2, 2]
export const CATACOMBS_MAX_UNDEAD = [0, 1, 2, 3]
export const CATACOMBS_UPGRADE_COST = [0, 2, 1, 1]
export const CATACOMBS_MAX_LEVEL = 3

export const OSSUARY_BONES_COST = [0, 3, 3, 3]
export const OSSUARY_UPGRADE_BONUS_MEAT = [0, 0, 3, 3]
export const OSSUARY_UPGRADE_BONUS_BONES = [0, 0, 3, 3]
export const OSSUARY_UPGRADE_COST = [0, 2, 2, 2]
export const OSSUARY_MAX_LEVEL = 3

export const BATTLEMENTS_DEFENSE_BONUS = [0, 3, 5, 7]
export const BATTLEMENTS_UPGRADE_COST = [0, 5, 3, 3]
export const BATTLEMENTS_MAX_LEVEL = 3

export enum UndeadType {
  Valet = 'valet',
  Brikoler = 'brikoler',
  LaMotte = 'laMotte',
  Skeleton = 'skeleton',
  BloodPrince = 'bloodPrince',
}

export enum UndeadTalent {
  Muscles = 'muscles',
  Lethality = 'lethality',
}

export enum BuildingType {
  CharnelHouse = 'charnelHouse',
  Ossuary = 'ossuary',
  Battlements = 'battlements',
  SoulWell = 'soulWell',
  Catacombs = 'catacombs',
}

export const enum ResourceType {
  Meat = 'meat',
  Souls = 'souls',
  Bones = 'bones',
  Materials = 'materials',
}
