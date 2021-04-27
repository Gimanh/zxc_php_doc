# Modules system

`ZXC_PHP` modules allow you to create your own reusable module.  
It is easy to create a module:
- Create your own class
- Implement `ZXC\Interfaces\IModule`
- Use trait `use ZXC\Traits\Module;`
- Implement method `init` which gets config

```php
<?php

use ZXC\Traits\Module;
use ZXC\Interfaces\IModule;

class Logger implements IModule
{
    use Module;

    public function init(array $config = [])
    {
        //some initialization
    }

    public function log($level, $message, array $context = [])
    {
        //write logs here
    }
}
```
# Modules
Class `ZXC\Native\Modules`.  

## get
Get module instance by module name.
- Arg type: `string`
- Return: `Module | null`
```php
ZXC\Native\Modules::get('logger');
```

## getNew
Get new module instance with given options. This options will be passed into init method.
- Arg type: `string & array`
- Return: `Module | null`
```php
ZXC\Native\Modules::getNew('logger', ['lvl' => 'critical' /*new options here*/]);
```

## uninstall
Uninstall modules.
- Arg type: `array`
- Return: `bool`
```php
//uninstall just 'logger'
ZXC\Native\Modules::uninstall(['logger' => true]);
```

## How to use it
When you work with modules you should use class `ZXC\Native\Modules`. 
`ZXC\Native\Modules` has some methods which can help you;
```php
//        $logger = Modules::get('logger');
        $lg = Modules::getByClassName(Logger::class);
        $n = Modules::getNew('Logger', [
            'lvl' => 'critical',
            'fileName' => 'qwe.log',
            'folder' => '/Users/nikolaygiman/Programming/zxc-test-site/log'
        ]);
        $r = Modules::uninstall(['loggeR' => true]);
```
