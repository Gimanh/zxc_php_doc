# Server settings
## Apache

:::tip MacOS
Apache settings destination is `/etc/apache2/` 
:::

Example configuration for Apache
### Enable PHP 
Go to `httpd.conf` and uncomment 
```apacheconfig
LoadModule php7_module libexec/apache2/libphp7.so
```

### Enable ModRewrite
Go to `httpd.conf` and uncomment 
```apacheconfig
LoadModule rewrite_module libexec/apache2/mod_rewrite.so
```

### Enable Virtual hosts
Go to `httpd.conf` and uncomment 
```apacheconfig
# Virtual hosts
Include /private/etc/apache2/extra/httpd-vhosts.conf
```

### Virtual host settings
:::tip
Do not forget change paths to yours
:::
Add following settings to `httpd-vhosts.conf`
```apacheconfig
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    DocumentRoot "/users/<youruserhere>/path/MyProject/web"
    ServerName mysite.local
    ServerAlias mysite.local

    <Directory "/users/<youruserhere>/path/MyProject/web">
        Options -Indexes +FollowSymLinks +Includes
        AllowOverride All
        Order allow,deny
        Allow from All
    </Directory>

    ErrorLog "/path/to/dummy-host.example.com-error_log"
    CustomLog "/path/to/dummy-host.example.com-access_log" common
</VirtualHost>
```

### Update hosts file
```shell script
$ sudo vim /etc/hosts
```
Add following string
```text
127.0.0.1 mysite.local
```

## Nginx
Example configuration for `nginx`
```smartyconfig
server {
    root /var/www/html;
    location / {
        index index.php index.html index.htm;
        try_files $uri /index.php?$query_string;
    }
    location ~ \.php$ {
        fastcgi_pass ip_address:port;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## IIS
Example configuration for IIS web server.  
Before start install [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite).  
If you already have a `web.config` just add the `<rewrite>` section.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Application" stopProcessing="true">
          <match url=".*" ignoreCase="false" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" ignoreCase="false" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" ignoreCase="false" negate="true" />
          </conditions>
          <action type="Rewrite" url="index.php" appendQueryString="true" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```
