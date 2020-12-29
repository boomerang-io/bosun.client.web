export enum PlatformRole {
  Admin = "admin",
  Auditor = "auditor",
  Operator = "operator",
  User = "user",
}

export interface StringKeyObject {
  [key: string]: string;
};

export interface FormikSetFieldValue {
  (id: string, value: string | Array<string> | boolean | undefined | Array<any> | void): void;
  value: string;
  type?: string;
}
/**
 * CICD general
 */
export interface CICDUser {
  id: string;
  email: string;
  name: string;
  isFirstVisit: boolean;
  type: string;
  hasConsented: boolean;
  isShowHelp: boolean;
  firstLoginDate: string | number;
  lastLoginDate: string | number;
  lowerLevelGroupIds: Array<string>;
  pinnedToolIds: Array<string>;
  favoritePackages: Array<any>;
  personalizations: any;
  notificationSettings: any;
}

export interface PlatformNavigation {
  navigation: Array<{ name: string; url: string }>;
  features: any;
  platform: {
    version: string;
    name: string;
    signOutUrl: string;
    communityUrl: string;
    platformName: string;
    displayLogo: boolean;
    privateTeams: boolean;
    sendMail: boolean;
  };
  featuredServices: Array<any>;
}

type CICDNavigationItemType = "link" | "category";

export interface CICDNavigationItem {
  icon?: string;
  name: string;
  link: string;
  type: CICDNavigationItemType;
  childLinks: CICDNavigationItem[];
}

export interface CICDTeam {
  id: string;
  name: string;
  higherLevelGroupId: string;
  ucdApplicationId: string;
  isActive: boolean;
  enableComponentCreation: string;
  userRoles: Array<string>;
  settings: any;
  audits: Array<any>;
  boomerangTeamName: string;
  boomerangTeamShortname: string;
}

export interface PolicyData {
  id: string;
  createdDate: string;
  name: string;
  teamId: string;
  definitions: {
      policyTemplateId: string;
      rules: {
          metric: string;
          operator: string;
          value: string;
      }[];
  }[];
  stages: string[];
}

export interface PolicyInput {
  id?: string;
  key: string;
  label: string;
  type: string;
  defaultValue: string;
  required: boolean;
  description: string;
  options: string[];
}

export interface PolicyDefinition {
  id: string;
  key: string;
  createdDate: string;
  name: string;
  description: string;
  order: number;
  rego: string;
  labels: string[];
  rules: Array<PolicyInput>;
}

export interface ValidateInfo {
  policyId: string;
  referenceId: null;
  referenceLink: null;
  labels: {
      "artifact-path": string;
      "artifact-name": string;
      "artifact-version": string;
      "sonarqube-id": string;
      "sonarqube-version": string;
  };
  annotations: null;
  data: null;
}
