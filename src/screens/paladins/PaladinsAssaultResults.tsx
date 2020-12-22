import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalColor, modalInner, modalPanel } from '../../components/ui/Modal/modalStyles'
import { paladinAssaultPanel, paladinAssaultPanelInner } from './helpers/paladinAssaultStyles'
import resultBg from '../../assets/images/paladins/result-bg.jpg'
import paladinsStrengthIcon from '../../assets/images/paladins/paladins-strengh.png'
import structurePointsIcon from '../../assets/images/paladins/structure-points.png'
import { h2Title, redBox, textColor } from '../../styles/base'
import { cyanSquareButton } from '../../styles/buttons'
import { useTranslation } from '../../lang/useTranslation'
import { Image } from '../../components/images/Image'
import { ResourceLoot } from '../../components/resources/ResourceLoot'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { LooseReason, NECROPOLIS_STRUCTURE_POINTS, ResourceType } from '../../config/constants'
import { fonts } from '../../config/theme'
import { endPaladinsAssault } from '../../data/paladins/actions'
import { getPaladinsAssault, getStructureHealth } from '../../data/paladins/selectors'
import { gainResources } from '../../data/resources/actions'
import { loose } from '../../data/turn/actions'

const resultsPanel = [modalPanel(ModalColor.RED), paladinAssaultPanel]

const resultsPanelInner = [
  modalInner(ModalColor.RED),
  paladinAssaultPanelInner,
  css({
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    backgroundImage: `url("${resultBg}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
]

const expander = css({ flex: '1' })

const resultBox = [
  redBox,
  css({
    padding: '1rem',
    width: '100%',
    maxWidth: '20rem',
    fontFamily: fonts.TITLES,
    fontSize: '1.2rem',
  }),
]

const leaveAssaultButton = [
  ...cyanSquareButton,
  css({
    marginTop: '1rem',
    maxWidth: '20rem',
  }),
]

export const PaladinsAssaultResults = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const assault = useSelector(getPaladinsAssault)
  const structureHealth = useSelector(getStructureHealth)

  if (!assault) {
    return null
  }

  const killedPaladins = assault.deck.filter(card => card.health === 0).length

  const handleEndAssault = () => {
    if (structureHealth === 0) {
      dispatch(loose(LooseReason.PaladinsAssault))
      return
    }
    dispatch(gainResources({ [ResourceType.Bones]: killedPaladins }))
    dispatch(endPaladinsAssault())
  }

  return (
    <div css={resultsPanel}>
      <div css={resultsPanelInner}>
        <h2 css={h2Title}>{t('paladinsAssaultResults')}</h2>
        <div css={expander} />
        <div css={resultBox}>
          <div css={textColor('RED')} data-test-id="killedPaladins">
            <Image src={paladinsStrengthIcon} marginRight="0.5rem" size="2.5rem" />
            {t('paladinsKilled', killedPaladins, assault.deck.length)}
          </div>
          <div css={textColor('CAMO')}>
            <Image src={structurePointsIcon} marginRight="0.5rem" size="2.5rem" />
            {t('healthLost', assault.startingStructureHealth - structureHealth)}
          </div>
          <div css={textColor('CAMO')} data-test-id="remainingStructureHealth">
            <Image src={structurePointsIcon} marginRight="0.5rem" size="2.5rem" />
            {t('healthRemaining', structureHealth, NECROPOLIS_STRUCTURE_POINTS)}
          </div>
          <ResourceLoot>
            <ResourceIcon type={ResourceType.Bones} text={killedPaladins} />
          </ResourceLoot>
        </div>
        <button
          type="button"
          css={leaveAssaultButton}
          onClick={handleEndAssault}
          data-test-id="endPaladinAssaultButton"
        >
          {t('paladinsAssaultEnd')}
        </button>
      </div>
    </div>
  )
}
