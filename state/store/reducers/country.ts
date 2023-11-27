import storage from "../../../util/storage";

const initialState = {
	country: undefined
};

const countryReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case 'UPDATE_COUNTRY':
			// storage.remove({
			// 	key: 'countryState'
			// })
			// 	.then(async () => {
			// 		await storage.save({
			// 			key: 'countryState',
			// 			data: selectedItem.title,
			// 			expires: null
			// 		});
			// 	});
			console.log(action.payload);
			return {
				...state,
				country: action.payload
			};
		default:
			return state;
	}
};

export default countryReducer;