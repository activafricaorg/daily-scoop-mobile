import * as SystemUI from 'expo-system-ui';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StackNavigatorParamList } from "./types/navigation/StackNavigatorParamList";
import { TabNavigatorParamList } from "./types/navigation/TabNavigatorParamList";
import Ionicons from '@expo/vector-icons/Ionicons';
import store from "./state/store";
import { persistor } from './state/store';
import { Provider, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {capitalize, slugifyText} from "./util/helper";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SourceScreen from "./screens/SourceScreen";
import JobsScreen from "./screens/JobsScreen";
import TopicScreen from "./screens/TopicScreen";
import TopicsScreen from "./screens/TopicsScreen";
import SettingsScreen from "./screens/SettingScreen";
import { PersistGate } from 'redux-persist/integration/react'

SplashScreen.preventAutoHideAsync().then(() => { return null; });
SystemUI.setBackgroundColorAsync("#f28d28").then(() => { return null; });

const Stack = createNativeStackNavigator<StackNavigatorParamList>();
const NavTab = createMaterialTopTabNavigator<TabNavigatorParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function FeedTabs({country}: {country: string}) {
    const insets = useSafeAreaInsets();
    // console.log(country.country, 'a');

    return (
        <NavTab.Navigator
            screenOptions={() => ({
                initialRouteName: 'Latest',
                headerShown: false,
                headerShadowVisible: true,
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                headerTitleStyle: { fontFamily: 'Aeonik-Medium', fontSize: 20 },
                tabBarActiveTintColor: '#f28d28',
                tabBarInactiveTintColor: '#a8a8a8',
                tabBarStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', paddingBottom: 7, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, },
                tabBarLabelStyle: { marginTop: 3, fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: '#f28d28', height: 3 },
                tabBarScrollEnabled: true
            })}
        >
            <NavTab.Screen name="Latest" options={{
                    title: "Latest",
                    tabBarIcon: ({ focused }) => ( <Ionicons name='ios-logo-rss' size={22} color={focused ? '#f28d28' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <HomeScreen {...props} country={country} /> }
            </NavTab.Screen>
            <NavTab.Screen name="News" options={{
                    title: "News",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='md-newspaper-outline' size={22} color={focused ? '#f28d28' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="news" /> }
            </NavTab.Screen>
            <NavTab.Screen name="Tech" options={{
                    title: "Tech",
                    tabBarIcon: ({ focused }) => ( <Ionicons name='rocket-outline' size={22} color={focused ? '#f28d28' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="tech" /> }
            </NavTab.Screen>
            <NavTab.Screen name="Lifestyle" options={{
                    title: "Lifestyle",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='musical-notes-outline' size={22} color={focused ? '#f28d28' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="entertainment" /> }
            </NavTab.Screen>
            <NavTab.Screen name="Sports" options={{
                    title: "Sports",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='md-football' size={22} color={focused ? '#f28d28' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="sports" /> }
            </NavTab.Screen>
        </NavTab.Navigator>
    );
}

function BottomTabs() {
    const insets = useSafeAreaInsets();
    let country: string = useSelector((state: any) => state.country);
    console.log(country);

    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: '#f28d28',
                tabBarInactiveTintColor: '#a8a8a8',
                tabBarStyle: { paddingTop: 10, paddingBottom: insets.bottom, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)' },
                tabBarLabelStyle: { marginTop: 3, fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, fontSize: 11, lineHeight: 15 },
                headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                headerTintColor: '#a8a8a8',
                headerTitleStyle: { fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, fontSize: 18, paddingBottom: 0 },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleAlign: 'center'
            })}
        >
            <Tab.Screen
                name="Feed"
                // component={ FeedTabs }
                children={()=><FeedTabs country={country}/>}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='md-home-outline' size={20} color={focused ? '#f28d28' : '#a8a8a8'} />
                    )
                })}
            />
            <Tab.Screen
                name="Topics"
                component={ TopicsScreen }
                options={() => ({
                    headerShown: true,
                    headerTitle: 'Trending Topics',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='folder-open-outline' size={20} color={focused ? '#f28d28' : '#a8a8a8'} />
                    )
                })}
            />
            <Tab.Screen
                name="Jobs"
                component={ JobsScreen }
                options={() => ({
                    headerShown: true,
                    headerTitle: 'Job Opportunities',
                    headerTintColor: '#a8a8a8',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='md-briefcase-outline' size={20} color={focused ? '#f28d28' : '#a8a8a8'} />
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
                        <Ionicons name='ios-settings-outline' size={20} color={focused ? '#f28d28' : '#a8a8a8'} />
                    )
                })}
            />
        </Tab.Navigator>
    )
}

export default function App() {
    const [ready, setReady] = useState(false);
    // const country = useSelector((state: any) => state.country);

    useEffect(() => {
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
        if (ready) {
            await SplashScreen.hideAsync();
        }
    }, [ready]);

    if (!ready) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer onReady={() => onLayoutRootView()}>
                    <Stack.Navigator
                        screenOptions={() => ({
                            tabBarActiveTintColor: '#f28d28',
                            tabBarInactiveTintColor: '#a8a8a8',
                            tabBarStyle: { position: 'absolute', height: 60, paddingTop: 10, paddingBottom: 10, borderTopWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)' },
                            tabBarLabelStyle: { marginTop: 2, fontFamily: 'Aeonik-Medium' },
                            headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 1 },
                            headerTintColor: '#a8a8a8',
                            headerTitleStyle: { fontFamily: 'Aeonik-Medium', letterSpacing: 0.5, fontSize: 16 },
                            headerShadowVisible: false,
                            headerBackTitleVisible: false,
                            headerTitleAlign: 'center',
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
                        <Stack.Screen
                            name="Topics"
                            component={ TopicsScreen }
                            options={({ route }) => ({
                                headerShown: true
                            })}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>

    );
}