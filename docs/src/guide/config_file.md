# Configuration

Before you start using `ZXC_PHP` you should read more about a configuration. Any application start from defining routes,
middlewares and module options.  
`ZXC_PHP` has it is own configuration and cannot work without it, configuration is simple and describes in json files.  
You can define the application configuration in the config folder and place this folder wherever you want.

Config folder contains application setting and application module setting. For working with configuration, you should
use class `ZXC\ZXCConfig`, each folder in config directory is represented as module. Each module can have `options`
, `routes` and `middlewares`.

`ZXC\ZXCConfig` has `create` method which accept path to `config` directory and return valid config `array`, this array
can be passed into `ZXCFactory::create`. You can see example which is used in `/web/index.php`

```php{8}
<?php

use ZXC\ZXCConfig;
use ZXC\ZXCFactory;

require dirname(__FILE__) . '/../vendor/autoload.php';

ZXCFactory::create(ZXCConfig::create(dirname(__FILE__) . '/../config/'));
```

`ZXC\ZXCConfig` scans the `config` directory and then converts the folders into a `module` with their options.

## Why we use json file instead of php

The main reason is restricting you writing some logic in config file. JSON file accept only parameter's data, in php you
can write some functions with logic and config will look dirty. The configuration is divided into module settings, this
approach helps us understand the configs and quickly find the information we need. The module directory contains three
files, `options.json`, `route.json`, and `middlewares.json` which contain custom settings that you can work with faster
than one large file.

## File `options.json`

This file describes which module will be called and with which options.

### class

- Type: `string`
- Required `true`
- Description: _full module class name with namespace_

### defer

- Type: `bool`
- Required `false`
- Description: _if true module will be initialised when will be called, if false module will be initialised for each
  request_

### options

- Type: `object`
- Required `true`
- Description: _module settings_

#### Example

```json
{
    "class": "App\\Modules\\MyModule\\MyModule",
    "defer": true,
    "options": {
        "someProperty": "//here you can define your properties for module"
    }
}
```

## File `routes.json`

This file describes routes for module, if needed. Root element is array which contains all module routes. See routing
section for details.

```json{2-9}
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

## File `middlewares.json`

This file describes module middlewares for application. Key is alias for middleware value must contain full class name
with namespace.

```json{2,3}
{
    "myMiddlewareAlias": "App\\Modules\\MyModule\\Middlewares\\MyMiddleware",
    "myApplicationMiddlewareAlias": "App\\Modules\\MyModule\\Middlewares\\MyApplicationMiddleware"
}
```

For example, we want create settings for module called `MyModule`.

## Configuration structure

`/config` - folder for app configuration
`/config/app-config-template.json` - main config json file with main sections
`/config/app-middlewares.json` - describes sections for app middlewares
`/config/About` - app module directory, this folder name will be used as module name
`/config/About/options.json` - options for module
`/config/About/routes.json` `{optional}` - routes for module

## Creating configuration

- Create file `/config/app-config-template.json`

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

- Create file `/config/app-middlewares.json`

```json
{
    "useAppMiddlewares": {},
    "middlewares": {}
}
```


