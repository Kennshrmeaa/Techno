/* ============================================================
   GYM TRAINING CATEGORIES
   5 distinct training methodologies:
   - General Fitness
   - Crossfit
   - Sports Conditioning
   - Body Building
   - Powerlifting
============================================================ */

const GYM_TRAINING_CATEGORIES = {
  normalWorkout: {
    name: 'Normal Workout',
    emoji: '🏋️',
    color: '#38bdf8',
    description: 'Balanced gym training for regular strength and muscle progress',
    focus: 'Upper + Back + Legs + Shoulders',
    frequencies: {
      beginner: {
        days: 3,
        schedule: ['Upper', 'R', 'Back', 'R', 'Legs', 'R', 'R'],
        format: 'Upper - Rest - Back - Rest - Legs - Rest - Rest',
        workoutDays: ['Upper Body', 'Back & Biceps', 'Legs & Glutes'],
        notes: 'Solid beginner gym routine with recovery between sessions'
      },
      intermediate: {
        days: 4,
        schedule: ['Upper', 'Back', 'R', 'Legs', 'R', 'Shoulders', 'R'],
        format: 'Upper - Back - Rest - Legs - Rest - Shoulders - Rest',
        workoutDays: ['Upper Body', 'Back & Biceps', 'Legs & Glutes', 'Shoulders & Arms'],
        notes: 'Balanced split for a regular gym schedule through the week'
      },
      advanced: {
        days: 5,
        schedule: ['Upper', 'Back', 'Legs', 'R', 'Shoulders', 'Upper', 'R'],
        format: 'Upper - Back - Legs - Rest - Shoulders - Upper - Rest',
        workoutDays: ['Upper Body', 'Back & Biceps', 'Legs & Glutes', 'Shoulders & Arms', 'Upper Body (Repeat)'],
        notes: 'Adds a repeat upper day for extra training volume'
      }
    }
  },

  generalFitness: {
    name: 'General Fitness',
    emoji: '🏃',
    color: '#22c55e',
    description: 'Overall health, light training, and well-being',
    focus: 'Strength + Cardio + Mobility',
    frequencies: {
      beginner: {
        days: 1,
        schedule: ['Full-body workout + light cardio', 'R', 'R', 'R', 'R', 'R', 'R'],
        format: 'Pick any day',
        workoutDays: ['Full-body + Cardio'],
        notes: 'Any available day preference of the client'
      },
      intermediate: {
        days: 3,
        schedule: ['Full-body S', 'R', 'Cardio C', 'R', 'Mobility M', 'R', 'R'],
        format: 'S - R - C - R - M - R - R',
        workoutDays: ['Full-body Strength', 'Cardio Session', 'Mobility Work'],
        notes: 'Monday/Wednesday/Friday recommended'
      },
      advanced: {
        days: 5,
        schedule: ['Upper U', 'Lower L', 'Cardio C', 'R', 'Full-body FB', 'Core+Conditioning CC', 'R'],
        format: 'U - L - C - R - FB - CC - R',
        workoutDays: ['Upper Body', 'Lower Body', 'Cardio', 'Full-body Circuit', 'Core+Conditioning'],
        notes: 'High-frequency training for maximum fitness'
      }
    }
  },

  crossfit: {
    name: 'Crossfit',
    emoji: '⚡',
    color: '#ef4444',
    description: 'High-intensity mixed training (strength + cardio)',
    focus: 'Strength + WOD + Skills',
    frequencies: {
      beginner: {
        days: 2,
        schedule: ['Basic full-body WOD + light conditioning', 'R', 'R', 'R', 'R', 'R', 'R'],
        format: 'Pick any 2 days',
        workoutDays: ['WOD (Workout of the Day)', 'Conditioning'],
        notes: 'Any available day preference of the client'
      },
      intermediate: {
        days: 3,
        schedule: ['Strength S', 'R', 'WOD', 'R', 'Skill Day SD', 'R', 'R'],
        format: 'S - R - WOD - R - SD - R - R',
        workoutDays: ['Strength Focus', 'WOD Mixed', 'Skill Development'],
        notes: 'Balanced approach to all Crossfit domains'
      },
      advanced: {
        days: 5,
        schedule: ['WOD W', 'WOD W', 'WOD W', 'R', 'WOD W', 'WOD W', 'R'],
        format: 'W - W - W - R - W - W - R',
        workoutDays: ['WOD 1', 'WOD 2', 'WOD 3', 'WOD 4', 'WOD 5'],
        notes: 'Mixed modality with Olympic lifts + endurance'
      }
    }
  },

  sportsConditioning: {
    name: 'Sports Conditioning',
    emoji: '⚽',
    color: '#f59e0b',
    description: 'Athletic performance training (speed, endurance, agility)',
    focus: 'Speed + Endurance + Agility',
    frequencies: {
      beginner: {
        days: 2,
        schedule: ['Basic full-body WOD + light conditioning', 'R', 'R', 'R', 'R', 'R', 'R'],
        format: 'Pick any 2 days',
        workoutDays: ['Speed + Agility Drills', 'Conditioning'],
        notes: 'Any available day preference of the client'
      },
      intermediate: {
        days: 3,
        schedule: ['Strength W', 'R', 'WOD W', 'R', 'Skill SD', 'R', 'R'],
        format: 'W - R - W - R - W - R - R',
        workoutDays: ['Strength Building', 'Sport WOD', 'Skill Training'],
        notes: 'Sport-specific conditioning blend'
      },
      advanced: {
        days: 5,
        schedule: ['WOD W', 'WOD W', 'WOD W', 'R', 'WOD W', 'WOD W', 'R'],
        format: 'W - W - W - R - W - W - R',
        workoutDays: ['Speed Session', 'Endurance Work', 'Agility Drills', 'Power Training', 'Sport Simulation'],
        notes: 'High-frequency sport-specific training'
      }
    }
  },

  bodyBuilding: {
    name: 'Body Building',
    emoji: '💪',
    color: '#dc2626',
    description: 'Building muscle size, shape, and aesthetics',
    focus: 'Hypertrophy + Isolation + Symmetry',
    frequencies: {
      beginner: {
        days: 3,
        schedule: ['Push P', 'R', 'Pull PL', 'R', 'Legs L', 'R', 'R'],
        format: 'Push - Rest - Pull - Rest - Legs - Rest - Rest',
        workoutDays: ['Push (Chest/Shoulders/Triceps)', 'Pull (Back/Biceps)', 'Legs (Quads/Hamstrings/Glutes)'],
        notes: 'Classic PPL intro format, high recovery'
      },
      intermediate: {
        days: 5,
        schedule: ['Push P', 'Pull PL', 'Legs L', 'R', 'Upper U', 'Lower LB', 'R'],
        format: 'Push - Pull - Legs - Rest - Upper - Lower - Rest',
        workoutDays: ['Push Day', 'Pull Day', 'Leg Day', 'Upper Body', 'Lower Body'],
        notes: 'Extended to 5 days with upper/lower split'
      },
      advanced: {
        days: 6,
        schedule: ['Push P', 'Pull PL', 'Legs L', 'R', 'Push P', 'Pull PL', 'Legs L'],
        format: 'Push - Pull - Legs - Rest - Push - Pull - Legs',
        workoutDays: ['Push', 'Pull', 'Legs', 'Push (Repeat)', 'Pull (Repeat)', 'Legs (Repeat)'],
        notes: 'Push / Pull / Legs / Rest (repeat) across the week'
      }
    }
  },

  powerlifting: {
    name: 'Powerlifting',
    emoji: '🏆',
    color: '#8b5cf6',
    description: 'Lifting maximum weight in three main lifts (Squat, Bench, Deadlift)',
    focus: 'Squat + Bench Press + Deadlift + Accessories',
    frequencies: {
      beginner: {
        days: 3,
        schedule: ['Squat + Accessories SA', 'R', 'Bench + Accessories BA', 'R', 'Deadlift + Accessories DA', 'R', 'R'],
        format: 'S+A - Rest - B+A - Rest - D+A - Rest - Rest',
        workoutDays: ['Squat Day', 'Bench Day', 'Deadlift Day'],
        notes: 'Strength emphasis with form focus'
      },
      intermediate: {
        days: 4,
        schedule: ['Squat+Bench+A SBA', 'Bench+A BA', 'R', 'Deadlift+A DA', 'R', 'Squat+Deadlift+A SDA', 'R'],
        format: 'S+B+A - B+A - Rest - D+A - Rest - S+D+A - Rest',
        workoutDays: ['Squat + Bench', 'Bench + Accessories', 'Deadlift + Accessories', 'Squat + Deadlift'],
        notes: 'Higher frequency, conjugate method elements'
      },
      advanced: {
        days: 5,
        schedule: ['Squat+A SA', 'Bench+A BA', 'Deadlift+A DA', 'R', 'Squat+Bench+A SBA', 'Deadlift+A DA', 'R'],
        format: 'S+A - B+A - D+A - Rest - S+B+A - D+A - Rest',
        workoutDays: ['Squat Focus', 'Bench Focus', 'Deadlift Focus', 'Squat + Bench', 'Deadlift + Accessories'],
        notes: 'Advanced periodization for max strength gains'
      }
    }
  }
};

