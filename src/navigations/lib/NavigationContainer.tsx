import React, { memo, Suspense, useEffect, useState } from "react";
import { NavigationContainer as ReactNavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./NavigationAction";
import { SceneKey, Scenes } from "@navigations";
import { useLazyGetMeQuery } from "@redux/services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/slice/user-slice";

const Stack = createNativeStackNavigator();

const InitialMainRoute = () => {
  const dispatch = useDispatch();
  const [trigger] = useLazyGetMeQuery();
  const [initialRoute, setInitialRoute] = useState<string>("LOADING");


  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token === "logout") setInitialRoute(SceneKey.LOGIN_SCENE);
      else if (token) {
        const authMe = await trigger();
        if (authMe.isSuccess) {
          dispatch(setUser(authMe?.data));
          setInitialRoute(SceneKey.HOME_SCENE);
        } else {
          setInitialRoute(SceneKey.LOGIN_SCENE);
        }
      } else {
        setInitialRoute(SceneKey.ONBOARDING_SCENE);
      }
    };

    checkToken();
  }, [trigger]);

  if (initialRoute === "LOADING") {
    // TODO : change loading scene
    return <View />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerBackTitle: "",
        headerShadowVisible: false,
      }}
      initialRouteName={initialRoute}
    >
      {Scenes.ListAllScreen}
    </Stack.Navigator>
  );
};

export const NavigationContainer = () => (
  <ReactNavigationContainer ref={navigationRef}>
    <Suspense fallback={<ActivityIndicator />}>
      <InitialMainRoute />
    </Suspense>
  </ReactNavigationContainer>
);

export default memo(NavigationContainer);
