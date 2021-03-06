/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Game from './game';

const game = Game({
  moves: {
    'A': G => G,
    'B': () => null,
  }
});

test('basic', () => {
  expect(game.moveNames).toEqual(['A', 'B']);
  expect(typeof game.reducer).toEqual('function');
});

test('reducer', () => {
  const testObj = { test: true };
  expect(game.reducer(testObj, { type: 'A' })).toEqual(testObj);
  expect(game.reducer(testObj, { type: 'B' })).toEqual(null);
});

test('playerID from context', () => {
  const g = Game({
    moves: {
      A() {
        return { playerID: this.playerID };
      }
    },
  });

  const state = g.reducer({}, { type: 'A', playerID: 'player' });
  expect(state.playerID).toBe('player');
});

test('flow override', () => {
  const f = { reducer: () => {} };
  const game = Game({
    flow: f
  });
  expect(game.flow).toBe(f);
});
