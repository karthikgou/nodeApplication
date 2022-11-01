console.log("Entered main.js");

$('.dropdown-toggle').click(function (event) {
    $('.dropdown-menu.active').not($(this).next()).removeClass('toggleDropDown')
	$(this).next().toggleClass('toggleDropDown');
	$(this).next().addClass('active');
});

$('.refine-name').click(function (event) {
    $(this).parent().toggleClass('active');
});

$( document ).ready(function() {
    // construct right navigation links with header tags
    var htmlContent = "<ul>";
    var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    for (var j=0; j < tags.length; j++){
        var elements = $('.content-container ' + tags[j]);
        if (elements.length < 2){
            continue;
        } else {
            for (var i=0; i< elements.length; i++) {
                var text = elements[i].outerText.replace(' ','-');
                elements[i].setAttribute('id', text);
                htmlContent = htmlContent + "<li><a href=#" + text + ">" + elements[i].outerText + "</a></li>"
            }
            htmlContent = htmlContent + "</ul>";
            $('.dynamicLinks').append(htmlContent);
            break;
        }
    }
//    console.log(htmlContent)
});