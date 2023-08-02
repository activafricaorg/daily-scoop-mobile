import { View, Text } from "react-native";
import baseStyles from "../styles/Base";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import * as WebBrowser from "expo-web-browser";

const JobScreen = (props: { route: any; navigation: any; }) => {

	return (
		<Layout>
			<View style={{width: '100%', backgroundColor: '#0f0f0f'}}>
				<View style={baseStyles.infoContainer}>
					<Text style={baseStyles.headingText}>Coming soon...</Text>
					<Text style={baseStyles.paragraphText}>Make your next career step, search for jobs, and get notified about jobs.</Text>
					<View style={{
						alignSelf: 'flex-start',
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
						marginTop: 30,
						overflow: 'hidden'
					}}>
						<Text
							style={baseStyles.button}
							onPress={() => WebBrowser.openBrowserAsync("https://activ.africa")}
						>
							Get Notified
						</Text>
					</View>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}

export default JobScreen