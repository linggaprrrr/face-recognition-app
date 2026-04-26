import React from 'react';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import {
    NativeStackNavigationOptions,
    createNativeStackNavigator,
} from '@react-navigation/native-stack';
import withNavigationParamsAsProps from './withNavigationParamsAsProps';

const Stack = createNativeStackNavigator();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IGenerateScene<P, S> {
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, string>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigation: any;
    }) => NativeStackNavigationOptions)
    | undefined;
}


export const generateScene = <P, S>(
    params: IGenerateScene<P, S>,
): React.ReactElement<IGenerateScene<P, S>> => {
    const withNavigationParams = withNavigationParamsAsProps(params.component);

    return (
        <Stack.Screen
            name={params.key}
            key={params.key}
            component={withNavigationParams}
            options={{
                // Default true to improve overall performance
                freezeOnBlur: true,
                contentStyle: {
                    backgroundColor: 'white',
                },
                headerShown: false,
                animation: 'slide_from_right',
                ...params.options,
            }}
        />
    );
};
