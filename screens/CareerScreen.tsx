import { View, Image } from "react-native";
import BaseStyles from "../styles/Base";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";

export default function CareerScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<View style={{ width: '100%', backgroundColor: '#0f0f0f' }}>
				<View style={BaseStyles.infoContainer}>
					<View style={{flex: 1, justifyContent: "center", alignItems: 'center', marginTop: 86 + 43}}>
						<Image
							style={{width: 200, height: 86}}
							source={require('../assets/coming-soon.png')}
						/>
					</View>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}