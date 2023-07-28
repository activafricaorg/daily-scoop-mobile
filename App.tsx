import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import InformationScreen from "./screens/InformationScreen";
import Ionicons from '@expo/vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync().then(() => { return null; });

export default function App() {
    const Tab = createBottomTabNavigator();
    const [fontsLoaded] = useFonts({
        'Moderat-Regular': require('./assets/fonts/Moderat-Regular.otf'),
        'Moderat-Bold': require('./assets/fonts/Moderat-Bold.otf')
    });

    if (!fontsLoaded) {
        SplashScreen.hideAsync().then(() => { return null });
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    initialRouteName: 'Home',
                    tabBarActiveTintColor: 'rgb(253, 192, 6)',
                    tabBarInactiveTintColor: '#a8a8a8',
                    tabBarStyle: { padding: 10, borderWidth: 0, backgroundColor: 'rgba(28, 28, 28, 1)'},
                    tabBarLabelStyle: {marginTop: 5, fontFamily: 'Moderat-Bold'},
                })}
            >
                <Tab.Screen name="HomeScreen" options={{
                    title: "Home",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name='md-home-outline' size={16} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )}}
                >
                    {(props) => <HomeScreen {...props} />}
                </Tab.Screen>
                <Tab.Screen name="News" options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name='md-newspaper-outline' size={16} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )}}
                >
                    {(props) => <CategoryScreen {...props} category="news" />}
                </Tab.Screen>
                <Tab.Screen name="Tech" options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name='rocket-outline' size={16} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )}}
                >
                    {(props) => <CategoryScreen {...props} category="tech" />}
                </Tab.Screen>
                <Tab.Screen name="Lifestyle" options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name='musical-notes-outline' size={16} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )}}
                >
                    {(props) => <CategoryScreen {...props} category="entertainment" />}
                </Tab.Screen>
                <Tab.Screen name="Sports" options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name='md-football' size={16} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )}}
                >
                    {(props) => <CategoryScreen {...props} category="sports" />}
                </Tab.Screen>
                <Tab.Screen name="More" options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name='md-apps' size={16} color={focused ? 'rgb(253, 192, 6)' : '#a8a8a8'} />
                    )}}
                >
                    {(props) => <InformationScreen {...props} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}