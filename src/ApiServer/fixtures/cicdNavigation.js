const cicdNavigation = [
  {
    name: "Home",
    type: "link",
    icon: "Home16",
    link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/teams/:teamId",
  },
  {
    name: "Components",
    type: "link",
    icon: "Apps16",
    link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/teams/:teamId/components",
  },
  {
    name: "Pipelines",
    type: "link",
    icon: "Rocket16",
    link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/teams/:teamId/pipelines",
  },
  {
    name: "Scorecard",
    type: "link",
    icon: "ReportData16",
    link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/teams/:teamId/scorecard",
  },
  {
    name: "Insights",
    type: "link",
    icon: "Analytics16",
    link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/teams/:teamId/insights",
  },
  {
    name: "Lib",
    type: "link",
    icon: "Document16",
    link: "https://wdc2.cloud.boomerangplatform.net/dev/cicd/apps/lib",
  },
  {
    name: "Policies",
    type: "link",
    icon: "Locked16",
    link: "https://wdc2.cloud.boomerangplatform.net/dev/cicd/web/bosun",
  },
  {
    name: "Manage",
    type: "category",
    icon: "SettingsAdjust16",
    childLinks: [
      {
        name: "Policy Templates",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/dev/cicd/web/bosun",
      },
      {
        name: "Team Properties",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/teams/:teamId/properties",
      },
    ],
  },
  {
    name: "Workflows",
    type: "link",
    icon: "FlowData16",
    link: "https://wdc2.cloud.boomerangplatform.net/dev/cicd/apps/flow/workflows?teams=:teamId",
  },
  {
    name: "Administer",
    type: "category",
    icon: "Settings16",
    childLinks: [
      {
        name: "Component Modes",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/admin/component-modes",
      },
      {
        name: "Properties",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/admin/properties",
      },
      {
        name: "SCM Repositories",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/admin/repositories",
      },
      {
        name: "Settings",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/BMRG_APP_ROOT_CONTEXT/admin/settings",
      },
      {
        name: "Task Manager",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/dev/cicd/apps/flow/admin/task-templates",
      },
      {
        name: "System Workflows",
        type: "link",
        link: "https://wdc2.cloud.boomerangplatform.net/dev/cicd/apps/flow/admin/system-workflows",
      },
    ],
  },
];

export default cicdNavigation;
