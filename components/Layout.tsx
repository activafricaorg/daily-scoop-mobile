import { ScrollView, View } from "react-native";
import baseStyles from "../styles/Base";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout (props: {children: string | JSX.Element | JSX.Element[]}) {
	const insets = useSafeAreaInsets();

	return (
		<ScrollView style={{width: '100%', backgroundColor: '#0f0f0f', paddingTop: insets.top, paddingBottom: insets.bottom}}>
			<View style={baseStyles.container}>
				<View style={baseStyles.mainContainer}>
					{ props.children }
				</View>
			</View>
		</ScrollView>
	)
}

