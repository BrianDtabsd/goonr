import React from 'react';

export default function Card({
  size = 'md', // sm, md, lg, full
  imageSrc,
  imagePosition = 'none', // left, right, top, background, none
  title,
  subtitle,
  children,
  className = ''
}) {
  // Size classes for grid layout
  const sizeClasses = {
    sm: 'col-span-1',
    md: 'col-span-1 md:col-span-2',
    lg: 'col-span-1 md:col-span-3',
    full: 'col-span-1 md:col-span-full'
  };

  // Determine flex direction based on image position
  let flexDirection = 'flex-col';
  if (imagePosition === 'left') flexDirection = 'flex-col md:flex-row';
  if (imagePosition === 'right') flexDirection = 'flex-col md:flex-row-reverse';

  const content = (
    <div className={`glass-card flex ${flexDirection} gap-6 h-full overflow-hidden ${className}`}>
      {/* Foreground Image */}
      {imageSrc && imagePosition !== 'background' && imagePosition !== 'none' && (
        <div className={`${(imagePosition === 'left' || imagePosition === 'right') ? 'w-full md:w-1/3' : 'w-full h-48'} shrink-0 relative`}>
          <img src={imageSrc} className="absolute inset-0 w-full h-full object-cover rounded-2xl" alt="" />
        </div>
      )}
      
      {/* Background Image */}
      {imageSrc && imagePosition === 'background' && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img src={imageSrc} className="w-full h-full object-cover" alt="" />
        </div>
      )}
      
      {/* Content Area */}
      <div className="flex-grow flex flex-col relative z-10">
        {title && <h3 className="card-title text-2xl font-bold mb-2">{title}</h3>}
        {subtitle && <p className="card-subtitle text-sm mb-4 opacity-80">{subtitle}</p>}
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );

  return <div className={`anim-trigger anim-fade-up ${sizeClasses[size]}`}>{content}</div>;
}
