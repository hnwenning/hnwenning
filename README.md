# Wenning Technology Website

Enterprise-grade website for Wenning Technology (Henan) Co., Ltd - featuring luxury Mercedes-Benz-inspired design, advanced animations, and complete commercial compliance.

## 📋 Overview

This is a complete, production-ready website package featuring:

- **Professional Design**: Mercedes-Benz luxury aesthetic with premium typography and minimal styling
- **Rich Animations**: Parallax effects, scroll triggers, staggered reveals, and smooth transitions
- **Complete Information**: All company details, services, news, culture, and compliance documentation
- **SEO Optimized**: Schema.org markup, semantic HTML, meta tags, sitemap, robots.txt
- **Responsive Design**: Mobile-first approach with three breakpoints (desktop, tablet, mobile)
- **Security**: Content Security Policy, security headers, XSS/CSRF protection
- **Performance**: GZIP compression, browser caching, optimized assets
- **Compliance**: COPPA, GDPR, CCPA, VCDPA, LGPD, and all major privacy regulations

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone or download the repository
cd hnwenning

# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

The website will be available at `http://localhost:3000`

## 📁 Project Structure

```
hnwenning/
├── index.html              # Home page
├── services.html           # Services detail page
├── culture.html            # Company culture page
├── news.html               # News and announcements page
├── contact.html            # Contact and inquiry page
├── privacy.html            # Privacy policy (18 sections)
├── terms.html              # Terms of service (23 sections)
├── css/
│   └── styles.css          # Complete styling (2000+ lines)
├── js/
│   ├── main.js             # Core functionality (400+ lines)
│   └── animations.js       # Advanced animations (600+ lines)
├── images/                 # SVG icons and graphics
├── public/                 # Static assets (copy HTML/CSS/JS here for production)
├── server.js               # Express.js production server
├── package.json            # Node.js dependencies and scripts
├── robots.txt              # SEO crawler directives
├── sitemap.xml             # XML sitemap for search engines
├── .htaccess               # Apache server configuration
├── web.config              # IIS server configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🌐 Pages and Features

### Main Pages

| Page | URL | Features |
|------|-----|----------|
| Home | `/` or `/index.html` | Hero section, services preview, statistics, mobile apps, CTAs |
| Services | `/services` | 6 detailed services with technologies and features |
| Culture | `/culture` | Mission, vision, values, team culture, social responsibility |
| News | `/news` | 8 company announcements, newsletter subscription |
| Contact | `/contact` | Contact form, location map, FAQ section |

### Compliance Pages

| Page | URL | Features |
|------|-----|----------|
| Privacy Policy | `/privacy` | 16 sections covering COPPA, GDPR, CCPA, VCDPA, LGPD, etc. |
| Terms of Service | `/terms` | 23 sections covering legal requirements and app store compliance |

### Configuration Files

- **robots.txt**: Directs search engine crawlers
- **sitemap.xml**: XML sitemap with all pages and priorities
- **.htaccess**: Apache server optimization and security
- **web.config**: IIS server configuration
- **package.json**: Node.js project metadata

## 🎨 Design Features

### Typography
- Premium font weights (300, 400)
- Generous letter-spacing
- Perfect line-height ratios (1.7-1.9)
- Luxury serif/sans-serif combination

### Color Palette
- Primary: #000 (Black)
- Secondary: #1a1a1a (Dark Gray)
- Accent: #333 (Medium Gray)
- Light: #fafafa (Almost White)

### Animations
- Parallax scrolling
- Staggered reveals
- Scroll-triggered animations
- Smooth hover effects
- Floating and pulsing effects
- CSS keyframe animations with cubic-bezier easing

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small Mobile: < 480px

## 🔒 Security Features

### Headers
- Content-Security-Policy (CSP)
- X-Frame-Options (Clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- X-XSS-Protection (XSS protection)
- Referrer-Policy
- Strict-Transport-Security (HSTS)

### Form Validation
- Email regex validation
- Required field checks
- Phone number validation
- Client-side and server-side validation

### API Security
- CORS configuration
- Body size limits
- Input sanitization
- Rate limiting ready

## 📊 SEO Features

### Meta Tags
- Canonical URLs
- Open Graph tags (og:title, og:description, og:type, og:url, og:image)
- Twitter Card support
- Mobile viewport configuration

### Structured Data
- Schema.org JSON-LD markup
- Organization schema with contact details
- BreadcrumbList navigation schema
- Product/Service schema on detail pages

### XML Sitemap
- All 7 main pages included
- Proper priorities set
- Last modified dates
- Change frequency indicators

### robots.txt
- Allows all content by default
- Disallows admin/private paths
- Includes sitemap reference
- Crawl-delay and request-rate settings

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly buttons and links
- Hamburger menu navigation
- Mobile-first CSS approach
- Viewport meta tag
- Image optimization for mobile
- Disabled 3D animations on mobile for performance

## ⚙️ Server Configuration

### Express.js (server.js)

- Static file serving with caching
- GZIP compression
- Security headers
- CORS configuration
- API endpoints for contact and newsletter
- Health check endpoint
- Error handling and logging

### Apache (.htaccess)

- GZIP compression
- Browser caching with proper cache control
- URL rewriting (remove .html extensions)
- Security headers
- Directory listing disabled
- Hidden file protection

### IIS (web.config)

- GZIP compression configuration
- Static content caching
- Security headers
- URL rewriting rules
- Directory browsing disabled
- MIME type configuration

## 📝 Content Included

### Services (6 Total)
1. Software Development (full-stack, cloud-native, APIs, microservices)
2. Mobile App Management (iOS, Android, app stores)
3. E-Commerce Solutions (payments, inventory, CRM)
4. Digital Marketing & Advertising (12 ad networks detailed)
5. Enterprise Consulting (digital transformation, strategy)
6. Local Services (community hub, news distribution)

### Advertising Networks (12 Total)
1. Google AdMob
2. Facebook Audience Network
3. AppLovin MAX
4. IronSource
5. Unity Ads
6. Vungle
7. Mintegral
8. Chartboost
9. InMobi
10. StartApp
11. Amazon Mobile Ads
12. MoPub

### Ad Formats (4 Types)
- Splash/Interstitial Ads
- Rewarded Video Ads
- Banner Ads
- Native Ads

### Compliance Coverage
- **COPPA**: Children's Online Privacy Protection Act (USA)
- **GDPR**: General Data Protection Regulation (EU)
- **CCPA**: California Consumer Privacy Act (USA)
- **VCDPA**: Virginia Consumer Data Protection Act (USA)
- **LGPD**: Lei Geral de Proteção de Dados (Brazil)
- **UK GDPR**: United Kingdom GDPR (UK)
- **PIPEDA**: Personal Information Protection Act (Canada)
- **APPI**: Act on Protection of Personal Information (Japan)
- **PIPA**: Personal Information Protection Act (South Korea)
- **PDPA**: Personal Data Protection Act (Thailand)

## 🚀 Deployment

### Local Development

```bash
npm install
npm run dev
```

### Production Deployment

```bash
# Build
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=production
FORCE_HTTPS=true
ALLOWED_ORIGINS=https://hnwenning.com,https://www.hnwenning.com
```

### Hosting Options

#### Static Hosting (Netlify, Vercel, GitHub Pages)
- Copy HTML, CSS, JS files to static hosting
- No server-side processing needed
- Simplest setup

#### Node.js Server (Heroku, Railway, DigitalOcean)
- Use server.js for express server
- Requires Node.js runtime
- Full API functionality
- Better for form submissions

#### Traditional Web Server (Apache, IIS)
- Use .htaccess (Apache) or web.config (IIS)
- Copy all files to web root
- No Node.js required

## 🔧 Maintenance

### Regular Updates

1. **Content Updates**: Edit HTML files directly
2. **Style Changes**: Modify css/styles.css
3. **Functionality**: Update js/main.js or js/animations.js
4. **Policy Updates**: Update privacy.html and terms.html

### Performance Monitoring

- Check browser cache hit rates
- Monitor CSS/JS file sizes
- Test page load times
- Validate responsive design

### Security Updates

- Keep Node.js and dependencies updated
- Review security headers regularly
- Test for OWASP vulnerabilities
- Monitor CSP violations

## 📞 Contact Information

- **Email**: support@hnwenning.com
- **Business**: wangyawen@hnwenning.com
- **Website**: https://hnwenning.com
- **Address**: No. 905E, 9th Floor, Building No. 71 Zhengkai Avenue, Hengtong International Plaza, Zhengdong New District, Zhengzhou City, Henan Province, Xinyang, Henan, 464000, China

## 📄 License

This website is proprietary software owned by Wenning Technology (Henan) Co., Ltd.

## 🙏 Acknowledgments

- Mercedes-Benz design inspiration
- Modern web best practices
- SEO optimization standards
- Web accessibility guidelines

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Status**: Production Ready
