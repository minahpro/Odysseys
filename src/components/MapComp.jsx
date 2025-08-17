"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getSingleDocument } from "@/firebase/databaseOperations";
import Link from "next/link";

// ********** CUSTOM MARKER ICON **********
function createMarkerIcon(letter) {
  return new L.DivIcon({
    className: "custom-marker-icon",
    html: `
      <div class="flex items-center justify-center">
        <div class="w-8 h-8 bg-white border border-primary rounded-full flex-all shadow-lg">
          <span class="text-primary font-bold">${letter}</span>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export default function MapComp({ idsData, single }) {
  const [loadings, setLoadings] = useState(false);
  const [destinations, setDestinations] = useState([]);

  //   ********** GETTING DESTINATIONS **********
  const getDestinations = async () => {
    try {
      setLoadings(true);
      const destinationsData = [];
      for (let i = 0; i < idsData?.length; i++) {
        const { document } = await getSingleDocument(
          "destinations",
          idsData[i]
        );
        document?.location?._lat
          ? destinationsData.push({
              position: [document?.location?._lat, document?.location?._long],
              point: String.fromCharCode(65 + i),
              name: document?.name,
              image: document?.photos?.[0],
              slug: document?.slug,
            })
          : null;
      }
      //   set data
      setDestinations(destinationsData);
      setLoadings(false);
    } catch (error) {
      console.log(error);
      setLoadings(false);
    }
  };

  // ********** POSITIONS FOR LINES **********
  const routePositions = destinations.map((dest) => dest?.position);

  //   ********** USEEFFECT **********
  useEffect(() => {
    return () => {
      delete L.Icon.Default.prototype._getIconUrl;
    };
  }, []);

  useEffect(() => {
    getDestinations();
  }, []);

  return loadings ? (
    <div className="w-full h-full bg-highlight flex-all">
      <p className="text-center text-primary">Map loading...</p>
    </div>
  ) : destinations?.length > 0 ? (
    <MapContainer
      center={routePositions?.length > 0 ? routePositions[0] : [0, 0]}
      zoom={7}
      className="w-full h-full focus:outline-none"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
      />

      <ZoomControl position="bottomright" />

      {/* Route line connecting all destinations */}
      <Polyline
        positions={routePositions?.length > 0 ? routePositions : []}
        pathOptions={{
          color: "#000",
          weight: 4,
          opacity: 0.8,
          lineJoin: "round",
        }}
      />

      {/* Markers for each destination */}
      {destinations.map((dest, index) => (
        <Marker
          key={index}
          position={dest?.position}
          icon={createMarkerIcon(dest?.point)}
        >
          <Popup className="custom-popup" minWidth={150} maxWidth={150}>
            <img
              src={dest?.image || "/placeholder.svg"}
              alt={dest?.name}
              className="object-cover w-full h-20 mb-3 rounded-md"
            />
            <h3 className="font-bold mb-1">{dest?.name}</h3>
            {single ? null : (
              <div className="bg-primary flex-all px-3 py-1 rounded text-sm hover:bg-secondary transitions w-full">
                <Link target="_blank" href={`/destination/${dest?.slug}`}>
                  <span className="text-accent font-medium">View Details</span>
                </Link>
              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <div className="w-full h-full bg-highlight flex-all">
      <p className="text-center text-primary">Map not found</p>
    </div>
  );
}
