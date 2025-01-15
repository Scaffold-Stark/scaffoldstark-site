import { useState } from "react";
import Image from "next/image";

export default function OptimizedImage({
  src,
  alt,
  className = "",
  ...props
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <Image
        src={src}
        alt={alt}
        {...props}
        className={`duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoadingComplete={() => setIsLoading(false)}
        quality={75}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
