import { Article } from "./types";

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" }); // SSR. force-cache: SSG, default. next: { revalidate: 10 }: ISR.

  const articles = await res.json(); // 文字列化
  return articles;
};
