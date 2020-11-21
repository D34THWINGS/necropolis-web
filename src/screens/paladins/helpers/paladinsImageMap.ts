import { PaladinType } from '../../../config/constants'
import vanguardImage from '../../../assets/images/paladins/vanguard.jpg'

export const paladinsImageMap: Record<PaladinType, string> = {
  [PaladinType.Vanguard]: vanguardImage,
  [PaladinType.Healer]: vanguardImage,
  [PaladinType.Zealot]: vanguardImage,
  [PaladinType.Wizard]: vanguardImage,
  [PaladinType.Dreadnought]: vanguardImage,
  [PaladinType.Commander]: vanguardImage,
  [PaladinType.Guardian]: vanguardImage,
  [PaladinType.Provost]: vanguardImage,
  [PaladinType.Avenger]: vanguardImage,
}
