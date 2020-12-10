# pleasant-tour-db

Getting Started

Required dependencies

    npm install browserify watchify -g

run

    watchify stubMaker.js -o static/bundle.js

start server

    json-server --watch db.json 
    
    or
    
    json-server db.json --routes routes.json

