# Modules

Here you find information about modules

## Auth

Auth class `ZXC\Modules\Auth\Auth` allow you to authenticate users in your application. Behaviour of this module depends
on **given options**.   
Options example

```json
{
    "class": "ZXC\\Modules\\Auth\\Auth",
    "defer": false,
    "options": {
        "storageProvider": "ZXC\\Modules\\Auth\\Storages\\AuthPgSqlStorage",
        "authTypeProvider": "ZXC\\Modules\\Auth\\Providers\\AuthJwtTokenProvider",
        "remindPasswordInterval": 1,
        "remindPasswordLinkTemplate": "http://localhost:3000/#/?resetCode={code}&login={login}",
        "remindPasswordEmailBody": "<p> Reset password! {link} </p>",
        "remindPasswordLinkProvider": "ZXC\\Modules\\Auth\\Providers\\AuthSendReminderLink",
        "authTypeProviderOptions": {
            "secret": "[)1231&^^*&^%00()(]",
            "alg": "HS256",
            "accessLifeTime": 200,
            "refreshLifetime": 400,
            "tokenStorage": "ZXC\\Modules\\Auth\\Storages\\AuthTokenStoragePgSql"
        },
        "email": {
            "confirm": true,
            "codeProvider": "ZXC\\Modules\\Auth\\Providers\\AuthConfirmCodeProvider",
            "confirmUrlTemplate": "http://tvapi.localhost/confirm/email/{code}/login/{login}",
            "body": "<p> Welcome to the TaskView app! {link} </p>",
            "redirectAfterConfirm": "http://localhost:3000/#/"
        },
        "blockWithoutEmailConfirm": true
    }
}

```

### class

- Type: `string`
- Default: `ZXC\Modules\Auth\Auth`
- Description: _`Module class`_

### storageProvider

- Type: `string`
- Default: `ZXC\Modules\Auth\Storages\AuthPgSqlStorage`
- Description: _Provider for storage, this class will be using for working with user storage. Must
  implement `ZXC\Modules\Auth\AuthStorage`_

### authTypeProvider

- Type: `string`
- Default: `ZXC\\Modules\\Auth\\Providers\\AuthJwtTokenProvider`
- Description: _Class for providing authentication, `login and logout functionality`_

### remindPasswordInterval (minutes)

- Type: `integer`
- Default: 2 (minutes)
- Description: _Interval for requesting recovery password link_

### remindPasswordLinkTemplate

- Type: `string`
- Default: `/new/password/{code}/{login}`
- Description: _Template where you can describe the URL address for password recovery. Placeholders `{code}`
  and `{login}` will be replaced by values. This link will be sent to user email_

### remindPasswordEmailBody

- Type: `string`
- Default: `{link}`
- Description: _In this parameter you can describe email body template for password recovery. Placeholder `{link}`
  will be replaced by URL address described in parameter `remindPasswordLinkTemplate`_

### remindPasswordLinkProvider

- Type: `string`
- Default: `ZXC\\Modules\\Auth\\Providers\\AuthSendReminderLink`
- Description: _Class for sending password recovery email_

### authTypeProviderOptions

- Type: `object`
- Default: `{}`
- Description: _Options for class which described in parameter `authTypeProvider` will be passed into **constructor**.
  **This options can be different for other providers**_

  ### authTypeProviderOptions/secret
    - Type: `string`
    - Default: `)(*&)HLKJHKJHIUG4FHGgg`
    - Description: _Secret key for JWT token sign_

  ### authTypeProviderOptions/alg
    - Type: `string`
    - Default: `HS256`
    - Description: _Identifies which algorithm is used to generate the signature_

  ### authTypeProviderOptions/accessLifeTime
    - Type: `string`
    - Default: `14`
    - Description: _Identifies the expiration time on and after which the JWT must not be accepted for processing_

  ### authTypeProviderOptions/refreshLifetime
    - Type: `string`
    - Default: `200`
    - Description: _Identifies the expiration time on and after which the JWT (refresh) must not be accepted for
      processing_

  ### authTypeProviderOptions/tokenStorage
    - Type: `string`
    - Default: `ZXC\Modules\Auth\Storages\AuthTokenStoragePgSql`
    - Description: _Storage for generated tokens_

### email

- Type: `object`
- Default: `{}`
- Description: _Settings for email interactions_

  ### email/confirm
    - Type: `bool`
    - Default: `true`
    - Description: _If true confirm email will be sent to user email_

  ### email/codeProvider
    - Type: `string`
    - Default: `ZXC\Modules\Auth\Providers\AuthConfirmCodeProvider`
    - Description: _Class which will send code to user email_

  ### email/confirmUrlTemplate
    - Type: `string`
    - Default: `/confirm/email/{code}/login/{login}`
    - Description: _Template for generating conformation email. Must be defined two placeholders `{code}` and `{login}`_

  ### email/body
    - Type: `string`
    - Default: `<p> Welcome to the TaskView app! {link} </p>`
    - Description: _Template for email conformation body. Must be defined one placeholder `{link}`_

  ### email/redirectAfterConfirm
    - Type: `string`
    - Default: `http://localhost:3000/#/`
    - Description: _URL address for redirecting after conformation_

### blockWithoutEmailConfirm

- Type: `boolean`
- Default: `true`
- Description: _Block user until email will be confirmed_

## How create your own module?

- Create you class and implement `IModule` interface and user trait `Module`

```php{1,3,7,11}
class Tasks implements IModule
{
    use Module;

    protected array $config = [];

    public function init(array $options = [])
    {
        $this->config = $options;
    }
    //TODO your implementation
}
```

- Add module to your config. Module can have next configuration
    - options.json - file describe main parameter for module class and own options for working
    - routes.json {optional} - if module functions can be accessed by HTTP you can add some routes and handlers
    - middlewares.json {optional} - define here route middlewares
