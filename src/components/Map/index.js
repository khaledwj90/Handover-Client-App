// @flow
import React, {useState, useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform} from "react-native";
import MapView, {Marker} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Icon from "../Icons";

type MapProps = {
    markersList: Array<{ lat: number, lng: number }>,
    markerType: 'normal' | 'pickup' | 'delivery',
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
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition((position) => {
            const initialLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            };
            if (props.location) {
                props.location({
                    hasPermission: true,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }
            mapRef.current.animateToRegion(initialLocation, 500);
            setRegion(initialLocation);
        }, (e) => console.log(e))

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

    const onRegionChange = (region) => {
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
                    props.markersList.map((marker) => {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lng
                                }}/>
                        )
                    }) :
                    props.markerType === 'delivery' ?
                        <Marker
                            coordinate={{
                                latitude: region.latitude,
                                longitude: region.longitude
                            }}>
                            <Icon name={'Animation_DeliveryGuy'} style={{width: 50, height: 50}}/>
                        </Marker>
                        :
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
