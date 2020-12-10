# pleasant-tour-db

Getting Started

    git clone https://github.com/Ismail-Opatola/pleasant-tour-db

    npm install

Required dependencies

    npm install browserify watchify -g

bundle the js files with browserify

    watchify stubMaker.js -o static/bundle.js

start server

    json-server --watch db.json 
    
    <!-- json-server db.json --routes routes.json -->