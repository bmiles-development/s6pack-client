import React from 'react';
import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';

function SkeletonPlan() {
    let skeletonPlan = (
        <Grid container spacing={3} alignItems="flex-end">
            {new Array(4).fill(0).map((_, index) => (
                // Enterprise card is full width at sm breakpoint
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Skeleton variant="rounded" height={56} sx={{ mb: 2 }} />
                    <Skeleton variant="rounded" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="rounded" height={20} sx={{ mb: 2 }} />
                    <Skeleton variant="rounded" height={40} />
                </Grid>
            ))}
        </Grid>
    );
    return skeletonPlan;
}

export default SkeletonPlan;
