import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SourceScreen from "./screens/SourceScreen";
import { StackNavigatorParamList } from "./types/navigation/StackNavigatorParamList";
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync().then(() => { return null; });

const Stack = createNativeStackNavigator<StackNavigatorParamList>();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                initialRouteName: 'Home',
                tabBarActiveTintColor: 'rgb(253, 192, 6)',
                tabBarInactiveTintColor: '#a8a8a8',
                tabBarStyle: { position: 'absolute', height: 60, paddingTop: 10, paddingBottom: 10, borderTopWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)' },
                tabBarLabelStyle: { marginTop: 2, fontFamily: 'Moderat-Regular' },
                headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'Moderat-Bold', fontSize: 20 },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleAlign: 'center'
            })}
        >
            <Tab.Screen name="HomeScreen" options={{
                headerTitle: "All",
                title: "Home",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name='md-home-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                )}}
            >
                {(props) => <HomeScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="News" options={{
                title: "News",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name='md-newspaper-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                )}}
            >
                {(props) => <CategoryScreen {...props} category="news" />}
            </Tab.Screen>
            <Tab.Screen name="Tech" options={{
                title: "Tech",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name='rocket-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                )}}
            >
                {(props) => <CategoryScreen {...props} category="tech" />}
            </Tab.Screen>
            <Tab.Screen name="Lifestyle" options={{
                title: "Lifestyle",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name='musical-notes-outline' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                )}}
            >
                {(props) => <CategoryScreen {...props} category="entertainment" />}
            </Tab.Screen>
            <Tab.Screen name="Sports" options={{
                title: "Lifestyle",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name='md-football' size={20} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                )}}
            >
                {(props) => <CategoryScreen {...props} category="sports" />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default function App() {
    const [fontsLoaded] = useFonts({
        'Moderat-Regular': require('./assets/fonts/Moderat-Regular.otf'),
        'Moderat-Bold': require('./assets/fonts/Moderat-Bold.otf')
    });

    if (!fontsLoaded) {
        SplashScreen.hideAsync().then(() => { return null });
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'rgb(253, 192, 6)',
                    tabBarInactiveTintColor: '#a8a8a8',
                    tabBarStyle: { position: 'absolute', height: 60, paddingTop: 10, paddingBottom: 10, borderTopWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)' },
                    tabBarLabelStyle: { marginTop: 2, fontFamily: 'Moderat-Regular' },
                    headerStyle: { backgroundColor: 'rgba(28, 28, 28, 1)', borderBottomWidth: 0 },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontFamily: 'Moderat-Bold', fontSize: 20 },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center'
                })}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name="Publisher"
                    component={SourceScreen}
                    options={({ route }) => ({
                        headerTitle: route.params?.sourceTitle,
                        headerShown: true,

                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}