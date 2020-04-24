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

export const EVENTS_TURN_SPACING = 3
export const PALADINS_STRENGTH_INCREASE = 1
export const PALADINS_INCREASE_SPACING = 4
export const PALADINS_CALL_TO_ARMS_TURN = 3
export const PALADINS_ATTACK_THRESHOLD = 3

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

export enum ResourceType {
  Meat = 'meat',
  Souls = 'souls',
  Bones = 'bones',
  Materials = 'materials',
}

export enum TurnPhase {
  Production,
  Event,
  Action,
  Upkeep,
}

export const TURN_PHASES_ORDER = [TurnPhase.Production, TurnPhase.Event, TurnPhase.Action, TurnPhase.Upkeep]

export const RAISABLE_UNDEADS = [UndeadType.Skeleton, UndeadType.LaMotte, UndeadType.BloodPrince]

export enum Spell {
  SoulStorm = 'soulStorm',
  TheKey = 'theKey',
}

export const DISCOVERABLE_SPELLS = [Spell.TheKey]

export const SPELLS_SOUL_COSTS = {
  [Spell.SoulStorm]: 3,
  [Spell.TheKey]: 2,
}

export const SOUL_STORM_DEFENSE_BONUS = 3
export const SOUL_STORM_LETHALITY_BONUS = 3

export const ONBOARDING_STEPS_COUNT = 12

export enum ExpeditionType {
  OldCoffin,
  MiseryMarket,
  TownHall,
  Bastion,
}

export enum EventType {
  CallToArms,
  PaladinsAssault,
  Collapsing,
  Plunder,
  Offering,
  StateOfEmergency,
}

export const RANDOM_EVENTS = [EventType.Collapsing, EventType.Plunder, EventType.Offering]
