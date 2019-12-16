# webpack-trellis-wordpress
🔨⚙️🔥🚀 Ultimate Webpack 4 setup for Vagrant Roots Trellis, Bedrock and Wordpress.

## Installation

### Webpack assets files from assets.json

Add to wordpress function.php file new function "asset" like this:

```php
/**
 * Change filePath to filePath_withHash from assets.json
 * @param $filePath
 *
 * @return mixed
 */
public static function asset( $filePath ) {
    $map = get_template_directory() . '/dist/assets.json';
    $hash = file_exists( $map ) ? json_decode( file_get_contents( $map ), true ) : [];
    $themePath = get_template_directory_uri() .'/dist/';

    if ( array_key_exists( $filePath, $hash ) ) {
        return $themePath . $hash[ $filePath ];
    }

    return $themePath . $filePath;
}
```

Next edit wordpress function.php file and add new asset function to twig:

```php
/**This is where you can add your own functions to twig.
 *
 * @param string $twig get extension.
 *
 * @return mixed
 */
public function add_to_twig( $twig ) {
    $twig->addExtension( new Twig\Extension\StringLoaderExtension() );

    /* ADD THIS LINE */
    $twig->addFunction( new Timber\Twig_Function('asset', [$this, 'asset']) );
    /* END OF: ADD THIS LINE */

    return $twig;
}
```
