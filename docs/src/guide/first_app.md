# First application

Here you can find information how to create your first project using `ZXC_PHP` Framework.
:::tip Do not wait, just do it. It is easy and simple. Just follow steps below.
:::

## Step by step

:::tip Composer installation You can find more information how install
composer  [here](https://getcomposer.org/download/).
:::

### Create following folder structure

::: tip Directory structure example.

```text
|─MyProject  
|───config  
|─────MyModule  
|.......options.json  
|.......middlewares.json
|.......routes.json  
|───log  
|───server  
|─────App  
|───────Modules  
|─────────MyModule  
|───────────Handlers  
|.............MyHandler.php  
|───────────Middlewares  
|.............MyMiddleware.php  
|.............MyApplicationMiddleware.php  
|...........MyModule.php  
|.......AppNotFound.php  
|───web 
|.....index.php 
|─────.htaccess 
``` 

:::

``` shell script
# config folder
$ mkdir -p MyProject/config/MyModule

$ touch MyProject/config/MyModule/middlewares.json
$ touch MyProject/config/MyModule/options.json
$ touch MyProject/config/MyModule/routes.json
$ touch MyProject/config/app-config-template.json
$ touch MyProject/config/app-middlewares.json

# folder for application scripts
$ mkdir -p MyProject/server/App/Modules/MyModule
$ mkdir -p MyProject/server/App/Modules/MyModule/Handlers
$ mkdir -p MyProject/server/App/Modules/MyModule/Middlewares

$ touch MyProject/server/App/Modules/MyModule/MyModule.php
$ touch MyProject/server/App/Modules/MyModule/Middlewares/MyApplicationMiddleware.php
$ touch MyProject/server/App/Modules/MyModule/Middlewares/MyMiddleware.php
$ touch MyProject/server/App/Modules/MyModule/Handlers/MyHandler.php
$ touch MyProject/server/App/AppNotFound.php

# folder for application entry point and server config
$ mkdir -p MyProject/web
$ touch MyProject/web/index.php
$ touch MyProject/web/.htaccess
```

### Add following code to `MyProject/config/MyModule/middlewares.json`

::: details Show middlewares.json content

```json
{
    "myMiddlewareAlias": "App\\Modules\\MyModule\\Middlewares\\MyMiddleware",
    "myApplicationMiddlewareAlias": "App\\Modules\\MyModule\\Middlewares\\MyApplicationMiddleware"
}
```

:::

### Add following code to `MyProject/config/MyModule/options.json`

::: details Show options.json content

```json
{
    "class": "App\\Modules\\MyModule\\MyModule",
    "options": {
        "property1": true,
        "property2": 123
    }
}
```

:::

### Add following code to `MyProject/config/MyModule/routes.json`

::: details Show routes.json content

```json
[
    {
        "middlewares": [
            "myMiddlewareAlias"
        ],
        "method": "GET",
        "route": "/",
        "handler": "App\\Modules\\MyModule\\Handlers\\MyHandler"
    }
]

```

:::

### Add following code to `MyProject/config/app-config-template.json`

::: details Show app-config-template.json content

```json
{
    "router": {
        "enableCors": true,
        "notFoundHandler": "App\\AppNotFound:notFound",
        "routes": []
    },
    "modules": {}
}
```

:::

### Add following code to `MyProject/config/app-middlewares.json`

::: details Show app-middlewares.json content

```json
{
    "useAppMiddlewares": {
        "myApplicationMiddlewareAlias": true
    },
    "middlewares": {}
}
```

:::

### Add following code to `MyProject/server/App/Modules/MyModule/MyModule.php`

::: details Show MyModule.php content

```php
<?php

namespace App\Modules\MyModule;

use ZXC\Traits\Module;
use ZXC\Interfaces\IModule;

class MyModule implements IModule
{
    use Module;

    protected $config = [];

    public function init(array $options = [])
    {
        $this->config = $options;
    }

    public function getConfigJson()
    {
        return json_encode($this->config);
    }
}
```

:::

### Add following code to `MyProject/server/App/Modules/MyModule/Middlewares/MyApplicationMiddleware.php`

::: details Show MyApplicationMiddleware.php content

```php
<?php

namespace App\Modules\MyModule\Middlewares;


use ZXC\Interfaces\Psr\Server\MiddlewareInterface;
use ZXC\Interfaces\Psr\Http\Message\ResponseInterface;
use ZXC\Interfaces\Psr\Server\RequestHandlerInterface;
use ZXC\Interfaces\Psr\Http\Message\ServerRequestInterface;

class MyApplicationMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);
        $response->getBody()->write(' [-MyApplicationMiddleware-] ');
        return $response;
    }
}

```

:::

### Add following code to `MyProject/server/App/Modules/MyModule/Middlewares/MyMiddleware.php`

::: details Show MyMiddleware.php content

```php
<?php

namespace App\Modules\MyModule\Middlewares;


use ZXC\Interfaces\Psr\Http\Message\ResponseInterface;
use ZXC\Interfaces\Psr\Http\Message\ServerRequestInterface;
use ZXC\Interfaces\Psr\Server\MiddlewareInterface;
use ZXC\Interfaces\Psr\Server\RequestHandlerInterface;

class MyMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);
        $response->getBody()->write(' [MyMiddleware text] ');
        return $response;
    }
}
```

:::

### Add following code to `MyProject/server/App/Modules/MyModule/Handlers/MyHandler.php`

::: details Show MyHandler.php content

```php
<?php

namespace App\Modules\MyModule\Handlers;

use ZXC\Native\Modules;
use ZXC\Native\RouteParams;
use ZXC\Native\PSR\ServerRequest;
use App\Modules\MyModule\MyModule;
use ZXC\Interfaces\Psr\Http\Message\ResponseInterface;

class MyHandler
{
    /** @var MyModule */
    protected $myModule = null;

    public function __construct()
    {
        $this->myModule = Modules::get('MyModule');
    }

    public function __invoke(ServerRequest $request, ResponseInterface $response, RouteParams $routeParams): ResponseInterface
    {
        $config = $this->myModule->getConfigJson();
        $response->getBody()->write('Hello from MyHandler. Config ' . $config);
        return $response;
    }
}

```

:::

### Add following code to `MyProject/server/App/AppNotFound.php`

::: details Show AppNotFound.php content

```php
<?php

namespace App;

use ZXC\Native\PSR\Response;
use ZXC\Interfaces\Psr\Http\Message\RequestInterface;
use ZXC\Interfaces\Psr\Http\Message\ResponseInterface;

class AppNotFound
{
    public function notFound(RequestInterface $request): ResponseInterface
    {
        return (new Response())->withStatus(404);
    }
}
```

:::

### Add following code to `MyProject/web/index.php`

::: details Show index.php content

```php
<?php

use ZXC\ZXCConfig;
use ZXC\ZXCFactory;

require dirname(__FILE__) . '/../vendor/autoload.php';

ZXCFactory::create(ZXCConfig::create(dirname(__FILE__) . '/../config/'));
```

:::

### Add following code to `MyProject/web/.htaccess`

::: details Show .htaccess content

```apacheconf
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^(.*)$ index.php?q=$1 [L,QSA]
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

```

:::
