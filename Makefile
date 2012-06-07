makeFolder = build
appName = atlas
port = 8000

clean: 
	rm -rf $(makeFolder)/

$(appName): clean
	mkdir $(makeFolder)
	mkdir $(makeFolder)/js;
	cd js; r.js -o baseUrl=. name=vendor/require/almond.js include=core out=app-built.js wrap=true optimize=none; cd -
	cp js/app-built.js $(makeFolder)/js/$(appName).js; rm js/app-built.js
	mkdir $(makeFolder)/css
	mkdir $(makeFolder)/img; cp -r img/ $(makeFolder)/img
	mkdir $(makeFolder)/docs; cp -r docs/ $(makeFolder)/docs
	cd less; ls; lessc core.less > ../$(makeFolder)/css/$(appName).css; cd -
	cp $(makeFolder)/css/$(appName).css js/tests/app.css
	cp -r $(makeFolder)/css $(makeFolder)/docs/css
	cp -r $(makeFolder)/js $(makeFolder)/docs/js
	@@if test ! -z ${NAMESPACE}; then \
		sed -i ".css" "s/#$(makeFolder)/#${NAMESPACE}/g" $(makeFolder)/css/$(appName).css; \
		sed -i ".css" "s/$(makeFolder)-/${NAMESPACE}-/g" $(makeFolder)/css/$(appName).css; \
	fi 
watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system('make $(appName)') }"

run: $(appName)
	python -m SimpleHTTPServer $(port)

debug:
	python -m SimpleHTTPServer $(port)