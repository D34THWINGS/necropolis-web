import React from 'react'
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

export const DamageCategories = ({ className, categories, size }: DamageCategoriesProps) => (
  <span css={className}>
    {categories.map(category => (
      <Image
        key={category}
        css={categoryIcon}
        src={paladinCategoryImagesMap[category]}
        size={size}
        data-test-id={category}
      />
    ))}
  </span>
)
