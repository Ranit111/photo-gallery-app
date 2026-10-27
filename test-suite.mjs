import test from 'node:test';
import assert from 'node:assert/strict';
import {
  favouritesReducer,
  FAVOURITES_ACTIONS,
  STORAGE_KEY,
} from './src/reducers/favouritesReducer.js';

test('favouritesReducer - toggles a photo ID into favourites when not present', () => {
  const initialState = ['1', '2'];
  const action = {
    type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
    payload: '3',
  };

  const nextState = favouritesReducer(initialState, action);
  assert.deepEqual(nextState, ['1', '2', '3']);
});

test('favouritesReducer - removes a photo ID from favourites when already present', () => {
  const initialState = ['1', '2', '3'];
  const action = {
    type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
    payload: '2',
  };

  const nextState = favouritesReducer(initialState, action);
  assert.deepEqual(nextState, ['1', '3']);
});

test('favouritesReducer - returns unchanged state for unknown actions', () => {
  const initialState = ['10'];
  const action = { type: 'UNKNOWN_ACTION' };

  const nextState = favouritesReducer(initialState, action);
  assert.deepEqual(nextState, ['10']);
});

test('favouritesReducer - handles empty initial state properly', () => {
  const initialState = [];
  const action = {
    type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
    payload: '100',
  };

  const nextState = favouritesReducer(initialState, action);
  assert.deepEqual(nextState, ['100']);
});

test('search filter logic - filters authors case-insensitively', () => {
  const samplePhotos = [
    { id: '1', author: 'Alejandro Escamilla' },
    { id: '2', author: 'Paul Jarvis' },
    { id: '3', author: 'Danielle MacInnes' },
    { id: '4', author: 'ALEJANDRO ESCAMILLA' },
  ];

  const query = 'alejandro';
  const filtered = samplePhotos.filter((p) =>
    p.author.toLowerCase().includes(query.toLowerCase().trim())
  );

  assert.equal(filtered.length, 2);
  assert.deepEqual(filtered.map((p) => p.id), ['1', '4']);
});

test('search filter logic - empty query returns all photos', () => {
  const samplePhotos = [
    { id: '1', author: 'Alejandro Escamilla' },
    { id: '2', author: 'Paul Jarvis' },
  ];

  const query = '   ';
  const cleanQuery = query.trim().toLowerCase();
  const filtered = cleanQuery
    ? samplePhotos.filter((p) => p.author.toLowerCase().includes(cleanQuery))
    : samplePhotos;

  assert.equal(filtered.length, 2);
});
