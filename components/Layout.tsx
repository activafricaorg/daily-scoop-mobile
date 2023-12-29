import { ScrollView, Text, View } from "react-native";
import baseStyles from "../styles/Base";
import checkConnection from "../util/checkConnection";
import { MaterialIcons } from '@expo/vector-icons';

export default function Layout (props: {children: string | JSX.Element | JSX.Element[] | any}) {
	let network = checkConnection();

	if (!network) return (
		<View style={{flex: 1, justifyContent: "center", backgroundColor: '#0f0f0f', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
			<MaterialIcons name="wifi-off" size={48} color={"#646464"} style={{marginBottom: 10}} />
			<Text style={{fontFamily: 'Aeonik-Bold', fontSize: 24, color: '#646464', marginBottom: 3, letterSpacing: 0.5}}>Connection Error</Text>
			<Text style={{fontFamily: 'Aeonik-Medium', fontSize: 18, color: '#646464', letterSpacing: 0.5}}>Please check your connectivity</Text>
		</View>
	);

	return (
		<ScrollView style={{width: '100%', backgroundColor: '#0f0f0f'}}>
			<View style={baseStyles.container}>
				<View style={baseStyles.mainContainer}>
					{ props.children }
				</View>
			</View>
		</ScrollView>
	)
};