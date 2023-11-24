import { View, Text } from "react-native";
import BaseStyles from "../styles/Base";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";

export default function JobsScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<View style={{ width: '100%', backgroundColor: '#0f0f0f' }}>
				<View style={BaseStyles.infoContainer}>
					<View>
						<Text style={{marginTop: 80, fontFamily: 'Aeonik-Medium', color: '#f28d28', letterSpacing: 0.5, fontSize: 48, lineHeight: 56,}}>
							Coming soon!
						</Text>
						<Text style={{marginTop: 3, color: '#a8a8a8', fontFamily: 'Aeonik-Regular', letterSpacing: 0.5, fontSize: 16, lineHeight: 25,}}>
							We will inform you when we are done 😊.
						</Text>
					</View>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}