import { StyleSheet } from "react-native";

export default StyleSheet.create({
	wrapper: {
		backgroundColor: '#0f0f0f'
	},
	container: {
		flex: 1,
		backgroundColor: '#0f0f0f'
	},
	mainContainer: {
		padding: 10,
		marginTop: 20,
		marginBottom: 20
	},
	textView: {
		fontFamily: 'Moderat-Regular',
		fontSize: 16,
		color: 'white',
		textDecorationStyle: undefined
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(243, 245, 247, 0.1)',
		padding: 10,
	},
	headingText: {
		color: '#dcdcdc',
		fontFamily: 'Moderat-Regular',
		marginBottom: 10,
		fontSize: 28,
		lineHeight: 32,
	},
	paragraphText: {
		fontSize: 16,
		lineHeight: 22,
		color: '#dcdcdc',
		fontFamily: 'Moderat-Regular',
		marginBottom: 10
	},
	infoContainer: {
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10
	},
	button: {
		display: 'flex',
		alignSelf: "flex-start",
		fontFamily: 'Moderat-Bold',
		color: '#0f0f0f',
		backgroundColor: '#fdc006',
		fontSize: 14,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	textLink: {
		fontFamily: 'Moderat-Bold',
		color: '#fdc006'
	}
})