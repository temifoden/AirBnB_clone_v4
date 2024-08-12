$(document).ready(function() {
  let amenities = [];
  let cities = [];
  let states = [];

  function fetchPlaces(filters = {}) {
    $.post('http://127.0.0.1:5001/api/v1/places_search', filters, function(data, status) {
      if (status === 'success') {
        data.forEach(function(place) {
          $('.places').append(`
            <article>
              <div class="title_box">
                <h2>${place['name']}</h2>
                <div class="price_by_night">
                  ${place['price_by_night']}
                </div>
              </div>
              <div class="information">
                <div class="max_guest">
                  <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />
                  ${place['max_guest']}Guests
                </div>
                <div class="number_rooms">
                  <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />${place['number_rooms']}
                  Bedrooms
                </div>
                <div class="number_bathrooms">
                  <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />${['number_bathrooms']}
                  Bathroom
                </div>
              </div>
              <div class="user">
                <div class="description">
                  ${place['description']}
                </div>
              </div>
                <div class="reviews">
                  <h2>2 Reviews</h2> <span data-place_id="${place.id}">show</span>
                  <ul class="reviews-list">
                  </ul>
                <div>
            </article>`);
        });
      }
    });
  }

  $('.reviews > h2 + span').click(function() {
    if ($(this).text() === 'show') {
      $(this).text('hide');
      $.get('http://127.0.0.1:5001/api/v1/places/' + $(this).data('place_id') + '/reviews', function(data, status) {
        if (status === 'success') {
          data.forEach(function(review) {
            $('reviews-list').append('<li><p>From ' + review.user_id + ' the ' + review.created_at + '</p><p>'+ review.text + '</p></li>');
          });
        }
      });
    } else {
      $(this).text('hide');
      $('.reviews-list').hide();
    }
  });

  fetchPlaces();

  $('button').click(function() {
    const filters = {
      amenities: amenities.map(function (amenity) {
        return amenity.id
      }),
      cities: amenities.map(function (city) {
        return city.id
      }),
      states: amenities.map(function (state) {
        return state.id
      })
    }
    fetchPlaces(filters);
  })

  $.get('http://127.0.0.1:5001/api/v1/status', function(data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $('.locations .city input[type=checkbox]').change(function() {
    if ($(this).is(':checked')) {
      cities.push({id: $(this).data('id'), name: $(this).data('name')});
    } else {
      cities = cities.filter(function(city) {
        return city.id !== $(this).data('id');
      });
    }

    cities.forEach(function(city) {
      $('.locations h4').append((city.length > 0 ? ', ' : '') + city.name)
    })
  });

  $('.locations .state input[type=checkbox]').change(function() {
    if ($(this).is(':checked')) {
      states.push({id: $(this).data('id'), name: $(this).data('name')});
    } else {
      states = states.filter(function(state) {
        return state.id !== $(this).data('id');
      });
    }

    states.forEach(function(city) {
      $('.locations h4').append((city.length > 0 ? ', ' : '') + city.name)
    })
  });

  $('.amenities .popover input[type=checkbox]').change(function() {
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