/*
 * Admin Scripts File
 * Author: Matthew Julander
 *
 * Just any extra javascript to run in the admin area.
*/


jQuery(document).ready(function($) {
	toggleMetaboxes($);
	$('#_guru_person_role, #page_template').change(function() {
		toggleMetaboxes($);
	});
});

function toggleMetaboxes($) {
	var personRole = $('#_guru_person_role').val();
	if (personRole == 'cast_and_crew') {
		$('.cmb-row.cast-member-field').show();
		$('.cmb-row.crew-member-field').show();
	} else if (personRole == 'crew') {
		$('.cmb-row.cast-member-field').hide();
		$('.cmb-row.crew-member-field').show();
		console.log('hiding');
	} else if (personRole == 'cast') {
		$('.cmb-row.cast-member-field').show();
		$('.cmb-row.crew-member-field').hide();
	} else {
		$('.cmb-row.cast-member-field').hide();
		$('.cmb-row.crew-member-field').hide();
	}
	
	if ($('#page_template').val() == 'page-home.php') {
		$('.cmb-row.page-home-admin').show()
	} else {
		$('.cmb-row.page-home-admin').hide()
	}
}