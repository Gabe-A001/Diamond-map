function sendAlert(){
let num1=6
let num2=7
let totalNum=num1 + num2
let text="i have "+ totalNum + " alerts"
    alert(text)
}
var map = L.map('map').setView([51.574349, -1.310892], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([51.574349, -1.310892]).addTo(map);
var imageUrl = "BaseUnder.png";
var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
var latLngBounds = L.latLngBounds([[51.57168183170403, -1.3173294067382815], [51.57701619673675, -1.304454803466797]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    alt: altText,
    interactive: true
}).addTo(map);

var imageUrl = "BaseOver.png";
var altText = 'Image of Diamond light source';
var latLngBounds = L.latLngBounds([[51.57168183170403, -1.3173294067382815], [51.57701619673675, -1.304454803466797]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    alt: altText,
    interactive: true
}).addTo(map);
var colours=["https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-black.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-gold.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-green.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-red.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-violet.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-yellow.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-grey.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-blue.png?raw=true"]
fetch("beamlines_data.json")
    .then(response => {
        if(response.ok){
            return response.json();

        }else{
            throw new Error("network response was not ok")
        }
    })
    .then(data => {
        var overlayMaps={}
        for(let [index, beamlines_group] of data.entries()){
            console.log(beamlines_group["name"])
            console.log(colours[index])
            var emptyGroup=[]
            var greenIcon = new L.Icon({
            iconUrl: colours[index],
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
            });
            for(let beamline of beamlines_group["beamlines"]){
                console.log(beamline["position"])
                var marker = L.marker(beamline["position"], {icon: greenIcon}).addTo(map);
                emptyGroup.push(marker)


                marker.bindPopup(`<h1>${beamline["name"]}</h1> <p>${beamline["description"]}</p>`).openPopup();}
        var layers=L.layerGroup(emptyGroup)
        layers.addTo(map)
        overlayMaps[beamlines_group["name"]]=layers
            }
    
    var layerControl=L.control.layers(null, overlayMaps).addTo(map)
    })
var myIcon = L.icon({
    iconUrl: 'location icon.png',
    iconSize: [38, 50],
    iconAnchor: [22, 49],
    popupAnchor: [-3, -35],
});
map.locate({setView: false, maxZoom: 16, watch: true});
var locationAccuracy=L.circle([51.574349, -1.310892], 0).addTo(map);
var iconMarker= L.marker([51.574349, -1.310892] ,{icon: myIcon}).addTo(map)
function onLocationFound(e) {
    var radius = e.accuracy;

    iconMarker.setLatLng(e.latlng)
    iconMarker.bindPopup("You are within " + radius + " meters from this point").openPopup();
    locationAccuracy.setLatLng(e.latlng)
    locationAccuracy.setRadius(radius)
}

map.on('locationfound', onLocationFound);


    