import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { ArrowLeft, Upload, X, Link2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/src/store/useStore';

const KNOWN_LOCATIONS = ['Umuahia', 'Aba'];

export function AddPropertyPage() {
  const navigate = useNavigate();
  const addProperty = useStore((state) => state.addProperty);
  const properties = useStore((state) => state.properties);

  const existingLocations = Array.from(new Set([...KNOWN_LOCATIONS, ...properties.map(p => p.location)]));

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [plotSize, setPlotSize] = useState('');
  const [estate, setEstate] = useState('');
  const [location, setLocation] = useState(existingLocations[0] || '');
  const [customLocation, setCustomLocation] = useState('');
  const [type, setType] = useState<'house' | 'land'>('house');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const isCustomLocation = location === '__other__';

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
    e.target.value = '';
  };

  const handleVideoFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setVideos((prev) => [...prev, ...urls]);
    e.target.value = '';
  };

  const addImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const addVideoUrl = () => {
    if (!videoUrlInput.trim()) return;
    setVideos((prev) => [...prev, videoUrlInput.trim()]);
    setVideoUrlInput('');
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalLocation = isCustomLocation ? customLocation.trim() : location;

    if (!title || !price || !plotSize || !estate || !finalLocation) {
      alert('Please fill all required fields.');
      return;
    }
    if (images.length === 0) {
      alert('Please add at least one image.');
      return;
    }

    addProperty({
      title,
      estate,
      location: finalLocation,
      price: Number(price),
      status: 'available',
      type,
      plotSize,
      images,
      videos: videos.length > 0 ? videos : undefined,
      coordinates: [Number(latitude) || 0, Number(longitude) || 0],
    });

    navigate('/dashboard/properties');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard/properties" aria-label="Back to Properties">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Property</h1>
          <p className="text-slate-500">Create a new property listing.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
            <CardDescription>Enter the primary information for this plot or property.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="propertyTitle" className="text-sm font-medium text-slate-700">Property Title</label>
              <Input
                id="propertyTitle"
                placeholder="e.g. Block A, Plot 14"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium text-slate-700">Price (₦)</label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="plotSize" className="text-sm font-medium text-slate-700">Plot Size (sqm)</label>
                <Input
                  id="plotSize"
                  placeholder="e.g. 500 sqm"
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="estateName" className="text-sm font-medium text-slate-700">Estate Name</label>
                <Input
                  id="estateName"
                  placeholder="e.g. Sunrise Valley Estate"
                  value={estate}
                  onChange={(e) => setEstate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="locationCity" className="text-sm font-medium text-slate-700">City / Location</label>
                <select
                  id="locationCity"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                  required
                >
                  {existingLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                  <option value="__other__">Other (type new)</option>
                </select>
                {isCustomLocation && (
                  <Input
                    placeholder="Enter new city/location"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="mt-2"
                    required
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="propertyType" className="text-sm font-medium text-slate-700">Property Type</label>
              <select
                id="propertyType"
                value={type}
                onChange={(e) => setType(e.target.value as 'house' | 'land')}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                required
              >
                <option value="house">House</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="latitude" className="text-sm font-medium text-slate-700">Latitude</label>
                <Input
                  id="latitude"
                  type="text"
                  placeholder="e.g. 5.5267"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="longitude" className="text-sm font-medium text-slate-700">Longitude</label>
                <Input
                  id="longitude"
                  type="text"
                  placeholder="e.g. 7.4898"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Images *</CardTitle>
            <CardDescription>Upload property photos or paste image URLs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="w-full border-2 border-dashed border-slate-200 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500">
              <Upload className="h-10 w-10 text-slate-300 mb-4" aria-hidden="true" />
              <h3 className="text-sm font-medium text-slate-900 mb-1">Click to upload images</h3>
              <p className="text-xs text-slate-500">PNG, JPG (multiple allowed)</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFiles}
                className="hidden"
              />
            </label>

            <div className="flex gap-2">
              <div className="flex-1 flex items-center relative">
                <Link2 className="absolute left-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                <Input
                  placeholder="Paste image URL"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl(); } }}
                  className="pl-9"
                />
              </div>
              <Button type="button" variant="outline" onClick={addImageUrl}>
                Add
              </Button>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                    <img src={img} alt={`Property image ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Videos (optional)</CardTitle>
            <CardDescription>Upload a walkthrough video or paste a video URL.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="w-full border-2 border-dashed border-slate-200 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500">
              <Upload className="h-10 w-10 text-slate-300 mb-4" aria-hidden="true" />
              <h3 className="text-sm font-medium text-slate-900 mb-1">Click to upload videos</h3>
              <p className="text-xs text-slate-500">MP4 (multiple allowed)</p>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoFiles}
                className="hidden"
              />
            </label>

            <div className="flex gap-2">
              <div className="flex-1 flex items-center relative">
                <Link2 className="absolute left-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                <Input
                  placeholder="Paste video URL"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addVideoUrl(); } }}
                  className="pl-9"
                />
              </div>
              <Button type="button" variant="outline" onClick={addVideoUrl}>
                Add
              </Button>
            </div>

            {videos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {videos.map((vid, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                    <video src={vid} controls className="w-full h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove video"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link to="/dashboard/properties">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Save Property</Button>
        </div>
      </form>
    </div>
  );
}