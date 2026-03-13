import blueJayImg from '../assets/blue_jay.png';
import orioleImg from '../assets/oriole.png';
import hummingbirdImg from '../assets/hummingbird.png';
import robinImg from '../assets/robin.png';

export interface Bird {
  id: number;
  name: string;
  description: string;
  image: string;
  accentColor: string;
}

export const birds: Bird[] = [
  {
    id: 1,
    name: 'BLUE JAY',
    description:
      'Known for its loud calls and striking blue plumage, the Blue Jay is highly intelligent and adaptable, often found in forests and suburban areas.',
    image: blueJayImg,
    accentColor: '#3B82F6',
  },
  {
    id: 2,
    name: 'BALTIMORE ORIOLE',
    description:
      'A vibrant songbird with brilliant orange and black plumage. Famous for its flute-like whistles and intricate hanging nests woven from plant fibers.',
    image: orioleImg,
    accentColor: '#F97316',
  },
  {
    id: 3,
    name: 'HUMMINGBIRD',
    description:
      'The jewel of the sky — hummingbirds can hover in place, fly backwards, and beat their wings up to 80 times per second. They feed on nectar.',
    image: hummingbirdImg,
    accentColor: '#10B981',
  },
  {
    id: 4,
    name: 'AMERICAN ROBIN',
    description:
      'One of the most familiar birds in North America, the robin is a symbol of spring. It sports a cheerful red-orange breast and melodic song.',
    image: robinImg,
    accentColor: '#EF4444',
  },
];
