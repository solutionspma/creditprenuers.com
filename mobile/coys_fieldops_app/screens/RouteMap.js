import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

// Dummy route data for demo
const DUMMY_ROUTE = {
  origin: {
    latitude: 41.8781,
    longitude: -87.6298,
    title: 'Pickup: Chicago, IL',
    address: '123 Industrial Way, Chicago, IL 60601',
  },
  destination: {
    latitude: 42.3314,
    longitude: -83.0458,
    title: 'Delivery: Detroit, MI',
    address: '456 Warehouse Blvd, Detroit, MI 48226',
  },
  waypoints: [
    { latitude: 41.9500, longitude: -87.0500 },
    { latitude: 42.0000, longitude: -86.5000 },
    { latitude: 42.1000, longitude: -85.5000 },
    { latitude: 42.2000, longitude: -84.5000 },
  ],
  estimatedTime: '4h 15m',
  distance: '282 mi',
  nextStop: 'Pickup',
  arrivalTime: '2:00 PM',
};

export default function RouteMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [routeData, setRouteData] = useState(DUMMY_ROUTE);
  const [isNavigating, setIsNavigating] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  function fitToRoute() {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [routeData.origin, ...routeData.waypoints, routeData.destination],
        {
          edgePadding: { top: 50, right: 50, bottom: 200, left: 50 },
          animated: true,
        }
      );
    }
  }

  function centerOnLocation() {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }

  function startNavigation() {
    setIsNavigating(true);
    // In production, this would start turn-by-turn navigation
  }

  function stopNavigation() {
    setIsNavigating(false);
  }

  const routeCoordinates = [
    routeData.origin,
    ...routeData.waypoints,
    routeData.destination,
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: 41.8781,
          longitude: -85.5,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        onMapReady={fitToRoute}
      >
        {/* Origin Marker */}
        <Marker
          coordinate={routeData.origin}
          title={routeData.origin.title}
          description={routeData.origin.address}
        >
          <View style={styles.markerContainer}>
            <Text style={styles.markerText}>📍</Text>
          </View>
        </Marker>

        {/* Destination Marker */}
        <Marker
          coordinate={routeData.destination}
          title={routeData.destination.title}
          description={routeData.destination.address}
        >
          <View style={styles.markerContainer}>
            <Text style={styles.markerText}>🏁</Text>
          </View>
        </Marker>

        {/* Route Line */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#16A34A"
          strokeWidth={4}
        />
      </MapView>

      {/* Map Controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlBtn} onPress={fitToRoute}>
          <Text style={styles.controlIcon}>🗺️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={centerOnLocation}>
          <Text style={styles.controlIcon}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Route Info Panel */}
      <View style={styles.infoPanel}>
        <View style={styles.routeHeader}>
          <View style={styles.routeInfo}>
            <Text style={styles.nextStopLabel}>Next Stop</Text>
            <Text style={styles.nextStopValue}>{routeData.nextStop}</Text>
          </View>
          <View style={styles.etaContainer}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>{routeData.arrivalTime}</Text>
          </View>
        </View>

        <View style={styles.routeDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🚚</Text>
            <View>
              <Text style={styles.detailValue}>{routeData.distance}</Text>
              <Text style={styles.detailLabel}>Distance</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⏱️</Text>
            <View>
              <Text style={styles.detailValue}>{routeData.estimatedTime}</Text>
              <Text style={styles.detailLabel}>Est. Time</Text>
            </View>
          </View>
        </View>

        <View style={styles.addressSection}>
          <Text style={styles.addressLabel}>📍 From</Text>
          <Text style={styles.addressText}>{routeData.origin.address}</Text>
          <Text style={[styles.addressLabel, { marginTop: 10 }]}>🏁 To</Text>
          <Text style={styles.addressText}>{routeData.destination.address}</Text>
        </View>

        {/* Navigation Button */}
        {!isNavigating ? (
          <TouchableOpacity style={styles.navButton} onPress={startNavigation}>
            <Text style={styles.navButtonText}>▶️ Start Navigation</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.navButton, styles.navButtonStop]} onPress={stopNavigation}>
            <Text style={styles.navButtonText}>⏹️ Stop Navigation</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapControls: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  controlBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  controlIcon: {
    fontSize: 20,
  },
  markerContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 24,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  routeInfo: {},
  nextStopLabel: {
    fontSize: 12,
    color: '#666',
  },
  nextStopValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  etaContainer: {
    alignItems: 'flex-end',
  },
  etaLabel: {
    fontSize: 12,
    color: '#666',
  },
  etaValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailDivider: {
    width: 1,
    backgroundColor: '#ddd',
  },
  addressSection: {
    marginBottom: 15,
  },
  addressLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: '#1f2937',
    marginTop: 2,
  },
  navButton: {
    backgroundColor: '#16A34A',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  navButtonStop: {
    backgroundColor: '#EF4444',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
