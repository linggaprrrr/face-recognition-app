import React, { useEffect } from "react";
import NavigationContainer from "@navigations/lib/NavigationContainer";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AppInitializer from "@libs/app-initializer";
// import { CaptureProtection } from "react-native-capture-protection";

dayjs.locale("id");

GoogleSignin.configure({
  webClientId:
    '752429031621-d1cfp18vk039cjo1eq3qabrbclrcn136.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ["https://www.googleapis.com/auth/userinfo.email"], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: "", // [Android] specifies an account name on the device that should be used
  iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

function App(): React.JSX.Element {
  // const { protectionStatus, status, prevent } = useCaptureProtection();

  // useEffect(() => {
  //   CaptureProtection.prevent();
  // }, []);

  return (
    <Provider store={store}>
      <AppInitializer />
      <NavigationContainer />
      <Toast />
    </Provider>
  );
}

export default App;
