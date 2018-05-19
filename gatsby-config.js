module.exports = {
    siteMetadata: {
        title: `Kanishkar J`,
        siteDescr: `Kanishkar J`,
        siteLocale: `en_US`,
        siteTitle: `Kanishkar J`,
        siteAuthor: `Kanishkar J`,
        siteType: `website`,
        siteSiteName: `Kanishkar J`,
        site: `Kanishkar J`,
        siteUrl: 'https://kanishkarj.github.com/',
        siteEmailUrl: `kanishkarj@hotmail.com`,
        siteEmailPretty: `kanishkarj@hotmail.com`,
        siteTwitterUrl: `https://twitter.com/_kanishkarj_`,
        siteTwitterPretty: `@_kanishkarj_`,
        siteGithubUrl: 'https://github.com/kanishkarj',
        siteGithubPretty: 'kanishkarj',
        siteGitconnectedUrl: 'https://gitconnected.com/kanishkarj',
        siteGitconnectedPretty: 'kanishkarj',
        siteLinkedInUrl: 'https://www.linkedin.com/in/kanishkar-j-5ba02ab8/',
        siteLinkedInPretty: 'kanishkar-j-5ba02ab8',
        siteMediumUrl: 'https://medium.com/@kanishkarj',
        siteMediumPretty: 'kanishkarj',
        siteGitterUrl: 'https://www.linkedin.com/in/kanishkar-j-5ba02ab8/',
        siteGitterPretty: 'kanishkar-j-5ba02ab8',
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-sass',
        `gatsby-transformer-javascript-static-exports`,
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages/markdown`,
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [{
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            wrapperStyle: 'margin-bottom: 1.0725rem;',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1.0725rem',
                        },
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Raleway`,
                    'Source Sans Pro',
                    `Josefin Sans` // you can also specify font weights and styles
                ]
            }
        },
        {
            resolve: `gatsby-source-medium`,
            options: {
                username: `@kanishkarj`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-119110567-1",
                // Puts tracking script in the head instead of the body
                head: false,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: ["/preview/**", "/do-not-track/me/too/"],
            },
        },
    ],
}