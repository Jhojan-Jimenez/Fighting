import React from 'react';

interface GymsharkBannerProps {
  gender: string;
  selectedElement: string;
  selectedModel: string;
}

export const GymsharkBanner: React.FC<GymsharkBannerProps> = ({
  gender,
  selectedElement,
  selectedModel,
}) => {
  const getBannerText = () => {
    if (selectedElement !== 'ALL') {
      switch (selectedElement) {
        case 'AGUA':
          return {
            title: 'ELEMENT // WATER',
            subtitle: 'Adaptive flow. Unbroken transitions. Imposing presence.',
          };
        case 'AIRE':
          return {
            title: 'ELEMENT // AIR',
            subtitle: 'Weightless mobility. Elusive guard. Imposing presence.',
          };
        case 'FUEGO':
          return {
            title: 'ELEMENT // FIRE',
            subtitle: 'Explosive pressure. Relentless strikes. Imposing presence.',
          };
        case 'TIERRA':
          return {
            title: 'ELEMENT // EARTH',
            subtitle: 'Heavy top control. Unbreakable base. Imposing presence.',
          };
        case 'AVATAR':
          return {
            title: 'ELEMENT // AVATAR',
            subtitle: 'Four elements mastery. Total martial balance. Imposing presence.',
          };
      }
    }

    if (gender === 'MUJER') {
      return {
        title: 'WOMEN’S COMBAT',
        subtitle: 'Precision compression fits. Sublimated Japanese aesthetics. Imposing presence.',
      };
    }

    if (gender === 'HOMBRE') {
      return {
        title: 'MEN’S COMBAT',
        subtitle: 'Physique-accentuating fits. High-density sublimation. Imposing presence.',
      };
    }

    return {
      title: 'THE FOUR ELEMENTS',
      subtitle: 'Heavy compression. Martial discipline. Imposing presence.',
    };
  };

  const { title, subtitle } = getBannerText();

  return (
    <div className="w-full bg-[#0a0a0a] text-white py-5 sm:py-7 px-4 sm:px-8 text-center flex flex-col items-center justify-center border-b border-neutral-900">
      <h1 className="font-bebas text-2xl xs:text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase text-white leading-none">
        {title}
      </h1>
      <p className="mt-1 text-[10px] sm:text-xs text-neutral-300 font-medium tracking-wide max-w-xl px-2">
        {subtitle}
      </p>
    </div>
  );
};
