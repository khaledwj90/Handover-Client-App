// @flow
import React, {useState, useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform} from "react-native";
import MapView, {Marker} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Icon from "../Icons";

type MapProps = {
    markersList: Array<{ lat: number, lng: number, type: 'normal' | 'pickup' | 'delivery' | 'driver' }>,
    initialLocation: { lat: number, lng: number },
    location: { lat: number, lng: number, hasPermission: boolean },
    updateLocation: { lat: number, long: number },
}
const MapContainer = React.forwardRef((props: MapProps, ref) => {
    const mapRef = useRef();
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const mapRegionChangeTimeout = React.useRef();


    useEffect(() => {
        /**
         * Setup initial route
         */
        if (props.initialLocation) {
            const initialLocation = {
                latitude: props.initialLocation.lat,
                longitude: props.initialLocation.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            };
            mapRef.current.animateToRegion(initialLocation, 500);
            setRegion(initialLocation);
        }
    }, [props.initialLocation])


    /**
     * Get current location
     * @returns {Promise<void>}
     */
    const getCurrentLocation = async () => {
        if (props.markersList?.length) {
            //fit map to show all markers
            if (props.markersList?.length) {
                const markersIdentifier = props.markersList.map(marker => (marker.type));
                mapRef.current.fitToSuppliedMarkers(markersIdentifier, {
                    edgePadding:
                        {
                            top: 50,
                            right: 50,
                            bottom: 100,
                            left: 50
                        }

                })
            }
        } else {
            //get current location
            Geolocation.getCurrentPosition((position) => {
                const initialLocation = {
                    latitude: props.initialLocation ? props.initialLocation.lat : position.coords.latitude,
                    longitude: props.initialLocation ? props.initialLocation.lng : position.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                };
                mapRef.current.animateToRegion(initialLocation, 500);
                setRegion(initialLocation);
            }, (e) => console.log(e))
        }
    };

    /**
     * this is used to set the location manually from the parent component
     * @param lat
     * @param lng
     */
    const setLocationManual = (lat, lng) => {
        const location = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };
        mapRef.current.animateToRegion(location, 500);
    };

    /**
     * read lat,lng while moving on the map
     * @param region
     */
    const onRegionChange = (region) => {
        if (props.markersList?.length) {
            return;
        }
        if (mapRegionChangeTimeout.current) {
            clearTimeout(mapRegionChangeTimeout.current);
        }
        mapRegionChangeTimeout.current = setTimeout(() => {
            props.updateLocation({
                lat: region.latitude,
                lng: region.longitude
            });
        }, 250);

        setRegion(region);
    };

    /**
     * used to set location from the parent using Ref
     */
    React.useImperativeHandle(ref, () => ({
        setLocation: () => {
            getCurrentLocation();
        },
        setLocationManual: (lat, lng) => {
            setLocationManual(lat, lng)
        },
        lat: region.latitude,
        long: region.longitude
    }));

    return (
        <MapView
            ref={mapRef}
            onMapReady={getCurrentLocation}
            style={{height: '100%', width: '100%'}}
            onRegionChange={onRegionChange}>
            {
                props.markersList && props.markersList.length ?
                    props.markersList.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                identifier={marker.type}
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lng
                                }}>
                                {
                                    marker.type === 'delivery' &&
                                    <Icon name={'Animation_DeliveryLocation'} style={{width: 50, height: 50}}/>
                                }
                                {
                                    marker.type === 'pickup' &&
                                    <Icon name={'Animation_PickupLocation'} style={{width: 50, height: 50}}/>
                                }
                                {
                                    marker.type === 'driver' &&
                                    <Icon name={'Animation_DeliveryGuy'} style={{width: 50, height: 50}}/>
                                }
                            </Marker>
                        )
                    }) :
                    <Marker
                        coordinate={{
                            latitude: region.latitude,
                            longitude: region.longitude
                        }}/>

            }

        </MapView>
    )
});

export default MapContainer
