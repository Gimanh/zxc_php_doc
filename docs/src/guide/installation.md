# Installation

## Requirements
* Web server (IIS, Apache, Nginx) with enabled **URL rewriting**
* PHP >= 7.3

## Composer

```shell script
$ composer require giman/zxc_php:dev-master
```

::: tip
Update autoload (when you change a configuration)
``` shell script 
$ composer dump-autoload
``` 
:::

## Local 

* Download latest version from [GitHub](https://github.com/Gimanh/ZXC_PHP)
* Require autoload 
```php
require 'ZXC_PHP/src/ZXC/Native/PSR/Autoloader.php';
```
* Create autoload configuration
```php
$autoloadConfig = [
    'ZXC' => [__DIR__ . '/../server/ZXC_PHP/src/ZXC'],
    'App' => [__DIR__ . '/../server/App'],
];
new Autoloader($autoloadConfig);
```
* Require config file
```php
$appConfig = __DIR__ . '/../config/config.json';
```

* Create application using `ZXCFactory`
```php
ZXCFactory::create($appConfig);
```
