import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/background.jpg')] bg-fixed text-black">
      <div className="">
        <div id="carouselExampleCaptions" className="relative">
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
            <div
              className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                className="block w-full"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 m-2 p-2">
        <Image
          src="/placeholder.jpg"
          alt="placeholderjpg"
          className=""
          width={400}
          height={400}
          priority
        />
        <Image
          src="/placeholder.jpg"
          alt="placeholderjpg"
          className=""
          width={400}
          height={400}
          priority
        />
        <Image
          src="/placeholder.jpg"
          alt="placeholderjpg"
          className=""
          width={400}
          height={400}
          priority
        />
      </div>
    </main>
  );
}
