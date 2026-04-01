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
    ProductPageData,
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
    backgroundImages: [
    '/assets/hero-1.jpg',
    '/assets/hero-2.jpg',
    '/assets/hero-3.jpg',
  ],
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
    image: '/assets/two-brothers.jpg',
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
        image: '/assets/product-roof-trusses.jpg',
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
        image: '/assets/product-wall-frames.jpg',
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
        image: '/assets/product-floor-joists.jpg',
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
        image: '/assets/product-ijoists.jpg',
    },
];

// ─── Product Pages (SEO) ──────────────────────────────────────────────────────

export const PRODUCT_PAGES: Record<string, ProductPageData> = {
    'timber-roof-trusses': {
        slug: 'timber-roof-trusses',
        title: 'Timber Roof Trusses',
        tagline: 'Custom-engineered timber roof trusses manufactured at our Coolaroo facility, designed to your plans and delivered on schedule.',
        heroImage: '/assets/product-roof-trusses.jpg',
        metaTitle: 'Timber Roof Trusses Melbourne | The Truss People',
        metaDescription: 'Custom-engineered timber roof trusses manufactured in Coolaroo, Melbourne. AS/NZS certified, 100% Australian timber, Multinail technology. Get a free quote.',
        benefits: [
            {
                icon: 'shield',
                title: 'AS/NZS Certified',
                description: 'Every truss is engineered to Australian and New Zealand structural standards. Fully certified and compliant for residential and light commercial builds.',
            },
            {
                icon: 'timber',
                title: '100% Australian Timber',
                description: 'We source all timber from trusted Australian suppliers including Meyer Timber, VTW and City Timber. No imported materials.',
            },
            {
                icon: 'ruler',
                title: 'Custom Engineered Designs',
                description: 'From standard gable to complex hip and valley configurations, our detailers engineer every truss to your specific architectural plans.',
            },
            {
                icon: 'truck',
                title: 'Reliable Delivery',
                description: 'We confirm dates upfront and deliver on schedule. Your build timeline matters and we respect it — no surprises, no delays.',
            },
        ],
        content: [
            'At The Truss People, we manufacture precision-engineered timber roof trusses for builders across Melbourne, Geelong, Ballarat, Bendigo, and the Mornington Peninsula. Every truss is designed in-house by our experienced detailers and manufactured at our Coolaroo facility using Multinail nail plate technology.',
            'Whether you\'re building a single residential home, a multi-unit development, or a light commercial project, we engineer trusses to handle any roof design — standard gable, hip, Dutch gable, scissor, and complex multi-level configurations. Our partnership with Multinail gives us access to industry-leading engineering software and connector systems.',
            'We\'ve been doing this since 2006. As a family-owned business, we take pride in personal service — when you call, you speak directly with our detailers, engineers, or production team. Not a call centre. We quote quickly, manufacture accurately, and deliver when we say we will.',
        ],
        features: [
            'Engineered to AS/NZS standards',
            '100% Australian timber',
            'Multinail nail plates & connectors',
            'Standard gable to complex hip designs',
            'Residential & light commercial',
            'Fast turnaround with honest lead times',
        ],
        process: [
            { step: 'Send Your Plans', description: 'Upload your architectural or engineering plans through our quote form or email them directly.' },
            { step: 'Engineering & Quote', description: 'Our detailers review your plans, engineer the truss layout, and provide a detailed quote — typically within 24-48 hours.' },
            { step: 'Manufacturing', description: 'Once approved, your trusses are manufactured at our Coolaroo facility using Multinail technology and 100% Australian timber.' },
            { step: 'Delivery', description: 'We deliver directly to your site on the confirmed date, with experienced operators who know how to handle trusses safely.' },
        ],
    },
    'wall-frames': {
        slug: 'wall-frames',
        title: 'Wall Frames',
        tagline: 'Precision-manufactured timber wall frames designed to your specifications, pre-cut and site-ready to keep your build on schedule.',
        heroImage: '/assets/product-wall-frames.jpg',
        metaTitle: 'Timber Wall Frames Melbourne | The Truss People',
        metaDescription: 'Precision-manufactured timber wall frames custom-designed to your plans. Australian standards compliant, practical installation-friendly design. Free quotes.',
        benefits: [
            {
                icon: 'ruler',
                title: 'Custom to Your Plans',
                description: 'Every wall frame is detailed to your specific architectural drawings. No generic templates — your build, your specs.',
            },
            {
                icon: 'shield',
                title: 'Australian Standards',
                description: 'All wall frames are engineered and manufactured to comply with AS/NZS structural standards for residential and light commercial construction.',
            },
            {
                icon: 'zap',
                title: 'Pre-Cut & Site-Ready',
                description: 'Frames arrive pre-cut and labelled with clear documentation so your framers can install efficiently from day one.',
            },
            {
                icon: 'clock',
                title: 'Fast Turnaround',
                description: 'We understand build schedules. Our wall frames are manufactured and delivered within the timeframe we commit to.',
            },
        ],
        content: [
            'The Truss People manufactures precision timber wall frames for residential and light commercial projects across Greater Melbourne and regional Victoria. Every frame is custom-detailed to your architectural plans and manufactured at our Coolaroo facility.',
            'Our wall frames are designed for practical, straightforward installation. We provide clear layouts and documentation that make the framing process efficient for your carpenters. Pre-cut, pre-labelled, and ready to stand — reducing time on site and minimising waste.',
            'Whether it\'s a single-storey home, a double-storey build, or a multi-unit townhouse development, we engineer wall frames that fit perfectly with our roof trusses. Ordering both together means seamless integration between your wall and roof framing systems.',
        ],
        features: [
            'Custom-designed to your plans',
            'Australian standards compliant',
            'Practical, installation-friendly design',
            'Pre-cut and clearly labelled',
            'Seamless integration with our roof trusses',
            'Residential & light commercial applications',
        ],
        process: [
            { step: 'Send Your Plans', description: 'Upload your architectural plans through our quote form or email them directly to our team.' },
            { step: 'Detailing & Quote', description: 'Our team details the wall frame layout from your plans and provides a comprehensive quote.' },
            { step: 'Manufacturing', description: 'Wall frames are precision-cut and assembled at our Coolaroo facility with clear labelling for easy site installation.' },
            { step: 'Delivery', description: 'Delivered to your site on schedule, ready for your framers to stand and brace.' },
        ],
    },
    'floor-joists': {
        slug: 'floor-joists',
        title: 'Floor Joists',
        tagline: 'Engineered floor joist systems including Spanjoists and Steelwood Joists for reliable residential floor framing.',
        heroImage: '/assets/product-floor-joists.jpg',
        metaTitle: 'Floor Joists Melbourne | The Truss People',
        metaDescription: 'Engineered floor joist systems including Spanjoists and Steelwood Joists. Load-optimized engineering for residential builds across Melbourne.',
        benefits: [
            {
                icon: 'shield',
                title: 'Load-Optimized Engineering',
                description: 'Every floor joist system is engineered to handle the specific load requirements of your project, ensuring structural integrity and performance.',
            },
            {
                icon: 'timber',
                title: 'Spanjoist & Steelwood Options',
                description: 'We offer multiple floor joist systems to match your project requirements, including Spanjoist and Steelwood Joist options.',
            },
            {
                icon: 'zap',
                title: 'Consistent Performance',
                description: 'Engineered floor joists provide consistent, predictable structural performance — no bowing, twisting, or shrinking over time.',
            },
            {
                icon: 'users',
                title: 'Expert Guidance',
                description: 'Our team helps you select the right floor joist system for your project and ensures it integrates with your overall framing package.',
            },
        ],
        content: [
            'The Truss People supplies engineered floor joist systems for residential builds across Melbourne and regional Victoria. Available on a project-dependent basis, our floor joists provide reliable, consistent floor framing solutions for homes that demand structural performance.',
            'We offer Spanjoist and Steelwood Joist systems — both engineered to deliver superior load-bearing performance compared to traditional solid timber joists. These systems resist bowing, twisting, and shrinking, giving you a level, stable floor platform.',
            'Floor joists are available as part of a complete framing package alongside our timber roof trusses and wall frames, or as a standalone supply. Our team will help you determine the right system for your span requirements and load specifications.',
        ],
        features: [
            'Spanjoist & Steelwood options',
            'Load-optimized engineering',
            'Consistent structural performance',
            'No bowing, twisting, or shrinking',
            'Available as part of full framing packages',
            'Residential applications',
        ],
        process: [
            { step: 'Discuss Your Project', description: 'Talk to our team about your floor framing requirements, spans, and load specifications.' },
            { step: 'Engineering & Quote', description: 'We engineer the right floor joist solution for your project and provide a detailed quote.' },
            { step: 'Supply', description: 'Floor joists are sourced and coordinated to arrive with your broader framing package.' },
            { step: 'Delivery', description: 'Delivered to site alongside your trusses and wall frames for a streamlined build.' },
        ],
    },
    'i-joists': {
        slug: 'i-joists',
        title: 'I-Joists & Multistructs',
        tagline: 'Advanced I-joist and Multistruct systems for long-span applications with exceptional strength-to-weight ratios.',
        heroImage: '/assets/product-ijoists.jpg',
        metaTitle: 'I-Joists & Multistructs Melbourne | The Truss People',
        metaDescription: 'Advanced I-joist and Multistruct systems for long-span floor applications. Superior strength-to-weight ratios, Australian-sourced materials. Free quotes.',
        benefits: [
            {
                icon: 'zap',
                title: 'Superior Span Capabilities',
                description: 'I-joists and Multistructs can span greater distances than traditional timber joists, reducing the need for intermediate supports.',
            },
            {
                icon: 'leaf',
                title: 'Lightweight & Stable',
                description: 'Dimensionally stable and significantly lighter than solid timber, making them easier to handle on site and less prone to movement.',
            },
            {
                icon: 'timber',
                title: 'Australian-Sourced Materials',
                description: 'All materials are sourced from Australian suppliers, maintaining our commitment to local manufacturing and quality.',
            },
            {
                icon: 'ruler',
                title: 'Engineered Precision',
                description: 'Factory-manufactured to exact specifications, I-joists deliver consistent dimensions and performance across every unit.',
            },
        ],
        content: [
            'The Truss People supplies advanced I-joist and Multistruct systems for residential and light commercial floor applications across Melbourne and regional Victoria. These engineered products are designed for demanding builds that require long spans, minimal deflection, and reliable performance.',
            'I-joists use an engineered web design that provides exceptional strength-to-weight ratios. They\'re lighter than solid timber, dimensionally stable, and can span greater distances — reducing the need for load-bearing walls and intermediate supports. This gives architects and builders more flexibility in open-plan floor layouts.',
            'Multistruct beams complement our I-joist range for applications requiring additional load capacity. Both products integrate seamlessly with our timber roof trusses, wall frames, and floor joist systems as part of a complete framing solution.',
        ],
        features: [
            'Superior span capabilities',
            'Lightweight & dimensionally stable',
            'Australian-sourced materials',
            'Minimal deflection under load',
            'Ideal for open-plan layouts',
            'Integrates with full framing packages',
        ],
        process: [
            { step: 'Send Your Plans', description: 'Share your floor plans and span requirements with our team.' },
            { step: 'Product Selection', description: 'We recommend the right I-joist or Multistruct product for your specific span and load requirements.' },
            { step: 'Engineering', description: 'The floor system is engineered to integrate with your overall framing design.' },
            { step: 'Supply & Delivery', description: 'Products are sourced and delivered to site coordinated with your broader framing package.' },
        ],
    },
};

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
        image: '/assets/project-4.jpg',
        title: 'Multi-Unit Development',
        description: 'Full timber framing solution for volume builder',
    },
    {
        image: '/assets/project-2.jpg',
        title: 'Light Commercial',
        description: 'Large-span engineered timber trusses',
    },
    {
        image: '/assets/project-3.jpg',
        title: 'Modern Home Design',
        description: 'Complete roof truss and wall frame package',
    },
    {
        image: '/assets/project-1.jpg',
        title: 'Residential Build',
        description: 'Custom roof trusses for premium Melbourne home',
    },
];

