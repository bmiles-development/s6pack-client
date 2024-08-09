import React, { useState } from 'react';
import { store } from '../../store';
import { useForm } from 'react-hook-form';
import { ADD_STANDARD_USER, ADD_ADMIN_USER } from '../../graphql/mutations';
import { Link } from 'react-router-dom';
import { TextField, Grid, Select, MenuItem, InputLabel, Box, Alert, AlertTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from '../../view-components/MainCard';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import LoadingButton from '@mui/lab/LoadingButton';
import { addSnackBarMessage, changeSnackBarType } from '../../store/reducers/snackBarMessages';

const UserCreate = () => {
    const theme = useTheme();
    const [formGroup, setFormGroup] = useState('User');

    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleGroup = (event) => {
        setFormGroup(event.target.value);
    };

    function addUserCompleted(email) {
        store.dispatch(addSnackBarMessage('User ' + email + ' created successfully.'));
        navigate('/users/');
    }

    function CreateUserForm() {
        const [addStandardUser, { loading: buttonLoading, error: error1 }] = useMutation(gql(ADD_STANDARD_USER), {
            update(cache, { data: { addStandardUser } }) {
                cache.modify({
                    fields: {
                        listUsers(existingUsers = []) {
                            const newUserRef = cache.writeFragment({
                                data: addStandardUser,
                                fragment: gql`
                                    fragment NewUser on User {
                                        id
                                    }
                                `
                            });
                            return [...existingUsers, newUserRef];
                        }
                    }
                });
            },
            onCompleted(data) {
                addUserCompleted(data.addStandardUser.email);
            },
            onError(error) {
                store.dispatch(changeSnackBarType('error'));
                store.dispatch(addSnackBarMessage(error.message));
                navigate('/users/');
            }
        });

        const [addAdminUser, { loading: buttonLoading2, error: error2 }] = useMutation(gql(ADD_ADMIN_USER), {
            update(cache, { data: { addAdminUser } }) {
                cache.modify({
                    fields: {
                        listUsers(existingUsers = []) {
                            const newUserRef = cache.writeFragment({
                                data: addAdminUser,
                                fragment: gql`
                                    fragment NewUser on User {
                                        id
                                    }
                                `
                            });
                            return [...existingUsers, newUserRef];
                        }
                    }
                });
            },
            onCompleted(data) {
                addUserCompleted(data.addAdminUser.email);
                navigate('/users/');
            },
            onError(error) {
                store.dispatch(changeSnackBarType('error'));
                store.dispatch(addSnackBarMessage(error.message));
                navigate('/users/');
            }
        });

        return (
            <form
                onSubmit={handleSubmit(async (e) => {
                    if (formGroup == 'User') {
                        await addStandardUser({ variables: { username: e.email } });
                    } else {
                        await addAdminUser({ variables: { username: e.email } });
                    }
                })}
                style={{
                    marginTop: theme.spacing(3)
                }}
            >
                {' '}
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Box width={350}>
                        <Grid item xs={12}>
                            <InputLabel>Email</InputLabel>
                            <TextField
                                required
                                id="email"
                                fullWidth
                                {...register('email')}
                                error={errors.email != undefined ? true : false}
                                helperText={errors.email && errors.email.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>Group</InputLabel>
                            <Select fullWidth id="group" defaultValue={'User'} onChange={handleGroup}>
                                <MenuItem value={'User'}>Standard User</MenuItem>
                                <MenuItem value={'Admin'}>Admin</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            {(typeof error1?.graphQLErrors == 'object' || typeof error2?.graphQLErrors == 'object') && (
                                <Alert severity="error" style={{ marginTop: theme.spacing(3) }}>
                                    <AlertTitle>Error</AlertTitle>
                                    <div>
                                        User was not Created:{' '}
                                        <strong>
                                            {' '}
                                            {error1.graphQLErrors[0]?.message
                                                ? error1.graphQLErrors[0]?.message
                                                : error2.graphQLErrors[0]?.message}
                                        </strong>
                                    </div>
                                    {(error1?.graphQLErrors[0]?.errorType == 'PlanUserLimitReached' ||
                                        error2?.graphQLErrors[0]?.errorType == 'PlanUserLimitReached') && (
                                        <Box>
                                            <br />
                                            <Link to={'/plans/'}>Upgrade Subscription Plan Here</Link>
                                        </Box>
                                    )}
                                </Alert>
                            )}
                            <Box component="span" display="flex" justifyContent="space-between" alignItems="center">
                                <LoadingButton
                                    loading={buttonLoading || buttonLoading2}
                                    component={Link}
                                    to={'/users'}
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: theme.spacing(3) }}
                                >
                                    Cancel
                                </LoadingButton>
                                <LoadingButton
                                    type="submit"
                                    loading={buttonLoading || buttonLoading2}
                                    color="primary"
                                    variant="contained"
                                    style={{ marginTop: theme.spacing(3) }}
                                >
                                    Create
                                </LoadingButton>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </form>
        );
    }

    let mainCard = (
        <MainCard title="Create User">
            <CreateUserForm></CreateUserForm>
        </MainCard>
    );
    return mainCard;
};

export default UserCreate;
