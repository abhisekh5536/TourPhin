import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Skeleton, 
  Box, 
  Stack 
} from '@mui/material';

const PackageCardSkeleton = () => {
  return (
    <Card sx={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Image Skeleton */}
      <Box sx={{ position: 'relative' }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={250}
          animation="wave"
        />
        {/* Package type badge skeleton */}
        <Box sx={{ position: 'absolute', top: 15, right: 15 }}>
          <Skeleton 
            variant="rectangular" 
            width={80} 
            height={25} 
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Box>

      <CardContent>
        {/* Title Skeleton */}
        <Skeleton 
          variant="text" 
          height={32} 
          width="80%" 
          sx={{ mb: 1 }}
        />

        {/* Package Info Skeletons */}
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width="70%" height={20} />
          </Box>
        </Stack>

        {/* Highlights Section */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1 }} />
          <Stack spacing={0.5}>
            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton variant="circular" width={12} height={12} />
                <Skeleton variant="text" width="85%" height={18} />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Footer Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="text" width="40%" height={28} />
          <Skeleton variant="text" width="35%" height={20} />
        </Box>

        {/* Button Skeleton */}
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={40} 
          sx={{ borderRadius: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export default PackageCardSkeleton;