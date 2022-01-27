// https://www.codeproject.com/Articles/5308531/NodeJS-await-is-only-valid-in-async-function

async function doSomethingAsync() {
    return Promise.resolve('Hello, World!');
}

(async function() {
    const response = await doSomethingAsync();
    console.log(response);
})();
