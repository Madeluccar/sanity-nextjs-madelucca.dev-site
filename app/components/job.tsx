// app/components/Job.tsx


import Image from "next/image";
import { getJob } from "@/sanity/sanity.query";
import type { JobType } from "@/types";

export const revalidate = 60;

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

// The description is plain text from Sanity: each line is a paragraph,
// and consecutive lines starting with "- " or "* " form a bullet list.
function parseDescription(text: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of (text ?? "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const bullet = line.match(/^[-*\u2022]\s+(.*)$/);
    const last = blocks[blocks.length - 1];
    if (bullet) {
      if (last?.type === "ul") last.items.push(bullet[1]);
      else blocks.push({ type: "ul", items: [bullet[1]] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks;
}

function JobDescription({ text }: { text: string }) {
  return (
    <div className="text-base text-zinc-400 my-4 flex flex-col gap-y-4">
      {parseDescription(text).map((block, i) =>
        block.type === "ul" ? (
          <ul key={i} className="list-disc pl-5 flex flex-col gap-y-2">
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block.text}</p>
        )
      )}
    </div>
  );
}

export default async function Job() {
  const job: JobType[] = await getJob();
  return (
    <section className="mt-10">
      <div className="mb-16">
        <h2 className="font-semibold text-4xl mb-4">Work Experience</h2>
      </div>

      <div className="flex flex-col gap-y-12">
        {job.map((data) => (
          <div
            key={data._id}
            className="flex items-start lg:gap-x-6 gap-x-4 max-w-1xl relative before:absolute before:bottom-0 before:top-[4.5rem] before:left-12 before:w-[1px] before:h-[calc(100%-50px)] before:bg-zinc-800"
          >
            {/* <a
              href={data.url}
              rel="noreferrer noopener"
              className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative"
            >
              <Image
                src={data.logo}
                className="object-cover"
                alt={`${data.name} logo`}
                fill
              />
            </a> */}
            {/* Fixed-size tile so every logo gets the same box whatever its aspect ratio; the
                logo scales to fit inside instead of being cropped. Tiles are white (dark logos
                disappear on a dark tile) unless the job's "Logo Background" is set to Dark in
                the Studio. Same approach as the Projects page. */}
            <a
              href={data.url}
              rel="noreferrer noopener"
              className={`${
                data.logoBackground === "dark" ? "bg-zinc-800" : "bg-white"
              } w-24 h-16 shrink-0 rounded-md p-2`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={data.logo}
                  fill
                  sizes="80px"
                  alt={`${data.name} logo`}
                  className="object-contain"
                />
              </div>
            </a>
            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold">{data.name}</h3>
              <p>{data.jobTitle}</p>
              <small className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                {data.startDate.toString()} - {data.endDate ? data.endDate.toString() : 'Current'}
              </small>
              <JobDescription text={data.description} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}