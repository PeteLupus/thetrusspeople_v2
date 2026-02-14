import type {
    NavLink,
    TrustItem,
    AccordionItem,
    Product,
    StatItem,
    GalleryItem,
    Testimonial,
    ContactInfo,
    FooterColumn,
} from './types';

// Navigation
export const NAV_LINKS: NavLink[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
];

export const PHONE = '(03) 9309 6889';
export const PHONE_HREF = 'tel:+61393096889';
export const EMAIL = 'info@thetrusspeople.com.au';
export const ADDRESS = '37-39 Glenelg Street, Coolaroo VIC 3048';
export const FACEBOOK_URL = 'https://www.facebook.com/THE-TRUSS-PEOPLE-108692755843667/';
export const INSTAGRAM_URL = 'https://www.instagram.com/thetrusspeople/';

// Hero
export const HERO = {
    label: 'Family-Owned & Australian-Made Since 2006',
    title: "Melbourne's Trusted Timber Roof Truss & Wall Frame Manufacturer",
    description:
        'Two brothers. One promise. Precision-engineered timber roof trusses and wall frames, 100% Australian-made with honest lead times. Serving builders across Greater Melbourne, Geelong, Ballarat, Bendigo and the Mornington Peninsula.',
    ctaPrimary: 'Get a Free Quote',
    ctaSecondary: 'Our Products',
    backgroundImage: '/assets/hero-bg-v2.jpg',
};

export const TRUST_ITEMS: TrustItem[] = [
    {
        icon: '20',
        title: 'Years of Precision',
        description: 'Family-owned since 2006, Coolaroo VIC',
        href: '#about',
    },
    {
        icon: 'checkmark',
        title: '100% Australian Made',
        description: 'Australian timber, materials & manufacturing',
        href: '#products',
    },
    {
        icon: 'AS',
        title: 'AS/NZS Certified',
        description: 'Engineered to Australian Standards',
        href: '/our-work',
    },
];

// About
export const ABOUT = {
    label: 'About Us',
    title: 'Two Brothers. One Promise. Built to Last.',
    description:
        'In 2006, brothers Victor and Tony Manoski stepped in to save a struggling truss plant from closing. Having worked side by side since their teenage years, they re-opened the doors under a new name: The Truss People. Today, from our Coolaroo facility, we manufacture precision-engineered timber roof trusses and wall frames for builders across Melbourne and regional Victoria.',
    image: '/assets/about-v2.jpg',
};

export const ACCORDION_ITEMS: AccordionItem[] = [
    {
        title: 'Engineered Right',
        content:
            'Every roof truss and wall frame is detailed to your plans and engineered to AS/NZS standards. We partner with Multinail - an Australian engineering company - for our nail plates, software and connector systems. No shortcuts, no compromises.',
    },
    {
        title: 'Honest Lead Times',
        content:
            'We confirm dates upfront and keep you informed throughout production. When we say your trusses will be ready, they will be. Your build schedule matters - and we respect it.',
    },
    {
        title: '100% Australian Made',
        content:
            'All our timber is Australian-grown. All nail plates and connectors are Australian-made. Every truss and frame is manufactured right here in Coolaroo, Melbourne. We source from trusted local suppliers including Meyer Timber, VTW and City Timber.',
    },
    {
        title: 'Personal Service',
        content:
            'When you call, you speak directly with our detailers, engineers or production leads - not an automated system. We\'re a family business with long-time employees who know the building industry inside out.',
    },
    {
        title: 'Practical Design',
        content:
            'Clear layouts and documentation that make installation straightforward. Our designs are built for the site, not just the drawing board - so your framers can work efficiently from day one.',
    },
];

// Products
export const PRODUCTS_SECTION = {
    label: 'Our Products',
    title: 'Timber Roof Trusses, Wall Frames & Floor Systems',
    description:
        'Every product is manufactured from 100% Australian timber at our Coolaroo facility, engineered to AS/NZS standards using Multinail technology.',
};

export const PRODUCTS: Product[] = [
    {
        title: 'Timber Roof Trusses',
        description:
            'Custom-engineered timber roof trusses detailed to your plans. From standard gable to complex hip designs, every truss is built for residential and light commercial projects across Melbourne and Victoria.',
        features: [
            'Engineered to AS/NZS standards',
            '100% Australian timber',
            'Multinail nail plates & connectors',
        ],
        icon: 'truss',
    },
    {
        title: 'Wall Frames',
        description:
            'Precision-manufactured timber wall frames designed and engineered to your specifications. Pre-cut and site-ready to keep your build on schedule.',
        features: [
            'Custom-designed to your plans',
            'Australian standards compliant',
            'Practical, installation-friendly design',
        ],
        icon: 'frame',
    },
    {
        title: 'Floor Joists',
        description:
            'Engineered floor joist systems including Spanjoists and Steelwood Joists. Available on a project-dependent basis for residential builds requiring reliable floor framing solutions.',
        features: [
            'Spanjoist & Steelwood options',
            'Load-optimized engineering',
            'Consistent structural performance',
        ],
        icon: 'floor',
    },
    {
        title: 'I-Joists & Multistructs',
        description:
            'Advanced I-joist and Multistruct systems for long-span applications. Exceptional strength-to-weight ratios engineered for demanding residential and light commercial floor systems.',
        features: [
            'Superior span capabilities',
            'Lightweight & dimensionally stable',
            'Australian-sourced materials',
        ],
        icon: 'ijoist',
    },
];

