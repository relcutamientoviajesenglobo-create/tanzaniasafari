/**
 * Video Registry — Multilingual metadata for all site videos
 * Usage: import { videos, getVideosByCategory } from '../i18n/videos';
 */
import type { Lang } from './config';

export type VideoCategory =
  | 'serengeti'
  | 'ngorongoro'
  | 'masai'
  | 'lodge'
  | 'balloon'
  | 'wildlife'
  | 'migration';

export interface VideoMeta {
  id: string;
  src: Record<Lang, string>;
  alt: Record<Lang, string>;
  title: Record<Lang, string>;
  duration: number;       // seconds
  width: number;
  height: number;
  category: VideoCategory;
  /** Pages where this video should appear (slug paths) */
  pages: string[];
}

export const videos: VideoMeta[] = [
  {
    id: 'elefantes-caminando',
    src: {
      es: '/media/safari-elefantes-caminando-sabana.mp4',
      en: '/media/safari-tanzania-elephants-walking-savanna.mp4',
      de: '/media/safari-tanzania-elephants-walking-savanna.mp4',
      fr: '/media/safari-tanzania-elephants-walking-savanna.mp4',
    },
    alt: {
      es: 'Manada de elefantes caminando por la sabana africana en Tanzania',
      en: 'Elephant herd walking through the African savanna in Tanzania',
      de: 'Elefantenherde wandert durch die afrikanische Savanne in Tansania',
      fr: 'Troupeau d\'éléphants traversant la savane africaine en Tanzanie',
    },
    title: {
      es: 'Elefantes en la sabana',
      en: 'Elephants in the savanna',
      de: 'Elefanten in der Savanne',
      fr: 'Éléphants dans la savane',
    },
    duration: 16,
    width: 1280,
    height: 720,
    category: 'wildlife',
    pages: ['/', '/safaris/', '/safaris/safari-clasico/', '/actividades/avistamiento-fauna/'],
  },
  {
    id: 'leon-retrato',
    src: {
      es: '/media/safari-leon-retrato-sol.mp4',
      en: '/media/safari-tanzania-lion-portrait-sun.mp4',
      de: '/media/safari-tanzania-lion-portrait-sun.mp4',
      fr: '/media/safari-tanzania-lion-portrait-sun.mp4',
    },
    alt: {
      es: 'Retrato de un león macho bajo el sol dorado de la sabana',
      en: 'Portrait of a male lion under the golden savanna sun',
      de: 'Porträt eines männlichen Löwen unter der goldenen Savannensonne',
      fr: 'Portrait d\'un lion mâle sous le soleil doré de la savane',
    },
    title: {
      es: 'León bajo el sol',
      en: 'Lion in the sun',
      de: 'Löwe in der Sonne',
      fr: 'Lion au soleil',
    },
    duration: 15,
    width: 1280,
    height: 720,
    category: 'wildlife',
    pages: ['/', '/safaris/safari-fotografico/', '/actividades/fotografia-safari/'],
  },
  {
    id: 'manada-leones',
    src: {
      es: '/media/safari-manada-leones-caminando.mp4',
      en: '/media/safari-tanzania-lion-pride-walking.mp4',
      de: '/media/safari-tanzania-lion-pride-walking.mp4',
      fr: '/media/safari-tanzania-lion-pride-walking.mp4',
    },
    alt: {
      es: 'Manada de leones caminando juntos por las llanuras del Serengeti',
      en: 'Lion pride walking together across the Serengeti plains',
      de: 'Löwenrudel wandert gemeinsam über die Ebenen der Serengeti',
      fr: 'Troupe de lions marchant ensemble dans les plaines du Serengeti',
    },
    title: {
      es: 'Manada de leones',
      en: 'Lion pride',
      de: 'Löwenrudel',
      fr: 'Troupe de lions',
    },
    duration: 11,
    width: 1280,
    height: 720,
    category: 'serengeti',
    pages: ['/safaris/', '/safaris/safari-clasico/', '/actividades/avistamiento-fauna/', '/parques-nacionales/'],
  },
  {
    id: 'leon-macho',
    src: {
      es: '/media/safari-leon-macho-sabana.mp4',
      en: '/media/safari-tanzania-male-lion-savanna.mp4',
      de: '/media/safari-tanzania-male-lion-savanna.mp4',
      fr: '/media/safari-tanzania-male-lion-savanna.mp4',
    },
    alt: {
      es: 'León macho descansando en la sabana dorada del Serengeti',
      en: 'Male lion resting in the golden Serengeti savanna',
      de: 'Männlicher Löwe ruht in der goldenen Savanne der Serengeti',
      fr: 'Lion mâle se reposant dans la savane dorée du Serengeti',
    },
    title: {
      es: 'León macho en el Serengeti',
      en: 'Male lion in the Serengeti',
      de: 'Männlicher Löwe in der Serengeti',
      fr: 'Lion mâle dans le Serengeti',
    },
    duration: 16,
    width: 1280,
    height: 720,
    category: 'serengeti',
    pages: ['/safaris/safari-nocturno/', '/parques-nacionales/'],
  },
  {
    id: 'jirafa-comiendo',
    src: {
      es: '/media/safari-jirafa-comiendo-hojas.mp4',
      en: '/media/safari-tanzania-giraffe-eating-leaves.mp4',
      de: '/media/safari-tanzania-giraffe-eating-leaves.mp4',
      fr: '/media/safari-tanzania-giraffe-eating-leaves.mp4',
    },
    alt: {
      es: 'Jirafa comiendo hojas de una acacia en la sabana tanzana',
      en: 'Giraffe eating leaves from an acacia tree in the Tanzanian savanna',
      de: 'Giraffe frisst Blätter von einer Akazie in der tansanischen Savanne',
      fr: 'Girafe mangeant des feuilles d\'un acacia dans la savane tanzanienne',
    },
    title: {
      es: 'Jirafa alimentándose',
      en: 'Giraffe feeding',
      de: 'Giraffe beim Fressen',
      fr: 'Girafe se nourrissant',
    },
    duration: 15,
    width: 1280,
    height: 720,
    category: 'wildlife',
    pages: ['/', '/actividades/avistamiento-fauna/', '/actividades/caminatas-bush/'],
  },
  {
    id: 'jirafa-bebiendo',
    src: {
      es: '/media/safari-jirafa-bebiendo-agua.mp4',
      en: '/media/safari-tanzania-giraffe-drinking-water.mp4',
      de: '/media/safari-tanzania-giraffe-drinking-water.mp4',
      fr: '/media/safari-tanzania-giraffe-drinking-water.mp4',
    },
    alt: {
      es: 'Jirafa bebiendo agua en un abrevadero de la sabana africana',
      en: 'Giraffe drinking water at a watering hole in the African savanna',
      de: 'Giraffe trinkt Wasser an einer Wasserstelle in der afrikanischen Savanne',
      fr: 'Girafe buvant de l\'eau à un point d\'eau dans la savane africaine',
    },
    title: {
      es: 'Jirafa en el abrevadero',
      en: 'Giraffe at the watering hole',
      de: 'Giraffe an der Wasserstelle',
      fr: 'Girafe au point d\'eau',
    },
    duration: 17,
    width: 1280,
    height: 720,
    category: 'wildlife',
    pages: ['/safaris/safari-fotografico/', '/actividades/avistamiento-fauna/'],
  },
  {
    id: 'cebras-prado',
    src: {
      es: '/media/safari-cebras-prado-verde.mp4',
      en: '/media/safari-tanzania-zebras-green-meadow.mp4',
      de: '/media/safari-tanzania-zebras-green-meadow.mp4',
      fr: '/media/safari-tanzania-zebras-green-meadow.mp4',
    },
    alt: {
      es: 'Cebras pastando en un prado verde durante la temporada de lluvias',
      en: 'Zebras grazing in a green meadow during the rainy season',
      de: 'Zebras grasen auf einer grünen Wiese während der Regenzeit',
      fr: 'Zèbres broutant dans une prairie verte pendant la saison des pluies',
    },
    title: {
      es: 'Cebras en temporada verde',
      en: 'Zebras in the green season',
      de: 'Zebras in der grünen Saison',
      fr: 'Zèbres en saison verte',
    },
    duration: 57,
    width: 1280,
    height: 720,
    category: 'migration',
    pages: ['/safaris/safari-clasico/', '/parques-nacionales/'],
  },
  {
    id: 'jirafa-cebras-estampida',
    src: {
      es: '/media/safari-jirafa-cebras-estampida.mp4',
      en: '/media/safari-tanzania-giraffe-zebras-stampede.mp4',
      de: '/media/safari-tanzania-giraffe-zebras-stampede.mp4',
      fr: '/media/safari-tanzania-giraffe-zebras-stampede.mp4',
    },
    alt: {
      es: 'Jirafa y cebras en estampida por las llanuras del Serengeti',
      en: 'Giraffe and zebras stampeding across the Serengeti plains',
      de: 'Giraffe und Zebras in Stampede über die Ebenen der Serengeti',
      fr: 'Girafe et zèbres en stampede à travers les plaines du Serengeti',
    },
    title: {
      es: 'Estampida en el Serengeti',
      en: 'Stampede in the Serengeti',
      de: 'Stampede in der Serengeti',
      fr: 'Stampede dans le Serengeti',
    },
    duration: 19,
    width: 1280,
    height: 720,
    category: 'migration',
    pages: ['/', '/safaris/', '/parques-nacionales/'],
  },
  {
    id: 'guepardos-bebedero',
    src: {
      es: '/media/safari-guepardos-bebedero.mp4',
      en: '/media/safari-tanzania-cheetahs-watering-hole.mp4',
      de: '/media/safari-tanzania-cheetahs-watering-hole.mp4',
      fr: '/media/safari-tanzania-cheetahs-watering-hole.mp4',
    },
    alt: {
      es: 'Guepardos reunidos en un bebedero de la sabana tanzana',
      en: 'Cheetahs gathered at a watering hole in the Tanzanian savanna',
      de: 'Geparden versammelt an einer Wasserstelle in der tansanischen Savanne',
      fr: 'Guépards rassemblés à un point d\'eau dans la savane tanzanienne',
    },
    title: {
      es: 'Guepardos en el bebedero',
      en: 'Cheetahs at the watering hole',
      de: 'Geparden an der Wasserstelle',
      fr: 'Guépards au point d\'eau',
    },
    duration: 38,
    width: 1280,
    height: 720,
    category: 'wildlife',
    pages: ['/safaris/safari-nocturno/', '/actividades/avistamiento-fauna/', '/actividades/fotografia-safari/'],
  },
  {
    id: 'rinoceronte-pastando',
    src: {
      es: '/media/safari-rinoceronte-pastando.mp4',
      en: '/media/safari-tanzania-rhino-grazing.mp4',
      de: '/media/safari-tanzania-rhino-grazing.mp4',
      fr: '/media/safari-tanzania-rhino-grazing.mp4',
    },
    alt: {
      es: 'Rinoceronte negro pastando en el cráter del Ngorongoro',
      en: 'Black rhino grazing in the Ngorongoro Crater',
      de: 'Spitzmaulnashorn grast im Ngorongoro-Krater',
      fr: 'Rhinocéros noir broutant dans le cratère du Ngorongoro',
    },
    title: {
      es: 'Rinoceronte en Ngorongoro',
      en: 'Rhino in Ngorongoro',
      de: 'Nashorn im Ngorongoro',
      fr: 'Rhinocéros au Ngorongoro',
    },
    duration: 21,
    width: 1280,
    height: 720,
    category: 'ngorongoro',
    pages: ['/parques-nacionales/', '/safaris/safari-clasico/', '/actividades/avistamiento-fauna/'],
  },
];

// ─── Helper functions ──────────────────────────────────

/** Get a single video by its ID */
export function getVideo(id: string): VideoMeta | undefined {
  return videos.find(v => v.id === id);
}

/** Get all videos for a given category */
export function getVideosByCategory(category: VideoCategory): VideoMeta[] {
  return videos.filter(v => v.category === category);
}

/** Get all videos assigned to a specific page path */
export function getVideosForPage(pagePath: string): VideoMeta[] {
  return videos.filter(v => v.pages.includes(pagePath));
}

/** Get the localized src for a video */
export function getVideoSrc(id: string, lang: Lang): string {
  const v = getVideo(id);
  return v ? v.src[lang] : '';
}

/** Get the localized alt text for a video */
export function getVideoAlt(id: string, lang: Lang): string {
  const v = getVideo(id);
  return v ? v.alt[lang] : '';
}
