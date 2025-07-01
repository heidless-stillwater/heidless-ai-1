import Image from 'next/image';

interface GoogleMapProps {
  address: string;
}

export function GoogleMap({ address }: GoogleMapProps) {
  // A real implementation would use the Google Maps API.
  // For this prototype, we'll use a placeholder image.
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
      <Image
        alt={`Map showing location of ${address}`}
        className="h-full w-full object-cover"
        height={400}
        src="https://placehold.co/600x400.png"
        width={600}
        data-ai-hint="street map"
      />
    </div>
  );
}
