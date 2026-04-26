import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface IwithNavigationParamsAsProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
}

export function withNavigationParamsAsProps<
    T extends IwithNavigationParamsAsProps = IwithNavigationParamsAsProps,
>(WrappedComponent: React.ComponentType<T>) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent?.displayName || WrappedComponent?.name || 'Component';

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithTheme = (props: IwithNavigationParamsAsProps) => {
        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...(props as T)} {...props.route.params} />;
    };

    ComponentWithTheme.displayName = `withTheme(${displayName})`;

    return ComponentWithTheme;
}

export default withNavigationParamsAsProps;
