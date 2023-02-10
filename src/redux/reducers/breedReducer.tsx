import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

export const actionTypes:any = {
    SetBreedData: 'SetBreed Action',
    ResetBreedData: 'GetBreed Action'
};

const initalState:any = [];

export const BreedReducer = /* persistReducer (
    {
        storage,
        key: 'v001-app',
        blacklist: [],
    }, */
    (state:any = initalState, action: any) => {
        switch (action.type) {
            case actionTypes.SetBreedData: {
              const data = action.payload
              return [
                ...data,
              ]
            }
      
            case actionTypes.ResetBreedData: {
              return initalState;
            }
      
            default:
              return state
          }
    }
//)



export const BreedAction = {
    SetBreedData: (payload: any) => ({
        type: actionTypes.SetBreedData,
        payload,
    }),
    ResetBreedData: () => ({
        type: actionTypes.GetBreedData
    })
}

