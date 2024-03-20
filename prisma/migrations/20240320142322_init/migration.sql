/*
  Warnings:

  - Added the required column `email` to the `Regidter` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Regidter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Regidter" ("id", "password", "username") SELECT "id", "password", "username" FROM "Regidter";
DROP TABLE "Regidter";
ALTER TABLE "new_Regidter" RENAME TO "Regidter";
CREATE UNIQUE INDEX "Regidter_username_key" ON "Regidter"("username");
CREATE UNIQUE INDEX "Regidter_email_key" ON "Regidter"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
