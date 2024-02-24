import { ScrollView, Text, View } from "react-native";
import baseStyles from "../styles/Base";
import { MaterialIcons } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";

let currentNetwork: boolean | null;
NetInfo.fetch().then((state) => {
	currentNetwork = state.isConnected;
});

export default function Layout (props: {children: string | JSX.Element | JSX.Element[] | any}) {
	const [connected, setConnected] = useState<boolean | null>(currentNetwork);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setConnected(state.isConnected);
		});

		return () => unsubscribe();
	}, []);

	if (!connected) return (
		<View style={{flex: 1, justifyContent: "center", backgroundColor: '#0f0f0f', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
			<MaterialIcons name="wifi-off" size={48} color={"#646464"} style={{marginBottom: 10}} />
			<Text style={{fontFamily: 'Aeonik-Medium', fontSize: 24, color: '#646464', marginBottom: 3, letterSpacing: 0.5}}>Connection Error</Text>
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