import Image from 'next/image';

export function HeaderLogo() {
  return (
    <span className="official-logo header-logo" aria-hidden="true">
      <Image src="/logo-gmp-obras-landing-transparente.png" alt="" width={1000} height={250} unoptimized />
    </span>
  );
}
