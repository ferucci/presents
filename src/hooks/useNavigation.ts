'use client';

import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  const navigation = {
    home: () => router.push('/'),
    about: () => router.push('/about'),
    services: () => router.push('/services'),
    documentation: () => router.push('/documentation'),
    faq: () => router.push('/faq'),
    privacy: () => router.push('/privacy'),
    contact: () => router.push('/#contact'),
    catalog: () => router.push('/catalog')
  };

  return navigation;
};