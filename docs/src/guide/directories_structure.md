# Directory structure

## Folder descriptions

**`MyProject`** - root directory for your project  
**`MyProject\config`** - root directory for your config files and modules config  
**`MyProject\server`** - root directory for your application server scripts  
**`MyProject\log`** - root directory for your application log files  
**`MyProject\web`** - root directory for your application contains only entry point **`index.php`**
and server config file like **`.htaccess`** or **`web.config`** etc.

```text
|─MyProject  
|───config  
|───log  
|───server  
|───vendor  
|───web 
``` 


## Example

Here described just example.
::: tip Directory structure example.

```text
|─MyProject  
|───config  
|─────About  - module name
|───────options.json  - module options
|───────routes.json  - module routes {optional}
|─────app-config-template.json
|─────app-middlewares.json
|───log  
|───server  
|─────App  
|───────AppScripts  
|───web 
|─────index.php 
``` 

:::



