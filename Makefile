.PHONY: init
init:
	cp ./infrastructure/env/dotenv.local .env

.PHONY: docker
docker:
	cd infrastructure/docker && docker-compose up -d && cd ../../