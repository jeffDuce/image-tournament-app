import { StaticImageData } from 'next/image';
import image1 from '../../public/1.png'
import image2 from '../../public/2.png'
import image3 from '../../public/3.png'
import image4 from '../../public/4.png'
import image5 from '../../public/5.png'
import image6 from '../../public/6.png'
import image7 from '../../public/7.png'
import image8 from '../../public/8.png'
import image9 from '../../public/9.png'
import image10 from '../../public/10.png'
import image11 from '../../public/11.png'
import image12 from '../../public/12.png'
import image13 from '../../public/13.png'
import image14 from '../../public/14.png'
import image15 from '../../public/15.png'
import image16 from '../../public/16.png'

// Add metadata to each image
export interface PaintOption extends StaticImageData {
  id: string;
}

export const PAINT_OPTIONS: PaintOption[] = [
  { ...image1, id: '1' },
  { ...image2, id: '2' },
  { ...image3, id: '3' },
  { ...image4, id: '4' },
  { ...image5, id: '5' },
  { ...image6, id: '6' },
  { ...image7, id: '7' },
  { ...image8, id: '8' },
  { ...image9, id: '9' },
  { ...image10, id: '10' },
  { ...image11, id: '11' },
  { ...image12, id: '12' },
  { ...image13, id: '13' },
  { ...image14, id: '14' },
  { ...image15, id: '15' },
  { ...image16, id: '16' },
];