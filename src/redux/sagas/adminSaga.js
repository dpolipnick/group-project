import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

// saga to get types from server
function* getTypesSaga(action) {
    console.log('in getTypesSaga', action.payload);
    try {
        const response = yield call(axios.get, '/types', {
            projects: action.payload
        });
        yield put({
            type: 'SET_AUTHORIZATION_TYPES',
            payload: response.data
        });
    } catch (error) {
        console.log('error with get request', error);
    }
}

function* adminSaga() {
    yield takeLatest('GET_AUTHORIZATION', getTypesSaga);
}

export default adminSaga;