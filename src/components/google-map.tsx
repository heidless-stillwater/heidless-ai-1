"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface GoogleMapProps {
  address: string;
}

export function GoogleMap({ address }: GoogleMapProps) {
  const [isMapActive, setIsMapActive] = useState(false);

  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (!isMapActive) {
    return (
      <div
        className="aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center cursor-pointer hover:bg-accent transition-colors"
        onClick={() => setIsMapActive(true)}
      >
        <div className="text-center p-4">
            <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
            <p className="font-semibold mb-2">Click to view map</p>
            <p className="text-sm text-muted-foreground">{address}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
      <iframe
        className="h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
        title={`Map of ${address}`}
      ></iframe>
    </div>
  );
}
