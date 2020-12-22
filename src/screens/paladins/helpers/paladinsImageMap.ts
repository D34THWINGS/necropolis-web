import { PaladinType } from '../../../config/constants'
import vanguardImage from '../../../assets/images/paladins/vanguard.jpg'
import avengerImage from '../../../assets/images/paladins/avenger.jpg'
import commanderImage from '../../../assets/images/paladins/commander.jpg'
import dreadnoughtImage from '../../../assets/images/paladins/dreadnought.jpg'
import guardianImage from '../../../assets/images/paladins/guardian.jpg'
import healerImage from '../../../assets/images/paladins/healer.jpg'
import provostImage from '../../../assets/images/paladins/provost.jpg'
import wizardImage from '../../../assets/images/paladins/wizard.jpg'
import zealotImage from '../../../assets/images/paladins/zealot.jpg'

export const paladinsImageMap: Record<PaladinType, string> = {
  [PaladinType.Vanguard]: vanguardImage,
  [PaladinType.Healer]: healerImage,
  [PaladinType.Zealot]: zealotImage,
  [PaladinType.Wizard]: wizardImage,
  [PaladinType.Dreadnought]: dreadnoughtImage,
  [PaladinType.Commander]: commanderImage,
  [PaladinType.Guardian]: guardianImage,
  [PaladinType.Provost]: provostImage,
  [PaladinType.Avenger]: avengerImage,
}
