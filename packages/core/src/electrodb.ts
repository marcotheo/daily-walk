import { dynamodbTable } from "./constants";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity } from "electrodb";
import dayjs from "dayjs";

export const client = new DynamoDBClient();

export const DailyVerse = new Entity(
  {
    model: {
      entity: "daily_verse",
      version: "1",
      service: "daily-walk",
    },
    attributes: {
      dateId: {
        type: "string",
        required: true,
      },
      verse: {
        type: "string",
        required: true,
      },
      reference: {
        type: "string",
        required: true,
      },
      reflection: {
        type: "string",
        required: true,
      },
      createdAt: {
        type: "number",
        required: true,
        default: dayjs().unix(),
      },
    },
    indexes: {
      byDate: {
        pk: {
          field: "pk",
          composite: ["dateId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  { client, table: dynamodbTable }
);

export const LoginAttempts = new Entity(
  {
    model: {
      entity: "login_attempts",
      version: "1",
      service: "daily-walk",
    },
    attributes: {
      username: {
        type: "string",
        required: true,
      },
      attempts: {
        type: "number",
        required: true,
      },
      expireAt: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      byUsername: {
        pk: {
          field: "pk",
          composite: ["username"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  { client, table: dynamodbTable }
);
