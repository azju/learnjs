// Understand how async & await work in JS
// 1. iterator

// How we use asyn & await
const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

async function test() {
  const data = await getData();
  console.log("data: ", data);

  const data2 = await getData();
  console.log("data2: ", data2);
  return "success";
}

test().then((res) => console.log(res));
// wait for 1 sec, then print out data, then data2, then success

// refactor with generator
// generator only works with next and wont get triggered automatically
// executation will stop at the place where the next yield is

const test1 = asyncToGenerator(function* generatorTest() {
  // replace await with yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
});

function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        const { value, done } = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (val) => step("next", val),
            (err) => step("throw", err)
          );
        }
      }
      step("next");
    });
  };
}
