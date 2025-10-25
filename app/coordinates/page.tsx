'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Heart, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Import images statically at the top
import AirbnbImage from '@/app/coordinates/Airbnb.jpg';
import AparnaSarovarImage from '@/app/coordinates/Aparna Sarovar.jpeg';
import AramekkaImage from '@/app/coordinates/Aramekka.jpg';

// Image question interface with correct coordinates
interface ImageQuestion {
  id: string;
  image: any;
  title: string;
  alt: string;
  correctCoordinates: {
    latitude: number;
    longitude: number;
  };
}

// Questions with correct coordinate answers
const IMAGE_QUESTIONS: ImageQuestion[] = [
  {
    id: 'image_question_1',
    image: AparnaSarovarImage,
    title: 'First Memory',
    alt: 'First special memory together',
    correctCoordinates: {
      latitude: 17.4629,  // Replace with actual coordinates
      longitude: 78.3114
    }
  },
  {
    id: 'image_question_2',
    image: AramekkaImage,
    title: 'Sweet Moment',
    alt: 'A sweet moment we shared',
    correctCoordinates: {
      latitude: 9.93988,  // Replace with actual coordinates
      longitude: 76.26022
    }
  },
  {
    id: 'image_question_3',
    image: AirbnbImage,
    title: 'Special Place',
    alt: 'Our special place',
    correctCoordinates: {
      latitude: 9.98,  // Replace with actual coordinates
      longitude: 76.30
    }
  },
];

// Validation function with tolerance
function validateCoordinates(
  inputLat: string,
  inputLon: string,
  correctLat: number,
  correctLon: number,
  tolerance: number = 0.001 // Default tolerance of ~111 meters
): boolean {
  // Parse input values
  const lat = parseFloat(inputLat);
  const lon = parseFloat(inputLon);

  // Check if values are valid numbers
  if (isNaN(lat) || isNaN(lon)) {
    return false;
  }

  // Check if latitude is within valid range (-90 to 90)
  if (lat < -90 || lat > 90) {
    return false;
  }

  // Check if longitude is within valid range (-180 to 180)
  if (lon < -180 || lon > 180) {
    return false;
  }

  // Check if coordinates are within tolerance
  const latDiff = Math.abs(lat - correctLat);
  const lonDiff = Math.abs(lon - correctLon);

  return latDiff <= tolerance && lonDiff <= tolerance;
}

