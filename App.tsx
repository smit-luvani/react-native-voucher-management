import React, { createContext, useEffect, useRef, useState } from 'react';
import { LogBox, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store';
import { MainRoute } from './src/navigation';
import { ToastProvider } from 'react-native-toast-notifications';
import Toast from 'react-native-toast-notifications';
import { hp } from './src/Helper/ResponsiveSize';
import Loader from './src/component/common/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

LogBox.ignoreAllLogs();

export const navigationRef = React.createRef();

const App = () => {
    useEffect(() => {
    SplashScreen.hide();
  }, []);

  const AppContext = createContext({});

  const AppProvider = props => {
    const loader = useRef();

    const globalFunc = {
      startLoader: () => loader.current.start(),
      stopLoader: () => loader.current.stop(),
      isLoading: () => loader.current.isLoading(),
    };

    return (
      <AppContext.Provider value={{ ...globalFunc }}>
        {props.children}
        <Loader ref={loader} />
      </AppContext.Provider>
    );
  };

  const NavWrapper = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <BottomSheetModalProvider>
          <MainRoute />
        </BottomSheetModalProvider>
      </NavigationContainer>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <AppProvider>
            <ToastProvider>
              <Toast ref={ref => (global.toast = ref)} offsetBottom={hp(12)} />
              <AppContext.Consumer>
                {funcs => {
                  global.props = funcs;
                  return (
                    <View {...funcs} style={{ flex: 1 }}>
                      <NavWrapper />
                    </View>
                  );
                }}
              </AppContext.Consumer>
            </ToastProvider>
          </AppProvider>
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
