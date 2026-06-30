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
var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
var latLngBounds = L.latLngBounds([[51.57168183170403, -1.3173294067382815], [51.57701619673675, -1.304454803466797]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    alt: altText,
    interactive: true
}).addTo(map);
fetch("beamlines_data.json")
    .then(response => {
        if(response.ok){
            return response.json();

        }else{
            throw new Error("network response was not ok")
        }
    })
    .then(data => {
        for(let beamlines_group of data){
            console.log(beamlines_group["name"])
            for(let beamline of beamlines_group["beamlines"]){
                console.log(beamline["position"])
                var marker = L.marker(beamline["position"]).addTo(map);}
        }
    })
        

    