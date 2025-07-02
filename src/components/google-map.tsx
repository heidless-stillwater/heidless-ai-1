"use client";

interface GoogleMapProps {
  address: string;
}

export function GoogleMap({ address }: GoogleMapProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

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
