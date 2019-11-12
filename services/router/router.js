let routes = {};

function route(path, pageName) {
    routes[path] = {
        pageName: pageName,
    };
};

route('/', '../views/index.html');