import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Property, useStore } from '@/src/store/useStore';

interface PropertyReviewsProps {
  property: Property;
}

export function PropertyReviews({ property }: PropertyReviewsProps) {
  const { reviews, users, currentUser, addReview, reservations } = useStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyReviews = reviews.filter(r => r.propertyId === property.id);
  
  // Calculate average rating
  const averageRating = propertyReviews.length > 0
    ? propertyReviews.reduce((sum, review) => sum + review.rating, 0) / propertyReviews.length
    : 0;

  // Check if current user is eligible to review (has reserved/bought property)
  const hasPurchasedOrInspected = currentUser ? reservations.some(r => r.propertyId === property.id && r.buyerId === currentUser.id) : false;
  const canReview = currentUser?.role === 'buyer' && hasPurchasedOrInspected && !propertyReviews.some(r => r.buyerId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !comment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      addReview({
        propertyId: property.id,
        buyerId: currentUser.id,
        rating,
        comment
      });
      setComment('');
      setRating(5);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-slate-900 flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-emerald-600" />
          Buyer Reviews
        </h3>
        {propertyReviews.length > 0 && (
          <div className="flex items-center text-sm font-medium">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
            <span>{averageRating.toFixed(1)}</span>
            <span className="text-slate-500 ml-1">({propertyReviews.length})</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Review Form */}
        {canReview && (
          <div className="mb-8 border-b border-slate-100 pb-8">
            <h4 className="text-sm font-medium text-slate-900 mb-4">Write a Review</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-slate-600 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`h-6 w-6 ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-slate-600 mb-2">Your Feedback</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience visiting or purchasing this property..."
                  className="w-full h-24 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting || !comment.trim()} className="bg-emerald-600 hover:bg-emerald-700">
                {isSubmitting ? 'Posting...' : 'Post Review'}
              </Button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {propertyReviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-10 w-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No reviews yet for this property.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {propertyReviews.map((review) => {
              const reviewer = users.find(u => u.id === review.buyerId);
              return (
                <div key={review.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center font-bold text-slate-500">
                    {reviewer?.name.charAt(0) || 'A'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-medium text-slate-900">{reviewer?.name || 'Anonymous User'}</span>
                        <span className="text-xs text-slate-500 ml-2">Verified Buyer</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-3.5 w-3.5 ${review.rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">{review.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
