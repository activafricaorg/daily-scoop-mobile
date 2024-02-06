import { StyleSheet } from "react-native";

export default StyleSheet.create({
	articleView: {
		flex: 1,
		backgroundColor: '#151515',
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 10,
		borderColor: 'rgba(241,154,61,0.04)',
		borderWidth: 1
	},
	articleTitle: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		fontSize: 23,
		lineHeight: 27,
		color: '#b4b4b4'
	},
	articleMeta: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	articleSource: {
		marginLeft: 5,
		alignItems: 'center',
		fontFamily: 'Aeonik-Medium',
		color: '#f28d28',
		letterSpacing: 0.5,
		fontSize: 16,
		lineHeight: 24,
	},
	articleDate: {
		marginLeft: 5,
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		color: '#696868',
		fontSize: 16,
		lineHeight: 24
	},
	content: {
		padding: 15,
		overflow: "hidden",
	},
	readMoreSection: {
		height: 150,
		position: "absolute",
		width: "100%",
		left: 0,
		bottom: 0
	}
});