import { useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { isExquisiteMeat, isHaysteStrands, Item } from '../../data/inventory/items'
import { assertNeverType } from '../../data/helpers'
import itemIcon from '../../assets/images/icons/heal.png'
import { getMostInjuredUndead } from '../../data/undeads/selectors'
import { getObstacle } from '../../data/expeditions/selectors'

export const useGetItemDetails = () => {
  const { t } = useTranslation()
  const hasInjuredUndead = !!useSelector(getMostInjuredUndead)
  const hasRolledObstacleDices = !!useSelector(getObstacle)?.rolls

  return (item: Item) => {
    if (isExquisiteMeat(item)) {
      return {
        name: t('exquisiteMeat'),
        description: t('exquisiteMeatDescription', item.healingAmount),
        icon: itemIcon,
        canUse: hasInjuredUndead,
      }
    }

    if (isHaysteStrands(item)) {
      return {
        name: t('haysteStrands'),
        description: t('haysteStrandsDescription', item.rerolledDices),
        icon: itemIcon,
        canUse: hasRolledObstacleDices,
      }
    }

    return assertNeverType(item)
  }
}
