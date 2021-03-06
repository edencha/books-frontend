import {
  takeEvery, all, call, put, select, takeLatest, delay,
} from 'redux-saga/effects';
import { checkAvailableAtRidiSelect, requestBooks, requestBooksDesc } from 'src/services/books/request';
import pRetry from 'p-retry';
import { booksActions, BooksReducer, BooksState } from 'src/services/books/reducer';
import { Actions } from 'immer-reducer';
import { splitArrayToChunk } from 'src/utils/common';
import { RootState } from 'src/store/config';
import sentry from 'src/utils/sentry';
import * as BookApi from 'src/types/book';

// 임시 청크
const DEFAULT_BOOKS_ID_CHUNK_SIZE = 60;

// 장르 홈 redux 제거 전 일단 withDesc 옵션 처리로 땜빵
function* fetchBooks(bIds: string[], withDesc = false) {
  const [bookResult, descResult]: [BookApi.Book[], BookApi.BookDescResponse[]] = yield all([
    call(pRetry, () => requestBooks(bIds), { retries: 2 }),
    withDesc ? call(pRetry, () => requestBooksDesc(bIds), { retries: 2 }) : null,
  ]);
  yield put({ type: booksActions.setBooks.type, payload: { items: bookResult } });
  if (withDesc) {
    yield put({ type: booksActions.setDesc.type, payload: descResult });
  }
}


function* isAvailableAtSelect(bIds: string[]) {
  try {
    const isAvailableSelect = yield select((state: RootState) => state.books.isAvailableSelect);
    const availableBIds = bIds.filter(
      (bId) => !(bId in isAvailableSelect),
    );
    if (availableBIds.length > 0) {
      const data = yield call(pRetry, () => checkAvailableAtRidiSelect(bIds), {
        retries: 2,
      });
      const ids = Object.keys(data).map((key) => data[key]);
      yield put({
        type: booksActions.setSelectBook.type,
        payload: { checkedIds: bIds, isSelectedId: ids },
      });
    }
  } catch (e) {
    sentry.captureException(e);
  }
}

function* watchCheckSelectBookIds(action: Actions<typeof BooksReducer>) {
  try {
    yield delay(1000);
    if (action.type === booksActions.checkSelectBook.type && action.payload.length > 0) {
      const uniqIds = [...new Set(action.payload)];
      const isAvailableSelect = yield select((state: RootState) => state.books.isAvailableSelect);
      const excludedIds = uniqIds.filter(
        (id) => !isAvailableSelect[id],
      );
      const arrays = splitArrayToChunk(excludedIds, DEFAULT_BOOKS_ID_CHUNK_SIZE);

      yield all(arrays.map((array) => isAvailableAtSelect(array)));
    }
  } catch (error) {
    sentry.captureException(error);
  }
}

function* watchInsertBookIds(action: Actions<typeof BooksReducer>) {
  try {
    if (action.type === booksActions.insertBookIds.type && action.payload.bIds.length > 0) {
      const uniqIds = [...new Set(action.payload.bIds)];

      const books: BooksState = yield select((state: RootState) => state.books);
      const excludedIds = uniqIds.filter((id) => !books.items[id]);
      const arrays = splitArrayToChunk(excludedIds, DEFAULT_BOOKS_ID_CHUNK_SIZE);

      yield all(arrays.map((array) => fetchBooks(array, action.payload.withDesc)));
    }
  } catch (error) {
    sentry.captureException(error);
  }
}

export function* booksRootSaga() {
  yield all([
    takeEvery(booksActions.insertBookIds.type, watchInsertBookIds),
    takeLatest(booksActions.checkSelectBook.type, watchCheckSelectBookIds),
  ]);
}
