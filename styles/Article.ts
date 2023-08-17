import { StyleSheet } from "react-native";

export default StyleSheet.create({
	articleView: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 15,
		borderColor: 'rgba(243, 245, 247, 0.1)',
		marginBottom: 10,
	},
	articleTitle: {
		fontFamily: 'Moderat-Regular',
		fontSize: 18,
		lineHeight: 23,
		color: '#dcdcdc',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15
	},
	articleMeta: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: 'rgba(243, 245, 247, 0.1)',
	},
	articleSource: {
		fontFamily: 'Moderat-Bold',
		color: '#fdc006',
		backgroundColor: '#1c1c1c',
		borderRadius: 10,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 8,
		paddingRight: 8,
		fontSize: 12
	},
	articleDate: {
		marginLeft: 15,
		width: '50%',
		fontFamily: 'Moderat-Regular',
		color: '#707070',
		fontSize: 13
	},
	single: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'rgba(243, 245, 247, 0.1)',
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 10,
	},
	singleTopics: {
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: 'rgba(243, 245, 247, 0.1)',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
	},
	content: {
		padding: 15,
		overflow: "hidden"
	},
	singleTitle: {
		fontSize: 24,
		lineHeight: 30,
		marginBottom: 20,
		color: '#dcdcdc',
		fontFamily: 'Moderat-Medium'
	},
	singleDescription: {
		fontSize: 16,
		lineHeight: 23,
		color: '#dcdcdc',
		fontFamily: 'Moderat-Regular'
	},
	readMoreSection: {
		height: 150,
		position: "absolute",
		width: "100%",
		left: 0,
		bottom: 0
	}
});