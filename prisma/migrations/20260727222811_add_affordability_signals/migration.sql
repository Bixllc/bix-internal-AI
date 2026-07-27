-- AlterTable
ALTER TABLE "Prospect" ADD COLUMN     "affordabilityConfidence" TEXT,
ADD COLUMN     "affordabilityRationale" TEXT,
ADD COLUMN     "affordabilityScore" INTEGER,
ADD COLUMN     "affordabilitySignals" JSONB,
ADD COLUMN     "affordabilityTier" TEXT,
ADD COLUMN     "estimatedAnnualRevenue" TEXT,
ADD COLUMN     "estimatedTeamSize" TEXT,
ADD COLUMN     "growthSignals" JSONB;

-- CreateIndex
CREATE INDEX "Prospect_affordabilityScore_idx" ON "Prospect"("affordabilityScore");
