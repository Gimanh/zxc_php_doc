const { description } = require( '../../package' )

module.exports = {
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
        ['link', { rel: 'icon', href: './images/Logo.png' }],
        [ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
        [ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
        [ 'meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } ]
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    base: '/zxc_php_doc/',
    themeConfig: {
        logo: '/images/Logo.png',
        repo: 'https://github.com/Gimanh/ZXC_PHP',
        editLinks: true,
        docsDir: 'docs/src',
        docsRepo: 'https://github.com/Gimanh/zxc_php_doc',
        editLinkText: 'Help me improve this page!',
        docsBranch: 'edit',
        lastUpdated: false,
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
            }, {
                text: 'License',
                link: '/guide/license/',
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
                    collapsable: true,
                    children: [
                        '',
                        'installation',
                        'directories_structure',
                        'first_app',
                        'server_settings',
                        'config_file',
                        'routing',
                        'middleware',
                        'modules',
                    ]
                },
                {
                    title: 'License',
                    collapsable: true,
                    children: [
                        'license',
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
