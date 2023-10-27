
									<div class="ov gallery-ov-container OV GALLERY_OV" id="gallery_ov_<?php echo $galleryID; ?>">
										<div class="image-list GALLERY_SLIDER">
											<?php foreach($galleryImageMeta as $key => $image) {
											$galleryImage = wp_get_attachment_image_src($key,'extra-large'); ?>
											<div class="gallery-item GALLERY_ITEM id-<?php echo $key; ?>">
												<img src="<?php echo $galleryImage[0]; ?>" />
											</div>
											<?php } ?>
										</div>
										<div class="gallery-nav GALLERY_NAV"></div>
										<a href="#" class="ov-close GALLERY_OV_CLOSE">Close</a>
									</div>