import { ScrollView, View } from "react-native";
import baseStyles from "../styles/Base";

export default function Layout (props: {children: string | JSX.Element | JSX.Element[] | any, isList?: boolean}) {
	const mainView = (
		<View style={baseStyles.container}>
			<View style={baseStyles.mainContainer}>
				{ props.children }
			</View>
		</View>
	);

	return (
		props.isList ?
			mainView
			:
			<ScrollView style={{width: '100%', backgroundColor: '#0f0f0f'}}>
				{ mainView }
			</ScrollView>
	)
};

Layout.defaultProps = {
	isList: true
};