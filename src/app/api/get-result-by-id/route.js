// File: /src/app/api/get-result-by-id/route.js   (Next.js App Router)
import { MongoClient } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const idLast8 = searchParams.get("idLast8");

    if (!idLast8 || idLast8.length !== 8) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "idLast8 (exactly 8 hex chars) query parameter is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("confidence-archetype");
    const collection = db.collection("results");

    // Use an $expr to compare the last 8 chars of the stringified _id:
    const filter = {
      $expr: {
        $eq: [
          // Take the substring of _id.toString() starting at index 16, length 8
          { $substr: [{ $toString: "$_id" }, 16, 8] },
          idLast8,
        ],
      },
    };

    const resultDoc = await collection.findOne(filter);
    await client.close();

    if (!resultDoc) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No result found for that ID segment",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Convert the ObjectId into a string before sending
    const result = {
      ...resultDoc,
      _id: resultDoc._id.toString(),
    };

    return new Response(
      JSON.stringify({ success: true, result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("GET /api/get-result-by-id error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
