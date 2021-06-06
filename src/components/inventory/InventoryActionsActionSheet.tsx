import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { createSelector } from 'reselect'
import { useTranslation } from '../../lang/useTranslation'
import { fullWidth, greenBox, h2Title, smallMarginTop } from '../../styles/base'
import { ActionSheet } from '../ui/ActionSheet'
import { Frame, FrameColor } from '../ui/Frame'
import { isExquisiteMeat, isHaysteStrands, Item } from '../../data/inventory/items'
import { Undead } from '../../data/undeads/helpers'
import { removeItem } from '../../data/inventory/actions'
import { healUndead } from '../../data/undeads/actions'
import { getInjuredUndeads, getUndeads } from '../../data/undeads/selectors'
import { ActionBox, buildingShopRowTitle } from '../ui/ActionBox'
import { Health } from '../images/Health'
import { UndeadPortrait } from '../undeads/UndeadPortrait'
import healIcon from '../../assets/images/icons/heal.png'
import rollIconUrl from '../../assets/images/expeditions/dices/dice.png'
import { Image } from '../images/Image'
import { Dice } from '../images/Dice'
import { getObstacle } from '../../data/expeditions/selectors'
import { isNotNull } from '../../data/helpers'
import { rerollUndeadDices } from '../../data/expeditions/actions'

const listWrapper = css({
  paddingLeft: '2rem',
  paddingRight: '2rem',
})

const rowWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})

const rowDetailsWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',
  width: '100%',
})

type InventoryActionsActionSheetProps = {
  usedItem: Item | null
  onClose: () => void
}

const getSlottedUndeadWithRolls = createSelector(getUndeads, getObstacle, (undeads, obstacle) => {
  if (!obstacle) {
    return []
  }

  const rollsMap = new Map(obstacle.rolls)
  const slottedUndeads = obstacle.rows.flatMap(row => row.slottedUndeads)
  return slottedUndeads
    .map(undeadId => undeads.find(undead => undead.id === undeadId) ?? null)
    .filter(isNotNull)
    .map(undead => ({ undead, roll: rollsMap.get(undead.id) ?? 0 }))
})

export const InventoryActionsActionSheet = ({ usedItem, onClose }: InventoryActionsActionSheetProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const injuredUndeads = useSelector(getInjuredUndeads)
  const slottedUndeads = useSelector(getSlottedUndeadWithRolls)

  const handleHealUndead = (undead: Undead) => () => {
    if (!usedItem || !isExquisiteMeat(usedItem)) {
      return
    }
    onClose()
    dispatch(removeItem(usedItem.id))
    dispatch(healUndead(undead.id, usedItem.healingAmount))
  }

  const handleReroll = (undead: Undead) => () => {
    if (!usedItem || !isHaysteStrands(usedItem)) {
      return
    }
    onClose()
    dispatch(removeItem(usedItem.id))
    dispatch(rerollUndeadDices(undead.id))
  }

  return (
    <>
      <ActionSheet isOpen={!!usedItem} onClose={onClose}>
        <Frame css={listWrapper} color={FrameColor.GREEN} fullPage>
          {usedItem && isExquisiteMeat(usedItem) && (
            <>
              <h2 css={h2Title}>{t('healUndead')}</h2>
              {injuredUndeads.map(undead => (
                <ActionBox
                  css={fullWidth}
                  leftCircleContent={<UndeadPortrait type={undead.type} size="3rem" />}
                  onClick={handleHealUndead(undead)}
                  buttonContent={<Image src={healIcon} />}
                >
                  <div css={rowWrapper}>
                    <span css={buildingShopRowTitle}>{t('undeadName', undead.type)}</span>
                    <div css={rowDetailsWrapper}>
                      <Health health={undead.health} maxHealth={undead.maxHealth} />
                      <div>
                        {undead.dices.map(dice => (
                          <Dice key={dice.id} type={dice.type} value={dice.maxValue} size="2.5rem" />
                        ))}
                      </div>
                    </div>
                  </div>
                </ActionBox>
              ))}
            </>
          )}
          {usedItem && isHaysteStrands(usedItem) && (
            <>
              <h2 css={h2Title}>{t('rerollTitle')}</h2>
              <div css={[smallMarginTop, greenBox]}>{t('rerollText', usedItem.rerolledDices)}</div>
              {slottedUndeads.map(({ undead, roll }) => (
                <ActionBox
                  css={fullWidth}
                  leftCircleContent={<UndeadPortrait type={undead.type} size="3rem" />}
                  onClick={handleReroll(undead)}
                  buttonContent={<Image src={rollIconUrl} size="2.5rem" />}
                >
                  <div css={rowWrapper}>
                    <span css={buildingShopRowTitle}>{t('undeadName', undead.type)}</span>
                    <div css={rowDetailsWrapper}>
                      <Health health={undead.health} maxHealth={undead.maxHealth} />
                      <div>
                        {undead.dices.map(dice => (
                          <Dice key={dice.id} type={dice.type} value={roll} size="2.5rem" />
                        ))}
                      </div>
                    </div>
                  </div>
                </ActionBox>
              ))}
            </>
          )}
        </Frame>
      </ActionSheet>
    </>
  )
}
