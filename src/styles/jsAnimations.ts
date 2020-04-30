import anime from 'animejs'

export const jsAnimationDuration = 350

export const fadeInJS = (node: HTMLElement) =>
  anime({
    targets: node,
    duration: jsAnimationDuration,
    opacity: [0, 1],
    easing: 'easeOutQuint',
  })

export const fadeOutJS = (node: HTMLElement) =>
  anime({
    targets: node,
    duration: jsAnimationDuration,
    opacity: [1, 0],
    easing: 'easeInQuint',
  })
