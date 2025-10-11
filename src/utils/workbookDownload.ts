import { WorkbookData } from "@/contexts/WorkbookContext";

export const generateWorkbook0Content = (localData: any): string => {
  const timestamp = new Date().toLocaleString();
  
  return `
==============================================
WORKBOOK 0: FIND YOUR WHITE SPACE
The 45 Minute Market Opportunity Sprint
Generated: ${timestamp}
==============================================

SECTION 1: THE PROBLEM WORTH SOLVING
-----------------------------------------
What's the biggest cost (time/money/stress) in your industry?
${localData.cost || 'Not answered'}

What bandaid solution are people using now?
${localData.bandaid || 'Not answered'}


SECTION 2: COMPETITIVE ANALYSIS
-----------------------------------------
${localData.competitors?.map((comp: any, i: number) => `
Competitor ${i + 1}: ${comp.name || 'Not specified'}
Promise: ${comp.promise || 'Not specified'}
Price: ${comp.price || 'Not specified'}
What they miss: ${comp.miss || 'Not specified'}
`).join('\n') || 'No competitors analyzed'}

Pattern across competitors:
${localData.pattern || 'Not answered'}


SECTION 3: YOUR OPPORTUNITY
-----------------------------------------
AI Analysis Response:
${localData.competitiveAnalysisResponse || 'Not generated'}

Identified Opportunities:
${localData.opportunities?.map((opp: string, i: number) => `${i + 1}. ${opp}`).join('\n') || 'None identified'}


SECTION 4: QUICK MATH
-----------------------------------------
Price: ${localData.quickMathPrice || 'Not set'}
Cost: ${localData.quickMathCost || 'Not set'}
Margin Ratio: ${localData.quickMathRatio || 'Not calculated'}


SECTION 5: BUSINESS MODEL CANVAS
-----------------------------------------
Who you serve: ${localData.businessModel?.who || 'Not defined'}
Problem: ${localData.businessModel?.problem || 'Not defined'}
Solution: ${localData.businessModel?.solution || 'Not defined'}
How you deliver: ${localData.businessModel?.delivery || 'Not defined'}
How they find you: ${localData.businessModel?.discovery || 'Not defined'}
Price: ${localData.businessModel?.price || 'Not defined'}
Costs: ${localData.businessModel?.costs || 'Not defined'}
Revenue per customer: ${localData.businessModel?.revenue || 'Not calculated'}
Gross margin: ${localData.businessModel?.margin || 'Not calculated'}


SECTION 6: ONE CLEAR SENTENCE
-----------------------------------------
${localData.whitespaceStatement || 'Not completed'}

==============================================
End of Workbook 0
==============================================
`.trim();
};

export const generateWorkbook1Content = (data: WorkbookData): string => {
  const timestamp = new Date().toLocaleString();
  
  return `
==============================================
WORKBOOK 1: BRAND STRATEGY FOUNDATION
Build the Foundation That Makes Marketing Easier
Generated: ${timestamp}
==============================================

BRAND FOUNDATION
-----------------------------------------
Mission: ${data.mission || 'Not defined'}
Vision (5 Year): ${data.vision5Year || 'Not defined'}
BHAG (10 Year): ${data.bhag10Year || 'Not defined'}
Brand Promise: ${data.brandPromise || 'Not defined'}


CORE VALUES
-----------------------------------------
${data.coreValues?.map((cv: any, i: number) => `
Value ${i + 1}: ${cv.value || 'Not specified'}
Shows up as: ${cv.showsUpAs || 'Not specified'}
`).join('\n') || 'No values defined'}


BRAND PILLARS
-----------------------------------------
${data.brandPillars?.map((bp: any, i: number) => `
Pillar ${i + 1}: ${bp.pillar || 'Not specified'}
Shows up: ${bp.showsUp || 'Not specified'}
Proof: ${bp.proof || 'Not specified'}
`).join('\n') || 'No pillars defined'}


BRAND VOICE
-----------------------------------------
Brand Voice IS: ${data.brandVoiceAre || 'Not defined'}
Brand Voice IS NOT: ${data.brandVoiceNot || 'Not defined'}


MESSAGING
-----------------------------------------
Tagline: ${data.tagline || 'Not defined'}
One-Liner: ${data.oneLiner || 'Not defined'}
Positioning Statement: ${data.positioningStatement || 'Not defined'}
Brand Story: ${data.brandStory || 'Not defined'}


TARGET AUDIENCE
-----------------------------------------
Demographics: ${data.targetAudience?.demographics || 'Not defined'}
Pain Points: ${data.targetAudience?.painPoints || 'Not defined'}
Where to Find: ${data.targetAudience?.whereToFind || 'Not defined'}


VISUAL IDENTITY
-----------------------------------------
Primary Color: ${data.primaryColor || 'Not set'}
Secondary Color: ${data.secondaryColor || 'Not set'}
Tertiary Color: ${data.tertiaryColor || 'Not set'}
Accent Color: ${data.accentColor || 'Not set'}

Primary Font: ${data.primaryFont || 'Not defined'}
Secondary Font: ${data.secondaryFont || 'Not defined'}
Accent Font: ${data.accentFont || 'Not defined'}
Heading Font: ${data.headingFont || 'Not defined'}
Subhead Font: ${data.subHeadFont || 'Not defined'}
Body Font: ${data.bodyFont || 'Not defined'}

Photography Style: ${data.photographyStyle || 'Not defined'}

==============================================
End of Workbook 1
==============================================
`.trim();
};

