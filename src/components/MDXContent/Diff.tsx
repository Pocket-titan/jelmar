import React, { PropsWithChildren } from "react";

const maybeFetch = async (str: string) => {
  if (str.startsWith("file:")) {
    return "should be fetched!";
  }

  return str;
};

const Diff = async ({
  value: _value,
  oldValue: _oldValue,
  filename,
  oldFilename,
  language = "markdown",
  hasCopyButton = false,
  lineWrapping = false,
}: PropsWithChildren<{
  value: string;
  oldValue: string;
  filename?: string;
  oldFilename?: string;
  language?: string;
  hasCopyButton?: boolean;
  lineWrapping?: boolean;
}>) => {
  const [value, oldValue] = await Promise.all(
    [_value, _oldValue].map(maybeFetch)
  );

  return <div></div>;
};

export default Diff;
