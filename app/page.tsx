import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./icons/HeroSvg";

export default async function Home() {
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="max-w-7xl mx-auto lg:px-16 px-6">
      <section className="flex flex-col items-center lg:mt-32 mt-20 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="text-center lg:max-w-3xl max-w-full mb-12">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-4 lg:leading-[4rem] leading-tight">
                {data.headline}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {data.shortBio}
              </p>
              <ul className="flex justify-center gap-x-8 my-10">
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
          ))}
        <div className="mt-10">
          <HeroSvg />
        </div>
      </section>
    </main>
  );
}

