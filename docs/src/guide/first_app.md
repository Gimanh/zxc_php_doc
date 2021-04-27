# First application
Here you can find information how to create your first project using `ZXC_PHP` Framework.
:::tip Do not wait, just do it.
It is easy and simple. Just follow steps below.
:::

## Step by step
:::tip Composer installation
You can find more information how install composer  [here](https://getcomposer.org/download/).
:::
### Create following folder structure  

::: tip Directory structure example.
```text
|─MyProject  
|───config  
|─────config.json  
|───log  
|───server  
|─────App  
|───────App.php  
|───web 
|─────index.php 
|─────.htaccess 
``` 
:::

``` shell script
# config folder
$ mkdir -p MyProject/config
$ touch MyProject/config/config.json
# folder for application scripts
$ mkdir -p MyProject/server/App
$ touch MyProject/server/App/Application.php
$ touch MyProject/server/App/AppMiddlewareClass.php
$ touch MyProject/server/App/RouteMiddlewares.php
# folder for application entry point and server config
$ mkdir -p MyProject/web
$ touch MyProject/web/index.php
$ touch MyProject/web/.htaccess
```

### Add following code to `MyProject/config/config.json`
::: details Show config content
```json
{
    "router": {
        "useAppMiddlewares": {
            "appMiddlewareAlias": true
        },
        "middlewares": {
            "firstMiddlewareAlias": "App\\RouteMiddlewares:myMiddleware",
            "secondMiddlewareAlias": "App\\RouteMiddlewares:myMiddleware2",
            "appMiddlewareAlias": "App\\AppMiddlewareClass"
        },
        "notFoundHandler": "App\\RouteMiddlewares:notFound",
        "routes": [
            {
                "middlewares": [
                    "firstMiddlewareAlias"
                ],
                "method": "GET",
                "route": "/",
                "handler": "App\\Application:hello",
                "children": {
                    "middlewares": [
                        "firstMiddlewareAlias",
                        "secondMiddlewareAlias"
                    ],
                    "route": ":user",
                    "handler": "App\\Application:helloUser",
                    "children": {
                        "middlewares": [],
                        "route": "static/profile",
                        "handler": "App\\Application:profile"
                    }
                }
            },
            {
                "middlewares": [
                    "firstMiddlewareAlias"
                ],
                "method": "GET",
                "route": "/:user/static",
                "handler": "App\\Application:helloStatic"
            }
        ]
    },
    "modules": {}
}
```
:::

### Add following code to `MyProject/server/App/Application.php`
::: details Show Application.php content
```php
<?php


namespace App;


use ZXC\Native\RouteParams;
use ZXC\Native\PSR\Response;
use ZXC\Native\PSR\ServerRequest;


class Application
{
    public function hello(ServerRequest $request, Response $response, RouteParams $routeParams)
    {
        $response->write('Hello');
        return $response;
    }

    public function helloUser(ServerRequest $request, Response $response, RouteParams $routeParams)
    {
        $userName = json_encode($routeParams->getParams());
        $response->write('Hello user ' . ($userName) . '');
        return $response;
    }

    public function helloStatic(ServerRequest $request, Response $response, RouteParams $routeParams)
    {
        $userName = json_encode($routeParams->getParams());
        $response->write('Hello static method for ' . ($userName) . ' ');
        return $response;
    }

    public function profile(ServerRequest $request, Response $response, RouteParams $routeParams)
    {
        $json = json_encode($routeParams->getParams());
        $response->write('Called profile method ' . $json);
        return $response;
    }
}

```
:::

### Add following code to `MyProject/server/App/AppMiddlewareClass.php`
::: details Show AppMiddlewareClass.php content
```php
<?php


namespace App;


use ZXC\Interfaces\Psr\Server\MiddlewareInterface;
use ZXC\Interfaces\Psr\Http\Message\ResponseInterface;
use ZXC\Interfaces\Psr\Server\RequestHandlerInterface;
use ZXC\Interfaces\Psr\Http\Message\ServerRequestInterface;


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
:::

### Add following code to `MyProject/server/App/RouteMiddlewares.php`
::: details Show RouteMiddlewares.php content
```php
<?php


namespace App;


use ZXC\Native\PSR\Response;
use ZXC\Interfaces\Psr\Http\Message\RequestInterface;
use ZXC\Interfaces\Psr\Server\RequestHandlerInterface;
use ZXC\Interfaces\Psr\Http\Message\ServerRequestInterface;


class RouteMiddlewares
{
    public function myMiddleware(ServerRequestInterface $request, RequestHandlerInterface $handler)
    {
        $response = $handler->handle($request);
        $response->getBody()->write(' [middleware first] ');
        return $response;
    }

    public function myMiddleware2(ServerRequestInterface $request, RequestHandlerInterface $handler)
    {
        $response = $handler->handle($request);
        $response->getBody()->write(' [middleware second] ');
        return $response;
    }

    public function notFound(RequestInterface $request)
    {
        return (new Response())->withStatus(404);
    }
}
```
:::

### Install `ZXC_PHP` using composer
 
``` shell
$ cd MyProject/
$ composer require giman/zxc_php:dev-master
```
:::tip Result (see selected lines below)
As a result you can see new folder `vendor` with nested two folders `composer`, `giman` and `autoload.php`.   
Also, composer create two files `composer.json` and `composer.lock` in root directory  

```text {7,8,9,10,14,15}
|─MyProject  
|───config  
|─────config.json  
|───server  
|─────App  
|───────App.php  
|───vendor 
|───────compose  
|───────giman  
|───────autoload.php  
|───web 
|─────index.php 
|─────.htaccess 
|───composer.json 
|───composer.lock 
```
:::

### Enable rewrite rule for web server

:::tip Server settings for different web servers
[Apache](./server_settings.md#apache)
[Nginx](./server_settings.md#nginx) 
[IIS](./server_settings.md#iis)   
:::

Add following lines into `.htaccess`
``` apacheconfig
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^(.*)$ index.php?q=$1 [L,QSA]
```

### Add an autoload for application to `composer.json`
Add application namespace for an autoloader.
``` json
{
    "autoload": {
        "psr-4": {
            "App\\": "server/App"
        }
    },
}
```

### Init ZXC_PHP
Add following code to `web\index.php`. 
Here we require composer autoloader, application config file and create ZXC_PHP instance.
```php
use ZXC\ZXCFactory;

require __DIR__ . '/../vendor/autoload.php';

$appConfig = __DIR__ . '/../config/config.json';

ZXCFactory::create($appConfig);
```

### Test application

Now you can try test created application. Change `localhost` for your own host in links below.  
In our created application we have tree registered routes.  
* `http://<localhost>/`  
* `http://<localhost>/james` - `[james]` is dynamic parameter  
* `http://<localhost>/james/static` - `[james]` is dynamic parameter and other static path `/static`.    
* `http://<localhost>/james/static/profile` - `[james]` is dynamic parameter and other static path `/static/profile`.    


:::warning
As you can see below children routes do not extend parent parameter `middleware`.  
See route `http://<localhost>/james/static/profile` in config file above.
:::

Visit home page `http://<localhost>/`.  

::: details Home page execution order with middlewares
```php
// alias => appMiddlewareAlias
AppMiddlewareClass::process();
// alias => firstMiddlewareAlias
RouteMiddlewares::myMiddleware();
// alias => no alias it is handler endpoint
Application::hello();
```
:::

Visit user page `http://<localhost>/james`.   
::: details User page execution order with middlewares
```php
// alias => appMiddlewareAlias
AppMiddlewareClass::process();
// alias => firstMiddlewareAlias
RouteMiddlewares::myMiddleware();
// alias => secondMiddlewareAlias
RouteMiddlewares::myMiddleware2();
// alias => no alias it is handler endpoint
Application::helloUser();
```
:::

Visit static page `http://<localhost>/james/static`.   
::: details Static page execution order with middlewares
```php
// alias => appMiddlewareAlias
AppMiddlewareClass::process();
// alias => firstMiddlewareAlias
RouteMiddlewares::myMiddleware();
// alias => no alias it is handler endpoint
Application::helloStatic();
```
:::

Visit static page `http://<localhost>/james/static/profile`.   
::: details Profile page execution order with middlewares
```php
// alias => appMiddlewareAlias
AppMiddlewareClass::process();
// alias => no alias it is handler endpoint
Application::profile();
```
:::
