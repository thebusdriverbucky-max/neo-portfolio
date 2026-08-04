import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Префикс для всех ключей в этом проекте
export const REDIS_PREFIX = "neo-portfolio:";

/**
 * Вспомогательная функция для добавления префикса к ключу
 */
export const withPrefix = (key: string) => `${REDIS_PREFIX}${key}`;