// Our Work page (expanded gallery)
export const OUR_WORK_ITEMS: GalleryItem[] = [
    {
        image: '/assets/our-work-01.jpg',
        title: 'Residential Roof Trusses',
        description: 'Custom timber roof trusses installed on a double-storey home.',
        large: true,
    },
    {
        image: '/assets/our-work-02.jpg',
        title: 'Wall Frame Assembly',
        description: 'Precision wall frames ready for site delivery.',
    },
    {
        image: '/assets/our-work-03.jpg',
        title: 'Large-Span Trusses',
        description: 'Engineered trusses for a wide-span residential build.',
    },
    {
        image: '/assets/our-work-04.jpg',
        title: 'Factory Production',
        description: 'Trusses being manufactured at our Coolaroo facility.',
    },
    {
        image: '/assets/our-work-05.jpg',
        title: 'Site Installation',
        description: 'Roof trusses being craned into position on site.',
        large: true,
    },
    {
        image: '/assets/our-work-06.jpg',
        title: 'Hip Roof Design',
        description: 'Complex hip roof truss system for a custom home.',
    },
    {
        image: '/assets/our-work-07.jpg',
        title: 'Multi-Unit Framing',
        description: 'Wall frames and trusses for a townhouse development.',
    },
    {
        image: '/assets/our-work-08.jpg',
        title: 'Commercial Project',
        description: 'Light commercial roof truss package.',
    },
    {
        image: '/assets/our-work-09.jpg',
        title: 'Truss Detail',
        description: 'Close-up of Multinail connector plate engineering.',
    },
    {
        image: '/assets/our-work-10.jpg',
        title: 'Regional Delivery',
        description: 'Full framing package delivered to a regional Victoria build.',
        large: true,
    },
    {
        image: '/assets/our-work-11.jpg',
        title: 'Gable Roof System',
        description: 'Standard gable trusses for a single-storey home.',
    },
    {
        image: '/assets/our-work-12.jpg',
        title: 'Double-Storey Frame',
        description: 'Complete wall frame and truss package for a two-storey build.',
    },
    {
        image: '/assets/our-work-13.jpg',
        title: 'Floor Joist System',
        description: 'Engineered floor joists installed for a residential project.',
    },
    {
        image: '/assets/our-work-14.jpg',
        title: 'Roof Structure',
        description: 'Completed roof truss structure before sheeting.',
    },
    {
        image: '/assets/our-work-15.jpg',
        title: 'Production Line',
        description: 'Trusses in production at the Coolaroo plant.',
    },
    {
        image: '/assets/our-work-16.jpg',
        title: 'Custom Engineering',
        description: 'Specially engineered trusses for a challenging roof design.',
    },
    {
        image: '/assets/our-work-17.jpg',
        title: 'Builder Partnership',
        description: 'On-site coordination with builder for precise installation.',
    },
    {
        image: '/assets/our-work-18.jpg',
        title: 'Volume Build',
        description: 'Framing package for a volume builder project.',
    },
    {
        image: '/assets/our-work-19.jpg',
        title: 'Finished Framework',
        description: 'Completed timber frame ready for cladding and roofing.',
    },
];

