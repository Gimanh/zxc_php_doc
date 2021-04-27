# Middleware
`ZXC_PHP` middleware implements the [PSR-15 Middleware Interface](https://www.php-fig.org/psr/psr-15/). 
`ZXC_PHP` HTTP middleware component participates in processing an HTTP message: by acting on the request, generating 
the response, or forwarding the request to a subsequent middleware and possibly acting on its response. Each middleware 
should invoke the next middleware handler and pass it a Request as arguments.

## How does it work?
`ZXC_PHP` uses middlewares as a layered system. Middleware lets you define a custom handler that can be run 
before main handler.  
You can use two type of middlewares:
- You can **implement** `MiddlewareInterface`
    - Add a middleware to config like this `"appMiddlewareAlias": "App\\AppMiddlewareClass"`
- You can create your **own class** and define **method** with two arguments `ServerRequestInterface $request, RequestHandlerInterface $handler`
    - Add a middleware to config like this `"firstMiddlewareAlias": "App\\RouteMiddlewares:myMiddleware"`

## Define your middleware
Each middleware should take two arguments `ServerRequestInterface $request, RequestHandlerInterface $handler`.

Example with implemented `MiddlewareInterface`   
```php
class AppMiddlewareClass implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);
        $response->getBody()->write('World');
        return $response;
    }
}
```      

Example **without** implemented `MiddlewareInterface`. Just create your own class and accept two arguments 
`ServerRequestInterface $request, RequestHandlerInterface $handler`. 
```php
class RouteMiddlewares
{
    public function myMiddleware(ServerRequestInterface $request, RequestHandlerInterface $handler)
    {
        $response = $handler->handle($request);
        $response->getBody()->write(' [middleware first] ');
        return $response;
    }
}
```                                               

## Add a middleware to application
- Create class with method 
```php
class AppMiddlewareClass implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);
        $response->getBody()->write('World');
        return $response;
    }
}
```   
- Register middleware in config file
```json
//config.json
//...
"middlewares": {
    "appMiddleware": "App\\RouteMiddlewares:myMiddleware"
},
//...
```
- Add a middleware to section `useAppMiddlewares` in config

```json
//config.json
//...
"useAppMiddlewares": {
    "appMiddleware": true
},
//...
```

## Add a middleware to route
- Create class with method 
```php
class RouteMiddlewares
{
    public function myMiddleware(ServerRequestInterface $request, RequestHandlerInterface $handler)
    {
        $response = $handler->handle($request);
        $response->getBody()->write(' [middleware first] ');
        return $response;
    }
}
```   
- Register middleware in config file in root **"middlewares"** section
```json
//config.json
//...
"middlewares": {
    "first": "App\\RouteMiddlewares:myMiddleware"
},
//...
```
- Add a middleware for the route in **"middlewares"** section

```json
//config.json
//...
"routes": [
    {
        "middlewares": [
            "first"
        ],
        "method": "GET",
        "route": "/",
        "handler": "App\\Application:hello",
    }
]
//...
```

