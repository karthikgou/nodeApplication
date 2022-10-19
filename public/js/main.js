console.log("Entered main.js");

$('.dropdown-toggle').click(function (event) {
    $('.dropdown-menu.active').not($(this).next()).removeClass('toggleDropDown')
	$(this).next().toggleClass('toggleDropDown');
	$(this).next().addClass('active');
});