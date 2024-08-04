import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material/index';
import { Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';

const DeleteDialog = ({ title, noun, loading, onDelete }) => {
    const [open, setOpen] = useState(false);

    function myLoop(looping) {
        setTimeout(function () {
            while (looping) {
                myLoop();
            }
        }, 100);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // Call the onDelete function to delete the item
        onDelete();
        while (loading === true) {
            myLoop(100);
        }
        //setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleOpen}>
                    <Delete />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleDelete}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>Are you sure you want to delete {noun}?</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <LoadingButton loading={loading} onClick={handleDelete} color="secondary">
                        Delete
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

DeleteDialog.propTypes = {
    title: PropTypes.string.isRequired,
    noun: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default DeleteDialog;
