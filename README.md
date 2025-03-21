# Image Tournament

A Next.js web application for running visual comparison tournaments between images. Users select their preferred option from pairs of images in successive rounds until a final winner is determined.

![Demo Screenshot](./public/screenshot.png)

## Features

- 🏆 **Tournament Bracket System**: Automatically generates elimination rounds
- 🖼️ **Side-by-Side Comparisons**: Full-screen image pairs for clear visual assessment
- 📊 **Results Tracking**: Maintains tournament history and displays final rankings
- 🎚️ **Third-Place Playoff**: Automatic runoff between semifinalists for complete rankings
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔗 **Shareable Results**: Unique IDs for easy reference to specific images
- ⚡ **Static Export**: Deploy anywhere (GitHub Pages, Netlify, Vercel, etc.)

## Technologies

- ⚛️ Next.js 15 (App Router)
- 🎨 Tailwind CSS
- 🏷️ TypeScript
- 📦 Next.js Image Optimization

## Installation

1. Clone repository:
```bash
git clone https://github.com/your-username/image-tournament.git
```

2. Install dependencies:
```bash
npm install
```

3. Add your images to `/public/images` directory
4. Configure images in `src/utils/paintOptions.ts`
5. Start development server:
```bash
npm run dev
```

## Configuration

Modify `src/utils/paintOptions.ts`:
```typescript
import { StaticImageData } from 'next/image';

// Add your images
import image1 from '../public/images/1.jpg';
import image2 from '../public/images/2.jpg';

export interface PaintOption {
  src: StaticImageData;
  id: string;
}

export const PAINT_OPTIONS: PaintOption[] = [
  { src: image1, id: 'UNIQUE_ID_1' },
  { src: image2, id: 'UNIQUE_ID_2' },
];
```

## Usage

1. Start tournament from home page
2. Click preferred image in each comparison pair
3. Progress through elimination rounds
4. View final results with top 3 rankings
5. Share results using image IDs

## Deployment

1. Set up static export in `next.config.js`:
```javascript
module.exports = {
  output: 'export',
};
```

2. Build project:
```bash
npm run build
```

3. Deploy `out` directory to your hosting service

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fimage-tournament)

## License

MIT License - free for personal and commercial use

---

**Custom Note:** While this application can be used for any visual comparison needs, popular use cases include:
- Design preference testing
- Product variant selection
- Photography contests
- Artwork ranking
- A/B testing visual assets
