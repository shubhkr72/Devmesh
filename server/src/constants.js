export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/devtinder";

export const ALLOWED_EDIT_FIELDS = [
  "name",
  "age",
  "gender",
  "skills",
  "about",
];

export const USER_SAFE_DATA = [
  "name",
  "username",
  "age",
  "gender",
  "about",
  "skills",
  "createdAt",
  "updatedAt",
  "_id",
];
