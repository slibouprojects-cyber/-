// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var db = new Database(path.join(__dirname, "database.sqlite"));
try {
  const tableInfo = db.prepare("PRAGMA table_info(registrations)").all();
  const hasType = tableInfo.some((col) => col.name === "type");
  if (tableInfo.length > 0 && !hasType) {
    console.log("Updating database schema: Dropping old registrations table...");
    db.exec("DROP TABLE registrations");
  }
  const refreshedInfo = db.prepare("PRAGMA table_info(registrations)").all();
  if (refreshedInfo.length > 0 && !refreshedInfo.some((col) => col.name === "age")) {
    db.exec("ALTER TABLE registrations ADD COLUMN age INTEGER");
    console.log("Migration: added 'age' column to registrations.");
  }
} catch (e) {
}
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- 'attendee', 'exhibitor', 'organizer', etc.
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    age INTEGER,
    educationLevel TEXT,
    interests TEXT, -- JSON string for attendees
    companyName TEXT,
    industry TEXT,
    position TEXT,
    website TEXT,
    participationType TEXT, -- 'sponsoring' or 'exhibition'
    package TEXT, -- sponsoring package or booth type
    description TEXT,
    photo TEXT, -- Base64 string for the user's photo
    username TEXT, -- For organizers
    password TEXT, -- For organizers
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    logo TEXT NOT NULL,
    url TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL, -- 'hall', 'workshop', 'lecture', 'activity'
    location TEXT,
    startTime TEXT,
    endTime TEXT,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS activity_attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activityId INTEGER NOT NULL,
    registrationId INTEGER NOT NULL,
    attendedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activityId) REFERENCES activities(id),
    FOREIGN KEY (registrationId) REFERENCES registrations(id)
  )