// Helper to get training category data
function getTrainingCategory(categoryKey) {
  return GYM_TRAINING_CATEGORIES[categoryKey];
}

// Helper to get schedule for a specific category and frequency
function getCategorySchedule(categoryKey, frequencyLevel) {
  const category = getTrainingCategory(categoryKey);
  if (!category || !category.frequencies[frequencyLevel]) return null;
  return category.frequencies[frequencyLevel];
}

// Get all category keys
function getAllCategoryKeys() {
  return Object.keys(GYM_TRAINING_CATEGORIES);
}

// Format day for display
function formatDaySchedule(dayAbv) {
  const dayMap = {
    'R': 'Rest',
    'S': 'Strength',
    'C': 'Cardio',
    'M': 'Mobility',
    'W': 'Workout',
    'SD': 'Skill Day',
    'U': 'Upper Body',
    'L': 'Lower Body',
    'FB': 'Full-body Circuit',
    'CC': 'Core + Conditioning',
    'P': 'Push',
    'PL': 'Pull',
    'U': 'Upper',
    'LB': 'Lower',
    'SA': 'Squat + Acc',
    'BA': 'Bench + Acc',
    'DA': 'Deadlift + Acc',
    'SBA': 'Squat + Bench + Acc',
    'SDA': 'Squat + Deadlift + Acc'
  };
  return dayMap[dayAbv] || dayAbv;
}
