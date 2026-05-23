import { useEffect, useState } from "react";
import remoteConfig from "@react-native-firebase/remote-config";
import DeviceInfo from "react-native-device-info";

const CACHE_EXPIRY_SECONDS = 3600; // 1 hour

export function useForceUpdate() {
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);

  useEffect(() => {
    async function checkVersion() {
      try {
        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: CACHE_EXPIRY_SECONDS * 1000,
        });
        await remoteConfig().setDefaults({ min_version_code: 0 });
        await remoteConfig().fetchAndActivate();

        const minVersionCode = remoteConfig()
          .getValue("min_version_code")
          .asNumber();
        const currentVersionCode = parseInt(DeviceInfo.getBuildNumber(), 10);

        setIsUpdateRequired(currentVersionCode < minVersionCode);
      } catch {
        // fail silently — never block user if remote config is unavailable
      }
    }

    checkVersion();
  }, []);

  return { isUpdateRequired };
}
