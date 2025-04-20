/*
  Warnings:

  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "items" JSONB[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cart" JSONB[];

-- DropTable
DROP TABLE "OrderItem";
