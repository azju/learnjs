export const timerGame = (callback) => {
  console.log("Ready ... go!");
  setTimeout(() => {
    console.log("Time is up -- stop!");
    callback && callback();
  }, 1000);
};

export const infiniteTimerGame = (callback) => {
  console.log("ready go");
  setTimeout(() => {
    console.log("Time up! 10 seconds before the next game starts...");
    callback && callback();

    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
};
