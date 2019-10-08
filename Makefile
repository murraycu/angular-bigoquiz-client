.PHONY: all build clean deploy

all: build

build:
	npm install ;\
        npm run build -- --prod

test:
	npm test -- --no-watch --no-progress --browsers=ChromeHeadlessCI

clean:
	ng build --delete-output-path

deploy: build
	gcloud app deploy .

format:
	ng lint --fix

