let map;
let marker;
let infoWindow;

var GeoLoc = {
    getDMS2DD: function (days, minutes, seconds, direction) {
        direction.toUpperCase();
        var dd = days + minutes / 60 + seconds / (60 * 60);
        //alert(dd);
        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    },
    ValidationCheck: function () {
        var result = true;
        if ($('#n0').val() === '') {
            result = false;
        }
        if ($('#n1').val() === '') {
            result = false;
        }
        if ($('#n2').val() === '') {
            result = false;
        }
        if ($('#e0').val() === '') {
            result = false;
        }
        if ($('#e1').val() === '') {
            result = false;
        }
        if ($('#e2').val() === '') {
            result = false;
        }

        return result;
    },
    ValidationCheckNumber: function () {
        var result = true;
        if (!$.isNumeric($('#n0').val())) {
            result = false;
        }
        if (!$.isNumeric($('#n1').val())) {
            result = false;
        }
        if (!$.isNumeric($('#n2').val())) {
            result = false;
        }
        if (!$.isNumeric($('#e0').val())) {
            result = false;
        }
        if (!$.isNumeric($('#e1').val())) {
            result = false;
        }
        if (!$.isNumeric($('#e2').val())){
            result = false;
        }

        return result;
    },
    ResetForm: function () {
        $('#n0').val('');
        $('#n1').val('');
        $('#n2').val('');
        $('#e0').val('');
        $('#e1').val('');
        $('#e2').val('');
        if (marker != null)
            map.setCenter(marker.getPosition());
    },
    Calculate: function (d1, m1, s1, cap) {

        //var d1 = document.getElementById("degrees1").value;
        //var m1 = document.getElementById("minutes1").value;
        //var s1 = document.getElementById("seconds1").value;
        //var cap = document.getElementById("direction").value;

        var dd = d1 + m1 / 60 + s1 / 3600;

        if (cap == "S" || cap == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    },
    ShowMyLocation: function () {

        infoWindow = new google.maps.InfoWindow();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Standort gefunden.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
}




function initMap() {
    map = new google.maps.Map(document.getElementById("mapdr"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

$(document).ready(function () {
    console.log('loaded');
    $('#btngoe').click(function () {
        console.log('btngoe click');
        if (!GeoLoc.ValidationCheck()) {
            alert('Bitte geben Sie zuerst die erforderlichen Informationen ein.')
        }
        else if (!GeoLoc.ValidationCheckNumber()) {
            alert('Bitte gültige Informationen eingeben.')
        }
        else {
            var d1 = parseFloat(document.getElementById("n0").value);
            var m1 = parseFloat(document.getElementById("n1").value);
            var s1 = parseFloat(document.getElementById("n2").value);
            var cap1 = 'N';

            var d2 = parseFloat(document.getElementById("e0").value);
            var m2 = parseFloat(document.getElementById("e1").value);
            var s2 = parseFloat(document.getElementById("e2").value);
            var cap2 = 'E';

            var lat = GeoLoc.Calculate(d1, m1, s1, cap1);
            var lng = GeoLoc.Calculate(d2, m2, s2, cap2);

            console.log(lat);
            console.log(lng);
            var myLatLng = { lat: lat, lng: lng };
            marker = new google.maps.Marker({
                position: myLatLng,
                title: "Hello World!"
            });
            // To add the marker to the map, call setMap();
            marker.setMap(map);
            map.setCenter(marker.getPosition());


        }
    });
    $('#reset').click(function () {
        console.log('reset click');
        GeoLoc.ResetForm();
        marker.setMap(null);
    });

    $('#currentloc').click(function () {

        console.log('currentloc click');
        GeoLoc.ShowMyLocation();
    });
});
