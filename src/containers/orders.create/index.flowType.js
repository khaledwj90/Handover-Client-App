// @flow

export type OrdersCreateContextType = {
    mapRef: any,
    currentLocation: LocationType,
    clearCurrentLocation: ()=>void,
    selectedLocation: SelectedLocationType,
    setSelectedLocation: (location: SelectedLocationType)=>void,
}

export type SelectedLocationType = {
    deliveryLocation?: LocationType,
    pickupLocation?: LocationType
}
export type LocationType = {
    lat: number,
    lng: number
}
