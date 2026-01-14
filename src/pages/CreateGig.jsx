import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGig } from '../store/slices/gigSlice';
import { GigForm } from '../components/gigs/GigForm';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const CreateGig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.gigs);

  const handleSubmit = async (formData) => {
    try {
      const result = await dispatch(createGig(formData)).unwrap();
      navigate(`/gigs/${result.data.gig._id}`);
    } catch (error) {
      // Error handled by toast in slice
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <h1 className="text-2xl font-bold text-gray-900">Post a New Gig</h1>
              <p className="text-gray-600 mt-2">
                Describe your project and find the perfect freelancer to help you
              </p>
            </CardHeader>
            <CardBody>
              <GigForm onSubmit={handleSubmit} loading={loading} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};