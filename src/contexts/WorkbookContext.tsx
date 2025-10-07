import React, { createContext, useContext, useState, useEffect } from 'react';

interface WorkbookData {
  // Workbook 0 - Market Opportunity
  whiteSpaceDeclaration: string;
  targetCustomer: string;
  customerProblem: string;
  solution: string;
  
  // Workbook 1 - Brand Identity
  mission: string;
  vision5Year: string;
  bhag10Year: string;
  coreValues: Array<{ value: string; showsUpAs: string }>;
  brandPromise: string;
  brandPillars: Array<{ pillar: string; showsUp: string; proof: string }>;
  brandVoiceAre: string;
  brandVoiceNot: string;
  tagline: string;
  oneLiner: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  accentColor: string;
  primaryFont: string;
  secondaryFont: string;
  accentFont: string;
  photographyStyle: string;
  headingFont: string;
  subHeadFont: string;
  bodyFont: string;
  brandStory: string;
  positioningStatement: string;
  targetAudience: {
    demographics: string;
    painPoints: string;
    whereToFind: string;
  };
  
  // Workbook 2 - Marketing Strategy
  valueProposition: string;
  revenueStreams: string;
  keyActivities: string;
  customerSegments: string;
  companyStrengths: string;
  categoryOpportunity: string;
  customerInsights: string;
  competitionGap: string;
  contextTrend: string;
  valueLadder: {
    free: string;
    core: string;
  };
  pricingModel: string;
  fixedCosts: string;
  variableCost: string;
  yourPrice: string;
  breakEven: string;
  pricingTiers: string;
  primaryChannel: string;
  secondaryChannel: string;
  channelToCut: string;
  contentPillars: string;
  primaryPlatform: string;
  contentMix: string;
  
  // Workbook 3 - Customer Journey
  journeyStages: Array<{ stage: string; action: string; metric: string }>;
  followUpSystem: {
    day2: boolean;
    week2: boolean;
    month2: boolean;
  };
  emailAutomation: string;
  keySOP: string;
  customerHealthScore: boolean;
  loyaltyTiers: string;
  referralSystem: string;
  satisfactionTracking: boolean;
  
  // Workbook 4 - Metrics (not used in foundational blueprint)
  leadingIndicators: Array<{ indicator: string; target: string }>;
  revenue: string;
  cac: string;
  ltv: string;
  ltvCacRatio: string;
  satisfactionScore: string;
  repeatPurchaseRate: string;
  referralRate: string;
}

interface WorkbookContextType {
  data: WorkbookData;
  updateData: (field: keyof WorkbookData, value: any) => void;
  getBlueprintData: () => WorkbookData;
}

const defaultData: WorkbookData = {
  whiteSpaceDeclaration: '',
  targetCustomer: '',
  customerProblem: '',
  solution: '',
  mission: '',
  vision5Year: '',
  bhag10Year: '',
  coreValues: [],
  brandPromise: '',
  brandPillars: [],
  brandVoiceAre: '',
  brandVoiceNot: '',
  tagline: '',
  oneLiner: '',
  primaryColor: '',
  secondaryColor: '',
  tertiaryColor: '',
  accentColor: '',
  primaryFont: '',
  secondaryFont: '',
  accentFont: '',
  photographyStyle: '',
  headingFont: '',
  subHeadFont: '',
  bodyFont: '',
  brandStory: '',
  positioningStatement: '',
  targetAudience: {
    demographics: '',
    painPoints: '',
    whereToFind: '',
  },
  valueProposition: '',
  revenueStreams: '',
  keyActivities: '',
  customerSegments: '',
  companyStrengths: '',
  categoryOpportunity: '',
  customerInsights: '',
  competitionGap: '',
  contextTrend: '',
  valueLadder: {
    free: '',
    core: '',
  },
  pricingModel: '',
  fixedCosts: '',
  variableCost: '',
  yourPrice: '',
  breakEven: '',
  pricingTiers: '',
  primaryChannel: '',
  secondaryChannel: '',
  channelToCut: '',
  contentPillars: '',
  primaryPlatform: '',
  contentMix: '',
  journeyStages: [],
  followUpSystem: {
    day2: false,
    week2: false,
    month2: false,
  },
  emailAutomation: '',
  keySOP: '',
  customerHealthScore: false,
  loyaltyTiers: '',
  referralSystem: '',
  satisfactionTracking: false,
  leadingIndicators: [],
  revenue: '',
  cac: '',
  ltv: '',
  ltvCacRatio: '',
  satisfactionScore: '',
  repeatPurchaseRate: '',
  referralRate: '',
};

const WorkbookContext = createContext<WorkbookContextType | undefined>(undefined);

export const WorkbookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WorkbookData>(() => {
    const saved = localStorage.getItem('workbookData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('workbookData', JSON.stringify(data));
  }, [data]);

  const updateData = (field: keyof WorkbookData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const getBlueprintData = () => data;

  return (
    <WorkbookContext.Provider value={{ data, updateData, getBlueprintData }}>
      {children}
    </WorkbookContext.Provider>
  );
};

export const useWorkbook = () => {
  const context = useContext(WorkbookContext);
  if (!context) {
    throw new Error('useWorkbook must be used within WorkbookProvider');
  }
  return context;
};
