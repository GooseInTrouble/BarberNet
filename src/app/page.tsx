import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/background.jpg')] bg-fixed text-black">
      <div id="carouselExampleCaptions" className="relative">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
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
        <Image
          src="/pic1.jpg"
          alt="placeholderjpg"
          className="max-h-[400px] block"
          width={400}
          height={400}
          priority
        />
        <Image
          src="/pic2.jpg"
          alt="placeholderjpg"
          className="max-h-[400px] block"
          width={400}
          height={400}
          priority
        />
        <Image
          src="/biker.jpg"
          alt="placeholderjpg"
          className="max-h-[400px] block"
          width={400}
          height={400}
          priority
        />
      </div>
    </main>
  );
}
