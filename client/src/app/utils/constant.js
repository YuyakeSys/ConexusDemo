// utils/constants.js
export const USER_TYPES = {
  COMPANY: "company",
  ENTREPRENEUR: "entrepreneur",
  CONSULTANT: "consultant",
};

export const API_URLS = {
  BASIC_URL: "http://127.0.0.1:3000/api/v1/",
  SERVER_URL: "http://127.0.0.1:3000",
};

export const INDUSTRY_AREAS = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "energy", label: "Energy" },
  { value: "transportation", label: "Transportation" },
  { value: "agriculture", label: "Agriculture" },
  { value: "construction", label: "Construction" },
  { value: "entertainment", label: "Entertainment" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "pharmaceutical", label: "Pharmaceutical" },
  { value: "real_estate", label: "Real Estate" },
  { value: "legal", label: "Legal" },
  { value: "tourism", label: "Tourism" },
  { value: "food_service", label: "Food Service" },
];

export const COMPANY_STATUS_OPTIONS = [
  { value: "Preparing", label: "Preparing" },
  { value: "Bootstrap", label: "Bootstrap" },
  { value: "Failed", label: "Failed" },
];