export const generateWorkbook2Content = (data: WorkbookData): string => {
  const timestamp = new Date().toLocaleString();
  
  return `
==============================================
WORKBOOK 2: MARKETING STRATEGY EXECUTION
Turn Your Brand into a Revenue-Generating Machine
Generated: ${timestamp}
==============================================

STRATEGIC FOUNDATION
-----------------------------------------
Value Proposition: ${data.valueProposition || 'Not defined'}
Customer Segments: ${data.customerSegments || 'Not defined'}


STRATEGIC CONTEXT (4Cs)
-----------------------------------------
Company Strengths: ${data.companyStrengths || 'Not defined'}
Category Opportunity: ${data.categoryOpportunity || 'Not defined'}
Customer Insights: ${data.customerInsights || 'Not defined'}
Competition Gap: ${data.competitionGap || 'Not defined'}
Context/Trend: ${data.contextTrend || 'Not defined'}


VALUE LADDER & PRICING
-----------------------------------------
Free Offer: ${data.valueLadder?.free || 'Not defined'}
Core Offer: ${data.valueLadder?.core || 'Not defined'}

Pricing Model: ${data.pricingModel || 'Not defined'}
Your Price: ${data.yourPrice || 'Not defined'}
Pricing Tiers: ${data.pricingTiers || 'Not defined'}

Fixed Costs: ${data.fixedCosts || 'Not defined'}
Variable Cost: ${data.variableCost || 'Not defined'}
Break Even: ${data.breakEven || 'Not defined'}


DISTRIBUTION CHANNELS
-----------------------------------------
Primary Channel: ${data.primaryChannel || 'Not defined'}
Secondary Channel: ${data.secondaryChannel || 'Not defined'}
Channel to Cut: ${data.channelToCut || 'Not defined'}


CONTENT STRATEGY
-----------------------------------------
Content Pillars: ${data.contentPillars || 'Not defined'}
Primary Platform: ${data.primaryPlatform || 'Not defined'}
Content Mix: ${data.contentMix || 'Not defined'}

==============================================
End of Workbook 2
==============================================
`.trim();
};

export const generateWorkbook3Content = (data: WorkbookData): string => {
  const timestamp = new Date().toLocaleString();
  
  return `
==============================================
WORKBOOK 3: CUSTOMER JOURNEY & SYSTEMS
Turn Leads into Loyal Customers with Automation
Generated: ${timestamp}
==============================================

CUSTOMER JOURNEY STAGES
-----------------------------------------
${data.journeyStages?.map((stage: any, i: number) => `
Stage ${i + 1}: ${stage.stage || 'Not specified'}
Action: ${stage.action || 'Not specified'}
Metric: ${stage.metric || 'Not specified'}
`).join('\n') || 'Journey not mapped'}


2-2-2 FOLLOW-UP SYSTEM
-----------------------------------------
Day 2 Follow-up: ${data.followUpSystem?.day2 ? 'Enabled' : 'Not set'}
Week 2 Follow-up: ${data.followUpSystem?.week2 ? 'Enabled' : 'Not set'}
Month 2 Follow-up: ${data.followUpSystem?.month2 ? 'Enabled' : 'Not set'}


AUTOMATION & SYSTEMS
-----------------------------------------
Email Automation: ${data.emailAutomation || 'Not defined'}
Key SOP: ${data.keySOP || 'Not defined'}
Customer Health Score: ${data.customerHealthScore ? 'Enabled' : 'Not set'}
Satisfaction Tracking: ${data.satisfactionTracking ? 'Enabled' : 'Not set'}


LOYALTY & REFERRALS
-----------------------------------------
Loyalty Tiers: ${data.loyaltyTiers || 'Not defined'}
Referral System: ${data.referralSystem || 'Not defined'}

==============================================
End of Workbook 3
==============================================
`.trim();
};

export const generateWorkbook4Content = (data: WorkbookData): string => {
  const timestamp = new Date().toLocaleString();
  
  return `
==============================================
WORKBOOK 4: MEASUREMENT, SCALING & GROWTH
Transform Data into Decisions and Scale What Works
Generated: ${timestamp}
==============================================

KEY METRICS
-----------------------------------------
Revenue: ${data.revenue || 'Not set'}
CAC (Customer Acquisition Cost): ${data.cac || 'Not set'}
LTV (Lifetime Value): ${data.ltv || 'Not set'}
LTV:CAC Ratio: ${data.ltvCacRatio || 'Not calculated'}


CUSTOMER SUCCESS METRICS
-----------------------------------------
Satisfaction Score: ${data.satisfactionScore || 'Not set'}
Repeat Purchase Rate: ${data.repeatPurchaseRate || 'Not set'}
Referral Rate: ${data.referralRate || 'Not set'}


LEADING INDICATORS
-----------------------------------------
${data.leadingIndicators?.map((li: any, i: number) => `
Indicator ${i + 1}: ${li.indicator || 'Not specified'}
Target: ${li.target || 'Not specified'}
`).join('\n') || 'No leading indicators defined'}

==============================================
End of Workbook 4
==============================================
`.trim();
};

export const downloadWorkbook = (content: string, workbookNumber: number) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `BLKBLD-Workbook-${workbookNumber}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};