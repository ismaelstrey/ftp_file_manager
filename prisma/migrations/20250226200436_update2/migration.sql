-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FtpEmpresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN DEFAULT true,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "ftpServerId" INTEGER NOT NULL,
    CONSTRAINT "FtpEmpresa_ftpServerId_fkey" FOREIGN KEY ("ftpServerId") REFERENCES "FtpServer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FtpEmpresa" ("active", "createdAt", "ftpServerId", "id", "name") SELECT "active", "createdAt", "ftpServerId", "id", "name" FROM "FtpEmpresa";
DROP TABLE "FtpEmpresa";
ALTER TABLE "new_FtpEmpresa" RENAME TO "FtpEmpresa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
