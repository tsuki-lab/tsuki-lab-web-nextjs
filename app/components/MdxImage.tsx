export function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <figure className="not-prose my-7">
      <div className="flex items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          className="max-h-[480px] w-full object-contain"
          loading="lazy"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

