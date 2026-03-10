import { describe, it, expect } from "vitest";

/**
 * Tests the auto-fill template logic used across workbooks.
 * This validates the interpolation pattern: `${value || '[placeholder]'}`
 * which is the core mechanism for all AI prompt auto-fill.
 */

// Simulate the ICP Consumer Psychologist prompt builder
function buildICPConsumerPsychologistPrompt(data: {
  clientAge?: string;
  clientGender?: string;
  clientJobTitle?: string;
  clientLocation?: string;
  clientRelationship?: string;
  clientKids?: string;
  clientEducation?: string;
  clientIncome?: string;
  coreDesire?: string;
  threeWords?: string;
  inspires?: string;
  clientName?: string;
}) {
  return `Act as a senior consumer psychologist. I am building an Ideal Client Profile for my business. My best customers are ${data.clientAge || '[Age]'}-year-old ${data.clientGender || '[Gender]'} ${data.clientJobTitle || '[Job Title]'}s living in ${data.clientLocation || '[Location]'}, ${data.clientRelationship || '[Relationship Status]'}, ${data.clientKids || '[Kids]'}, ${data.clientEducation || '[Education]'}, earning ${data.clientIncome || '[Income]'}.

Their ONE primary desire is: ${data.coreDesire || '[paste from Life Force 8 above]'}
Their best friend describes them in 3 words: ${data.threeWords || '[3 words]'}
Who or what inspires them: ${data.inspires || '[who inspires them]'}

Flesh out a vivid profile for '${data.clientName || '[Name]'}'.

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`;
}

// Simulate the Workbook 0 Customer Research prompt builder
function buildCustomerResearchPrompt(data: {
  targetCustomer?: string;
  customerProblem?: string;
}) {
  return `I interviewed 5 ${data.targetCustomer || '[type of customers]'}. Here's what they said about ${data.customerProblem || '[problem]'}:

[Paste quotes/notes]

Analyze this and tell me:
1. What's the #1 problem they ALL mentioned?
2. What's this problem costing them in time or money?
3. What band-aid solutions are they using now?

Format as: Problem / Cost / Current Solution

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`;
}

// Simulate Workbook 0 Competitive Analysis prompt builder
function buildCompetitiveAnalysisPrompt(data: {
  targetCustomer?: string;
  competitors?: Array<{ name?: string; promise?: string; price?: string; miss?: string }>;
}) {
  const comps = data.competitors || [];
  return `Here are 3 competitors in ${data.targetCustomer ? `the market serving ${data.targetCustomer}` : '[your market]'}:
1. ${comps[0]?.name || '[Name]'} - Promise: ${comps[0]?.promise || '[What they promise]'}, Price: ${comps[0]?.price || '[Price]'}, Gap: ${comps[0]?.miss || '[What they miss]'}
2. ${comps[1]?.name || '[Name]'} - Promise: ${comps[1]?.promise || '[What they promise]'}, Price: ${comps[1]?.price || '[Price]'}, Gap: ${comps[1]?.miss || '[What they miss]'}
3. ${comps[2]?.name || '[Name]'} - Promise: ${comps[2]?.promise || '[What they promise]'}, Price: ${comps[2]?.price || '[Price]'}, Gap: ${comps[2]?.miss || '[What they miss]'}

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`;
}

