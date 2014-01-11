/*global requirejs: false */

requirejs.config({
    baseUrl: "",
    waitSeconds: 60,
    map: {
    	'*': {
    		req: 'require'
    	}
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