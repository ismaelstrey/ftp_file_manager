/*
  Warnings:

  - You are about to drop the `FtpDirectory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `ftpServerId` on the `FtpEmpresa` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FtpDirectory";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FtpEmpresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN DEFAULT true,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FtpEmpresa" ("active", "createdAt", "id", "name") SELECT "active", "createdAt", "id", "name" FROM "FtpEmpresa";
DROP TABLE "FtpEmpresa";
ALTER TABLE "new_FtpEmpresa" RENAME TO "FtpEmpresa";
CREATE TABLE "new_FtpServer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 21,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ftpDirectory" TEXT,
    "ftp_empresaId" INTEGER,
    CONSTRAINT "FtpServer_ftp_empresaId_fkey" FOREIGN KEY ("ftp_empresaId") REFERENCES "FtpEmpresa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FtpServer" ("active", "createdAt", "host", "id", "name", "password", "port", "username") SELECT "active", "createdAt", "host", "id", "name", "password", "port", "username" FROM "FtpServer";
DROP TABLE "FtpServer";
ALTER TABLE "new_FtpServer" RENAME TO "FtpServer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