export default function CoordinatesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [coordinates, setCoordinates] = useState<Record<string, { longitude: string; latitude: string }>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [validationStatus, setValidationStatus] = useState<Record<string, boolean | null>>({});
  const [showValidation, setShowValidation] = useState(false);
  const router = useRouter();

  const handleCoordinateChange = (questionId: string, field: 'longitude' | 'latitude', value: string) => {
    setCoordinates(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
      },
    }));
    // Reset validation when user changes input
    setShowValidation(false);
  };

  const question = IMAGE_QUESTIONS[currentQuestion];
  const currentCoords = coordinates[question.id] || { longitude: '0', latitude: '0' };
  const isAnswered = currentCoords.longitude !== '' && currentCoords.latitude !== '';

  const handleCheckAnswer = () => {
    const isCorrect = validateCoordinates(
      currentCoords.latitude,
      currentCoords.longitude,
      question.correctCoordinates.latitude,
      question.correctCoordinates.longitude
    );

    setValidationStatus(prev => ({ ...prev, [question.id]: isCorrect }));
    setShowValidation(true);

    // If correct, automatically move to next question after 2 seconds
    if (isCorrect) {
      setTimeout(() => {
        if (currentQuestion < IMAGE_QUESTIONS.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setShowValidation(false);
        } else {
          // All questions answered correctly
          router.push('/collage');
        }
      }, 2000);
    }
  };

  const currentValidation = validationStatus[question.id];
  const canProceed = currentValidation === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5fa] via-[#ffe6f0] to-[#ffd6e8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              y: -20,
              x: Math.random() * 1000,
              opacity: 0,
            }}
            animate={{
              y: '110vh',
              opacity: [0, 0.3, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            <MapPin className="w-5 h-5 text-[#ffd6e8]" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-full mb-4 border-2 border-[#ffe6f0]"
          >
            <Sparkles className="w-5 h-5 text-[#d946a6]" />
            <span className="font-semibold text-[#d946a6]">Find the Coordinates</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-5xl font-bold cursive text-[#d946a6] mb-2">
              Memory {currentQuestion + 1} of {IMAGE_QUESTIONS.length}
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              {IMAGE_QUESTIONS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentQuestion
                      ? 'w-12 bg-gradient-to-r from-[#ffd6e8] to-[#ffb6d9]'
                      : index < currentQuestion
                      ? 'w-2 bg-[#d946a6]'
                      : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 border-2 border-[#ffe6f0]"
              style={{ boxShadow: '0 20px 60px rgba(255, 182, 215, 0.3)' }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-center mb-6 text-gray-800 cursive"
              >
                {question.title}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden mb-8 border-2 border-[#ffb6d9]"
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundColor: '#ffe6f0'
                }}
              >
                {/* Loading placeholder */}
                {!imageLoaded[question.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#ffe6f0] to-[#ffd6e8] z-10">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin className="w-16 h-16 text-white" />
                    </motion.div>
                  </div>
                )}

                {/* Image with static import */}
                <Image
                  src={question.image}
                  alt={question.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  onLoad={() => setImageLoaded(prev => ({ ...prev, [question.id]: true }))}
                  priority={currentQuestion === 0}
                  quality={90}
                />
              </motion.div>

              <div className="space-y-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#d946a6] fill-[#d946a6]" />
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={currentCoords.latitude}
                    onChange={(e) => handleCoordinateChange(question.id, 'latitude', e.target.value)}
                    placeholder="e.g., 37.7749"
                    disabled={showValidation && canProceed}
                    className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                      showValidation && currentValidation === true
                        ? 'border-green-500 bg-green-50'
                        : showValidation && currentValidation === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-[#ffe6f0] focus:border-[#ffd6e8]'
                    } focus:outline-none focus:ring-4 focus:ring-[#ffe6f0]`}
                    style={{ boxShadow: '0 4px 20px rgba(255, 182, 215, 0.15)' }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#d946a6] fill-[#d946a6]" />
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={currentCoords.longitude}
                    onChange={(e) => handleCoordinateChange(question.id, 'longitude', e.target.value)}
                    placeholder="e.g., -122.4194"
                    disabled={showValidation && canProceed}
                    className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                      showValidation && currentValidation === true
                        ? 'border-green-500 bg-green-50'
                        : showValidation && currentValidation === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-[#ffe6f0] focus:border-[#ffd6e8]'
                    } focus:outline-none focus:ring-4 focus:ring-[#ffe6f0]`}
                    style={{ boxShadow: '0 4px 20px rgba(255, 182, 215, 0.15)' }}
                  />
                </motion.div>
              </div>

              {/* Validation feedback */}
              {showValidation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    currentValidation
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {currentValidation ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">Perfect! 🎉</p>
                        <p className="text-sm">You found the correct location!</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">Not quite right</p>
                        <p className="text-sm">Try again or check the coordinates carefully</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              <motion.button
                onClick={handleCheckAnswer}
                disabled={!isAnswered || (showValidation && canProceed)}
                whileHover={isAnswered && !(showValidation && canProceed) ? { scale: 1.02 } : {}}
                whileTap={isAnswered && !(showValidation && canProceed) ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isAnswered && !(showValidation && canProceed)
                    ? 'bg-gradient-to-r from-[#ffd6e8] to-[#ffb6d9] text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {showValidation && canProceed ? (
                  <>
                    Moving to next memory...
                    <Sparkles className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Check Coordinates
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 text-sm text-gray-600"
        >
          <p className="italic">Enter the correct coordinates to unlock each memory</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
