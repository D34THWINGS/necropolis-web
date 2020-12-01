import React, { Component, ErrorInfo, ReactNode } from 'react'
import { css } from '@emotion/react'
import { bindActionCreators } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import * as Sentry from '@sentry/react'
import { greenSquareButton } from '../styles/buttons'
import { withTranslation, WithTranslationProps } from '../lang/useTranslation'
import { h2Title, smallMarginTop } from '../styles/base'
import backgroundImageUrl from '../assets/images/background.jpg'
import { colors } from '../config/theme'
import { panelBorder, panelInner } from '../components/ui/Panel'
import { resetGame as resetGameAction } from '../data/settings/actions'

const errorBoundaryWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  height: '100%',
  background: `url("${backgroundImageUrl}") center no-repeat`,
  backgroundSize: 'cover',
  color: colors.WHITE,
})

const connector = connect(undefined, dispatch => bindActionCreators({ resetGame: resetGameAction }, dispatch))

type ErrorBoundaryProps = WithTranslationProps &
  ConnectedProps<typeof connector> & {
    children?: ReactNode
  }

type ErrorBoundaryState = {
  error: boolean
}

class _ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = {
      error: false,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, { extra: { errorInfo } })
    } else {
      // eslint-disable-next-line no-console
      console.error(error)
    }
    this.setState({ error: true })
  }

  render() {
    const { children, t, resetGame } = this.props
    const { error } = this.state

    if (!error) {
      return <>{children}</>
    }

    const handleReload = () => window.location.reload()
    const handleReset = () => {
      resetGame(true)
      this.setState({ error: false })
    }

    return (
      <div css={errorBoundaryWrapper}>
        <div css={panelBorder}>
          <div css={panelInner}>
            <h2 css={h2Title}>{t('errorTitle')}</h2>
            <p>{t('errorMessage')}</p>
            <button type="button" css={greenSquareButton} onClick={handleReload}>
              {t('reload')}
            </button>
            <button type="button" css={[...greenSquareButton, smallMarginTop]} onClick={handleReset}>
              {t('reset')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export const ErrorBoundary = withTranslation(connector(_ErrorBoundary))
