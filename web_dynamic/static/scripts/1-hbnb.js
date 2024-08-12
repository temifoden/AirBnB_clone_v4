$(function() {
  let amenities = [];
  $('.amenities .popover input').change(function() {
    if ($(this).is(':checked')) {
      amenities.push({id: $(this).data('id'), name: $(this).data('name')});
    } else {
      amenities = amenities.filter(function(amenity) {
        return amenity.id !== $(this).data('id');
      });
    }

    amenities.forEach(function(amenity) {
      $('.amenities h4').append((amenities.length > 0 ? ', ' : '') + amenity.name)
    })
  });
});