export * as DailyVerse from "./daily-verse";

import dayjs from "dayjs";
import { DailyVerse as DailyVerseEntity } from "./electrodb";

export const createDailyVerse = async (data: {
  dateId: string;
  verse: string;
  reference: string;
}) => {
  return await DailyVerseEntity.put(data).go();
};

export const getDailyVerse = async () => {
  const dateId = dayjs().format("YYYY-MM-DD");

  return DailyVerseEntity.get({ dateId }).go({
    attributes: ["verse", "reference"],
  });
};
