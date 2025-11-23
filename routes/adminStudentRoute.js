import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

// ============================
// GET all students (full admin data)
// ============================
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const students = await db.collection("admin_students").find().toArray();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================
// POST register a NEW student (full details)
// ============================
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      studentId,
      dateOfBirth,
      nationality,
      parentName,
      parentPhone,
      guardianName,
      guardianPhone,
      lga,
      studentClass,
    } = req.body;

    if (!fullName || !studentId || !dateOfBirth || !studentClass) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const db = getDB();

    // prevent duplicate studentId
    const exists = await db.collection("admin_students").findOne({ studentId });
    if (exists) {
      return res.status(400).json({ message: "Student ID already exists" });
    }

    const newStudent = await db.collection("admin_students").insertOne({
      fullName,
      studentId,
      dateOfBirth,
      nationality,
      parentName,
      parentPhone,
      guardianName,
      guardianPhone,
      lga,
      studentClass,
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================
// POST transfer student to a new class
// ============================
router.post("/transfer-class", async (req, res) => {
  try {
    const { studentId, newClass } = req.body;

    if (!studentId || !newClass) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const db = getDB();

    const update = await db.collection("admin_students").findOneAndUpdate(
      { studentId },
      { $set: { studentClass: newClass } },
      { returnDocument: "after" }
    );

    if (!update.value) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ success: true, updatedStudent: update.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
