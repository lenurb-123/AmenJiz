
import React from 'react';
import { Cake, ShoppingCart, Heart, Sparkles, User, Baby, Activity, ShieldCheck, Leaf } from 'lucide-react';
import { Cake as CakeType, OrderStep, Testimonial } from './types';

export const CAKES: CakeType[] = [
  {
    id: 'fraise-royale',
    name: 'Fraise Royale',
    description: 'Une génoise aérienne aux fraises gariguettes et crème diplomate à la vanille bourbon.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
    category: 'Fruité',
    targetAudience: ['Adultes', 'Séniors'],
    ingredients: ['Fraises Gariguettes', 'Vanille Bourbon', 'Farine Bio'],
    nutrition: {
      energy: 'Léger & Vitaminé',
      benefit: 'Riche en Vitamine C',
      impact: 'Équilibré'
    },
    dietaryTags: ['Faible en calories', 'Artisanal']
  },
  {
    id: 'choco-celebration',
    name: 'Choco Celebration',
    description: 'Triple texture de chocolate noir 70% et croustillant praliné noisette.',
    price: 49,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    category: 'Chocolat',
    targetAudience: ['Adultes', 'Sportifs'],
    ingredients: ['Cacao 70%', 'Noisettes du Piémont', 'Beurre AOP'],
    nutrition: {
      energy: 'Apport Énergétique Intense',
      benefit: 'Magnésium & Antioxydants',
      impact: 'Gourmand'
    },
    dietaryTags: ['Énergie durable', 'Sans gluten']
  },
  {
    id: 'douceur-equilibre',
    name: 'Douceur Équilibre',
    description: 'Une création à faible indice glycémique, onctueuse et naturellement sucrée.',
    price: 52,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800',
    category: 'Bien-être',
    targetAudience: ['Séniors', 'Régimes'],
    ingredients: ['Sucre de coco', 'Farine d\'épeautre', 'Lait d\'amande'],
    nutrition: {
      energy: 'Libération lente',
      benefit: 'Fibres & Digestion',
      impact: 'Healthy'
    },
    dietaryTags: ['Indice glycémique bas', 'Sans lactose']
  },
  {
    id: 'reve-enfant',
    name: 'Le Rêve des Enfants',
    description: 'Mousse vanille légère et biscuit fondant aux couleurs naturelles de fruits.',
    price: 42,
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&q=80&w=800',
    category: 'Enfant',
    targetAudience: ['Enfants'],
    ingredients: ['Vanille de Tahiti', 'Lait entier Bio', 'Purée de fruits'],
    nutrition: {
      energy: 'Énergie de croissance',
      benefit: 'Calcium & Sans Additifs',
      impact: 'Doux'
    },
    dietaryTags: ['Sans colorants', 'Réduit en sucre']
  },
  {
    id: 'performance-pro',
    name: 'Performance Pro',
    description: 'Biscuit à l\'avoine, dattes et éclats de noix pour une récupération optimale.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80&w=800',
    category: 'Bien-être',
    targetAudience: ['Sportifs'],
    ingredients: ['Avoine Complète', 'Dattes Medjool', 'Noix'],
    nutrition: {
      energy: 'Protéines & Glucides lents',
      benefit: 'Oméga-3 & Récupération',
      impact: 'Sportif'
    },
    dietaryTags: ['Vegan', 'Énergie naturelle']
  },
  {
    id: 'purete-absolue',
    name: 'Pureté Absolue',
    description: 'Le summum du sans allergènes : sans gluten, sans lactose, sans compromis.',
    price: 58,
    image: 'https://images.unsplash.com/photo-1568051243857-068aa3ea934d?auto=format&fit=crop&q=80&w=800',
    category: 'Bien-être',
    targetAudience: ['Régimes'],
    ingredients: ['Farine de Riz', 'Crème de Coco', 'Sirop d\'Agave'],
    nutrition: {
      energy: 'Hypoallergénique',
      benefit: 'Légèreté Totale',
      impact: 'Détox'
    },
    dietaryTags: ['Sans gluten', 'Sans lactose', 'Zéro allergène']
  }
];

export const PERSONAS = [
  { id: 'Enfants', label: 'Enfants', icon: <Baby className="w-6 h-6" />, desc: 'Douceur et joie sans additifs.' },
  { id: 'Adultes', label: 'Adultes', icon: <User className="w-6 h-6" />, desc: 'Complexité et élégance pure.' },
  { id: 'Séniors', label: 'Séniors', icon: <ShieldCheck className="w-6 h-6" />, desc: 'Légèreté et digestibilité.' },
  { id: 'Sportifs', label: 'Sportifs', icon: <Activity className="w-6 h-6" />, desc: 'Énergie noble et récupération.' },
  { id: 'Régimes', label: 'Régimes', icon: <Leaf className="w-6 h-6" />, desc: 'Sans gluten ou lactose.' }
];

export const STEPS: OrderStep[] = [
  { title: 'Selectionnez', description: 'Explorez nos créations pensées pour votre bien-être.', icon: <Cake className="w-8 h-8" /> },
  { title: 'Personnalisez', description: 'Ajustez les saveurs et le message émotionnel.', icon: <Sparkles className="w-8 h-8" /> },
  { title: 'Réservez', description: 'Paiement sécurisé et créneau de livraison garanti.', icon: <ShoppingCart className="w-8 h-8" /> },
  { title: 'Célébrez', description: 'Le moment de grâce où les souvenirs se créent.', icon: <Heart className="w-8 h-8" /> }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Sophie M.', content: "Une légèreté incroyable. Mes invités n'en revenaient pas !", role: 'Maman comblée', avatar: 'https://i.pravatar.cc/150?u=sophie' },
  { id: 2, name: 'Marc D.', content: "Enfin un gâteau qui respecte mon régime sportif tout en étant délicieux.", role: 'Athlète passionné', avatar: 'https://i.pravatar.cc/150?u=marc' },
  { id: 3, name: 'Léa V.', content: "L'émotion était palpable à l'ouverture de l'écrin. Un vrai moment de luxe.", role: 'Wedding Planner', avatar: 'https://i.pravatar.cc/150?u=lea' }
];
