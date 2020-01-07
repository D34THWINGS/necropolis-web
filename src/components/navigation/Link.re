[@react.component]
let make = (~name, ~className="", ~children) => {
  let routePath = Routes.getRoutePath(name);
  <a
    className
    href=routePath
    onClick={evt => {
      ReactEvent.Mouse.preventDefault(evt);
      ReasonReactRouter.push(routePath);
    }}>
    children
  </a>;
};