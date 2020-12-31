const violations = [
  {
    id: "5cf144d17d5cc80001d190a25cf968648a6e7e0001eca0e75cfeae64876b210001c439145cedf589dd1be20001f3d994",
    policyId: "5cf144d17d5cc80001d190a2",
    policyName: "Glens Policy",
    policyActivityCreatedDate: "2019-06-13T20:47:41.265+0000",
    policyDefinitionTypes: ["Static Code Analysis", "Static Code Analysis"],
    nbrViolations: 1,
    violations: [],
    labels: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string",
    },
    annotations: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string",
    },
  },
  {
    id: "5cf144d17d5cc80001d190a25d07d9385aad240001ebcd345d07da2f5aad240001ebcf115cedf589dd1be20001f3d994",
    policyId: "5cf144d17d5cc80001d190a2",
    policyName: "Glens Policy",
    policyActivityCreatedDate: "2019-06-21T01:07:29.904+0000",
    policyDefinitionTypes: ["Static Code Analysis", "Unit Tests", "Static Code Analysis", "Unit Tests"],
    nbrViolations: 2,
    violations: [],
    labels: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string",
    },
  },
  {
    id: "5cf77086a814cf00017816355cedbec5dd1be20001f3d9425d404db031d6570001e8f0c35cedf589dd1be20001f3d994",
    policyId: "5cf77086a814cf0001781635",
    policyName: "Sorin Policy Def",
    policyActivityCreatedDate: "2019-09-11T00:00:00.000+0000",
    policyDefinitionTypes: [
      "Security Issue Analysis",
      "Package Safe List",
      "Security Issue Analysis",
      "Package Safe List",
    ],
    nbrViolations: 2,
    violations: [
      {
        metric: "^.*:commons-io:1.0$",
        message: "Package rule not met. Artifact: commons-io, and Version: 1.0",
        valid: false,
      },
      {
        metric: "^.*:commons-io:2.0$",
        message: "Package rule not met. Artifact: commons-io, and Version: 2.0",
        valid: false,
      },
      {
        metric: "^.*:commons-io:3.0$",
        message: "Package rule not met. Artifact: commons-io, and Version: 3.0",
        valid: false,
      },
    ],
    labels: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string",
    },
  },
  {
    id: "5cf144d17d5cc80001d190a25cf6892e411b910001eaa1d25d15ae53bc820b000115f1cf5cedf589dd1be20001f3d994",
    policyId: "5cf144d17d5cc80001d190a2",
    policyName: "Glens Policy",
    policyActivityCreatedDate: "2019-07-19T19:40:17.706+0000",
    policyDefinitionTypes: [
      "Static Code Analysis",
      "Unit Tests",
      "Security Issue Analysis",
      "Static Code Analysis",
      "Unit Tests",
      "Security Issue Analysis",
    ],
    nbrViolations: 3,
    violations: [],
    labels: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string",
    },
  },
];

export default violations;
