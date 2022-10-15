import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  Polygon,
} from "@react-google-maps/api";

const data = require("../data/dzejson3.json");
const options = {
  disableDefaultUI: true,
  minZoom: 12,
  mapId: "566559f1b8667aab",
  gestureHandling: "greedy",
  clickableIcons: false,
};

const Map = ({ setModal, userPos, modal }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const mapRef = useRef(null);
  const [mapPos, setMapPos] = useState([51.110465, 17.03168]);
  useEffect(() => {
    if (userPos.length !== 0) {
      setMapPos(userPos);
    }
  }, [userPos]);
  return isLoaded ? (
    <GoogleMap
      ref={mapRef}
      options={options}
      mapContainerClassName="map-container"
      center={{ lat: mapPos[0], lng: mapPos[1] }}
      zoom={14}
      onClick={() => {
        modal.open && setModal({ open: false });
      }}
      onDrag={() => {
        modal.open && setModal({ open: false });
      }}
    >
      <MarkerClusterer>
        {(clusterer) =>
          data.map((e) => {
            const lat = e.lat;
            const lng = e.lng;
            return (
              <Marker
                key={e.id}
                position={{ lat: lat, lng: lng }}
                clusterer={clusterer}
                onClick={() => {
                  setModal({
                    open: true,
                    address: e.address,
                    category: e.category,
                    placeId: e.place_id,
                  });
                  setMapPos([lat, lng]);
                }}
              />
            );
          })
        }
      </MarkerClusterer>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
