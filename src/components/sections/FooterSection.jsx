import { Twitter, Linkedin, Youtube, Instagram, Github, MapPin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FooterSection() {
  return (
    <footer className="bg-[#0F172A] text-white pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top Section: Brand + Social */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-md">
            <h2 className="text-3xl font-black tracking-tighter text-white">
              GUARDIAN <span className="text-guardian-blue">AI</span>
            </h2>
            <p className="mt-4 text-xl font-bold text-slate-100">
              The intelligent shield for modern platforms.
            </p>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Protecting brands, users, and businesses with next-generation AI security.
            </p>
            <div className="mt-8 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-guardian-blue font-bold">
                <MapPin size={18} />
                <span className="uppercase tracking-widest text-sm">Global Presence</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/w20/in.png" alt="India" className="h-3.5 w-auto rounded-sm" />
                  <span className="text-slate-300 text-sm font-medium">India</span>
                </div>
                <span className="text-slate-600">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-3.5 w-auto rounded-sm" />
                  <span className="text-slate-300 text-sm font-medium">USA</span>
                </div>
                <span className="text-slate-600">|</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/w40/eu.png" alt="Europe" className="h-3.5 w-auto rounded-sm" />
                  <span className="text-slate-300 text-sm font-medium">Europe</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-5">
            {[
              { 
                Icon: Linkedin, 
                href: "https://www.linkedin.com/company/guardian-aioffical/", 
                color: "hover:bg-[#0077B5]" 
              },
              { 
                Icon: () => (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ), 
                href: "https://x.com/Guardianai_", 
                color: "hover:bg-[#000000]" 
              },
              { 
                Icon: Facebook, 
                href: "https://www.facebook.com/profile.php?id=61586015683593", 
                color: "hover:bg-[#1877F2]" 
              },
              { 
                Icon: Instagram, 
                href: "https://www.instagram.com/guardian.ai_?igsh=b3VmczhyaWg3bHZp", 
                color: "hover:bg-[#E4405F]" 
              }
            ].map(({ Icon, href, color }, i) => (
              <a 
                key={i} 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-300 transition-all duration-300 ${color} hover:text-white hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Link Sections: Clean Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20 border-t border-white/5 pt-16">
          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Product</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition">Platform Overview</Link></li>
              <li><a href="#solutions" className="hover:text-white transition">Solutions</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition font-semibold text-guardian-blue">Request Demo</a></li>
              <li><Link to="/settings" className="hover:text-white transition">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Solutions</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition">Startups</a></li>
              <li><a href="#" className="hover:text-white transition">Communities</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Resources</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition">Support Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Company</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Partners</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Legal</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><a href="#" className="hover:text-white transition">Security Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] uppercase tracking-widest font-bold text-slate-500">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <p>© 2026 Guardian AI Technologies. All rights reserved.</p>
            <span className="hidden md:block text-slate-700">|</span>
            <p className="text-guardian-blue">Built for a safer internet.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
