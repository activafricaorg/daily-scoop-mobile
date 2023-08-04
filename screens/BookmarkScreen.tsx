import * as WebBrowser from "expo-web-browser";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import baseStyles from "../styles/Base";

const BookMarkScreen = (props: { route: any; navigation: any; }) => {
	return (
		<Layout>
			<View style={{width: '100%', backgroundColor: '#0f0f0f'}}>
				<View style={baseStyles.infoContainer}>
					<Text style={baseStyles.headingText}>Coming soon...</Text>
					<Text style={baseStyles.paragraphText}>Save news articles from the feed or any category and read later.</Text>
					<View style={{
						alignSelf: 'flex-start',
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
						marginTop: 20,
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

export default BookMarkScreen