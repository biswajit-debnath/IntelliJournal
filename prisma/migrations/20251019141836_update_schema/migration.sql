-- DropForeignKey
ALTER TABLE "public"."Analysis" DROP CONSTRAINT "Analysis_entryId_fkey";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "openAIApiHitCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "openAIApiLimit" INTEGER NOT NULL DEFAULT 15;

-- AddForeignKey
ALTER TABLE "public"."Analysis" ADD CONSTRAINT "Analysis_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "public"."JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
