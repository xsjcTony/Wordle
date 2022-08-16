export const BOUNCE: PropertyIndexedKeyframes = {
  transform: [0, 0, '-30px', '5px', '-15px', '2px', 0].map(length => `translateY(${length})`),
  offset: [0, .2, .4, .5, .6, .8, 1]
}

export const SHAKE: PropertyIndexedKeyframes = {
  transform: [0, '2px', '-4px', '4px', '-4px', '4px', '-4px', '2px', 0].map(length => `translateX(${length})`),
  offset: [0, .2, .3, .4, .5, .6, .7, .8, 1]
}

export const POP_IN: PropertyIndexedKeyframes = {
  transform: [.8, 1.1, 1].map(scaleX => `scale(${scaleX})`),
  offset: [0, .4, 1]
}

export const FLIP_IN: PropertyIndexedKeyframes = {
  transform: [0, '-90deg'].map(angle => `rotateX(${angle})`)
}

export const FLIP_OUT: PropertyIndexedKeyframes = {
  transform: ['-90deg', 0].map(angle => `rotateX(${angle})`)
}
