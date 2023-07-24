import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0f0f0f',
	},
	mainContainer: {
		padding: 10,
		marginTop: 40
	},
	textView: {
		fontFamily: 'Poly-Sans-Neutral',
		fontSize: 16,
		color: 'white',
		textDecorationStyle: undefined
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(243, 245, 247, 0.1)',
		padding: '10px',
	},
	headingText: {
		fontSize: 30,
		textAlign: 'center',
		fontFamily: 'Poly-Sans-Median',
		color: 'white',
		marginBottom: 30
	}
})