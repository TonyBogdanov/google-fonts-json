const path = require( 'path' );
const fs = require( 'fs' );
const fetch = require( 'node-fetch' );

const dispatcher = require( './dispatcher' );

describe( 'Scrape', () => it( 'Fonts', async () => {

    if ( ! process.env.GFONTS_API_KEY ) {

        throw `Missing required environment variable "GFONTS_API_KEY".`;

    }

    // Fetch current collection.
    const result = await ( await fetch( 'https://tonybogdanov.github.io/google-fonts-json/fonts.json' ) ).json();

    // Fetch fresh fonts.
    const fresh = ( await ( await fetch( 'https://www.googleapis.com/webfonts/v1/webfonts?key=' +
        process.env.GFONTS_API_KEY ) ).json() ).items.reduce(

        ( fonts, font ) => {

            fonts[ font.family ] = font;
            fonts[ font.family ].preview = [];

            return fonts;

        },
        {}

    );

    // Remove obsolete fonts.
    for ( const family in result ) {

        if ( ! result.hasOwnProperty( family ) || fresh.hasOwnProperty( family ) ) {

            continue;

        }

        delete result[ family ];

    }

    // Add new fonts.
    for ( const family in fresh ) {

        if ( ! fresh.hasOwnProperty( family ) || result.hasOwnProperty( family ) ) {

            continue;

        }

        result[ family ] = fresh[ family ];

    }

    // Maximize window.
    await browser.maximizeWindow();

    // Update previews.
    await browser.url( 'https://fonts.google.com' );
    await dispatcher.dispatch( 'loaded' );

    let offset = 0;

    while ( true ) {

        offset++;

        await dispatcher.dispatch( 'language/selector/click' );
        for ( let i = 0; i < offset; i++ ) {

            await dispatcher.dispatch( 'language/items/first/remove' );

        }

        if ( 0 === await dispatcher.dispatch( 'language/items/count' ) ) {

            break;

        }

        await dispatcher.dispatch( 'language/items/first/click' );
        await dispatcher.dispatch( 'body/click' );

        while ( 0 < await dispatcher.dispatch( 'scroll/distance-to-bottom' ) ) {

            const previews = await dispatcher.dispatch( 'preview/scrape', false );
            for ( const font in previews ) {

                if ( ! previews.hasOwnProperty( font ) ) {

                    continue;

                }

                if ( ! result.hasOwnProperty( font ) ) {

                    throw `Invalid font: ${ font }.`;

                }

                if ( -1 === result[ font ].preview.indexOf( previews[ font ] ) ) {

                    result[ font ].preview.push( previews[ font ] );

                }

            }

            await dispatcher.dispatch( 'scroll/down' );

        }

        await dispatcher.dispatch( 'scroll/through/top' );

    }

    // Sort & filter previews.
    for ( const family in result ) {

        if ( ! result.hasOwnProperty( family ) ) {

            continue;

        }

        result[ family ].preview = result[ family ].preview
            .map( preview => preview.replace( /^[,\\.\s]+/, '' ) )
            .map( preview => preview.replace( /[,\\.\s]+$/, '' ) )
            .filter( preview => 5 < preview.length )
            .filter( ( value, index, self ) => self.indexOf( value ) === index )
            .sort();

    }

    // Save results.
    const dataPath = path.resolve( __dirname, '../data' );
    const fontsPath = path.resolve( dataPath, 'fonts.json' );

    if ( fs.existsSync( fontsPath ) ) {

        fs.unlinkSync( fontsPath );

    }

    if ( fs.existsSync( dataPath ) ) {

        fs.rmdirSync( dataPath );

    }

    fs.mkdirSync( dataPath );
    fs.writeFileSync( fontsPath, JSON.stringify( Object.keys( result ).reduce( ( final, key ) => {

        if ( 0 < result[ key ].preview.length ) {

            final[ key ] = result[ key ];

        }

        return final;

    }, {} ), null, 2 ) );

} ) );
