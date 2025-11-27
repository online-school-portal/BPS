import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

// GET all results
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const results = await db.collection("results").find().toArray();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new results (multiple subjects at once)
router.post("/", async (req, res) => {
  try {
    const { studentId, className, results } = req.body;
    if (!studentId || !className || !results) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const db = getDB();

    // Convert results object to array of documents
    const resultDocs = Object.keys(results).map(subject => ({
      studentId,
      className,
      subject,
      test1: results[subject].test1 || 0,
      test2: results[subject].test2 || 0,
      exam: results[subject].exam || 0,
      total: results[subject].total || 0,
      grade: results[subject].grade || "",
      createdAt: new Date(),
    }));

    await db.collection("results").insertMany(resultDocs);

    res.status(201).json({ success: true, message: "Results saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;