import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./icons/HeroSvg";
import Job from "./components/job"; // import job component
import Image from "next/image";

export default async function Home() {
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="max-w-7xl mx-auto lg:px-16 px-6">
      <section className="xl:flex xl:items-center xl:justify-center gap-x-12 lg:mt-32 mt-20 mb-16 flex-col">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="flex flex-col lg:flex-row items-start gap-8 lg:items-center">
              <div className="lg:max-w-2xl max-w-full">
                <h1 className="text-4xl sm:text-6xl mb-6 lg:leading-[4rem] font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                  {data.headline}
                </h1>
                <p className="text-base text-zinc-400 leading-relaxed font-mono text-xl">
                  {data.shortBio}
                </p>
                <ul className="flex items-center gap-x-6 my-20">
                  {Object.entries(data.socialLinks)
                    .sort()
                    .map(([key, value], id) => (
                      <li key={id}>
                        <a
                          href={value}
                          rel="noreferrer noopener"
                          className="flex items-center gap-x-3 text-lg hover:text-blue-500 duration-300"
                        >
                          {key[0].toUpperCase() + key.toLowerCase().slice(1)}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <Image
                className="mx-auto rounded-2xl mb-2 object-cover bg-top bg-[#1d1d20]"
                src={data.profileImage.image}
                width={350}
                height={280}
                quality={100}
                alt={data.profileImage.alt}
              />
            </div>
          ))}
        <HeroSvg />
      </section>
      <Job />
    </main>
  );
}