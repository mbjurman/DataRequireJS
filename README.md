DataRequireJS
=============
A require module that loads other require modules using the data-require attribute. Each module that is loaded this way also gets a reference to it's DOM-element when it's created. The goal of this library is to make it easier to organize javascript-code on a larger web-site.

Dependencies
=============
require.js

Demo
=============
The library can be tested in a browser using the file demo/index.html. This example contains a simple page that loads in some modules using the data-require attribute. The demo also contains an example of how the module handles ajax-loaded markup.

Unit-test
=============
Run: grunt jasmine
