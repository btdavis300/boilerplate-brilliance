<?php 
$anchor = '';
if( !empty( $block['anchor'] ) ){
	$anchor = ' id="' . sanitize_title( $block['anchor'] ) . '"';
}

$class_name = 'block';
if (! empty($block['className'])) {
    $class_name .= ' ' . sanitize_title( $block['className'] );
}
?>

<section <?= $anchor ?> class="duotone-wave <?= $class_name ?>">
<h1>Duotone Wave Block</h1>
</section>
  