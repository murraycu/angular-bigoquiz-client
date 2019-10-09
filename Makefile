.PHONY: all build clean deploy

all: build

build:
	npm install ;\
        npm run build -- --prod

build-debug:
	npm install ;\
        npm run build

test:
	npm test -- --no-watch --no-progress --browsers=ChromeHeadlessCI

clean:
	ng build --delete-output-path

deploy: build
	gcloud app deploy .


run-debug: build-debug
	ng serve

format:
	ng lint --fix

