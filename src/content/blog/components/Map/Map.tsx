// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import * as turf from "@turf/turf";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2FicmllbC1tb3Jlbm8iLCJhIjoiY2x4NmN0MG1wMGN0NzJqbjgzMDRmcnR0eCJ9.w6bMq_G6Fd4vEbkuFwXMcg";

const darkMode = "mapbox://styles/gabriel-moreno/clx6bz15m08bk01qlaoda4ys4";
const lightMode = "mapbox://styles/gabriel-moreno/clx6bxzjv08q501nxb6qy7o01";

type Point = {
  lat: number;
  lng: number;
};

type Region = Point & {
  radius: number;
};

type MapProps = Point & {
  title: string;
  zoom: number;
  markers: Point[];
  clusters: Region[];
};

export default function Map({
  title = "",
  lat = 28.497497,
  lng = -81.275427,
  zoom = 17,
  markers = [],
  clusters = [],
}: MapProps) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [isLoaded, setIsLoaded] = useState(false);

  const darkModePreference = useMemo(
    () => window?.matchMedia("(prefers-color-scheme: dark)"),
    [window]
  );

  const initializeMap = () => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: darkModePreference.matches ? darkMode : lightMode,
      center: [lng, lat],
      zoom: zoom,
      dragPan: false,
      dragRotate: false,
      scrollZoom: false,
    });

    mapRef.current.on("mouseenter", () => {
      mapRef.current.getCanvas().style.cursor = "";
    });
    mapRef.current.on("mouseleave", () => {
      mapRef.current.getCanvas().style.cursor = "";
    });

    setIsLoaded(true);
  };

  const addFeatures = () => {
    markers.forEach((marker) => {
      new mapboxgl.Marker({ color: "rgb(var(--color-secondary))" })
        .setLngLat([marker.lng, marker.lat])
        .addTo(mapRef.current);
    });

    if (clusters.length) {
      mapRef.current.on("style.load", () => {
        mapRef.current.addSource("clusters", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: clusters.map((cluster) =>
              turf.circle([cluster.lng, cluster.lat], 25, {
                steps: 50,
                units: "meters",
              })
            ),
          },
        });

        mapRef.current.addLayer({
          id: "clusters",
          type: "fill",
          source: "clusters",
          layout: {},
          paint: {
            "fill-color": darkModePreference.matches ? "white" : "black",
            "fill-opacity": 0.25,
          },
        });
      });
    }
  };

  const updateMapStyles = (e) => {
    mapRef.current.setStyle(e.matches ? darkMode : lightMode);

    addFeatures();
  };

  useEffect(() => {
    initializeMap();

    if (!isLoaded) {
      addFeatures();
    }

    darkModePreference.addEventListener("change", updateMapStyles);

    return () => {
      darkModePreference.removeEventListener("change", updateMapStyles);
    };
  }, []);

  return (
    <div className="relative mb-[20px]">
      <div
        ref={mapContainerRef}
        className="w-full h-auto aspect-video cursor-default mb-[20px] rounded-md overflow-hidden"
      ></div>
      <figcaption class="text-center text-disabled font-serif italic">
        {title}
      </figcaption>
    </div>
  );
}

export function SingleMarkerMap() {
  return (
    <Map
      title="Figure A: example location in the middle of the street."
      lat={28.497497}
      lng={-81.275427}
      markers={[
        {
          lat: 28.497497,
          lng: -81.275427,
        },
      ]}
    />
  );
}

export function DoubleMarkerMap() {
  return (
    <Map
      title="Figure B: Precision loss by decimal trimming."
      lat={28.4972485}
      lng={-81.2752135}
      zoom={18}
      markers={[
        {
          lat: 28.497497,
          lng: -81.275427,
        },
        {
          lat: 28.497,
          lng: -81.275,
        },
      ]}
    />
  );
}

export function ClusterMap() {
  return (
    <Map
      title="Figure C: Address clusters on the map."
      lat={28.497497}
      lng={-81.275427}
      zoom={17.875}
      markers={[
        {
          lat: 28.497497,
          lng: -81.275427,
        },
        {
          lat: 28.497359,
          lng: -81.275149,
        },
        {
          lat: 28.497671,
          lng: -81.275783,
        },
        {
          lat: 28.497244,
          lng: -81.275611,
        },
        {
          lat: 28.496891,
          lng: -81.275829,
        },
        {
          lat: 28.497845,
          lng: -81.275221,
        },
        {
          lat: 28.497087,
          lng: -81.276191,
        },
        {
          lat: 28.497934,
          lng: -81.274788,
        },
      ]}
      clusters={[
        {
          lat: 28.497497,
          lng: -81.275427,
        },
        {
          lat: 28.497359,
          lng: -81.275149,
        },
        {
          lat: 28.497671,
          lng: -81.275783,
        },
        {
          lat: 28.497244,
          lng: -81.275611,
        },
        {
          lat: 28.496891,
          lng: -81.275829,
        },
        {
          lat: 28.497845,
          lng: -81.275221,
        },
        {
          lat: 28.497087,
          lng: -81.276191,
        },
        {
          lat: 28.497934,
          lng: -81.274788,
        },
      ]}
    />
  );
}
