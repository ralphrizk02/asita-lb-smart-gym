
import { Link } from "react-router-dom";
import IntersectionObserver from "./IntersectionObserver";

const Footer = () => {
  return (
    <footer className="bg-asita-darker text-asita-muted py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <IntersectionObserver className="reveal">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">ASITA Fitness</h3>
              <p className="mb-6">Train smarter. Move stronger. Dominate from home.</p>
              <div className="flex space-x-4">
                {['Instagram', 'Facebook', 'YouTube', 'TikTok'].map((social, i) => (
                  <a key={i} href="#" className="hover:text-asita-blue transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </IntersectionObserver>
          
          <IntersectionObserver className="reveal" delay={200}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
              <p>support@asitagym.com</p>
              <p>+1 (555) 321-9876</p>
              <p>123 Fit Street, Miami, FL</p>
            </div>
          </IntersectionObserver>
          
          <IntersectionObserver className="reveal" delay={400}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                {['Owner Manual', 'Exercise Guide', 'Installation', 'FAQs'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-asita-blue transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </IntersectionObserver>
          
          <IntersectionObserver className="reveal" delay={600}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                {['Terms of Service', 'Privacy Policy', 'Warranty', 'Returns'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-asita-blue transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <Link 
                    to="/asita-lab" 
                    className="text-asita-blue hover:text-opacity-80 transition-colors flex items-center"
                  >
                    🔬 Try Our Scroll Animation Test
                  </Link>
                </li>
              </ul>
            </div>
          </IntersectionObserver>
        </div>
        
        <IntersectionObserver className="reveal" delay={800}>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p>&copy; {new Date().getFullYear()} ASITA Fitness Inc. All rights reserved.</p>
          </div>
        </IntersectionObserver>
      </div>
    </footer>
  );
};

export default Footer;
