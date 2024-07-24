import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/background.jpg')] bg-fixed text-black">
      <div id="carouselExampleCaptions" className="relative">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <Image
              src="/salon5.jpg"
              className="block w-full"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5 className="text-xl">First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 m-2 p-2">
        <Link href="/setview?id=667833f26bd549ac28d2d203">
          <div className="block group cursor-pointer">
            <Image
              src="/salon1.jpg"
              alt="placeholderjpg"
              className="max-h-[400px] block group-hover:blur-sm transition duration-300"
              width={400}
              height={400}
              priority
            />
          </div>
        </Link>
        <Link href="/setview?id=667af292b1585c48d2239aa4">
          <div className="block group cursor-pointer">
            <Image
              src="/salon2.jpeg"
              alt="placeholderjpg"
              className="max-h-[400px] block group-hover:blur-sm transition duration-300"
              width={400}
              height={400}
              priority
            />
          </div>
        </Link>
        <Link href="/setview?id=667aec311cfe140e393e017a">
          <div className="block group cursor-pointer">
            <Image
              src="/salon3.webp"
              alt="placeholderjpg"
              className="max-h-[400px] block group-hover:blur-sm transition duration-300"
              width={400}
              height={400}
              priority
            />
          </div>
        </Link>
      </div>
    </main>
  );
}
