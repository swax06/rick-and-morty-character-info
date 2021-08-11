import { ADD_CHARACTER_ID, addCharacterId } from '../actions/CharacterId'

const initialState = {
    idList: [{}],
}

export default (state = initialState, action: { type: string, data: number, payload: any }) => {
    switch (action.type) {

        case ADD_CHARACTER_ID:
            return {
                ...state,
                idList: state.idList.concat({
                    characterId: action.data
                })
            };

        default:
            return state;
    }
}
