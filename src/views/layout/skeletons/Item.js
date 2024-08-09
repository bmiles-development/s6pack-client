import React from 'react';
import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { PropTypes } from 'prop-types';

export default function SkeletonItem(props) {
    let skeletonItem = (
        <Grid container spacing={3} alignItems="flex-end" sx={{ height: props.height, width: props.width }}>
            <Grid key="cardInfo" item xs={12} sm={12} md={12}>
                <Skeleton variant="rounded" sx={{ mb: 2, height: props.height * 0.2 }} />
                <Skeleton variant="rounded" sx={{ mb: 3, height: props.height * 0.1 }} />
                <Skeleton variant="rounded" sx={{ mb: 3, height: props.height * 0.1 }} />
                <Skeleton variant="rounded" sx={{ mb: 2, height: props.height * 0.2 }} />
            </Grid>
        </Grid>
    );

    SkeletonItem.propTypes = {
        height: PropTypes.number,
        width: PropTypes.number
    };
    return skeletonItem;
}
