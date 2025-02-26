/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,type]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_name_type_key" ON "Account"("userId", "name", "type");
