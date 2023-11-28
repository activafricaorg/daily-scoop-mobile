export type StackNavigatorParamList = {
	Home: undefined,
	Publisher: { source: string, sourceTitle: string  },
	Topic: { topic: string, topicTitle: string },
	Topics: { country: string | null  },
	Settings: undefined,
	Article: { guid: string  }
}