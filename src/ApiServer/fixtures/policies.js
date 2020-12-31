const policies = [
  {
    id: "5cd49adff6ea74a9bb6adef3",
    createdDate: "2019-06-21T00:00:00.000+0000",
    name: "Tyson's Policy",
    teamId: "5a8b331e262a70306622df73",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [
          {
            metric: "lines",
            operator: "",
            value: "10",
          },
          {
            metric: "complexity",
            operator: "",
            value: "1000",
          },
        ],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [
          {
            type: "maven",
            artifact: "commons-.*",
            version: ".*",
          },
          {
            type: "maven",
            artifact: "jackson-annotator",
            version: "1.8.9",
          },
        ],
      },
      {
        policyTemplateId: "5cdd8667f6ea74a9bbaf5022",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8425f6ea74a9bbaf2fe6",
        rules: [],
      },
      {
        policyTemplateId: "7J-RGvV",
        rules: [],
      },
    ],
    stages: ["dev"],
  },
  {
    createdDate: "2019-06-21T00:00:00.000+0000",
    name: "Timss",
    teamId: "5a8b331e262a70306622df73",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [
          {
            value: "sdfgsdfg",
            operator: "less than",
            metric: "complexity",
          },
        ],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [
          {
            version: " asdfasdf",
            artifact: "asdasdf`",
            type: "maven",
          },
        ],
      },
    ],
    stages: ["dev"],
    id: "R4nuqJE",
  },
  {
    createdDate: "2019-06-21T00:00:00.000+0000",
    name: "New Policy",
    teamId: "5a8b331e262a70306622df73",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [],
      },
    ],
    stages: [],
    id: "XIkcXao",
  },
  {
    createdDate: "2019-06-21T00:00:00.000+0000",
    name: "asdasdf",
    teamId: "5a8b331e262a70306622df74",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [
          {
            metric: "issues-blocker",
            operator: "less than",
            value: "1",
          },
        ],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8667f6ea74a9bbaf5022",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8425f6ea74a9bbaf2fe6",
        rules: [],
      },
    ],
    stages: [],
    id: "SaYOqFW",
  },
  {
    name: "Testing here",
    teamId: "5a8b331e262a70306622df74",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8667f6ea74a9bbaf5022",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8425f6ea74a9bbaf2fe6",
        rules: [],
      },
    ],
    id: "VW0bFow",
  },
  {
    name: "Hello sir",
    teamId: "5a8b331f262a70306622df7d",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [
          {
            metric: "issues-total",
            operator: "equal",
            "": "asdfasdf",
          },
        ],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8667f6ea74a9bbaf5022",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8425f6ea74a9bbaf2fe6",
        rules: [],
      },
    ],
    id: "5q_9KNG",
  },
  {
    name: "sasdsad",
    teamId: "ragfmBK",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8667f6ea74a9bbaf5022",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8425f6ea74a9bbaf2fe6",
        rules: [],
      },
      {
        policyTemplateId: "7J-RGvV",
        rules: [],
      },
    ],
    id: "DuAPM69",
  },
  {
    name: "asdasd",
    teamId: "5a8b331e262a70306622df73",
    definitions: [
      {
        policyTemplateId: "5cd49777f6ea74a9bb6ac629",
        rules: [],
      },
      {
        policyTemplateId: "5cd498f3f6ea74a9bb6ad0f3",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8667f6ea74a9bbaf5022",
        rules: [],
      },
      {
        policyTemplateId: "5cdd8425f6ea74a9bbaf2fe6",
        rules: [],
      },
      {
        policyTemplateId: "7J-RGvV",
        rules: [],
      },
    ],
    id: "0ur7wh5",
  },
];

export default policies;
