# Directory structure

## Recommended project structure
You can create your own structure and use framework as you want. 
Here described just example.

::: tip Directory structure example.
```text
|─MyProject  
|───config  
|─────config.json  
|───log  
|───server  
|─────App  
|───────AppScripts  
|───web 
|─────index.php 
``` 
:::

## Folder descriptions
**`MyProject`** - root directory for your project  
**`MyProject\config`** - root directory for your config files and modules config  
**`MyProject\server`** - root directory for your application server scripts  
**`MyProject\log`** - root directory for your application log files  
**`MyProject\web`** - root directory for your application contains only entry point **`index.php`** 
and server config file like **`.htaccess`** or **`web.config`** etc.