// Testimonials
export const TESTIMONIALS_SECTION = {
    label: 'What Builders Say',
    title: "Don't Take Our Word for It",
    description:
        "We don't win jobs by undercutting — we win them by showing up, solving problems, and standing behind our work.",
};

export const TESTIMONIALS: Testimonial[] = [
    {
        stars: 5,
        text: 'As a builder recommend to deal with these company. I had good experience with the manager (Victor) he is a man of his word he supplied prefab walls and trusses in short time and the material was perfect!! Rare to find like those people!!',
        author: 'TJ TOP CONTRACTORS',
        company: 'Builder',
        initials: 'TJ',
    },
    {
        stars: 5,
        text: 'Very happy with the truss people. We needed trusses for a reno and these guys really delivered. Tim, Rob and the team moved heaven and earth to get our trusses done in record time. Thanks guys.',
        author: 'Sam Power',
        company: 'Local Guide',
        initials: 'SP',
    },
    {
        stars: 5,
        text: "Dealing with The Truss People was an enjoyable experience, a rarity in the building industry. Nothing was too inconvenient or difficult. Their quote wasn't quite the cheapest, but their reviews were better than others. I thoroughly recommend their service.",
        author: 'Ross Martin',
        company: 'Local Guide',
        initials: 'RM',
    },
    {
        stars: 5,
        text: 'Victor and Nada listened to my concerns on the time frame of my job. With great communication they delivered on time and exceeded my expectations. I will be recommending the truss people team to anyone that needs their products.',
        author: 'Jeremy Lee',
        company: 'Verified Reviewer',
        initials: 'JL',
    },
    {
        stars: 5,
        text: 'Very professional company with attention to detail and quality both being their strong suits. Highly recommended. 5 stars.',
        author: 'Cam Murison',
        company: 'Local Guide',
        initials: 'CM',
    },
    {
        stars: 5,
        text: 'Rob, Vic and Nada were all great to deal with. Needed a job done quickly, they were very receptive to my needs, great communicators, and provided a great product. Could not recommend more.',
        author: 'Peter Kavourakis',
        company: 'Verified Reviewer',
        initials: 'PK',
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
            { label: 'Get a Quote', href: '/quote' },
        ],
    },
];

