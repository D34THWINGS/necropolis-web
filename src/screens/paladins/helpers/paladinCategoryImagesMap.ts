import { PaladinCategory } from '../../../config/constants'
import physicalIcon from '../../../assets/images/paladins/physical-category.png'
import magicalIcon from '../../../assets/images/paladins/magical-category.png'
import etherealIcon from '../../../assets/images/paladins/ethereal-category.png'

export const paladinCategoryImagesMap: Record<PaladinCategory, string> = {
  [PaladinCategory.Physical]: physicalIcon,
  [PaladinCategory.Magical]: magicalIcon,
  [PaladinCategory.Ethereal]: etherealIcon,
}
