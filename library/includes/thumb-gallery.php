						<div class="image-gallery IMAGE_GALLERY" id="gallery_<?php echo $galleryID; ?>">
							<?php if ($showMeta['_guru_show_gallery_heading'][0]) { ?>
							<h2><?php echo $showMeta['_guru_show_gallery_heading'][0]; ?></h2>
							<?php } ?>
							<?php 
							if ($galleryImageMeta) { ?>
							<pre style="color:violet;display:none;">
								<?php print_r($galleryImageMeta); ?>
							</pre>
							<div class='thumb-index'>
								<div class='thumb-index-inner'>
									<ul class="thumb-index-list gallery GALLERY">
									<?php 
									$galleryIndex = 0;
									foreach($galleryImageMeta as $key => $image) { 
										$thumb = wp_get_attachment_image_src($key,'thumbnail');
										?>
										<li class="gallery-item GALLERY_ITEM" data-image-index="<?php echo $galleryIndex; ?>">
											<img src="<?php echo $thumb[0]; ?>" />
											<span class='item-content'>
												<span class='view-item'>
													<span class="text-label">View Image</span>
													<?php //echoSVG('icMag'); ?>
												</span>
											</span>
										</li>
									<?php $galleryIndex++;
									} ?>
									</ul>
									<?php include 'thumb-gallery-ov.php'; ?>
								</div>
							</div>
							<?php } ?>
						</div>