import { ExpeditionType, PaladinsAssaultPhase } from './constants'

export const MAIN_MENU = '/'
export const NEW_GAME = '/new-game'
export const MAIN_HUB = '/hub'
export const EXPEDITIONS_MAP = '/expeditions'
export const EXPEDITIONS = '/expeditions/:expeditionName'
export const SAWMILL_EXPEDITION = `${EXPEDITIONS_MAP}/${ExpeditionType.Sawmill}`
export const MISERY_MARKET_EXPEDITION = `${EXPEDITIONS_MAP}/${ExpeditionType.MiseryMarket}`
export const TOWN_HALL_EXPEDITION = `${EXPEDITIONS_MAP}/${ExpeditionType.TownHall}`
export const BASTION_EXPEDITION = `${EXPEDITIONS_MAP}/${ExpeditionType.Bastion}`
export const CATACOMBS = '/catacombs'
export const OSSUARY = '/ossuary'
export const SOUL_WELL = '/soul-well'
export const CHARNEL_HOUSE = '/charnel-house'
export const ARSENAL = '/arsenal'
export const PALADINS_ASSAULT = '/paladins-assault'
export const PALADINS_ASSAULT_REVEAL = `${PALADINS_ASSAULT}/${PaladinsAssaultPhase.Revealing}`
export const PALADINS_ASSAULT_PREPARE = `${PALADINS_ASSAULT}/${PaladinsAssaultPhase.Preparing}`
export const PALADINS_ASSAULT_FIGHT = `${PALADINS_ASSAULT}/${PaladinsAssaultPhase.Fighting}`
export const PALADINS_ASSAULT_RESULTS = `${PALADINS_ASSAULT}/${PaladinsAssaultPhase.Result}`

export const makeExpeditionLink = (type: ExpeditionType) => `${EXPEDITIONS_MAP}/${type}`
