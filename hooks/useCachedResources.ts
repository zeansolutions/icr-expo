import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding before resources are loaded
SplashScreen.preventAutoHideAsync();

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Preload images
        const imageAssets = cacheImages([
          require("../assets/images/yourImage.png"),
          // Add more images if needed
        ]);

        // Preload fonts
        const fontAssets = Font.loadAsync({
          "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
          // Add more fonts if needed
        });

        // Wait for all assets to load
        await Promise.all([...imageAssets, fontAssets]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // Hide splash screen once resources are loaded
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

// Helper to cache images
function cacheImages(images: any[]) {
  return images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
}
