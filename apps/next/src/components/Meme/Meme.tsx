import Image from "next/image";
export function Meme({ name }: { name: string }) {
  return (
    <span
      className="inline-block relative self-center meme"
      tabIndex={0}
      aria-label={`:${name}:`}
    >
      <span className="bottom-[calc(100%+10px)] left-[calc(-100%-10px)] absolute bg-minimal meme-popover p-2.5 border border-soft rounded-md w-[100px] text-center">
        <Image
          src={`/assets/img/memes/${name}.webp`}
          alt=""
          width={48}
          height={48}
          className="inline-block mb-[5px] rounded-md"
        />
        <strong className="text-primary">:{name}:</strong>
      </span>
      <Image
        src={`/assets/img/memes/${name}.webp`}
        alt=""
        width={20}
        height={20}
        className="inline-block meme-image ml-[0.5ch] rounded-sm"
      />
    </span>
  );
}
