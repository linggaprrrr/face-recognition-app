import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 * get current routing name
 * @returns string
 */
export function getCurrentRouteName(): string {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name ?? '';
  }
  return '';
}

/**
 * get previous routing name
 * @returns string
 */
export function getPreviousRouteName(): string {
  if (navigationRef.isReady()) {
    const routes = navigationRef.current?.getState()?.routes;
    if (routes && routes.length - 2 >= 0) {
      return routes[routes.length - 2]?.name;
    }
  }
  return '';
}

/**
 * get current routing parameter
 * @returns object|undefined
 */
export function getCurrentRouteParams() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.params;
  }
  return undefined;
}

/**
 * check if current screen is a root of all screen
 * @returns boolean
 */
export function isRoot(): boolean {
  if (navigationRef.isReady()) {
    return navigationRef.current?.getState()?.index === 0;
  }
  return false;
}

export function getState() {
  if (navigationRef.isReady()) {
    return navigationRef.current?.getState();
  }
  return false;
}

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name as never, params as never);
  }
}

export function jump(name: string, params?: object) {
  navigate(name, params);
}

export function push(name: string, params?: object | {type?: string}) {
  if (navigationRef.isReady()) {
    if (params && 'type' in params && params?.type === 'reset') {
      reset(name, params);
      return;
    }
    // @ts-ignore
    navigationRef.navigate(name as never, params as never);
  }
}

export function forcePush(name: string, params?: object | {type?: string}) {
  if (navigationRef.isReady()) {
    if (params && 'type' in params && params?.type === 'reset') {
      reset(name, params);
      return;
    }
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

export function replace(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function popWithCount(count: number) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function pop(params?: {refresh?: any}) {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function refresh(params?: object) {
  if (navigationRef.isReady() && params !== undefined) {
    navigationRef.setParams(params as never);
  }
}

export function reset(sceneKey: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: sceneKey,
          params: params,
        },
      ],
    });
  }
}

export function resetWithPreviousRoute(
  sceneKey: string,
  prevScene: string,
  params?: object,
  prevParams?: object,
) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: prevScene,
          params: prevParams,
        },
        {
          name: sceneKey,
          params: params,
        },
      ],
    });
  }
}

export function clearPreviousRoute() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(state => {
      const routes = [
        state.routes[0], // Home
        state.routes[state.routes.length - 1], // Current scene
      ];

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }
}
