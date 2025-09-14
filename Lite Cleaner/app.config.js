export default {
  expo: {
    name: "Lite Cleaner",
    slug: "lite-cleaner",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "dark",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#0d0f1a"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.litecleaner.app"
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#0d0f1a"
      },
      package: "com.litecleaner.app"
    },
    web: {
      bundler: "metro"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true
    }
  }
};
