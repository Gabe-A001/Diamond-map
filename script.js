//Adding the map to the webpage and setting the view to diamond building
var map = L.map('map').setView([51.574349, -1.310892], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//Adding a marker for diamond building at the center of the building
var marker = L.marker([51.574349, -1.310892]).addTo(map);
//Adding the base that shows the location of different zones
var imageUrl = "BaseUnder.png";
var altText = 'Image of diamond zones location';
var latLngBounds = L.latLngBounds([[51.57168183170403, -1.3173294067382815], [51.57701619673675, -1.304454803466797]]);
var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    alt: altText,
    interactive: true
}).addTo(map);
//Adding the base that shows the differnt exits
var imageUrl = "BaseOver.png";
var altText = 'Image of Diamond exits';
var latLngBounds = L.latLngBounds([[51.57168183170403, -1.3173294067382815], [51.57701619673675, -1.304454803466797]]);
var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    alt: altText,
    interactive: true
}).addTo(map);
//importing the json file(file is imported completely before the next line runs)
var colours=["https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-black.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-gold.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-green.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-red.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-violet.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-yellow.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-grey.png?raw=true",
                "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-blue.png?raw=true"]

var beamlinemarkers = {}

//importing the json file(file is imported completely before the next line runs)
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
        //looping over beamlinegroups frome data in the json file
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
            //looping over beamlines in beamline group to get the beamlines coordinates
            for(let beamline of beamlines_group["beamlines"]){
                console.log(beamline["position"])
                //Adding markers to the beamline
                var marker = L.marker(beamline["position"], {icon: greenIcon}).addTo(map);
                emptyGroup.push(marker)
                beamlinemarkers[beamline["name"]]=marker 

                //Adding a popup to the markers and ensuring they stay in view when searched for
                marker.bindPopup(`<h1>${beamline["name"]}</h1> <p>${beamline["description"]}</p>`, {keepInView: true}).openPopup();}
        //Adding different coloured markers for each beamline group
        var layers=L.layerGroup(emptyGroup)
        layers.addTo(map)
        overlayMaps[beamlines_group["name"]]=layers
            }
    
    var layerControl=L.control.layers(null, overlayMaps).addTo(map)
    })
//Adding a differnt icon for the users location
var myIcon = L.icon({
    iconUrl: 'location icon.png',
    iconSize: [38, 50],
    iconAnchor: [22, 49],
    popupAnchor: [-3, -35],
});
//Updating the location of the user on the map as they move
map.locate({setView: false, maxZoom: 16, watch: true});
//showing the accuracy of the users location marker
var locationAccuracy=L.circle([51.574349, -1.310892], 0).addTo(map);
var iconMarker= L.marker([51.574349, -1.310892] ,{icon: myIcon}).addTo(map)
//Adding the marker and accuracy circle to the map
function onLocationFound(e) {
    var radius = e.accuracy;

    iconMarker.setLatLng(e.latlng)
    iconMarker.bindPopup("You are within " + radius + " meters from this point").openPopup();
    locationAccuracy.setLatLng(e.latlng)
    locationAccuracy.setRadius(radius)
}

map.on('locationfound', onLocationFound);

// PinSearch componentnpm install --save leaflet-search
var searchBar = L.control.pinSearch({
    position: 'topright',
    placeholder: 'Search....',
    buttonText: 'Search',
    onSearch: function(query) {
        console.log('Search query:', query);
        // Handle the search query here
    },
    searchBarWidth: '200px',
    searchBarHeight: '30px',
    maxSearchResults: 5
}).addTo(map);
    
console.log(beamlinemarkers)
markersearchedfor = null

const searchBox = document.querySelector("input");
searchBox.addEventListener("keydown", e => {
    console.log(e)
    if (e.code === "Enter") {
        var searchQuery = searchBox.value
        searchQuery = searchQuery.toUpperCase()

        if (searchQuery === "EBIC") {
            searchQuery = "eBIC"
        }

        console.log(searchQuery)
        console.log(beamlinemarkers[searchQuery])
        if (beamlinemarkers[searchQuery] === undefined) {
            alert("Beamline does not exist");
        }
        else {
            let markersearchedfor = beamlinemarkers[searchQuery]
            markersearchedfor.openPopup()
            map.setView(markersearchedfor.getLatLng())
        }
    }
});
const mousePosition = new MousePosition({ position: "bottomleft" });
mousePosition.addTo(map);