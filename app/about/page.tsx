// app/about/page.tsx

import Image from "next/image";
import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile } from "react-icons/bi";

export default async function About() {
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="md:px-16 px-6">
      <div className="max-w-6xl mx-auto">
        {profile &&
          profile.map((data) => (
            <div key={data._id}>
              <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,29fr)_minmax(0,16fr)] gap-8 xl:gap-x-12 items-start">
                <div className="min-w-0 order-2 lg:order-none">
                  <h1 className="lg:text-5xl text-4xl lg:leading-tight basis-1/2 font-bold mb-8">
                    I&apos;m <span className="text-blue-400">{data.fullName}.</span>
                    <br/> I live in {data.location}, where I <span className="text-blue-400">develop</span> the future.
                  </h1>

                  <div className="flex flex-col gap-y-3 text-zinc-400 leading-relaxed">
                    <PortableText value={data.fullBio} />
                  </div>
                </div>

                <div className="w-full max-w-[384px] lg:max-w-none mx-auto lg:mx-0 flex flex-col gap-y-6 lg:order-1 order-none">
                  <div>
                    <Image
                      className="w-full h-auto rounded-2xl mb-4 object-cover bg-top bg-[#1d1d20]"
                      src={data.profileImage.image}
                      width={600}
                      height={500}
                      sizes="(min-width: 1280px) 393px, (min-width: 1024px) calc((100vw - 160px) * 16 / 45), (min-width: 432px) 384px, calc(100vw - 48px)"
                      quality={100}
                      alt={data.profileImage.alt}
                    />

                    <a
                      href={`${data.resumeURL}?dl=${data.fullName}_resume`}
                      className="flex items-center justify-center gap-x-2 bg-[#1d1d20] border border-transparent hover:border-blue-500 rounded-md duration-200 py-2 text-center cursor-cell font-medium"
                    >
                      <BiFile className="text-base" /> Download Resumé
                    </a>
                  </div>

                  <ul>
                    <li>
                      <a
                        href={`mailto:${data.email}`}
                        className="flex items-center justify-center gap-x-2 hover:text-blue-400 duration-300"
                      >
                        <BiEnvelope className="text-lg" />
                        {data.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mt-10 max-w-2xl mx-auto text-center">
                <h2 className="font-semibold text-4xl mb-4">Expertise</h2>
                <p className="text-zinc-400 max-w-lg mx-auto">
                  I&apos;ve spent few years working on my skills. In no particular
                  order, here are a few of them.
                </p>

                <ul className="flex flex-wrap justify-center items-center gap-3 mt-8">
                  {data.skills.map((skill, id) => (
                    <li
                      key={id}
                      className="bg-[#1d1d20] border border-transparent hover:border-blue-500 rounded-md px-2 py-1"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ))}
      </div>
    </main>
  );
}
