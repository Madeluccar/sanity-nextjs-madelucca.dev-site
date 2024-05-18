import Image from "next/image";
import Link from "next/link";
import Logo from "../../icons/logo.png";

export default function Navbar() {
  return (
    <header className="py-6 md:px-16 px-6 border-b border-zinc-800 z-30 md:mb-28 mb-20 min-h-[100px]">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative min-h-[100px]">
        <nav className="flex items-center justify-between w-full">
          <Link
            href="/about"
            className="text-zinc-200 hover:text-blue-500 font-semibold duration-300"
          >
            About
          </Link>
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <Image src={Logo} width={140} height={140} alt="logo" />
          </Link>
          <Link
            href="/projects"
            className="text-zinc-200 hover:text-blue-500 font-semibold duration-300"
          >
            Projects
          </Link>
        </nav>
      </div>
    </header>
  );
}

