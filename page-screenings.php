<?php
/*
 Template Name: Screenings Page
 *
 * This is your custom page template. You can create as many of these as you need.
 * Simply name is "page-whatever.php" and in add the "Template Name" title at the
 * top, the same way it is here.
 *
 * When you create your page, you can just select the template and viola, you have
 * a custom page template to call your very own. Your mother would be so proud.
 *
 * For more info: http://codex.wordpress.org/Page_Templates
*/
?>

<?php get_header(); ?>
			<div id="content">
				<div id="inner-content" class="wrap cf">
					<main id="main" role="main" itemscope itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">
						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'cf' ); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
							<header class="article-header">
								<h1 class="page-title"><?php the_title(); ?></h1>
							</header>
							<?php $hasContentSecondary = is_active_sidebar('sidebar1'); ?>
							<section class="entry-content<?php echo $hasContentSecondary ? ' has-content-secondary':''; ?>" itemprop="articleBody">
								<div class="content-primary">
								<?php
									// the content (pretty self explanatory huh)
									the_content();
								?>
								
								<?php $screenings = get_posts(array(
										'posts_per_page'=>-1,
										'category_name'=>'screening',
									));
									if (count($screenings) > 0) { ?>
									<ul class="">
										<?php foreach ($screenings as $screening) { ?>
										<li>										
											<article id="post-<?php echo $screening->ID ?>" class="post post-<?php echo $screening->ID; ?> category-screening" role="article">
												<?php if (has_post_thumbnail($screening->ID)) { ?>
												<div class="image-container">
													<a href="<?php echo get_permalink($screening->ID) ?>">
														<img src="<?php echo get_the_post_thumbnail_url($screening->ID,'large'); ?>" alt="" />
													</a>
												</div>
												<?php } ?>
												<header class="article-header">
													<h2 class="entry-title"><a href="<?php echo get_permalink($screening->ID) ?>" rel="bookmark"><?php echo $screening->post_title; ?></a></h2>
												</header>
												<section class="entry-content cf">
													<?php echo get_the_excerpt($screening->ID); ?>
												</section>
											</article>
										</li>
										<?php } ?>
									</ul>
									<?php } ?>
								</div>
								<?php if ($hasContentSecondary) { ?>
								<div class="content-secondary">
									<?php if (is_active_sidebar('sidebar1')) { 
										get_sidebar();
									} ?>
								</div>
								<?php } ?>
							</section>
							<?php comments_template(); ?>
						</article>
						<?php endwhile; endif; ?>
					</main>
				</div>
			</div>
<?php get_footer(); ?>
