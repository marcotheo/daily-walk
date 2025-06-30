export * as DailyVerse from "./daily-verse";

import dayjs from "dayjs";

import { OpenAI } from "./openai";
import { DailyVerse as DailyVerseEntity } from "./electrodb";

export const createDailyVerse = async (data: {
  dateId: string;
  verse: string;
  reference: string;
  reflection: string;
}) => {
  return await DailyVerseEntity.put(data).go();
};

export const getDailyVerse = async () => {
  const dateId = dayjs().format("YYYY-MM-DD");

  const result = await DailyVerseEntity.get({ dateId }).go({
    attributes: ["verse", "reference", "reflection"],
  });

  if (result.data) return result.data;

  const newDailyVerse = (await OpenAI.generateDailyVerse()) as NonNullable<
    NonNullable<typeof result>["data"]
  >;

  await createDailyVerse({
    dateId: dayjs().format("YYYY-MM-DD").toString(),
    verse: newDailyVerse.verse,
    reference: newDailyVerse.reference,
    reflection: newDailyVerse.reflection,
  });

  return newDailyVerse;
};