// Stats
export const STATS: StatItem[] = [
    { number: 20, suffix: '+', label: 'Years in Business' },
    { number: 100, suffix: '%', label: 'Australian Made' },
    { number: 30, suffix: '+', label: 'Years Combined Experience' },
    { number: 100, suffix: '%', label: 'AS/NZS Compliant' },
];

// Gallery
export const GALLERY_SECTION = {
    label: 'Our Work',
    title: 'Projects Built to Last',
    description:
        'A showcase of precision engineering and quality craftsmanship across residential and commercial projects.',
};

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        image: '/assets/gallery-1-v2.jpg',
        title: 'Residential Build',
        description: 'Custom roof trusses for premium Melbourne home',
    },
    {
        image: '/assets/gallery-3-v2.jpg',
        title: 'Light Commercial',
        description: 'Large-span engineered timber trusses',
    },
    {
        image: '/assets/gallery-2-v2.jpg',
        title: 'Modern Home Design',
        description: 'Complete roof truss and wall frame package',
    },
    {
        image: '/assets/gallery-4-v2.jpg',
        title: 'Multi-Unit Development',
        description: 'Full timber framing solution for volume builder',
    },
];

// Our Work page (expanded descriptions)
export const OUR_WORK_ITEMS: GalleryItem[] = [
    {
        image: '/assets/gallery-1-v2.jpg',
        title: 'Residential Build',
        description:
            'Custom roof trusses designed for a premium double-storey home in Melbourne\'s south-east.',
        large: true,
    },
    {
        image: '/assets/gallery-3-v2.jpg',
        title: 'Light Commercial',
        description:
            'Large-span engineered timber trusses for a community hall project.',
    },
    {
        image: '/assets/gallery-2-v2.jpg',
        title: 'Modern Home Design',
        description:
            'Complete roof truss and wall frame package delivered to a tight schedule.',
    },
    {
        image: '/assets/gallery-4-v2.jpg',
        title: 'Multi-Unit Development',
        description:
            'Full timber framing solution for a 4-unit townhouse development.',
        large: true,
    },
];

// Testimonials
export const TESTIMONIALS_SECTION = {
    label: 'What Builders Say',
    title: 'Trust Built Over Years of Reliable Service',
    description:
        "We don't win jobs by undercutting - we win them by showing up, solving problems, and standing behind our work.",
};

export const TESTIMONIALS: Testimonial[] = [
    {
        stars: 5,
        text: "We'd rather pay fair for reliability than cheap for headaches. The Truss People deliver on all fronts. I wish more suppliers in the building industry were like them.",
        author: 'Lynnsay Prunotto',
        company: 'Lume Projects P/L',
        initials: 'LP',
    },
    {
        stars: 5,
        text: 'Amazing service from reception to delivery. Very helpful with design and professional site measure. Everything was delivered 100% and went together like a dream. Even the delivery man was friendly & helpful.',
        author: 'Sam Therese',
        company: 'Custom Home Builder',
        initials: 'ST',
    },
    {
        stars: 5,
        text: 'Fantastic to deal with. Very helpful with complex issues on architect plans. On time, which my carpenter was very happy with. Very happy with the end result.',
        author: 'Laura Bury',
        company: 'Residential Client',
        initials: 'LB',
    },
];

// Contact
export const CONTACT_SECTION = {
    label: 'Get a Quote',
    title: "Let's Talk About Your Next Build",
    description:
        'Whether you need roof trusses, wall frames or floor joists - get in touch for a quote. We serve builders across Greater Melbourne, Geelong, Ballarat, Bendigo and the Mornington Peninsula.',
};

export const CONTACT_INFO: ContactInfo[] = [
    {
        icon: 'map',
        title: 'Visit Our Factory',
        content: ADDRESS,
        href: 'https://maps.google.com/?q=37-39+Glenelg+Street+Coolaroo+VIC+3048',
    },
    {
        icon: 'phone',
        title: 'Call Us',
        content: PHONE,
        href: PHONE_HREF,
    },
    {
        icon: 'mail',
        title: 'Email Us',
        content: EMAIL,
        href: `mailto:${EMAIL}`,
    },
];

export const PROJECT_TYPES = [
    'Timber Roof Trusses',
    'Wall Frames',
    'Floor Joists',
    'Full Framing Package',
    'Other',
];

// Service areas
export const SERVICE_AREAS = [
    'Greater Melbourne',
    'Geelong',
    'Ballarat',
    'Bendigo',
    'Mornington Peninsula',
    'Sunbury',
    'Broadmeadows',
    'Coolaroo',
    'Northern Suburbs',
    'Western Suburbs',
    'Eastern Suburbs',
    'South East Melbourne',
];

// Footer
export const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: 'Products',
        links: [
            { label: 'Timber Roof Trusses', href: '#products' },
            { label: 'Wall Frames', href: '#products' },
            { label: 'Floor Joists', href: '#products' },
            { label: 'I-Joists & Multistructs', href: '#products' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '#about' },
            { label: 'Our Work', href: '/our-work' },
            { label: 'Testimonials', href: '#testimonials' },
            { label: 'Get a Quote', href: '#contact' },
        ],
    },
];

export const CERTIFICATIONS = [
    { name: 'Multinail', logo: '/assets/multinail-logo.png' },
    { name: 'FTMA Australia', logo: '/assets/ftma-logo.png' },
    { name: 'Master Builders Victoria', logo: '/assets/mbav-logo.png' },
];
