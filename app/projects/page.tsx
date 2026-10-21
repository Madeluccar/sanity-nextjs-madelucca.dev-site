// app/projects/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";

export const revalidate = 60;

export default async function Project() {
  const projects: ProjectType[] = await getProjects();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="max-w-1xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          Featured projects I&apos;ve built over the years
        </h1>
        <p className="text-base text-zinc-200 leading-relaxed max-w-2xl">
          I&apos;ve worked on tons of little projects over the years but these
          are the ones that I&apos;m most proud of. Many of them are
          open-source, so if you see something that piques your interest, check
          out the code and contribute if you have ideas for how it can be
          improved.
        </p>
      </section>

      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project._id}
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-blue-400 p-4 rounded-lg ease-in-out"
          >
            {/* <Image
              src={project.logo}
              width={125}
              height={125}
              alt={project.name}
              className="bg-zinc-800 rounded-md p-2"
            /> */}
            {/* Same-shape tile for every logo (half the card's width, 4:3), so every logo gets the
                same box whatever its aspect ratio; the logo scales to fit inside. Tiles are white
                (dark logos disappear on a dark tile) unless the project's "Logo Background" is
                set to Dark in the Studio. Was a fixed w-32 h-24 tile. */}
            <div
              className={`${
                project.logoBackground === "dark" ? "bg-zinc-800" : "bg-white"
              } w-1/2 aspect-[4/3] shrink-0 rounded-md p-3 flex items-center justify-center`}
            >
              {/* <div className="relative w-full h-full"> */}
              {/* Logo box is 90% of the tile's inner area, so each logo is 10% smaller. */}
              <div className="relative w-[90%] h-[90%]">
                <Image
                  src={project.logo}
                  fill
                  // sizes="104px"
                  sizes="(min-width: 1280px) 160px, (min-width: 768px) 25vw, 50vw"
                  alt={project.name}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="min-w-0">
              {/* <h2 className="font-bold mb-1 text-zinc-200">{project.name}</h2> */}
              {/* <div className="text-sm text-zinc-400">{project.tagline}</div> */}
              {/* Name and tagline are 10% larger, rounded up: 16px -> 18px and 14px -> 16px. */}
              <h2 className="font-bold mb-1 text-lg text-zinc-200">{project.name}</h2>
              <div className="text-base text-zinc-400">{project.tagline}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

