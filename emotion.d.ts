declare module "@emotion/react" {
  type MyTheme = import("./ts/theme").Theme;

  export interface Theme extends MyTheme {}
}

export {};
