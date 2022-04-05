const { description } = require( '../../package' )

module.exports = {
    base: '/zxc_php_doc/',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'ZXC_PHP',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        [ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
        [ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
        [ 'meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } ]
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: 'https://github.com/Gimanh/ZXC_PHP',
        editLinks: true,
        docsDir: '',
        editLinkText: 'Help me improve this page!',
        lastUpdated: false,
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
            }/*,
            {
                text: 'Config',
                link: '/config/'
            }*//*,
            {
                text: 'VuePress',
                link: 'https://v1.vuepress.vuejs.org'
            }*/
        ],
        sidebar: {
            '/guide/': [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: [
                        '',
                        'installation',
                        'directories_structure',
                        'config_file',
                        'first_app',
                        'server_settings',
                        'routing',
                        'middleware',
                        'modules',
                    ]
                }
            ],
        }
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ],
}
