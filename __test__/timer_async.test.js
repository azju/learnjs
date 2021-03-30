import { timerGame, infiniteTimerGame } from "../timer_async";

test("should call callback in 1 sec", () => {
  // enable fake timers by calling  useFakeTimers, which mocks out setTimeout and other timer functions
  jest.useFakeTimers();
  timerGame();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
});

test("calls the callback after 1 second", () => {
  const callback = jest.fn();
  timerGame(callback);

  expect(callback).not.toBeCalled();

  // fast-forward callback should have been called
  jest.runAllTimers();

  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});

test("calls callback via advanceTimerByTime", () => {
  const callback = jest.fn();
  timerGame(callback);

  expect(callback).not.toBeCalled();

  jest.advanceTimersByTime(1000);

  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});

test("infiniteTimerGame", () => {
  jest.useFakeTimers();
  const callback = jest.fn();

  infiniteTimerGame(callback);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);

  // fast forward and exhaust only currently pending timers
  // but not new timer
  jest.runOnlyPendingTimers();

  // 1 sec timer has fired its callback
  expect(callback).toBeCalled();
  expect(setTimeout).toHaveBeenCalledTimes(2);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
});
