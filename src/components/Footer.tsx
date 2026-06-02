import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F7F2EB] text-[#2C2A28] pt-24 pb-12 px-6 sm:px-10 lg:px-14 xl:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 lg:mb-28">
          
          {/* Brand Column */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#A67C46] mb-6 block font-medium">
              Welcome to our world
            </span>
            {/* Massive Brand Name using the new Oliver font */}
            <h2 className="font-oliver font-light text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] text-[#CBA135] tracking-tight -ml-1 sm:-ml-2">
              Pachchigar & Sons
            </h2>
          </div>

          {/* Description Column */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:pt-20">
            <p className="font-serif font-light text-[clamp(1.4rem,3vw,2rem)] leading-[1.3] text-[#4A453F] max-w-lg mb-8">
              Provide unique experiences for everyone involved with a brand. A trip without time, igniting a flame of enthusiasm and curiosity for each one.
            </p>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#A67C46] block font-medium">
              Keep in touch!
            </span>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 lg:gap-8">
          
          {/* Menus */}
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-24">
            {/* Menu 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A67C46] mb-2 font-semibold">Menu</h3>
              <Link href="/" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">Home</Link>
              <Link href="/about" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">About</Link>
              <Link href="/collections" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">Collections</Link>
              <Link href="/bespoke" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">Bespoke</Link>
              <Link href="/contact" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">Contact</Link>
            </div>
            
            {/* Menu 2 */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A67C46] mb-2 font-semibold">Support</h3>
              <Link href="/terms" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">Privacy Policy</Link>
              <Link href="/legal" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">Legal Mention</Link>
              
              {/* Socials */}
              <div className="flex gap-6 mt-6">
                <a href="#" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">.ig</a>
                <a href="#" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">.fb</a>
                <a href="#" className="font-sans text-[14px] text-[#2C2A28] hover:text-[#CBA135] transition-colors">.tt</a>
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="lg:pb-1">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#2C2A28]/70 font-semibold">
              Design & Dev: Nexeor
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
