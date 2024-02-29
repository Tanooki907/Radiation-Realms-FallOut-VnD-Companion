import db from "@/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const username = req.body.username;
      try {
  

        const chars = await db.char.find(username);
  
        // Send a success response
        res.status(200).json(chars);
      } catch (error) {
        console.error("Error:", error);
        // Send an error response
        res.status(500).json({ message: "Failed" });
      }
    } else {
      // Send a method not allowed response
      res.status(405).json({ message: "Method not allowed" });
    }
  } // 