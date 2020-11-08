import { TrapType } from '../../../config/constants'
import impalerImage from '../../../assets/images/traps/impaler.jpg'
import chakramsImage from '../../../assets/images/traps/chakrams.jpg'
import profanerImage from '../../../assets/images/traps/profaner.jpg'
import putridPitchImage from '../../../assets/images/traps/putrid-pitch.jpg'

export const trapsImageMap: Record<TrapType, string> = {
  [TrapType.Impaler]: impalerImage,
  [TrapType.Chakrams]: chakramsImage,
  [TrapType.Profaner]: profanerImage,
  [TrapType.PutridPitch]: putridPitchImage,
}
