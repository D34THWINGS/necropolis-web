import React, { forwardRef } from 'react'
import { css } from '@emotion/react'
import { Image } from './Image'
import { PaladinCategory } from '../../config/constants'
import magicalIcon from '../../assets/images/paladins/magical-category.png'
import physicalIcon from '../../assets/images/paladins/physical-category.png'
import etherealIcon from '../../assets/images/paladins/ethereal-category.png'
import pureIcon from '../../assets/images/paladins/pure-category.png'

const paladinCategoryImagesMap: Record<PaladinCategory, string> = {
  [PaladinCategory.Physical]: physicalIcon,
  [PaladinCategory.Magical]: magicalIcon,
  [PaladinCategory.Ethereal]: etherealIcon,
  [PaladinCategory.Pure]: pureIcon,
}

const wrapper = css({
  display: 'inline-block',
})

const categoryIcon = css({
  '&:not(:last-of-type)': {
    marginRight: '0.5rem',
  },
})

export type DamageCategoriesProps = {
  className?: string
  size?: string
  categories: PaladinCategory[]
}

export const DamageCategories = forwardRef<HTMLElement, DamageCategoriesProps>(
  ({ className, categories, size }, ref) => (
    <span ref={ref} className={className} css={wrapper}>
      {categories.map((category, index) => (
        <Image
          key={category + index.toString()}
          css={categoryIcon}
          src={paladinCategoryImagesMap[category]}
          size={size}
          data-test-id={category}
        />
      ))}
    </span>
  ),
)
