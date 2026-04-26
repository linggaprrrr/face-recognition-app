import * as NavigationAction from './lib/NavigationAction';
import * as SceneKey from './SceneKey';

import { MediaPreviewSceneProps } from '@scenes/MediaPreviewScene';

export const RESET = {
  type: 'reset',
};

export const pop = (props?: object) => NavigationAction.pop(props);

export function onboardingScene(props?: object) {
  NavigationAction.push(SceneKey.ONBOARDING_SCENE, props);
}

export function homeScene(props?: object) {
  NavigationAction.push(SceneKey.HOME_SCENE, props);
}

export function registerScene(props?: object) {
  NavigationAction.push(SceneKey.REGISTER_SCENE, props);
}

export function selfieScene(props?: object) {
  NavigationAction.push(SceneKey.SELFIE_SCENE, props);
}

export function termOfUseScene(props?: object) {
  NavigationAction.push(SceneKey.TERM_OF_USE_SCENE, props);
}

export function mediaPreviewScene(props: MediaPreviewSceneProps) {
  NavigationAction.push(SceneKey.MEDIA_PREVIEW_SCENE, props);
}

export function finishScene(props?: object) {
  NavigationAction.push(SceneKey.FINISH_SCENE, props);
}

export function profileScene(props?: object) {
  NavigationAction.push(SceneKey.PROFILE_SCENE, props);
}

export function editProfileScene(props?: object) {
  NavigationAction.push(SceneKey.EDIT_PROFILE_SCENE, props);
}

export function photoDetailScene(props?: object) {
  NavigationAction.push(SceneKey.PHOTO_DETAIL_SCENE, props);
}

export function loginScene(props?: object) {
  NavigationAction.push(SceneKey.LOGIN_SCENE, props);
}

export function searchScene(props?: object) {
  NavigationAction.push(SceneKey.SEARCH_SCENE, props);
}

export function cartScene(props?: object) {
  NavigationAction.push(SceneKey.CART_SCENE, props);
}

export function historyScene(props?: object) {
  NavigationAction.push(SceneKey.HISTORY_SCENE, props);
}

export function paymentScene(props?: object) {
  NavigationAction.push(SceneKey.PAYMENT_SCENE, props);
}