/*
  Warnings:

  - You are about to drop the `FtpEmpresal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FtpEmpresal";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FtpEmpresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ftpServerId" INTEGER NOT NULL,
    CONSTRAINT "FtpEmpresa_ftpServerId_fkey" FOREIGN KEY ("ftpServerId") REFERENCES "FtpServer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
