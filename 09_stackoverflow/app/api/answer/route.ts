import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";
import { UserPrefs } from "@/store/Auth";

export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();

    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId,
        questionId,
      }
    );

    // Increase author reputation by 1 point
    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs(authorId, {
      ...prefs,
      reputation: Number(prefs.reputation) + 1,
    });

    return NextResponse.json({
      message: "Answer submitted successfully",
      data: response,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
