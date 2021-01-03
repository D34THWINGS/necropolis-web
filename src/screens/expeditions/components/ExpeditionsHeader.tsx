import React from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { ResourceType } from '../../../config/constants'
import { ResourceButton } from '../../../components/resources/ResourceButton'
import { getResources } from '../../../data/resources/selectors'

const header = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem 0',
})

export const ExpeditionsHeader = () => {
  const resources = useSelector(getResources)
  return (
    <div css={header}>
      <ResourceButton type={ResourceType.Materials} color="#94C58C" text={resources[ResourceType.Materials]} />
      <ResourceButton type={ResourceType.Meat} color="#C58C8F" text={resources[ResourceType.Meat]} />
      <ResourceButton type={ResourceType.Souls} color="#83B9D6" text={resources[ResourceType.Souls]} />
      <ResourceButton type={ResourceType.Bones} color="#CDC59C" text={resources[ResourceType.Bones]} />
    </div>
  )
}
