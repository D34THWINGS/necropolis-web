import React from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { brownBox, h2Title, smallMarginTop } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { getInventoryItems } from '../../data/inventory/selectors'
import { useGetItemDetails } from './useGetItemDetails'
import { Image } from '../images/Image'
import { colors, fonts, frameColors } from '../../config/theme'
import { buttonBase } from '../../styles/buttons'
import { Item } from '../../data/inventory/items'

const itemWrapper = [
  buttonBase,
  brownBox,
  css({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: '0.5rem',
    border: `solid 2px ${frameColors.DARK_BROWN}`,
    color: colors.WHITE,
  }),
]

const itemName = css({ fontFamily: fonts.TITLES })

type InventoryProps = {
  onItemUse: (item: Item) => void
}

export const Inventory = ({ onItemUse }: InventoryProps) => {
  const { t } = useTranslation()
  const items = useSelector(getInventoryItems)

  const getItemDetails = useGetItemDetails()

  return (
    <>
      <h2 css={h2Title}>{t('inventoryTitle')}</h2>
      {items.map(item => {
        const { name, description, icon, canUse } = getItemDetails(item)
        return (
          <button key={item.id} type="button" css={itemWrapper} onClick={() => onItemUse(item)} disabled={!canUse}>
            <Image src={icon} size="3rem" marginRight="0.5rem" />
            <span css={itemName}>{name}&nbsp;:</span>
            &nbsp;
            {description}
          </button>
        )
      })}
      {items.length === 0 && <div css={[brownBox, smallMarginTop]}>{t('inventoryEmpty')}</div>}
    </>
  )
}
