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

## Usage 
Once you've got Atlas up and running you'll probably want to play around with creating your own interface (to get a feel for things). Each of the plugin files contains appropriate documentation as to how to use it. But basically using the following pattern will likely get you most of the way there, just replace plugin with the right plugin name and container with the id of the element that the plugin will act on:

> <a data-trigger="plugin" aria-owns="container">Trigger</a>
> <div id="container" class="atlas-hide">Data in here</div>

See the indiviual Javascript files for more information.

## Configuring
Atlas can be configured, to some excent anyway. The configuration options aim to make the api fit into any existing site or application where there may be conflicts with names, classes, events or plugins. All of the settings for Atlas are placed within the settigns.js file which can be found in the js/ folder.

Configuration can be split into 3 parts. Attribute configuration, class configuration and plugin configuration.

### Attribute configuration
By default Atlas uses the the data-trigger and aria-owns attributes to configure plugins in the markup. These can be altered by changing the pluginAttribute and panelAttribute settings.

### Class configuration
There are four classes used in Atlas; the classes are used for hidden, invisible, active and disabled items. To configure these classes you'll need to update the appropriate settings. These are: hiddenClass, invisibleClass, activeClass and disabledClass

### Plugin configuration
Each of the plugins in Atlas is a jQuery plugin, it is not unlikely that there may be some conflict between the Atlas plugins and other existing plugins. To address this issue Atlas provides a way for each plugin to be renamed. Inside the settings file there is a section for pluginIdentifiers containing a name for each plugin. Updating the right hand side of this will change the names and events for the relevent plugin