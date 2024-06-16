import styled from "styled-components";
import { HTMLAttributes, PropsWithChildren, useState } from "react";
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiJupyter } from "react-icons/si";
import { MdDataObject } from "react-icons/md";
import { BiHeading } from "react-icons/bi";
import { LuBinary } from "react-icons/lu";
import { FiFile, FiFileText } from "react-icons/fi";
import { FaFolder, FaFolderOpen, FaImage } from "react-icons/fa";
import { IconType } from "react-icons/lib";

type File = {
  kind: "file";
  name: string;
  depth: number;
};

type Directory = {
  kind: "directory";
  name: string;
  depth: number;
  items: Item[];
  expanded?: boolean;
};

type Item = File | Directory;

type PartialFile = Omit<File, "kind" | "depth"> | string;

type PartialDirectory = Omit<Directory, "kind" | "depth" | "items"> & { items: PartialItem[] };

type PartialItem = PartialFile | PartialDirectory;

const FileTree = ({ items }: { items: PartialItem[] }) => {
  const tree: Item[] = items.map((x) => mapItem(x, 0));

  return (
    <div
      style={{
        margin: "0.5em 0.5em 1em 0.5em",
      }}
    >
      <SubTree items={tree} />
    </div>
  );
};

const mapItem = (item: PartialItem, depth: number): Item => {
  if (item.hasOwnProperty("items")) {
    const { name, expanded = true, items = [] } = item as Directory;
    return {
      kind: "directory",
      name,
      depth,
      expanded,
      items: items.map((x) => mapItem(x, depth + 1)),
    } as Directory;
  }

  const name = typeof item === "string" ? item : item.name;
  return { kind: "file", name, depth } as File;
};

const Wrapper = styled.li<{ $depth: number }>`
  display: flex;
  align-items: center;
  list-style-type: none;

  transition: border 350ms ease 0s;

  border-left: ${(p) => p.$depth > 0 && `1.5px solid var(--color-gray-300)`};
  margin-left: ${(p) => p.$depth * 16}px;
  padding-left: 8px;

  &:last-of-type {
    margin-bottom: 4px;
  }

  &:not(&:last-of-type) {
    padding-bottom: 4px;
  }

  padding-top: 4px;
`;

const Name = styled.span`
  font-family: monospace;
  font-size: 15px;
  font-weight: 400;
  color: var(--color-gray-900);
`;

const NameWrapper = ({
  depth,
  icon,
  children,
  ...props
}: PropsWithChildren<{ depth: number; icon: JSX.Element }> & HTMLAttributes<HTMLLIElement>) => {
  return (
    <Wrapper $depth={depth} {...props}>
      <span
        style={{
          marginRight: 6,
        }}
      >
        {icon}
      </span>
      <Name>{children}</Name>
    </Wrapper>
  );
};

const File = ({ file: { name, depth } }: { file: File }) => {
  const extension = name.split(".").pop() || "";

  return (
    <NameWrapper depth={depth} icon={getIcon(extension)}>
      {name}
    </NameWrapper>
  );
};

const Directory = ({ directory: { name, depth, items, expanded } }: { directory: Directory }) => {
  const [isExpanded, setIsExpanded] = useState(expanded ?? false);

  return (
    <>
      <NameWrapper
        depth={depth}
        icon={getIcon(isExpanded ? "__openedFolder" : "__folder")}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseDown={(event) => {
          // Prevent double click selection, it's annoying with the click to expand
          if (event.detail === 2) {
            event.preventDefault();
          }
        }}
        style={{
          cursor: "pointer",
        }}
      >
        {name}
      </NameWrapper>
      {isExpanded && <SubTree items={items} />}
    </>
  );
};

const SubTree = ({ items }: { items: Item[] }) => {
  return (
    <ul>
      {items.map((item, i) => {
        if (item.kind === "file") {
          return <File key={`${item.name}-${i}`} file={item} />;
        }

        return <Directory key={`${item.name}-${i}`} directory={item} />;
      })}
    </ul>
  );
};

const getIcon = (() => {
  const cache = new Map<string, IconType | [IconType, string]>();

  cache.set("html", SiHtml5);
  cache.set("css", SiCss3);
  cache.set("js", SiJavascript);
  cache.set("ts", SiTypescript);
  cache.set("json", [MdDataObject, "#f0d436"]);
  cache.set("png", FaImage);
  cache.set("jpg", FaImage);
  cache.set("jpeg", FaImage);
  cache.set("gif", FaImage);
  cache.set("svg", FaImage);
  cache.set("ipynb", [SiJupyter, "#f57c00"]);
  cache.set("log", [FiFileText, "#afb42b"]);
  cache.set("h", [BiHeading, "#0288d1"]);
  cache.set("dat", [LuBinary, "#26a69a"]);

  cache.set("__folder", [FaFolder, "#ffca28"]);
  cache.set("__openedFolder", [FaFolderOpen, "#ffca28"]);

  return (key: string) => {
    if (cache.has(key)) {
      const res = cache.get(key)!;

      if (Array.isArray(res)) {
        if (res.length === 2) {
          const [Component, color] = res;
          return <Component color={color} />;
        }
      } else {
        const Component = res;
        return <Component />;
      }
    }

    return <FiFile />;
  };
})();

export default FileTree;
