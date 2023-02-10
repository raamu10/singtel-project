import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { BreedReducer } from './reducers/breedReducer';


export const rootReducer = combineReducers({
    breedData: BreedReducer,
})

export function* rootSaga() {
    yield all([
      // auth.saga()
    ])
  }