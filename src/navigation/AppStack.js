import React from "react";
import DashBoard from "../screens/Dashboard";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from "../constants/colors";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { Home } from "../assets/svg/Home";
import { Messages } from "../assets/svg/Messages";
import { Gift } from "../assets/svg/Gift";
import fonts from "../constants/fonts";
import SafeAreaView from "react-native-safe-area-view";
import Setting from "../screens/Account/Setting";
import EditProfile from "../screens/Account/EditProfile";
import Voucher from "../screens/Vouchers";
import CreateVoucher from "../screens/Vouchers/CreateVoucher";

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

const UserStack = () => {
    return (
        <SafeAreaView
            forceInset={{ bottom: 'always' }}
            style={{ flex: 1, backgroundColor: colors.black }}>
            <Tabs.Navigator
                // default configuration from React Navigation
                tabBarOptions={{
                    activeTintColor: colors.themeColor,
                    inactiveTintColor: "#222222",
                    activeBackgroundColor: colors.themeColor,
                    labelStyle: {
                        fontFamily: fonts.GilroyMedium,
                        fontSize: 14,
                        color: colors.black
                    },
                    tabStyle: {
                        shadowColor: colors.black,
                        shadowOffset: {
                            width: 6,
                            height: -5,
                        },
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                        elevation: 9,
                        backgroundColor: colors.white,
                    },
                }}
            >
                <Tabs.Screen
                    name="Vouchers"
                    component={DashBoard}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Home
                                fill={focused ? colors.white : colors.darkGrey}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Purchase"
                    component={Voucher}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Gift
                                fill={focused ? colors.white : colors.darkGrey}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="Setting"
                    component={Setting}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Messages
                                fill={focused ? colors.white : colors.darkGrey}
                            />
                        )
                    }}
                // To disable the tab press event
                // listeners={{
                //     tabPress: e => {
                //         e.preventDefault();
                //     }
                // }}
                />
            </Tabs.Navigator>
        </SafeAreaView>
    )
}

const AppStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
            initialRouteName='UserStack'
        >
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="CreateVoucher" component={CreateVoucher} />
            <Stack.Screen name="UserStack" component={UserStack} />
        </Stack.Navigator>
    )
}

export default AppStack;