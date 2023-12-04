import {View, Text} from "react-native";
import BaseStyles from "../styles/Base";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";

export default function JobsScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<View style={{ width: '100%', backgroundColor: '#0f0f0f' }}>
				<View style={BaseStyles.infoContainer}>
					<View>
						<Text style={{marginTop: 80, textAlign: 'center', fontFamily: 'Aeonik-Medium', color: '#a8a8a8', letterSpacing: 0.5, fontSize: 40, lineHeight: 56,}}>
							Coming soon!
						</Text>
						<Text style={{marginTop: 0, color: '#a8a8a8', textAlign: 'center', fontFamily: 'Aeonik-Regular', letterSpacing: 0.5, fontSize: 18, lineHeight: 25,}}>
							We will inform you when we are done.
						</Text>
					</View>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}