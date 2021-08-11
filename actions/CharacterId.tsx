export const ADD_CHARACTER_ID: string = 'ADD_CHARACTER_ID';

export const addCharacterId = (id: number) => (
    {
        type: ADD_CHARACTER_ID,
        data: id
    }
)