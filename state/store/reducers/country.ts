const initialState = {
	country: undefined
};

const countryReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case 'UPDATE_COUNTRY':
			return {
				...state,
				country: action.payload
			};
		default:
			return state;
	}
};

export default countryReducer;