describe("Workbook Auto-Fill Template Logic", () => {
  describe("ICP Consumer Psychologist Prompt", () => {
    it("fills all fields when data is provided", () => {
      const prompt = buildICPConsumerPsychologistPrompt({
        clientAge: "32",
        clientGender: "Female",
        clientJobTitle: "Marketing Manager",
        clientLocation: "Austin, TX",
        clientRelationship: "Married",
        clientKids: "2 kids",
        clientEducation: "MBA",
        clientIncome: "$120K",
        coreDesire: "Financial independence",
        threeWords: "ambitious, creative, driven",
        inspires: "Sara Blakely",
        clientName: "Jessica",
      });

      expect(prompt).toContain("32-year-old");
      expect(prompt).toContain("Female");
      expect(prompt).toContain("Marketing Managers");
      expect(prompt).toContain("Austin, TX");
      expect(prompt).toContain("Married");
      expect(prompt).toContain("2 kids");
      expect(prompt).toContain("MBA");
      expect(prompt).toContain("$120K");
      expect(prompt).toContain("Financial independence");
      expect(prompt).toContain("ambitious, creative, driven");
      expect(prompt).toContain("Sara Blakely");
      expect(prompt).toContain("'Jessica'");
      // Should NOT contain any placeholders
      expect(prompt).not.toContain("[Age]");
      expect(prompt).not.toContain("[Gender]");
      expect(prompt).not.toContain("[Name]");
    });

    it("uses placeholders when all data is empty", () => {
      const prompt = buildICPConsumerPsychologistPrompt({});

      expect(prompt).toContain("[Age]");
      expect(prompt).toContain("[Gender]");
      expect(prompt).toContain("[Job Title]");
      expect(prompt).toContain("[Location]");
      expect(prompt).toContain("[Relationship Status]");
      expect(prompt).toContain("[Kids]");
      expect(prompt).toContain("[Education]");
      expect(prompt).toContain("[Income]");
      expect(prompt).toContain("[Name]");
      expect(prompt).toContain("[3 words]");
    });

    it("mixes filled and placeholder values", () => {
      const prompt = buildICPConsumerPsychologistPrompt({
        clientAge: "28",
        clientName: "Alex",
        // leave others empty
      });

      expect(prompt).toContain("28-year-old");
      expect(prompt).toContain("'Alex'");
      expect(prompt).toContain("[Gender]");
      expect(prompt).toContain("[Location]");
    });

    it("includes citation footer", () => {
      const prompt = buildICPConsumerPsychologistPrompt({});
      expect(prompt).toContain("Cite your sources for each claim");
      expect(prompt).toContain("Flag any assumptions, inferences, or gaps");
    });
  });

  describe("Workbook 0 Customer Research Prompt", () => {
    it("fills target customer and problem", () => {
      const prompt = buildCustomerResearchPrompt({
        targetCustomer: "small business owners",
        customerProblem: "inconsistent revenue",
      });

      expect(prompt).toContain("5 small business owners");
      expect(prompt).toContain("about inconsistent revenue");
      expect(prompt).not.toContain("[type of customers]");
      expect(prompt).not.toContain("[problem]");
    });

    it("uses placeholders when empty", () => {
      const prompt = buildCustomerResearchPrompt({});

      expect(prompt).toContain("[type of customers]");
      expect(prompt).toContain("[problem]");
    });

    it("includes citation footer", () => {
      const prompt = buildCustomerResearchPrompt({});
      expect(prompt).toContain("Cite your sources for each claim");
    });
  });

  describe("Workbook 0 Competitive Analysis Prompt", () => {
    it("fills competitor data from array", () => {
      const prompt = buildCompetitiveAnalysisPrompt({
        targetCustomer: "freelance designers",
        competitors: [
          { name: "Canva", promise: "Easy design", price: "Free/$13/mo", miss: "No strategy" },
          { name: "Figma", promise: "Pro design", price: "$12/mo", miss: "Steep learning curve" },
          { name: "Adobe", promise: "Industry standard", price: "$55/mo", miss: "Expensive" },
        ],
      });

      expect(prompt).toContain("the market serving freelance designers");
      expect(prompt).toContain("Canva");
      expect(prompt).toContain("Easy design");
      expect(prompt).toContain("Free/$13/mo");
      expect(prompt).toContain("No strategy");
      expect(prompt).toContain("Figma");
      expect(prompt).toContain("Adobe");
      expect(prompt).not.toContain("[Name]");
      expect(prompt).not.toContain("[your market]");
    });

    it("uses placeholders with empty competitors", () => {
      const prompt = buildCompetitiveAnalysisPrompt({
        competitors: [{}, {}, {}],
      });

      expect(prompt).toContain("[your market]");
      expect(prompt).toContain("[What they promise]");
      expect(prompt).toContain("[Price]");
      expect(prompt).toContain("[What they miss]");
    });

    it("handles partial competitor data", () => {
      const prompt = buildCompetitiveAnalysisPrompt({
        targetCustomer: "coaches",
        competitors: [
          { name: "Competitor A" },
          {},
          { name: "Competitor C", price: "$99" },
        ],
      });

      expect(prompt).toContain("Competitor A");
      expect(prompt).toContain("Competitor C");
      expect(prompt).toContain("$99");
      // Second competitor should have all placeholders
      expect(prompt).toMatch(/2\. \[Name\]/);
    });
  });
});
