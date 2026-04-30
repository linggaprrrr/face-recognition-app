import { TurboModuleRegistry } from 'react-native';

// react-native-screenshot-prevent v1.2.2 spreads the TurboModule object when
// constructing its default export. In the New Architecture, TurboModule JSI
// methods are not enumerable, so the spread silently drops them — leaving
// `RNScreenshotPrevent.enabled` as undefined at runtime.
//
// Fix: call the TurboModule directly without going through the library wrapper.
const native = TurboModuleRegistry.get<{ enabled: (enable: boolean) => void }>(
  'RNScreenshotPrevent',
);

let count = 0;

export function setScreenshotPrevention(enable: boolean): void {
  if (enable) {
    count++;
    if (count === 1) {
      native?.enabled(true);
    }
  } else {
    count = Math.max(0, count - 1);
    if (count === 0) {
      native?.enabled(false);
    }
  }
}