`);
var seedData = () => {
  const count = db.prepare("SELECT COUNT(*) as count FROM registrations").get();
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO registrations (type, fullName, email, phone, address, companyName, industry, position, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const dummyData = [
      ["attendee", "\u0623\u062D\u0645\u062F \u0645\u062D\u0645\u062F", "ahmed@example.com", "0550123456", "\u0627\u0644\u062C\u0632\u0627\u0626\u0631", "\u0634\u0631\u0643\u0629 \u0627\u0644\u062A\u0642\u0646\u064A\u0629", "IT", "\u0645\u0647\u0646\u062F\u0633", "approved"],
      ["attendee", "\u0633\u0627\u0631\u0629 \u0639\u0644\u064A", "sara@example.com", "0660123456", "\u0648\u0647\u0631\u0627\u0646", "\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u0623\u0645\u0644", "Education", "\u0645\u062F\u064A\u0631\u0629", "approved"],
      ["exhibitor", "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u0648\u0631", "contact@alnoor.dz", "0770123456", "\u0633\u0637\u064A\u0641", "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u0648\u0631 \u0644\u0644\u062E\u062F\u0645\u0627\u062A", "Services", "\u0645\u062F\u064A\u0631 \u062A\u062C\u0627\u0631\u064A", "approved"],
      ["exhibitor", "\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644", "info@future.dz", "0555123456", "\u0642\u0633\u0646\u0637\u064A\u0646\u0629", "\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644 \u0644\u0644\u062A\u062C\u0627\u0631\u0629", "Trade", "\u0631\u0626\u064A\u0633 \u0642\u0633\u0645", "approved"],
      ["organizer", "\u064A\u0627\u0633\u064A\u0646 \u0628\u0646 \u0639\u0644\u064A", "yacine@event.dz", "0666123456", "\u0627\u0644\u062C\u0632\u0627\u0626\u0631", "\u0644\u062C\u0646\u0629 \u0627\u0644\u062A\u0646\u0638\u064A\u0645", "Events", "\u0645\u0634\u0631\u0641", "approved"],
      ["organizer", "\u0644\u064A\u0644\u0649 \u0639\u062B\u0645\u0627\u0646\u064A", "layla@event.dz", "0777123456", "\u0627\u0644\u062C\u0632\u0627\u0626\u0631", "\u0644\u062C\u0646\u0629 \u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644", "Events", "\u0645\u0646\u0633\u0642\u0629", "approved"]
    ];
    for (const data of dummyData) {
      insert.run(...data);
    }
    console.log("Database seeded with dummy data.");
  }
  const activitiesCount = db.prepare("SELECT COUNT(*) as count FROM activities").get();
  if (activitiesCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO activities (title, type, location, startTime, endTime, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const dummyActivities = [
      ["\u0642\u0627\u0639\u0629 \u0627\u0644\u0645\u062D\u0627\u0636\u0631\u0627\u062A \u0627\u0644\u0643\u0628\u0631\u0649", "hall", "\u0627\u0644\u0637\u0627\u0628\u0642 \u0627\u0644\u0623\u0648\u0644", "09:00", "17:00", "\u0627\u0644\u0642\u0627\u0639\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0644\u0644\u0645\u0624\u062A\u0645\u0631\u0627\u062A"],
      ["\u0648\u0631\u0634\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A", "workshop", "\u0627\u0644\u0642\u0627\u0639\u0629 102", "10:00", "12:00", "\u0645\u0642\u062F\u0645\u0629 \u0641\u064A \u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A"],
      ["\u0645\u062D\u0627\u0636\u0631\u0629 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631 \u0641\u064A \u0627\u0644\u062C\u0646\u0648\u0628", "lecture", "\u0642\u0627\u0639\u0629 \u0627\u0644\u0646\u062F\u0648\u0627\u062A", "14:00", "15:30", "\u0641\u0631\u0635 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631 \u0641\u064A \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062C\u0646\u0648\u0628\u064A\u0629"],
      ["\u0646\u0634\u0627\u0637 \u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644", "activity", "\u0627\u0644\u0628\u0647\u0648 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", "16:00", "18:00", "\u062C\u0644\u0633\u0629 \u062A\u0639\u0627\u0631\u0641 \u0628\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u062B\u0645\u0631\u064A\u0646"]
    ];
    for (const data of dummyActivities) {
      insert.run(...data);
    }
    console.log("Activities seeded.");
  }
  const settingsCount = db.prepare("SELECT COUNT(*) as count FROM site_settings").get();
  if (settingsCount.count === 0) {
    const insert = db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?)");
    const defaultSettings = [
      ["title", "\u0645\u0639\u0631\u0636 \u0627\u0644\u0642\u0631\u0627\u0631\u0629 \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A"],
      ["edition", "\u0627\u0644\u0637\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629"],
      ["year", "2026"],
      ["heroTitle", "\u0645\u0639\u0631\u0636 \u0627\u0644\u0642\u0631\u0627\u0631\u0629 \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A"],
      ["heroSubtitle", "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631 \u0648\u0627\u0644\u062A\u0628\u0627\u062F\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0641\u064A \u0627\u0644\u062C\u0646\u0648\u0628 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A"],
      ["footerText", "\u0641\u064A \u0625\u0637\u0627\u0631 \u062F\u0639\u0645 \u0627\u0644\u062D\u0631\u0643\u064A\u0629 \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0648\u062A\u0634\u062C\u064A\u0639 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631 \u0648\u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u0645\u0646\u062A\u0648\u062C \u0627\u0644\u0648\u0637\u0646\u064A\u060C \u064A\u0634\u0631\u0641\u0646\u0627 \u0623\u0646 \u0646\u062F\u0639\u0648\u0643\u0645 \u0644\u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u0641\u064A \u0645\u0639\u0631\u0636 \u0627\u0644\u0642\u0631\u0627\u0631\u0629 \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A \u2013 \u0627\u0644\u0637\u0628\u0639\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629"],
      ["contactAddress", "\u0645\u062D\u0644\u0627\u062A \u0627\u0644\u0628\u0644\u062F\u064A\u0629 \u2013 \u062D\u064A \u0627\u0644\u0639\u0642\u064A\u062F \u0644\u0637\u0641\u064A \u2013 \u0627\u0644\u0642\u0631\u0627\u0631\u0629"],
      ["contactEmail", "guerraraexpo@gmail.com"],
      ["contactPhone", "0553107814"],
      ["headerHome", "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629"],
      ["headerProgram", "\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C"],
      ["headerLogin", "\u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u064A\u0646"],
      ["headerRegister", "\u0633\u062C\u0644 \u0627\u0644\u0622\u0646"],
      ["headerImage", "https://fastly.picsum.photos/id/200/200/200.jpg?hmac=FEtVtwDe1Lw5Wf-TLq6Lx-TgX_grSLX4lB7WvjRzroA"],
      ["expoLogo", "/logo.png"],
      ["socialLinks", JSON.stringify([
        { id: 1, platform: "facebook", url: "#", icon: "Facebook" },
        { id: 2, platform: "instagram", url: "#", icon: "Instagram" },
        { id: 3, platform: "twitter", url: "#", icon: "Twitter" }
      ])]
    ];
    for (const [key, value] of defaultSettings) {
      insert.run(key, value);
    }
  }
  const galleryCount = db.prepare("SELECT COUNT(*) as count FROM gallery").get();
  if (galleryCount.count === 0) {
    const insert = db.prepare("INSERT INTO gallery (url) VALUES (?)");
    insert.run("https://picsum.photos/seed/expo1/800/600");
    insert.run("https://picsum.photos/seed/expo2/800/600");
    insert.run("https://picsum.photos/seed/expo3/800/600");
  }
  const partnersCount = db.prepare("SELECT COUNT(*) as count FROM partners").get();
  if (partnersCount.count === 0) {
    const insert = db.prepare("INSERT INTO partners (name, logo) VALUES (?, ?)");
    insert.run("Sponsor 1", "https://picsum.photos/seed/sponsor1/100/100");
    insert.run("Sponsor 2", "https://picsum.photos/seed/sponsor2/100/100");
  }
};
seedData();
async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5e3;
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.get("/api/settings", (req, res) => {
    try {
      const settings = db.prepare("SELECT * FROM site_settings").all();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });
  app.post("/api/settings", (req, res) => {
    const data = req.body;
    try {
      const insert = db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)");
      const transaction = db.transaction((payload) => {
        if (payload.settings && Array.isArray(payload.settings)) {
          for (const s of payload.settings) {
            insert.run(s.key, s.value);
          }
        } else {
          for (const key in payload) {
            insert.run(key, payload[key]);
          }
        }
      });
      transaction(data);
      res.json({ message: "Settings updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });
  app.get("/api/gallery", (req, res) => {
    try {
      const images = db.prepare("SELECT * FROM gallery ORDER BY createdAt DESC").all();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });
  app.post("/api/gallery", (req, res) => {
    const { url } = req.body;
    try {
      const result = db.prepare("INSERT INTO gallery (url) VALUES (?)").run(url);
      res.json({ id: result.lastInsertRowid, url });
    } catch (error) {
      res.status(500).json({ error: "Failed to add image" });
    }
  });
  app.delete("/api/gallery/:id", (req, res) => {
    const id = req.params.id;
    try {
      db.prepare("DELETE FROM gallery WHERE id = ?").run(id);
      res.json({ message: "Image deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  });
  app.get("/api/partners", (req, res) => {
    try {
      const partners = db.prepare("SELECT * FROM partners ORDER BY createdAt DESC").all();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });
  app.post("/api/partners", (req, res) => {
    const { name, logo, url } = req.body;
    try {
      const result = db.prepare("INSERT INTO partners (name, logo, url) VALUES (?, ?, ?)").run(name, logo, url);
      res.json({ id: result.lastInsertRowid, name, logo, url });
    } catch (error) {
      res.status(500).json({ error: "Failed to add partner" });
    }
  });
  app.delete("/api/partners/:id", (req, res) => {
    const id = req.params.id;
    try {
      db.prepare("DELETE FROM partners WHERE id = ?").run(id);
      res.json({ message: "Partner deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete partner" });
    }
  });
  app.get("/api/search", (req, res) => {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    const searchTerm = `%${q}%`;
    try {
      const results = db.prepare(`
        SELECT * FROM registrations 
        WHERE fullName LIKE ? 
        OR companyName LIKE ? 
        OR address LIKE ? 
        OR phone LIKE ? 
        OR email LIKE ?
        OR type LIKE ?
      `).all(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Search failed" });
    }
  });
  app.get("/api/admin/registrations", (req, res) => {
    try {
      const registrations = db.prepare("SELECT * FROM registrations ORDER BY createdAt DESC").all();
      res.json(registrations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  app.put("/api/admin/registration/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {
      type,
      fullName,
      email,
      phone,
      address,
      age,
      educationLevel,
      interests,
      companyName,
      industry,
      position,
      website,
      participationType,
      package: pkg,
      description,
      photo,
      status,
      username,
      password
    } = req.body;
    try {
      const stmt = db.prepare(`
        UPDATE registrations SET 
          type = ?, fullName = ?, email = ?, phone = ?, address = ?, age = ?,
          educationLevel = ?, interests = ?, companyName = ?, industry = ?, 
          position = ?, website = ?, participationType = ?, package = ?, 
          description = ?, photo = ?, status = ?, username = ?, password = ?
        WHERE id = ?
      `);
      stmt.run(
        type,
        fullName,
        email,
        phone,
        address,
        age || null,
        educationLevel,
        interests ? JSON.stringify(interests) : null,
        companyName,
        industry,
        position,
        website,
        participationType,
        pkg,
        description,
        photo,
        status,
        username || null,
        password || null,
        id
      );
      res.json({ message: "Update successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update registration." });
    }
  });
  app.delete("/api/admin/registration/:id", (req, res) => {
    const id = parseInt(req.params.id);
    try {
      db.prepare("DELETE FROM registrations WHERE id = ?").run(id);
      res.json({ message: "Deletion successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete registration." });
    }
  });
  app.get("/api/activities", (req, res) => {
    try {
      const activities = db.prepare("SELECT * FROM activities ORDER BY createdAt DESC").all();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });
  app.post("/api/activities", (req, res) => {
    const { title, type, location, startTime, endTime, description } = req.body;
    try {
      const result = db.prepare(`
        INSERT INTO activities (title, type, location, startTime, endTime, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(title, type, location, startTime, endTime, description);
      res.json({ id: result.lastInsertRowid, title, type, location, startTime, endTime, description });
    } catch (error) {
      res.status(500).json({ error: "Failed to add activity" });
    }
  });
  app.put("/api/activities/:id", (req, res) => {
    const id = req.params.id;
    const { title, type, location, startTime, endTime, description } = req.body;
    try {
      db.prepare(`
        UPDATE activities SET title = ?, type = ?, location = ?, startTime = ?, endTime = ?, description = ?
        WHERE id = ?
      `).run(title, type, location, startTime, endTime, description, id);
      res.json({ message: "Activity updated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update activity" });
    }
  });
  app.delete("/api/activities/:id", (req, res) => {
    const id = req.params.id;
    try {
      db.prepare("DELETE FROM activities WHERE id = ?").run(id);
      res.json({ message: "Activity deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete activity" });
    }
  });
  app.post("/api/organizer/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0646\u0627\u0642\u0635\u0629" });
    if (username === "admin" && password === "Gexpo@2026") {
      return res.json({ id: 0, fullName: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645", type: "organizer", username: "admin" });
    }
    try {
      const organizer = db.prepare(
        "SELECT id, fullName, type, username FROM registrations WHERE username = ? AND password = ? AND type IN ('organizer', 'security')"
      ).get(username, password);
      if (!organizer) return res.status(401).json({ error: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629" });
      res.json(organizer);
    } catch (error) {
      res.status(500).json({ error: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645" });
    }
  });
  app.get("/api/attendance/activity/:activityId", (req, res) => {
    const activityId = req.params.activityId;
    try {
      const attendees = db.prepare(`
        SELECT aa.id, aa.attendedAt, r.id as registrationId, r.fullName, r.type, r.companyName, r.photo, r.phone,
          (${activityId} || '-' || printf('%04d', r.id)) as badgeId
        FROM activity_attendance aa
        JOIN registrations r ON aa.registrationId = r.id
        WHERE aa.activityId = ?
        ORDER BY aa.attendedAt DESC
      `).all(activityId);
      res.json(attendees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "\u0641\u0634\u0644 \u0641\u064A \u062C\u0644\u0628 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0636\u0648\u0631" });
    }
  });
  app.post("/api/attendance/by-badge", (req, res) => {
    const { activityId, badgeId } = req.body;
    if (!activityId || !badgeId) return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0646\u0627\u0642\u0635\u0629" });
    const idMatch = badgeId.match(/\d+$/);
    if (!idMatch) return res.status(400).json({ error: "\u0635\u064A\u063A\u0629 \u0627\u0644\u0640 ID \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629" });
    const registrationId = parseInt(idMatch[0]);
    try {
      const registration = db.prepare("SELECT * FROM registrations WHERE id = ?").get(registrationId);
      if (!registration) return res.status(404).json({ error: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062C\u0644" });
      const existing = db.prepare("SELECT * FROM activity_attendance WHERE activityId = ? AND registrationId = ?").get(activityId, registrationId);
      if (existing) {
        return res.json({ message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0645\u0633\u0628\u0642\u0627\u064B", alreadyAttended: true, registration });
      }
      db.prepare("INSERT INTO activity_attendance (activityId, registrationId) VALUES (?, ?)").run(activityId, registrationId);
      res.json({ message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D", alreadyAttended: false, registration });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "\u0641\u0634\u0644 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631" });
    }
  });
  app.post("/api/attendance/by-phone", (req, res) => {
    const { activityId, phone } = req.body;
    if (!activityId || !phone) return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0646\u0627\u0642\u0635\u0629" });
    try {
      const registration = db.prepare("SELECT * FROM registrations WHERE phone = ?").get(phone);
      if (!registration) return res.status(404).json({ error: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0633\u062C\u0644 \u0628\u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645" });
      const existing = db.prepare("SELECT * FROM activity_attendance WHERE activityId = ? AND registrationId = ?").get(activityId, registration.id);
      if (existing) {
        return res.json({ message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0645\u0633\u0628\u0642\u0627\u064B", alreadyAttended: true, registration });
      }
      db.prepare("INSERT INTO activity_attendance (activityId, registrationId) VALUES (?, ?)").run(activityId, registration.id);
      res.json({ message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0628\u0646\u062C\u0627\u062D", alreadyAttended: false, registration });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "\u0641\u0634\u0644 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0636\u0648\u0631" });
    }
  });
  app.post("/api/attendance", (req, res) => {
    const { activityId, registrationId } = req.body;
    try {
      const existing = db.prepare("SELECT * FROM activity_attendance WHERE activityId = ? AND registrationId = ?").get(activityId, registrationId);
      if (existing) {
        return res.json({ message: "Already attended", alreadyAttended: true });
      }
      const result = db.prepare("INSERT INTO activity_attendance (activityId, registrationId) VALUES (?, ?)").run(activityId, registrationId);
      res.json({ id: result.lastInsertRowid, message: "Attendance recorded" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to record attendance" });
    }
  });
  app.get("/api/attendance/user/:registrationId", (req, res) => {
    const registrationId = req.params.registrationId;
    try {
      const attendance = db.prepare(`
        SELECT a.*, act.title, act.type, act.location, act.startTime, act.endTime
        FROM activity_attendance a
        JOIN activities act ON a.activityId = act.id
        WHERE a.registrationId = ?
        ORDER BY a.attendedAt DESC
      `).all(registrationId);
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  });
  app.get("/api/admin/attendance", (req, res) => {
    try {
      const attendance = db.prepare(`
        SELECT a.*, r.fullName, r.type as registrantType, act.title as activityTitle, act.type as activityType
        FROM activity_attendance a
        JOIN registrations r ON a.registrationId = r.id
        JOIN activities act ON a.activityId = act.id
        ORDER BY a.attendedAt DESC
      `).all();
      res.json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  });
  app.get("/api/registration/:id", (req, res) => {
    const idStr = req.params.id;
    const idMatch = idStr.match(/\d+$/);
    if (!idMatch) return res.status(400).json({ error: "Invalid ID format" });
    const id = parseInt(idMatch[0]);
    try {
      const registration = db.prepare("SELECT * FROM registrations WHERE id = ?").get(id);
      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }
      res.json(registration);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  app.post("/api/register", (req, res) => {
    const {
      type,
      fullName,
      email,
      phone,
      address,
      age,
      educationLevel,
      interests,
      companyName,
      industry,
      position,
      website,
      participationType,
      package: pkg,
      description,
      photo,
      username,
      password
    } = req.body;
    if (!fullName || !phone || !type) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    try {
      const existing = db.prepare("SELECT id FROM registrations WHERE phone = ? OR email = ?").get(phone, email);
      if (existing) {
        return res.status(400).json({ error: "\u0639\u0630\u0631\u0627\u064B\u060C \u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B." });
      }
      const stmt = db.prepare(`
        INSERT INTO registrations (
          type, fullName, email, phone, address, age, educationLevel, interests,
          companyName, industry, position, website, participationType, package, description, photo,
          username, password
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(
        type,
        fullName,
        email,
        phone,
        address,
        age || null,
        educationLevel,
        interests ? JSON.stringify(interests) : null,
        companyName,
        industry,
        position,
        website,
        participationType,
        pkg,
        description,
        photo,
        username || null,
        password || null
      );
      res.status(201).json({
        message: "Registration successful!",
        id: result.lastInsertRowid,
        fullName,
        type,
        photo
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to register." });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    }
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
