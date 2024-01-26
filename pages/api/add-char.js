import db from "@/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
  
      try {
  
        // Insert the location into the Favorite Locations table
        await db.char.testing();
  
        // Send a success response
        res.status(200).json({ message: "Success" });
      } catch (error) {
        console.error("Error:", error);
        // Send an error response
        res.status(500).json({ message: "Failed" });
      }
    } else {
      // Send a method not allowed response
      res.status(405).json({ message: "Method not allowed" });
    }
  }