import React from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingDetails } from './components/BuildingDetails'
import { getOssuary } from '../../data/buildings/selectors'
import { MAIN_HUB } from '../../config/routes'

export const Ossuary = () => {
  const { t } = useTranslation()
  const ossuary = useSelector(getOssuary)

  if (!ossuary) {
    return <Redirect to={MAIN_HUB} />
  }

  return <BuildingDetails building={ossuary} renderUpgradeDescription={() => t('ossuaryUnlock')} />
}
