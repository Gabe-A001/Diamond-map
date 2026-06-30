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