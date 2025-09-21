# 🌴 Sri Lanka Travel Website - MaiGlobe Travels

A beautiful, responsive React website for a Sri Lanka travel agency, inspired by modern travel booking platforms. This project showcases a complete travel website with stunning visuals, interactive components, and a professional design.

## 🚀 Features

### 🏠 Homepage Sections
- **Hero Section**: Stunning banner with Sri Lanka imagery and call-to-action
- **Travel Themes**: Explore different types of experiences (Culture, Beaches, Landscapes, Trekking, Must-see)
- **Advantages**: Why choose this travel agency
- **Travel Packages**: Featured tour packages with pricing
- **Experiences**: Unforgettable Sri Lankan experiences
- **Team**: Meet the travel experts
- **Testimonials**: Customer reviews and ratings
- **Blog**: Travel insights and guides
- **Footer**: Contact information and newsletter subscription

### 🎨 Design Features
- Fully responsive design for all devices
- Modern CSS with styled-components
- Smooth scrolling navigation
- Interactive hover effects
- Beautiful image galleries
- Professional color scheme (Green, Orange, White)

### 🛠️ Technical Features
- Built with React 18
- Styled Components for CSS-in-JS
- React Router for navigation
- Responsive grid layouts
- Optimized images from Unsplash
- Clean, semantic HTML structure

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voyage-sri-lanka
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Visit `http://localhost:3000` to view the website

### Build for Production
```bash
npm run build
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktop (1200px+)

## 🌍 Website Sections

### Header & Navigation
- Fixed navigation with company logo
- Contact information bar
- Mobile-responsive hamburger menu
- Smooth scroll to sections

### Hero Section
- Full-screen banner with Sri Lanka imagery
- Compelling headline and call-to-action
- Featured highlights (Heritage, Beaches, Tea, Wildlife)

### Travel Themes
- 5 main travel categories with beautiful imagery
- Interactive cards with hover effects
- Detailed descriptions for each theme

### Why Choose Us
- 6 key advantages with icons and descriptions
- Statistics section with impressive numbers
- Professional presentation of company benefits

### Travel Packages
- 6 featured tour packages with pricing
- Beautiful image cards with badges
- Duration, group size, and pricing information
- Call-to-action buttons for each package

### Experiences
- 6 unique Sri Lankan experiences
- Stunning imagery with overlay content
- Feature tags for each experience

### Meet Our Team
- 4 team member profiles
- Professional photos and descriptions
- Language skills for each team member
- Mix of local and international expertise

### Customer Testimonials
- 6 genuine customer reviews
- 5-star ratings and trip details
- Professional customer photos
- Location and trip type information

### Travel Blog
- 6 featured blog articles
- Categories and reading time
- Engaging excerpts and imagery
- "View All Articles" call-to-action

### Footer
- Complete contact information
- Newsletter subscription
- Social media links
- Quick navigation links
- Legal links and copyright

## 🎨 Color Scheme

- **Primary Green**: `#2c5530` - Professional, nature-inspired
- **Accent Orange**: `#ff6b35` - Energetic, adventurous
- **Light Background**: `#f8f9fa` - Clean, modern
- **Text**: `#333333` - Readable, professional
- **Light Text**: `#666666` - Secondary information

## 📚 Components Structure

```
src/
├── components/
│   ├── Header.js          # Navigation and contact bar
│   ├── Hero.js            # Main banner section
│   ├── Themes.js          # Travel themes showcase
│   ├── Advantages.js      # Company advantages
│   ├── TravelPackages.js  # Tour packages with pricing
│   ├── Experiences.js     # Unique experiences
│   ├── Team.js            # Team member profiles
│   ├── Testimonials.js    # Customer reviews
│   ├── Blog.js            # Travel articles
│   └── Footer.js          # Contact and links
├── App.js                 # Main app component
├── App.css               # Global styles
└── index.js              # React entry point
```

## 🔧 Customization

### Adding New Travel Packages
Edit the `packages` array in `TravelPackages.js`:
```javascript
{
  title: "Your Package Name",
  description: "Package description",
  duration: "X days",
  groupSize: "X-X people",
  price: "€X,XXX",
  badge: "Special Offer",
  image: "image-url"
}
```

### Updating Team Members
Edit the `teamMembers` array in `Team.js`:
```javascript
{
  name: "Team Member Name",
  role: "Their Role",
  description: "Brief description",
  languages: ["Language1", "Language2"],
  photo: "photo-url"
}
```

### Modifying Contact Information
Update contact details in:
- `Header.js` - Top contact bar
- `Footer.js` - Contact section

## 🌟 Features Highlights

- **Modern Design**: Clean, professional layout inspired by top travel websites
- **High Performance**: Optimized images and efficient React components
- **SEO Friendly**: Semantic HTML structure and proper heading hierarchy
- **Accessibility**: ARIA labels and keyboard navigation support
- **Mobile First**: Responsive design starting from mobile devices

## 📈 Future Enhancements

- Add booking functionality
- Integrate payment processing
- Add multi-language support
- Implement user authentication
- Add real-time chat support
- Integrate with travel APIs
- Add customer dashboard
- Implement blog CMS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com) - Beautiful Sri Lanka photography
- Inspiration from modern travel booking platforms
- React community for excellent documentation and tools

---

**Built with ❤️ for Sri Lanka travel enthusiasts**
