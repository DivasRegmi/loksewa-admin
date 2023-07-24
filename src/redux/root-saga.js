import { all, call } from 'redux-saga/effects';

import { productSagas } from './product/product.sagas';
import { categorieSagas } from './categorie/categorie.sagas';

export default function* rootSaga() {
  yield all([call(productSagas), call(categorieSagas)]);
}
