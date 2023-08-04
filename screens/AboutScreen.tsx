import { View, Text } from "react-native";
import baseStyles from "../styles/Base";
import {StatusBar} from "expo-status-bar";
import Layout from "../components/Layout";

export default function AboutScreen(props: { route: any; navigation: any; }) {
	return (
		<Layout>
			<View style={baseStyles.wrapper}>
				<Text>
					Hi
				</Text>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}