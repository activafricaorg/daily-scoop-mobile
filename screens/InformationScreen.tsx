import { View, Text } from "react-native";
import BaseStyles from "../styles/Base";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function InformationScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<SafeAreaView>
				<View style={{ width: '100%', backgroundColor: '#0f0f0f' }}>
					<View style={BaseStyles.infoContainer}>
						<Text style={BaseStyles.headingText}>
							<Ionicons name='md-information-circle-outline' size={24} color={'rgb(253, 192, 6)'} /> Information
						</Text>
						<View>
							<Text style={BaseStyles.infoContent}>
								Daily Scoop is a product of Activ Africa, a technology company focused on providing user-friendly solutions to everyday problems in Africa.
							</Text>
							<Text style={BaseStyles.infoContent}>
								This platform provides a convenient and efficient way for users to access a wide range of African news content, stay informed and manage their information consumption. It gathers information from various reliable sources and presents them in a convenient centralized location for everyone. This reduces the time and effort users would otherwise have spent visiting multiple websites to get their daily news fix.
							</Text>
						</View>
					</View>
				</View>
				<StatusBar style="auto" />
			</SafeAreaView>
		</Layout>
	);
}