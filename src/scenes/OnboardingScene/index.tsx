import React from "react";
import { Image, Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Onboarding from "react-native-onboarding-swiper";

import Text from "@components/Text";

import icons from "@icons";
import styles from "./styles";
import colors from "@colors";
import { useOnboardingScene } from "./hooks/useOnboardingScene";

const OnboardingScene = () => {
  const { method, state } = useOnboardingScene();
  const { onboardingContent, onboardingRef, currentPage, totalPage } = state;
  const { skipOnboarding, goToPage, goNext, getCurrentPage } = method;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.black} barStyle="light-content" />

      <Text style={styles.skipText} onPress={skipOnboarding}>
        Skip
      </Text>

      <Onboarding
        ref={onboardingRef}
        pages={onboardingContent.map((item) => {
          const { image, ...rest } = item;
          return {
            ...rest,
            image: (
              <Image
                source={image}
                style={styles.image}
                resizeMode="contain"
              />
            ),
          };
        })}
        pageIndexCallback={getCurrentPage}
        showPagination={false}
        containerStyles={styles.containerStyles}
        imageContainerStyles={styles.imageContainerStyles}
        titleStyles={styles.title}
        subTitleStyles={styles.description}
      />

      <View style={styles.nextButtonContainer}>
        <View style={styles.indicatorContainer}>
          {[...Array(totalPage).keys()].map((item) => (
            <Pressable key={`${item}`} onPress={() => goToPage(item)}>
              <View
                style={[
                  styles.indicator,
                  item === currentPage && styles.activeIndicator,
                ]}
              />
            </Pressable>
          ))}
        </View>
        <Pressable onPress={goNext} hitSlop={8}>
          <Image source={icons.rightRounded} style={styles.rightIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScene;
