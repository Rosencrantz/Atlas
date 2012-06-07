Atlas

Atlas is a user interface prototyping tool. It purpose is to provides a number of simple, easy to use patterns for creating common user interface features, without the contraints of existing design or style.

In an effort to provide simple patterns Atlas provides a set of small components that can be composed into larger, more complex features. The most simple components provided by Atlas consist of a trigger and a container, the dropdown serves as a good example:

<a data-trigger="dropdown" aria-owns="container">Trigger</a>
<div id="container">Container</a>

If you are interested in running the system locally just to play around or develop your own plugins the easiest thing for you to do is check out the repository, go into the base directory (that's the one where the Makefile is) and type:

make debug

This should start a simple web server on your local machine that you should be able to access via http://localhost:8000/