import iterators from '../../src/utils/iterators';
import expect from 'expect';

describe('iterators module', () => {

  describe('#mapTimes method', () => {

    it('should exist', () => {
      expect(iterators.mapTimes).toExist();
      expect(iterators.mapTimes).toBeA('function');
    });

    it('should return array with times values of execute callback', () => {
      const result = iterators.mapTimes(5, i => i);
      expect(result).toBeA(Array);
      expect(result.length).toBe(5);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it('should call the execute param function n times with time as argument', () => {
      const cb = function (i) { return i };
      const spy = expect.createSpy().andCall(cb);

      iterators.mapTimes(5, spy);

      expect(spy.calls.length).toBe(5);
      spy.calls.forEach((call, i) => { expect(call.arguments).toEqual([i]); });
      spy.reset();
    });
  });
});
