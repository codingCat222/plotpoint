import React from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { Card, CardContent } from '@/src/components/ui/Card';

interface VirtualTourProps {
  imageUrl?: string;
}

export function VirtualTour({ imageUrl }: VirtualTourProps) {
  const sourceImage = imageUrl || 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg';

  return (
    <Card className="overflow-hidden border-slate-200">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-slate-900 flex items-center">
          360° Virtual Tour
        </h3>
        <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">Interactive</span>
      </div>
      <CardContent className="p-0">
        <div className="h-[400px] w-full relative bg-slate-900">
          <ReactPhotoSphereViewer
            src={sourceImage}
            height={'100%'}
            width={'100%'}
            containerClass="w-full h-full"
            littlePlanet={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}