export const CERTIFICATIONS = [
    { name: 'Multinail', logo: '/assets/multinail-logo.png' },
    { name: 'FTMA Australia', logo: '/assets/ftma-logo.png' },
    { name: 'Master Builders Victoria', logo: '/assets/mbav-logo.png' },
];

// ─── Quote Page ────────────────────────────────────────────────────────────────

export const QUOTE_PAGE = {
    label: 'Request a Quote',
    title: 'Get a Free Quote for Your Project',
    description:
        'Upload your plans and project details. Our team will review everything and get back to you with a comprehensive quote within 24 hours.',
};

export const QUOTE_STEP_LABELS = ['Your Details', 'Project Info', 'Upload Plans', 'Review'];

export const QUOTE_PROJECT_TYPES: { value: string; label: string }[] = [
    { value: 'Timber Roof Trusses', label: 'Timber Roof Trusses' },
    { value: 'Wall Frames', label: 'Wall Frames' },
    { value: 'Floor Joists', label: 'Floor Joists' },
    { value: 'Full Framing Package', label: 'Full Framing Package' },
    { value: 'I-Joists & Multistructs', label: 'I-Joists & Multistructs' },
    { value: 'Other', label: 'Other' },
];

export const QUOTE_PROJECT_STAGES: { value: string; label: string }[] = [
    { value: 'Planning / Design Phase', label: 'Planning / Design Phase' },
    { value: 'Permits Approved', label: 'Permits Approved' },
    { value: 'Ready to Build', label: 'Ready to Build' },
    { value: 'Under Construction', label: 'Under Construction' },
    { value: 'Other', label: 'Other' },
];

export const QUOTE_TIMELINES: { value: string; label: string }[] = [
    { value: 'ASAP', label: 'ASAP' },
    { value: '1-2 Months', label: '1-2 Months' },
    { value: '3-6 Months', label: '3-6 Months' },
    { value: '6+ Months', label: '6+ Months' },
    { value: 'Not Sure Yet', label: 'Not Sure Yet' },
];

export const QUOTE_STOREYS: { value: string; label: string }[] = [
    { value: 'Single Storey', label: 'Single Storey' },
    { value: 'Double Storey', label: 'Double Storey' },
    { value: 'Multi-Storey', label: 'Multi-Storey' },
    { value: 'Commercial', label: 'Commercial' },
];

export const QUOTE_ACCEPTED_TYPES = '.pdf,.dwg,.dxf,.jpg,.jpeg,.png,.zip,.rar';
export const QUOTE_MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const QUOTE_MAX_FILES = 10;
