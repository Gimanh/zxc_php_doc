# Routing  
`ZXC_PHP` uses it is own simple routing class. HTTP requests can be routed only to class methods.  

## Route handler
If you want define route handler in config you should use next format.

:::tip Route handler in config
`Namespace\\ClassName:method`  
`App\\Application:helloWorld`
:::

All handler methods should take three arguments `ServerRequest $request, Response $response, RouteParams $routeParams` and return `Response`.  
For example:

```php
<?php


namespace App;


use ZXC\Native\RouteParams;
use ZXC\Native\PSR\Response;
use ZXC\Native\PSR\ServerRequest;


class Application
{
    public function helloWorld(ServerRequest $request, Response $response, RouteParams $routeParams)
    {
        $response->write('Hello world');
        return $response;
    }
}
```
## Route dynamic parameters  
You can define a single route to handle different dynamic parameters.  
Here (_config file below_) we have defined route with two dynamic parameters `user` and `id`.   
You can use method `$routeParams->getParams()` to get dynamic parameters.
```json
{
    "router": {
        "routes": [
            {
                "method": "GET",
                "route": "/:user/post/:id",
                "handler": "App\\Application:getPostById"
            }
        ]
    }
}
```

```php
<?php


namespace App;


use ZXC\Native\RouteParams;
use ZXC\Native\PSR\Response;
use ZXC\Native\PSR\ServerRequest;


class Application
{
    public function getPostById(ServerRequest $request, Response $response, RouteParams $routeParams)
    {
        $params = $routeParams->getParams();
        $response->write('Post from user ' . $params['user'] . ' id => ' . $params['id']);
        return $response;
    }
}
```
