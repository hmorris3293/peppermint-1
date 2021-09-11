/*
  Warnings:

  - You are about to drop the column `hostname` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Monitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Monitor" DROP COLUMN "hostname",
DROP COLUMN "type";
