import moment from "moment";
import React, { memo } from 'react';
import * as WebBrowser from "expo-web-browser";
import { ArticleTypes } from "../types/article";
import { Text, View, ListRenderItemInfo } from "react-native";
import { Link } from '@react-navigation/native';
import { sanitizeTitle, capitalize, slugifyText } from "../util/helper";
import ArticleStyles from "../styles/Article";

export default function (props: { isCategory: boolean, data: ListRenderItemInfo<ArticleTypes>, handleNavigation?: {(guid: string): void} }) {
	let title = sanitizeTitle(props.data.item.title);
	let source = capitalize(props.data.item.source);
	const realDate = moment(props.data.item.articleDate).format('ll');

	return (
		<View style={ArticleStyles.articleView}>
			{
				<Text style={ArticleStyles.articleTitle} onPress={() => WebBrowser.openBrowserAsync(props.data.item.url)}>
					{ title }
				</Text>
			}
			<View style={ArticleStyles.articleMeta}>
				<View style={{
					alignSelf: 'flex-start',
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20,
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					overflow: 'hidden'
				}}>
					<Link style={ArticleStyles.articleSource} to={{ screen: 'Publisher', params: { source: slugifyText(props.data.item.source), sourceTitle: source }}}>
						{ source }
					</Link>
				</View>
				<Text style={ArticleStyles.articleDate}>
					{ realDate }
				</Text>
			</View>
		</View>
	)
}