export const INITIAL_MATERIALS = 0
export const INITIAL_MEAT = 8

export const EVENTS_TURN_SPACING = 3
export const PALADINS_STRENGTH_INCREASE = 1
export const PALADINS_INCREASE_SPACING = 3
export const PALADINS_CALL_TO_ARMS_TURN = 2
export const PALADINS_ATTACK_THRESHOLD = 3
export const PALADINS_WARN_THRESHOLD = 2

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
  Dexterity = 'dexterity',
  Subjugation = 'subjugation',
  Necromancy = 'necromancy',
}

export enum BuildingType {
  CharnelHouse = 'charnelHouse',
  Ossuary = 'ossuary',
  SoulWell = 'soulWell',
  Catacombs = 'catacombs',
  Arsenal = 'arsenal',
}

export enum ResourceType {
  Materials = 'materials',
  Meat = 'meat',
  Souls = 'souls',
  Bones = 'bones',
}

export enum TurnPhase {
  Production,
  Event,
  Action,
  Upkeep,
}

export const TURN_PHASES_ORDER = [TurnPhase.Production, TurnPhase.Event, TurnPhase.Action, TurnPhase.Upkeep]

export const INTRO_STEPS_COUNT = 12

export enum OnboardingStep {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
  Step9,
  Step10,
  Step11,
  Step12,
  Step13,
  GamePresentation,
  HighlightProduction,
  HighlightTurnCounter,
  ActionPhaseDescription,
  HighlightMeatCounter,
  HighlightCharnelHouse,
  HighlightMaterialsCounter,
  HighlightCharnelHouseBuildButton,
  RemindUpkeep,
  AwaitNextTurn,
  BuildSoulWell,
  HighlightSoulWellBuildButton,
  AwaitNextTurn2,
  NoMoreMaterials,
  LetsExplore,
  StartSmall,
  CoffinHelp,
  BuildCatacombs,
  AwaitUndeadRaising,
  BuildOssuary,
  End,
}

export enum OnboardingFlag {
  PaladinsExplained = 'paladinsExplained',
}

export enum ExpeditionType {
  Sawmill = 'sawmill',
  MiseryMarket = 'miseryMarket',
  TownHall = 'townHall',
  Bastion = 'bastion',
}

export enum EventType {
  CallToArms,
  PaladinsAssault,
  Collapsing,
  Plunder,
  Offering,
  StateOfEmergency,
}

export const PLUNDER_ACTIVATION_TURN = 9

export const ARTIFACT_DEFENSE_BONUS = 2

export enum GameState {
  Ongoing,
  Win,
  Loose,
}

export enum LooseReason {
  UndeadsKilled,
  BastionDefeat,
  PaladinsAssault,
  Famine,
}

export enum PaladinsAssaultPhase {
  Revealing = 'reveal',
  Preparing = 'prepare',
  Fighting = 'fight',
  Result = 'result',
}

export enum PaladinType {
  Vanguard = 'vanguard',
  Healer = 'healer',
  Zealot = 'zealot',
  Wizard = 'wizard',
  Dreadnought = 'dreadnought',
  Commander = 'commander',
  Guardian = 'guardian',
  Provost = 'provost',
  Avenger = 'avenger',
}

export enum PaladinCategory {
  Physical = 'physical',
  Magical = 'magical',
  Ethereal = 'ethereal',
  Pure = 'pure',
}

export const PALADINS_HEALTH_MAP: Record<PaladinType, number> = {
  [PaladinType.Vanguard]: 2,
  [PaladinType.Healer]: 2,
  [PaladinType.Zealot]: 2,
  [PaladinType.Wizard]: 1,
  [PaladinType.Dreadnought]: 3,
  [PaladinType.Commander]: 2,
  [PaladinType.Guardian]: 3,
  [PaladinType.Provost]: 1,
  [PaladinType.Avenger]: 2,
}

export const PALADINS_DAMAGES_MAP: Record<PaladinType, number> = {
  [PaladinType.Vanguard]: 2,
  [PaladinType.Healer]: 1,
  [PaladinType.Zealot]: 2,
  [PaladinType.Wizard]: 2,
  [PaladinType.Dreadnought]: 3,
  [PaladinType.Commander]: 2,
  [PaladinType.Guardian]: 1,
  [PaladinType.Provost]: 3,
  [PaladinType.Avenger]: 2,
}

export const PALADINS_CATEGORIES_MAP: Record<PaladinType, PaladinCategory[]> = {
  [PaladinType.Vanguard]: [PaladinCategory.Physical, PaladinCategory.Magical],
  [PaladinType.Healer]: [PaladinCategory.Physical, PaladinCategory.Ethereal],
  [PaladinType.Zealot]: [PaladinCategory.Pure],
  [PaladinType.Wizard]: [PaladinCategory.Ethereal],
  [PaladinType.Dreadnought]: [PaladinCategory.Physical],
  [PaladinType.Commander]: [PaladinCategory.Magical],
  [PaladinType.Guardian]: [PaladinCategory.Physical, PaladinCategory.Ethereal],
  [PaladinType.Provost]: [PaladinCategory.Ethereal, PaladinCategory.Magical],
  [PaladinType.Avenger]: [PaladinCategory.Physical, PaladinCategory.Magical],
}

export const PALADINS_WITH_SHIELD: PaladinType[] = [PaladinType.Vanguard, PaladinType.Avenger]

export const HEALER_BONUS_HP = 1
export const HEALER_TARGETS_COUNT = 1
export const WIZARD_BONUS_DAMAGES = 1
export const WIZARD_TARGETS_COUNT = 3
export const GUARDIAN_TARGETS_COUNT = 1
export const PROVOST_TARGETS_COUNT = 1

export enum TrapType {
  Impaler = 'impaler',
  Chakrams = 'chakrams',
  Profaner = 'profaner',
  PutridPitch = 'putridPitch',
}

export const TRAP_NEMESIS_MAP: Record<TrapType, PaladinType | null> = {
  [TrapType.Impaler]: PaladinType.Vanguard,
  [TrapType.Chakrams]: null,
  [TrapType.Profaner]: null,
  [TrapType.PutridPitch]: null,
}

export const TRAP_DAMAGES_MAP: Record<TrapType, number> = {
  [TrapType.Impaler]: 2,
  [TrapType.Chakrams]: 2,
  [TrapType.Profaner]: 2,
  [TrapType.PutridPitch]: 1,
}

export const TRAP_TARGET_CATEGORIES_MAP: Record<TrapType, PaladinCategory[]> = {
  [TrapType.Impaler]: [PaladinCategory.Physical],
  [TrapType.Chakrams]: [PaladinCategory.Ethereal],
  [TrapType.Profaner]: [PaladinCategory.Magical],
  [TrapType.PutridPitch]: [PaladinCategory.Physical, PaladinCategory.Magical, PaladinCategory.Ethereal],
}

export const EXTRA_CHAKRAM_DAMAGE = 1
export const PUTRID_PITCH_MALUS = -1
export const NECROPOLIS_STRUCTURE_POINTS = 8
export const DELAY_BETWEEN_TRAP_EFFECTS = 300
