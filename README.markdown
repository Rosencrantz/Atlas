#Atlas

Atlas is a user interface prototyping tool. It purpose is to provides a number of simple, easy to use patterns for creating common user interface features, without the contraints of existing design or style.

In an effort to provide simple patterns Atlas provides a set of small components that can be composed into larger, more complex features. The most simple components provided by Atlas consist of a trigger and a container, the markup for which is terse and easy to commit to memory. More can be found in the documentation on this subject

## Getting started

### The very quick way to get started

Once you've checked out the repository run the following from the application root:

> ./run.sh

### The quick way to get started.

If you have make (which comes with the Apple developer tools) you should be able to run the following:

> make debug

### If you want to compile Atlas and run the development server

For those interested in minifying/compiling Atlas, you'll need the following:

make (part of the apple developer tools)
Node.js (http://nodejs.org/#download)
npm (http://npmjs.org/)
lessc (http://lesscss.org/)
uglify.js (https://github.com/mishoo/UglifyJS)

Once you have all these installed run the following command from the root directory:

> make run

### If you just want to compile Atlas.

You'll still need all of the above installed, once you do, type the following from the root directory:

> make atlas