<?php
/*
 Template Name: Home Page
*/
?>

<?php get_header(); ?>
			<div class="sizzle-vid-container">
				<div class="sizzle-title">
					<div class="sizzle-logo"></div>
					<p class="sizzle-tagline"><?php bloginfo('description'); ?></p>
					<p><a class="btn-red TRIGGER_VIDEO" data-show-type="single" data-video-id-0="_85jHWHiUpU" data-credits-timecode-0="2000">View Trailer</a></p>
				</div>
				<div class="home-main-nav-container">
					<?php /* <?php echoSVG('signTop'); ?> */ ?>
					<nav class="main-menu" role="navigation" itemscope itemtype="http://schema.org/SiteNavigationElement">
						<?php wp_nav_menu(array(
								 'container' => false,                           // remove nav container
								 'container_class' => 'menu cf',                 // class of container (should you choose to use it)
								 'menu' => __( 'The Main Menu', 'bonestheme' ),  // nav name
								 'menu_class' => 'nav top-nav cf',               // adding custom nav class
								 'theme_location' => 'main-nav',                 // where it's located in the theme
								 'before' => '',                                 // before the menu
								   'after' => '',                                  // after the menu
								   'link_before' => '<span>',                      // before each link
								   'link_after' => '</span>',                      // after each link
								   'depth' => 0,                                   // limit the depth of the nav
								 'fallback_cb' => ''                             // fallback function (if there is one)
						)); ?>
					</nav>
					<?php // echoSVG('signBottom'); ?>
				</div>
				<video id="home_sizzle" class="bg-video" autoplay loop muted>
					<source src="<?php echo get_template_directory_uri(); ?>/library/video/i-be-a-witch-visual-loop-20-sec.mp4" type="video/mp4"></source>
				</video>
			</div>
			<?php $sliderMeta = get_post_meta(get_the_ID(), '_guru_page_gallery');
			if (count($sliderMeta)) { ?>
			<div class="mobile-slider-container">
				<div class="slider SLIDER">
					<?php foreach($sliderMeta[0] as $key => $slide) {
					$image = wp_get_attachment_image_src($key,'mobile-screen'); ?>
					<div class="slide" style="background-image:url(<?php echo $image[0]; ?>);">
						<img src="<?php echo $image[0]; ?>">
					</div>
					<?php } ?>
				</div>
			</div>
			<?php } ?>
			<div id="content">
				<div id="inner-content" class="wrap cf">
					<main id="main" role="main" itemscope itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">
						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'cf' ); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
							<?php $hasContentSecondary = is_active_sidebar('sidebar1'); ?>
							<section class="entry-content<?php echo $hasContentSecondary ? ' has-content-secondary':''; ?>" itemprop="articleBody">
								<div class="content-primary">
								<?php the_content(); ?>
								</div>
							</section>
						</article>
						<?php endwhile; endif; ?>
					</main>
				</div>
			</div>
<?php get_footer(); ?>
