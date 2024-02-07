import React from "react";
import * as SystemUI from 'expo-system-ui';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Crypto from 'expo-crypto';
import { PersistGate } from 'redux-persist/integration/react';
import { StackNavigatorParamList } from "./types/navigation/StackNavigatorParamList";
import { TabNavigatorParamList } from "./types/navigation/TabNavigatorParamList";
import { navigationRef, navigateTo } from "./util/navigations/RootNavigation";
import Storage from "./util/storage";
import store, { persistor } from "./state/store";
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import {Provider, useSelector} from "react-redux";
import {useCallback, useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {capitalize} from "./util/helper";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SourceScreen from "./screens/SourceScreen";
import CareerScreen from "./screens/CareerScreen";
import TopicScreen from "./screens/TopicScreen";
import TopicsScreen from "./screens/TopicsScreen";
import SettingsScreen from "./screens/SettingScreen";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as amplitude from '@amplitude/analytics-react-native';

amplitude.init('33a7082e1ce0f0ef2537efba687ec11b');
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token: any;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice && Constants.expoConfig && Constants.expoConfig.extra) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token?.data;
}

SplashScreen.preventAutoHideAsync().then(() => { return null; });
SystemUI.setBackgroundColorAsync("rgba(28, 28, 28, 1)").then(() => { return null; });

const Stack = createNativeStackNavigator<StackNavigatorParamList>();
const NavTab = createMaterialTopTabNavigator<TabNavigatorParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function FeedTabs({country}: {country: string}) {
    const insets = useSafeAreaInsets();

    return (
        <NavTab.Navigator
            screenOptions={() => ({
                initialRouteName: 'Latest',
                headerShown: false,
                headerShadowVisible: true,
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: '#989898',
                headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                headerTitleStyle: { fontFamily: 'Aeonik-Medium', fontSize: 20 },
                tabBarActiveTintColor: '#f28d28',
                tabBarInactiveTintColor: '#989898',
                tabBarStyle: { backgroundColor: 'rgba(28, 28, 28, 1)',  paddingBottom: 7, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, },
                tabBarLabelStyle: { marginTop: 3, fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, textTransform: 'capitalize', fontSize: 18, lineHeight: 24 },
                tabBarIndicatorStyle: { backgroundColor: '#f28d28', height: 3 },
                tabBarScrollEnabled: true
            })}
        >
            <NavTab.Screen
                name="Latest"
                options={{
                    title: "Latest",
                    tabBarIcon: ({ focused }) => ( <Ionicons name='ios-logo-rss' size={22} color={focused ? '#f28d28' : '#989898'} /> )}
                }
            >
                { (props) => <HomeScreen {...props} country={country} /> }
            </NavTab.Screen>
            <NavTab.Screen
                name="News"
                options={{
                    title: "News",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='md-newspaper-outline' size={22} color={focused ? '#f28d28' : '#989898'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="news" country={country} /> }
            </NavTab.Screen>
            <NavTab.Screen
                name="Tech"
                options={{
                    title: "Tech",
                    tabBarIcon: ({ focused }) => ( <Ionicons name='rocket-outline' size={22} color={focused ? '#f28d28' : '#989898'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="tech" country={country} /> }
            </NavTab.Screen>
            <NavTab.Screen
                name="Lifestyle"
                options={{
                    title: "Lifestyle",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='musical-notes-outline' size={22} color={focused ? '#f28d28' : '#989898'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="entertainment" country={country} /> }
            </NavTab.Screen>
            <NavTab.Screen
                name="Sports"
                options={{
                    title: "Sports",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='md-football' size={22} color={focused ? '#f28d28' : '#989898'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="sports" country={country} /> }
            </NavTab.Screen>
        </NavTab.Navigator>
    );
}

function BottomTabs() {
    const insets = useSafeAreaInsets();
    let country: string = useSelector((state: any) => state.country);

    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: '#f28d28',
                tabBarInactiveTintColor: '#989898',
                tabBarStyle: { paddingTop: 5, paddingBottom: insets.bottom, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)' },
                tabBarLabelStyle: { marginTop: 0, marginBottom: 5, fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, fontSize: 13, lineHeight: 15 },
                headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                headerTintColor: '#989898',
                headerTitleStyle: { fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, fontSize: 20, paddingBottom: 0, lineHeight: 24 },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleAlign: 'center'
            })}
        >
            <Tab.Screen
                name="Feed"
                children={()=><FeedTabs country={country}/>}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='md-home-outline' size={18} color={focused ? '#f28d28' : '#989898'} />
                    )
                })}
            />
            <Tab.Screen
                name="Topics"
                children={()=><TopicsScreen country={country}/>}
                options={() => ({
                    headerShown: true,
                    headerTitle: 'Trending Topics',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='folder-open-outline' size={18} color={focused ? '#f28d28' : '#989898'} />
                    )
                })}
            />
            <Tab.Screen
                name="Career"
                component={ CareerScreen }
                options={() => ({
                    headerShown: true,
                    headerTintColor: '#a8a8a8',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='md-briefcase-outline' size={18} color={focused ? '#f28d28' : '#989898'} />
                    )
                })}
            />
            <Tab.Screen
                name="Settings"
                component={ SettingsScreen }
                options={() => ({
                    headerShown: true,
                    headerTintColor: '#a8a8a8',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='ios-settings-outline' size={18} color={focused ? '#f28d28' : '#989898'} />
                    )
                })}
            />
        </Tab.Navigator>
    )
}

