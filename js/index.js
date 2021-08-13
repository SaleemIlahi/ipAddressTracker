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
}