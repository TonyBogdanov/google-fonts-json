module.exports = dispatcher => new Promise( async resolve => {

    while ( 0 < await dispatcher.dispatch( 'scroll/distance-to-bottom' ) ) {

        await dispatcher.dispatch( 'scroll/down' );

    }

    resolve( true );

} );
