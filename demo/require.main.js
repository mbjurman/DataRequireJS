/*global requirejs: false */

requirejs.config({
    baseUrl: "",
    waitSeconds: 60,
    map: {
    	'*': {
    		req: 'require'
    	}
    },
    paths: {
        'data-require': '../build/data-require.min'
    }
});

requirejs(
    [
        "data-require"
    ],

    function (dataRequire) {
        dataRequire.init(document.body);
    }
);