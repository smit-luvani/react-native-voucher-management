import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { SplashAction } from "../screens/SplashAction";

const Stack = createNativeStackNavigator();

export const MainRoute = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='SplashAction'
        >
            <Stack.Screen name="SplashAction" component={SplashAction} />
            <Stack.Screen name="AppStack" component={AppStack} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Navigator>
    )
}