/*
  Warnings:

  - Added the required column `paymentId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentId" BIGINT NOT NULL;
