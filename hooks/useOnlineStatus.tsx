import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useOnlineStatus() {
	const [connected, setConnected] = useState<boolean | null>(true);

	useEffect(() => {
		NetInfo.fetch().then((state) => {
			setConnected(state.isConnected);
		});
	}, []);

	return connected;
}
