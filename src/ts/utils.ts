import { Feed } from "feed";
import { Frontmatter } from "@components/MDXContent";
import type { ReactNode } from "react";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(date: Date | string): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const MONTHS = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return function (...args: any[]) {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(null, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export function stringifyChildren(children: ReactNode): string {
  if (!children) {
    return "";
  }

  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number" || typeof children === "boolean") {
    return children.toString();
  }

  if (Array.isArray(children)) {
    return children.map(stringifyChildren).join("");
  }

  if (typeof children === "object") {
    if ("props" in children) {
      if ("children" in children.props) {
        return stringifyChildren(children.props.children);
      }
    }
  }

  return "";
}

type Value = string | number | boolean;

type Obj = {
  [key: string | number]: Value | Object;
};

type FlatObj = {
  [key: string]: string;
};

function lowerFirst(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function keysToVariables(object: Obj, prefix: string = ""): FlatObj {
  function fn<T extends keyof Obj>(acc: FlatObj, [key, val]: [T, Obj[T]]): FlatObj {
    const newKey = key
      .toString()
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase();

    if (typeof val === "object" && val !== null) {
      return Object.entries(val)
        .map(([key, val]) => [`${newKey}-${lowerFirst(key)}`, val] as [string, Value])
        .reduce(fn, acc);
    }

    acc[newKey] = `${val}`;

    return acc;
  }

  return Object.entries(object)
    .map(
      ([key, val]) =>
        [`--${prefix.length > 0 ? prefix.toLowerCase() + "-" : ""}${lowerFirst(key)}`, val] as [
          string,
          Value
        ]
    )
    .reduce(fn, {} as FlatObj);
}

export const roundTo = (number: number, places = 0) =>
  Math.round(number * 10 ** places) / 10 ** places;

export function isBase64(str: string) {
  try {
    return Buffer.from(str, "base64").toString("base64") === str;
  } catch {
    return false;
  }
}



export const generateFeed = async (posts: Frontmatter[], kind: string) => {
  const feed = new Feed({
    title: "Jelmar's blog",
    id: "https://jelmar.eu/blog",
    link: "https://jelmar.eu/blog",
    description: "Jelmar's blog feed",
    favicon: "http://jelmar.eu/favicon.ico",
    language: "en",
    copyright: `All rights reserved ${new Date(Date.now()).getFullYear()}, Jelmar Gerritsen`,
    feedLinks: {
      json: "https://jelmar.eu/json",
      atom: "https://jelmar.eu/atom",
      rss: "https://jelmar.eu/rss",
    },
    author: {
      name: "Jelmar Gerritsen",
      email: "jelmargerritsen@gmail.com",
      link: "https://jelmar.eu",
    },
  });

  feed.addCategory("Science");

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `https://jelmar.eu/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
      image: post.image ? `https://jelmar.eu${post.image.src}` : undefined,
    });
  });

  if (kind === "atom") {
    return feed.atom1();
  }

  if (kind === "json") {
    return feed.json1();
  }

  if (kind === "rss") {
    return feed.rss2();
  }
};
