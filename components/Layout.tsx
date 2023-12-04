import { ScrollView, View } from "react-native";
import baseStyles from "../styles/Base";
import {useOnlineStatus} from "../hooks/useOnlineStatus";

export default function Layout (props: {children: string | JSX.Element | JSX.Element[] | any, isList?: boolean}) {
	const isOnline = useOnlineStatus();

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

Layout.defaultProps = {
	isList: true
};