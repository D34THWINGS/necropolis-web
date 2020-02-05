[@bs.val] external setTimeout: (unit => unit, int) => float = "setTimeout";
[@bs.val] external clearTimeout: float => unit = "clearTimeout";

type transitionState =
  | In
  | Out
  | Entering
  | Idle;

[@react.component]
let make = (~animationKey, ~duration=400, ~children: React.element, ~render) => {
  let (currentElement, setCurrentElement) =
    React.useState(() => render(children, Idle));
  let (nextElement, setNextElement) = React.useState(() => None);
  let (previous, setPrevious) = React.useState(() => children);

  React.useEffect1(
    () => {
      setCurrentElement(_ => render(previous, Out));
      setPrevious(_ => children);
      setNextElement(_ => Some(render(children, In)));
      let timer =
        setTimeout(
          () => {setNextElement(_ => Some(render(children, Entering)))},
          10,
        );
      let timer2 =
        setTimeout(
          () => {
            setCurrentElement(_ => render(children, Idle));
            setNextElement(_ => None);
          },
          duration,
        );
      Some(
        () => {
          clearTimeout(timer);
          clearTimeout(timer2);
        },
      );
    },
    [|animationKey|],
  );

  <>
    currentElement
    {switch (nextElement) {
     | Some(elem) => elem
     | None => ReasonReact.null
     }}
  </>;
};