import OnboardingScene from '@scenes/OnboardingScene';
import HomeScene from '@scenes/HomeScene';
import RegisterScene from '@scenes/RegisterScene';

import * as SceneKey from './SceneKey';
import { generateScene } from './lib/generator';
import SelfieScene from '@scenes/SelfieScene';
import TermOfUseScene from '@scenes/TermOfUseScene';
import MediaPreviewScene from '@scenes/MediaPreviewScene';
import FinishScene from '@scenes/FinishScene';
import ProfileScene from '@scenes/ProfileScene';
import EditProfileScene from '@scenes/EditProfileScene';
import PhotoDetailScene from '@scenes/PhotoDetailScene';
import LoginScene from '@scenes/LoginScene';
import SearchScane from '@scenes/SearchScene';
import CartScene from '@scenes/CartScene';
import HistoryScene from '@scenes/HistoryScene';
import PaymentScene from '@scenes/PaymentScene';

export const ListAllScreen = [
    generateScene({
        key: SceneKey.ONBOARDING_SCENE,
        component: OnboardingScene,
    }),
    generateScene({
        key: SceneKey.HOME_SCENE,
        component: HomeScene,
    }),
    generateScene({
        key: SceneKey.REGISTER_SCENE,
        component: RegisterScene,
    }),
    generateScene({
        key: SceneKey.SELFIE_SCENE,
        component: SelfieScene,
    }),
    generateScene({
        key: SceneKey.TERM_OF_USE_SCENE,
        component: TermOfUseScene,
    }),
    generateScene({
        key: SceneKey.MEDIA_PREVIEW_SCENE,
        component: MediaPreviewScene,
    }),
    generateScene({
        key: SceneKey.FINISH_SCENE,
        component: FinishScene,
    }),
    generateScene({
        key: SceneKey.PROFILE_SCENE,
        component: ProfileScene,
    }),
    generateScene({
        key: SceneKey.EDIT_PROFILE_SCENE,
        component: EditProfileScene,
    }),
    generateScene({
        key: SceneKey.PHOTO_DETAIL_SCENE,
        component: PhotoDetailScene,
    }),
    generateScene({
        key: SceneKey.LOGIN_SCENE,
        component: LoginScene,
    }),
    generateScene({
        key: SceneKey.SEARCH_SCENE,
        component: SearchScane,
        options:{
            animation: 'fade'
        }
    }),
    generateScene({
        key: SceneKey.CART_SCENE,
        component: CartScene,
    }),
    generateScene({
        key: SceneKey.HISTORY_SCENE,
        component: HistoryScene
    }),
    generateScene({
        key: SceneKey.PAYMENT_SCENE,
        component: PaymentScene
    }),
];
