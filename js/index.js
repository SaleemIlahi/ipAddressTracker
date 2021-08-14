"use strict"

const search = document.querySelector("#search")
const searchIcon = document.querySelector(".img-section")

searchIcon.addEventListener("click",() => {
    abcd().then(addressInfo)

    search.value = ""
})

const abcd = async () => {
    const ApiKey = "at_p1lxVNyBNy7SkZoPr4tYxpn2BzM3C"
    const ApiURL = `https://geo.ipify.org/api/v1?apiKey=${ApiKey}&ipAddress=${search.value}`

    const FetchingIP = await fetch(ApiURL)
    const Response = await FetchingIP.json()

    return Response
}

const addressInfo = res => {
    const ipAddress = document.querySelector("#ip")
    const location = document.querySelector("#location")
    const timezone = document.querySelector("#time")
    const isp = document.querySelector("#isp")

    ipAddress.innerHTML = res.ip
    location.innerHTML = `${res.location.region} , ${res.location.city} , ${res.location.postalCode}`
    timezone.innerHTML = `UTC${res.location.timezone}`
    isp.innerHTML = res.isp

    LeafletMap(res.location.lat,res.location.lng);
}

// Leaflet Map
const LeafletMap = (lat,lang) => {
    const token = 'pk.eyJ1Ijoic2FsZWVtMjUyNDU3IiwiYSI6ImNrczl3cjdoNjB2OWwyb2x1Y3I1NTdwZjEifQ.Fr5kBv8AY20KhMITH_qC3g';
    var mymap = L.map('map').setView([lat,lang], 14)

    var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    const icon = L.icon({
        iconUrl: './img/icon-location.svg',
        iconSize: [25,35]
    })

    L.marker([lat,lang],{
        icon
    }).addTo(mymap)

}
