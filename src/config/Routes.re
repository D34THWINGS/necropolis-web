type routeName =
  | Build
  | Expeditions
  | Spells
  | Research
  | NotFound;

let getRoutePath = route =>
  switch (route) {
  | Build => "/"
  | Expeditions => "/expeditions"
  | Spells => "/spells"
  | Research => "/research"
  | NotFound => "/404"
  };

let getCurrentRouteName = () =>
  switch (ReasonReactRouter.useUrl().path) {
  | [] => Build
  | ["expeditions"] => Expeditions
  | ["spells"] => Spells
  | ["research"] => Research
  | _ => NotFound
  };