import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <div className="max-md:hidden">
        <Image
          src="/logo-dark-mode.png"
          alt="Daily Walk Logo dark"
          width={120}
          height={120}
          className="hidden dark:block"
        />
        <Image
          src="/logo-light-mode.png"
          alt="Daily Walk Logo light"
          width={120}
          height={120}
          className="block dark:hidden"
        />
      </div>

      <div className="md:hidden">
        <Image
          src="/logo-dark-mode.png"
          alt="Daily Walk Logo dark"
          width={100}
          height={100}
          className="hidden dark:block"
        />
        <Image
          src="/logo-light-mode.png"
          alt="Daily Walk Logo light"
          width={100}
          height={100}
          className="block dark:hidden"
        />
      </div>
    </Link>
  );
}
