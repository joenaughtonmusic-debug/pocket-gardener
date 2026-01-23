'use client'

interface PlantThumbnailProps {
  plant: any;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlantThumbnail({ plant, size = 'md' }: PlantThumbnailProps) {
  const styles = {
    sm: "w-12 h-12 rounded-xl text-xl",
    md: "w-24 h-24 rounded-2xl text-3xl",
    lg: "w-full h-full text-[100px]"
  };

  // CHECK: Does the plant exist and does it have a non-empty image_url?
  const hasValidImage = plant?.image_url && plant.image_url.trim() !== "";

  return (
    <div className={`${styles[size]} bg-[#f0f7f3] flex items-center justify-center overflow-hidden flex-shrink-0 relative`}>
      {hasValidImage ? (
        <img 
          src={plant.image_url} 
          alt={plant.common_name || 'Plant'} 
          className="w-full h-full object-cover"
          // If the image link is broken/dead, hide it and show emoji instead
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.querySelector('.fallback-emoji')?.classList.remove('hidden');
          }}
        />
      ) : null}

      {/* Fallback Emoji: Hidden by default IF we have an image, but shown if image fails */}
      <div className={`fallback-emoji select-none pointer-events-none ${hasValidImage ? 'hidden' : ''}`}>
        {plant?.plant_type === 'Fruit' ? '🍋' : '🌿'}
      </div>
    </div>
  );
}