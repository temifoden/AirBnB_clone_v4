$(document).ready(function() {
  $.post('http://127.0.0.1:5001/api/v1/places_search', {}, function(data, status) {
    if (status === 'success') {
      data.forEach(function(place) {
        $('.places').append('<article><div class="title_box"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place['max_guest'] + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place['number_rooms'] + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place['number_bathrooms'] + ' Bathroom</div></div><div class="user"><div class="description">' + place['description'] + '</div></article>');
      });
    }
  });

  $.get('http://127.0.0.1:5001/api/v1/status', function(data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

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