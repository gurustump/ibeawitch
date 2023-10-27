			<div class="ov contact-form-ov OV CONTACT_FORM_OV">
				<div class="ov-inner">
					<h2>Book Us!</h2>
					<a class="OV_CLOSE ov-close">Close</a>
					<?php $contactFormShortcode = get_post_meta(get_the_ID(), '_guru_page_contact_form_7_shortcode', true); ?>
					<?php echo do_shortcode($contactFormShortcode); ?>
				</div>
			</div>