export default function App() {
    const [ready, setReady] = useState(false);
    // const [expoPushToken, setExpoPushToken] = useState('');
    const routeNameRef: any = useRef();
    const responseListener: any = useRef();

    useEffect(() => {
        // Check if applicationId exists and if not, create one and save it in asyncStorage
        Storage.getData('applicationId')
            .then(async (data) => {
                if (!data) {
                    const digest = Crypto.randomUUID();
                    await Storage.storeData('applicationId', digest);
                }
            });

        registerForPushNotificationsAsync()
            .then(async token => {
                if (token) {
                    const applicationId = await Storage.getData('applicationId');
                    await Storage.storeData('fcmToken', JSON.stringify(token));

                    // console.log(JSON.stringify({
                    //     applicationId: applicationId,
                    //     fcmToken: token
                    // }));

                    await fetch('https://api.dailyscoop.africa/token', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            applicationId: applicationId,
                            fcmToken: token
                        })
                    });
                }
            });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            if (response.notification.request.content) {
                const data = response.notification.request.content.data;
                if (data) navigateTo(data.route, data.params);

                // navigateTo("Feed", { screen: 'News' });
                // navigateTo("Topic", { topic: "news", topicTitle: "news" });
                // navigateTo("Publisher", { source: "guardian nigeria", sourceTitle: "Guardian Nigeria" });
            }
        });

        async function prepare() {
            try {
                await Font.loadAsync({
                    'Aeonik-Medium': require('./assets/fonts/Aeonik-Medium.otf'),
                    'Aeonik-Regular': require('./assets/fonts/Aeonik-Regular.otf'),
                });

                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setReady(true);
            }
        }

        prepare().then(() => { return null; });
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (ready) await SplashScreen.hideAsync();
    }, [ready]);

    if (!ready) return null;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer
                    ref={ navigationRef }
                    onReady={
                        async () => {
                            await onLayoutRootView();
                            routeNameRef.current = navigationRef.getCurrentRoute()?.name;
                        }
                    }
                    onStateChange={async () => {
                        const previousRouteName = routeNameRef.current;
                        const currentRouteName = navigationRef.getCurrentRoute()?.name;

                        if (previousRouteName !== currentRouteName) {
                            amplitude.track('Page View', {
                                screen_name: currentRouteName,
                                screen_class: currentRouteName,
                            });
                        }

                        routeNameRef.current = currentRouteName;
                    }}
                >
                    <Stack.Navigator
                        screenOptions={() => ({
                            headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)' },
                            headerTintColor: '#989898',
                            headerTitleStyle: { fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, fontSize: 20, paddingBottom: 0, alignItem: 'center' },
                            headerShadowVisible: false,
                            headerBackTitleVisible: false
                        })}
                    >
                        <Stack.Screen
                            name="Home"
                            component={ BottomTabs }
                            options={() => ({
                                headerShown: false,
                            })}
                        />
                        <Stack.Screen
                            name="Publisher"
                            component={ SourceScreen }
                            options={({ route }) => ({
                                headerTitle: route.params?.sourceTitle,
                                headerShown: true
                            })}
                        />
                        <Stack.Screen
                            name="Topic"
                            component={ TopicScreen }
                            options={({ route }) => ({
                                headerTitle: capitalize(route.params?.topicTitle),
                                headerShown: true
                            })}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}