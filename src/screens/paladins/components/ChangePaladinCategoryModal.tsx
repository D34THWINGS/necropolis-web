import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { greenBox, h2Title } from '../../../styles/base'
import { useTranslation } from '../../../lang/useTranslation'
import { getIsChangingPaladinCategory } from '../../../data/paladins/selectors'
import { PaladinCard } from '../../../data/paladins/helpers'
import { Image } from '../../../components/images/Image'
import { paladinCategoryImagesMap } from '../helpers/paladinCategoryImagesMap'
import arrowUrl from '../../../assets/images/onboarding/next-step-arrow.png'
import { buttonBase, greenSquareButton } from '../../../styles/buttons'
import { colors, transitions } from '../../../config/theme'
import { PaladinCategory, TRAP_DAMAGES_MAP, TrapType } from '../../../config/constants'
import { changePaladinCategories, doDamagesToPaladin } from '../../../data/paladins/actions'

const changeCategoryWrapper = css({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-around',
  margin: '0.5rem 0 1rem',
})

const categoryList = [
  greenBox,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
]

const middleArrow = css({ alignSelf: 'center' })

const categoryButton = (active: boolean) => [
  ...buttonBase,
  css({
    margin: '0.3rem',
    borderRadius: '10px',
    padding: '0.3rem',
    backgroundColor: active ? colors.DARK_GREEN : 'transparent',
    transition: transitions.FAST,
  }),
]

const getPossibleDestinationCategories = (
  selectedSourceCategory: PaladinCategory,
  sourceCategories: PaladinCategory[],
) =>
  Object.values(PaladinCategory).filter(
    category =>
      category !== PaladinCategory.Pure &&
      (sourceCategories.indexOf(category) === -1 || selectedSourceCategory === category),
  )

export type ChangePaladinCategoryModalProps = {
  activePaladin: PaladinCard
}

export const ChangePaladinCategoryModal = ({ activePaladin }: ChangePaladinCategoryModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isChangingPaladinCategory = useSelector(getIsChangingPaladinCategory)
  const [sourceCategory, setSourceCategory] = useState(activePaladin.categories[0])

  const possibleDestinationCategories = getPossibleDestinationCategories(sourceCategory, activePaladin.categories)
  const [destinationCategory, setDestinationCategory] = useState(possibleDestinationCategories[0])

  useEffect(() => {
    if (
      isChangingPaladinCategory &&
      getPossibleDestinationCategories(sourceCategory, activePaladin.categories).indexOf(destinationCategory) === -1
    ) {
      setDestinationCategory(sourceCategory)
    }
  }, [sourceCategory, destinationCategory, activePaladin.categories, isChangingPaladinCategory])

  useEffect(() => {
    if (isChangingPaladinCategory && activePaladin.categories.indexOf(sourceCategory) === -1) {
      setDestinationCategory(activePaladin.categories[0])
    }
  }, [sourceCategory, activePaladin.categories, isChangingPaladinCategory])

  const handleSourceClick = (category: PaladinCategory) => () => setSourceCategory(category)
  const handleDestinationClick = (category: PaladinCategory) => () => setDestinationCategory(category)
  const handleSubmit = () => {
    const categories = [...activePaladin.categories.filter(c => c !== sourceCategory), destinationCategory]
    dispatch(changePaladinCategories(activePaladin.id, categories))
    if (categories.indexOf(PaladinCategory.Magical) >= 0) {
      dispatch(doDamagesToPaladin(activePaladin.id, TRAP_DAMAGES_MAP[TrapType.Profaner]))
    }
  }

  return (
    <Modal isOpen={isChangingPaladinCategory} color={ModalColor.GREEN}>
      <h2 css={h2Title}>{t('changePaladinType')}</h2>
      <div css={changeCategoryWrapper}>
        <div css={categoryList}>
          {activePaladin.categories.map(category => (
            <button
              key={category}
              css={categoryButton(category === sourceCategory)}
              type="button"
              onClick={handleSourceClick(category)}
              data-test-id="sourceCategoryButton"
            >
              <Image src={paladinCategoryImagesMap[category]} size="3rem" />
            </button>
          ))}
        </div>
        <Image css={middleArrow} src={arrowUrl} size="3rem" />
        <div css={categoryList}>
          {possibleDestinationCategories.map(category => (
            <button
              key={category}
              css={categoryButton(category === destinationCategory)}
              type="button"
              onClick={handleDestinationClick(category)}
              data-test-id="targetCategoryButton"
            >
              <Image src={paladinCategoryImagesMap[category]} size="3rem" />
            </button>
          ))}
        </div>
      </div>
      <button css={greenSquareButton} type="button" onClick={handleSubmit} data-test-id="categoryChangeSubmit">
        {t('changePaladinTypeSubmit')}
      </button>
    </Modal>
  )
}
