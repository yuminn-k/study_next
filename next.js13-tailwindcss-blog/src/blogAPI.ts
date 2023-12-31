import { notFound } from "next/navigation";
import { Article } from "./types";

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" }); // SSR. force-cache: SSG, default. next: { revalidate: 10 }: ISR.

  if (!res.ok) {
    throw new Error("エラーが発生しました。"); // エラー処理
  }

  await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5秒待つ

  const articles = await res.json(); // 文字列化
  return articles;
};

export const getDetailArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    next: { revalidate: 60 },
  }); // ISR

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("エラーが発生しました。"); // エラー処理
  }

  await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5秒待つ

  const article = await res.json(); // 文字列化
  return article;
};

export const createArticle = async (
  id: string,
  title: string,
  content: string
): Promise<Article> => {
  const currentDatetime = new Date().toISOString();

  const res = await fetch(`http://localhost:3001/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, content, createdAt: currentDatetime }),
  }); // ISR

  if (!res.ok) {
    throw new Error("エラーが発生しました。"); // エラー処理
  }

  await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5秒待つ

  const newArticle = await res.json(); // 文字列化
  return newArticle;
};

export const deleteArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    method: "DELETE",
  }); // ISR

  if (!res.ok) {
    throw new Error("エラーが発生しました。"); // エラー処理
  }

  await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5秒待つ

  const deleteArticle = await res.json(); // 文字列化
  return deleteArticle;
};
