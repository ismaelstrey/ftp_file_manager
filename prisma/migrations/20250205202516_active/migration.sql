-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FtpServer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 21,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FtpServer" ("createdAt", "host", "id", "password", "port", "username") SELECT "createdAt", "host", "id", "password", "port", "username" FROM "FtpServer";
DROP TABLE "FtpServer";
ALTER TABLE "new_FtpServer" RENAME TO "FtpServer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
