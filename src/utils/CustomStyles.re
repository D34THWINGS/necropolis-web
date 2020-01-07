let flexFull = (shrink, grow, basis) => [
  Css.flexShrink(shrink),
  Css.flexGrow(grow),
  Css.flexBasis(basis),
];

let flexAuto = flexFull(0., 0., Css.auto);