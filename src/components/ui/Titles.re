module H1 = {
  [@react.component]
  let make =
      (
        ~children,
        ~inline=false,
        ~marginBottom: float=?,
        ~color: Css.Types.Color.t=?,
      ) =>
    <Typography inline color marginBottom variant=Typography.H1>
      children
    </Typography>;
};

module H2 = {
  [@react.component]
  let make =
      (
        ~children,
        ~inline=false,
        ~marginBottom: float=?,
        ~color: Css.Types.Color.t=?,
      ) =>
    <Typography inline color marginBottom variant=Typography.H2>
      children
    </Typography>;
};

module H3 = {
  [@react.component]
  let make =
      (
        ~children,
        ~inline=false,
        ~marginBottom: float=?,
        ~color: Css.Types.Color.t=?,
      ) =>
    <Typography inline color marginBottom variant=Typography.H3>
      children
    </Typography>;
};

module H4 = {
  [@react.component]
  let make =
      (
        ~children,
        ~inline=false,
        ~marginBottom: float=?,
        ~color: Css.Types.Color.t=?,
      ) =>
    <Typography inline color marginBottom variant=Typography.H4>
      children
    </Typography>;
};

module TextMedium = {
  [@react.component]
  let make =
      (
        ~children,
        ~inline=false,
        ~marginBottom: float=?,
        ~color: Css.Types.Color.t=?,
      ) =>
    <Typography inline color marginBottom variant=Typography.TextMedium>
      children
    </Typography>;
};