import { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SourceScreen from "./screens/SourceScreen";
import JobScreen from "./screens/JobScreen";
import BookMarkScreen from "./screens/BookmarkScreen";
import InformationScreen from "./screens/InformationScreen";
import AboutScreen from "./screens/AboutScreen";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StackNavigatorParamList } from "./types/navigation/StackNavigatorParamList";
import Ionicons from '@expo/vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync().then(() => { return null; });

const Stack = createNativeStackNavigator<StackNavigatorParamList>();
const NavTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();

function FeedTabs() {
    const insets = useSafeAreaInsets();

    return (
        <NavTab.Navigator
            screenOptions={({ route }) => ({
                initialRouteName: 'Latest',
                headerShown: false,
                headerShadowVisible: true,
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                headerTitleStyle: { fontFamily: 'Moderat-Bold', fontSize: 20 },
                tabBarActiveTintColor: 'rgb(253, 192, 6)',
                tabBarInactiveTintColor: '#a8a8a8',
                tabBarStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', paddingBottom: 7, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, },
                tabBarLabelStyle: { marginTop: 3, fontFamily: 'Moderat-Bold', textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: 'rgb(253, 192, 6)', height: 3 },
                tabBarScrollEnabled: true
            })}
        >
            <NavTab.Screen name="Latest" options={{
                    title: "Latest",
                    tabBarIcon: ({ focused }) => ( <Ionicons name='ios-logo-rss' size={22} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <HomeScreen {...props} /> }
            </NavTab.Screen>
            <NavTab.Screen name="News" options={{
                    title: "News",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='md-newspaper-outline' size={22} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="news" /> }
            </NavTab.Screen>
            <NavTab.Screen name="Tech" options={{
                    title: "Tech",
                    tabBarIcon: ({ focused }) => ( <Ionicons name='rocket-outline' size={22} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="tech" /> }
            </NavTab.Screen>
            <NavTab.Screen name="Lifestyle" options={{
                    title: "Lifestyle",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='musical-notes-outline' size={22} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="entertainment" /> }
            </NavTab.Screen>
            <NavTab.Screen name="Sports" options={{
                    title: "Sports",
                    tabBarIcon: ({ focused}) => ( <Ionicons name='md-football' size={22} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} /> )}
                }
            >
                { (props) => <CategoryScreen {...props} category="sports" /> }
            </NavTab.Screen>
        </NavTab.Navigator>
    );
}

function BottomTabs() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: 'rgb(253, 192, 6)',
                tabBarInactiveTintColor: '#a8a8a8',
                tabBarStyle: { paddingTop: 10, paddingBottom: insets.bottom + 10, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)' },
                tabBarLabelStyle: { marginTop: 3, fontFamily: 'Moderat-Regular', fontSize: 11 },
                headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                headerTintColor: '#a8a8a8',
                headerTitleStyle: { fontFamily: 'Moderat-Bold', fontSize: 20, paddingBottom: 10 },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleAlign: 'center'
            })}
        >
            <Tab.Screen
                name="Feed"
                component={FeedTabs}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='md-home-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )
                })}
            />
            <Tab.Screen
                name="Jobs"
                component={ JobScreen }
                options={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='md-briefcase-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )
                })}
            />
            <Tab.Screen
                name="Bookmarks"
                component={ BookMarkScreen }
                options={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='bookmarks-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )
                })}
            />
            <Tab.Screen
                name="Info"
                component={ InformationScreen }
                options={({ route }) => ({
                    headerShown: true,
                    headerBackTitleVisible: true,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name='information-circle-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )
                })}
            />
        </Tab.Navigator>
    )
}

export default function App() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    'Moderat-Regular': require('./assets/fonts/Moderat-Regular.otf'),
                    'Moderat-Bold': require('./assets/fonts/Moderat-Bold.otf')
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
        <NavigationContainer
            onReady={() => onLayoutRootView()}
        >
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'rgb(253, 192, 6)',
                    tabBarInactiveTintColor: '#a8a8a8',
                    tabBarStyle: { position: 'absolute', height: 60, paddingTop: 10, paddingBottom: 10, borderTopWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)' },
                    tabBarLabelStyle: { marginTop: 2, fontFamily: 'Moderat-Regular' },
                    headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 1 },
                    headerTintColor: '#a8a8a8',
                    headerTitleStyle: { fontFamily: 'Moderat-Bold', fontSize: 20 },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                })}
            >
                <Stack.Screen
                    name="Home"
                    component={ BottomTabs }
                    options={({ route }) => ({
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
                <Stack.Group screenOptions={{presentation: "modal"}}>
                    <Stack.Screen
                        name="About"
                        component={ AboutScreen }
                        options={({ route }) => ({
                            headerShown: true
                        })}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}