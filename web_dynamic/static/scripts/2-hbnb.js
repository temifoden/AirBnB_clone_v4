$(document).ready(function() {
  $.get('http://127.0.0.1:5001/api/v1/status', function(data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  })

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