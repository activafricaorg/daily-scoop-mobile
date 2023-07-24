import { StyleSheet, Text, View } from "react-native";
import Base from "../styles/Base";

export default function Layout (props: {children: string | JSX.Element | JSX.Element[], category: string | null}) {
	return (
		<View style={Base.container}>
			<View style={Base.header}>
				<Text style={Base.textView}>Daily Scoop</Text>
			</View>
			<View style={Base.mainContainer}>
				{ props.children }
			</View>
		</View>
	)
}

