
import React from 'react';

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Enfant' | 'Chocolat' | 'Fruité' | 'Signature' | 'Bien-être';
  targetAudience: string[];
  ingredients: string[];
  nutrition: {
    energy: string;
    benefit: string;
    impact: string;
  };
  dietaryTags: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  content: string;
  role: string;
  avatar: string;
}

export interface OrderStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}
