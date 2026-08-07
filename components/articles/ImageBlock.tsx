import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    caption?: string;
};

export default function ImageBlock({
    src,
    alt,
    caption,
}: Props) {
    return (
        <figure className="my-12">

            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-gray-200 bg-gray-100">

                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                />

            </div>

            {caption && (
                <figcaption className="mt-4 text-center text-sm italic text-gray-500">
                    {caption}
                </figcaption>
            )}

        </figure>
    );
}