import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createQuestionCollection from "./question.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    // Check if the database exists
    await databases.get(db);
    console.log(`Database '${db}' already exists.`);
  } catch (error) {
    try {
      // Database does not exist, create it
      await databases.create(db, db);
      console.log(`Database '${db}' created successfully.`);
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("All collections created successfully.");
    } catch (creationError) {
      console.error("Error creating database or collections:", creationError);
    }
  }
  return databases;
}
