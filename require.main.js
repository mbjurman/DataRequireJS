/*global requirejs: false */

requirejs.config({
    baseUrl: "",
    waitSeconds: 60
});

requirejs(
    [
        "data-require"
    ],

    function (dataRequire) {
        dataRequire.init(document.body);
    }
);