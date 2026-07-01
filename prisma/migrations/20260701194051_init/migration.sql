-- CreateEnum
CREATE TYPE "ProspectStatus" AS ENUM ('new', 'analyzed', 'email_drafted', 'contacted', 'replied', 'audit_booked', 'proposal_sent', 'won', 'lost');

-- CreateTable
CREATE TABLE "Prospect" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "website" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "googlePlaceId" TEXT,
    "googleMapsUrl" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "status" "ProspectStatus" NOT NULL DEFAULT 'new',
    "opportunityScore" INTEGER,
    "leadQuality" TEXT,
    "estimatedHoursSaved" TEXT,
    "estimatedProjectValue" TEXT,
    "estimatedMonthlyRevenue" TEXT,
    "recommendedBixSolution" TEXT,
    "executiveSummary" TEXT,
    "services" JSONB,
    "targetCustomers" JSONB,
    "customerJourney" JSONB,
    "detectedSoftware" JSONB,
    "manualProcesses" JSONB,
    "painPoints" JSONB,
    "automationOpportunities" JSONB,
    "businessImpact" JSONB,
    "recommendedBixSolutions" JSONB,
    "coldEmailDraft" TEXT,
    "linkedinMessage" TEXT,
    "salesTalkingPoints" JSONB,
    "notes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProspectActivity" (
    "id" TEXT NOT NULL,
    "prospectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProspectActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAnalysisJob" (
    "id" TEXT NOT NULL,
    "prospectId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIAnalysisJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prospect_googlePlaceId_key" ON "Prospect"("googlePlaceId");

-- CreateIndex
CREATE INDEX "Prospect_status_idx" ON "Prospect"("status");

-- CreateIndex
CREATE INDEX "Prospect_opportunityScore_idx" ON "Prospect"("opportunityScore");

-- CreateIndex
CREATE INDEX "Prospect_website_idx" ON "Prospect"("website");

-- CreateIndex
CREATE INDEX "ProspectActivity_prospectId_idx" ON "ProspectActivity"("prospectId");

-- CreateIndex
CREATE INDEX "AIAnalysisJob_prospectId_idx" ON "AIAnalysisJob"("prospectId");

-- CreateIndex
CREATE INDEX "AIAnalysisJob_status_idx" ON "AIAnalysisJob"("status");

-- AddForeignKey
ALTER TABLE "ProspectActivity" ADD CONSTRAINT "ProspectActivity_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAnalysisJob" ADD CONSTRAINT "AIAnalysisJob_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "Prospect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
