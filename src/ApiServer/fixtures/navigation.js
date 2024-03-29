/* eslint-disable no-template-curly-in-string */
const navigation = {
  navigation: [
    {
      name: "Launchpad",
      url: "${BASE_LAUNCH_ENV_URL}/launchpad",
    },
    {
      name: "Status",
      url: "${BASE_LAUNCH_ENV_URL}/status",
    },
    {
      name: "Docs",
      url: "${BASE_LAUNCH_ENV_URL}/docs",
    },
    {
      name: "Admin",
      url: "${BASE_LAUNCH_ENV_URL}/admin",
    },
  ],
  features: {
    "notifications.enabled": false,
  },
  platform: {
    name: "IBM Boomerang Platform",
    platformName: "Boomerang",
    version: "5.0.0",
    signOutUrl: "ibm.com",
    displayLogo: true,
  },
};

export default navigation;
