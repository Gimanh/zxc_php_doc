# Configuration

## Types
Before you start using `ZXC_PHP` you should read more about a configuration. Any application start from defining routes, 
middlewares and endpoints.  
`ZXC_PHP` has it is own configuration and cannot work without it, configuration is simple and describes in json file.  
What you can describe in configuration file:
* Router section
* Modules section 
* Your own configuration 

::: warning
Children routes do not extend middlewares from parent route.
:::
Below you can see config.json file described using TypeScript type system.
```typescript
type HandlerTypeExample = string | 'Namespace\\ClassName:methodName';
type MiddlewareAlias = string;
type HTTP_Methods = 'GET' | 'POST' | 'OPTIONS';
type ModuleClassExample = string | 'Namespace\\ClassName'
type Route = {
    middlewares: MiddlewareAlias[],
    method: HTTP_Methods,
    route: string,
    handler: HandlerTypeExample,
    children?: Route
};
type ModuleParams = {
    class: ModuleClassExample,
    defer: boolean,
    options: {
        [ key: string ]: any
    }
};
type ZXC_PHP_Config = {
    router: {
        useAppMiddlewares: {
            [ key: string ]: boolean
        },
        middlewares: {
            [ key: string ]: HandlerTypeExample
        },
        notFoundHandler: HandlerTypeExample,
        routes: Route[];
    },
    modules: {
        [ key: string ]: ModuleParams
    }
};
```
