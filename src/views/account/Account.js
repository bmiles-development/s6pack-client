import React from 'react';
import MainCard from '../../view-components/MainCard';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Alert,
    List,
    ListItem,
    ListItemText,
    Divider,
    Select,
    MenuItem,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { GET_TENANT } from '../../graphql/queries';
import { ENABLE_DELETE_ACCOUNT, DISABLE_DELETE_ACCOUNT, DELETE_ACCOUNT } from '../../graphql/mutations';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuthenticator } from '@aws-amplify/ui-react';
import SkeletonItem from '../layout/skeletons/Item';

const Account = () => {
    const [open, setOpen] = React.useState(false);
    const { user } = useAuthenticator((context) => [context.user]);

    function AccountInfo() {
        const [enableDeleteAccount, { loading: buttonLoading1, error: error2 }] = useMutation(gql(ENABLE_DELETE_ACCOUNT));
        const [disableDeleteAccount, { loading: buttonLoading2, error: error3 }] = useMutation(gql(DISABLE_DELETE_ACCOUNT));
        const [deleteAccount, { loading: deleteButtonLoading, error: error4 }] = useMutation(gql(DELETE_ACCOUNT));
        const { loading, error, data } = useQuery(gql(GET_TENANT));
        const ownerPermissions =
            user?.signInUserSession?.idToken?.payload['cognito:groups'][0] == 'Owner' ||
            user?.signInUserSession?.idToken?.payload['cognito:groups'][0] == 'Free';

        if (loading)
            return (
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <SkeletonItem height={400} />
                    </Grid>
                </Grid>
            );

        if (error) {
            return (
                <Alert severity="error" variant="filled">
                    {error.message}
                </Alert>
            );
        }
        if (error2) {
            return (
                <Alert severity="error" variant="filled">
                    {error2.message}
                </Alert>
            );
        }
        if (error3) {
            return (
                <Alert severity="error" variant="filled">
                    {error3.message}
                </Alert>
            );
        }

        if (error4) {
            return (
                <Alert severity="error" variant="filled">
                    {error4.message}
                </Alert>
            );
        }

        const handleDeleteAccount = (event) => {
            console.log(event.target.value);
            if (event.target.value == 'Off') {
                enableDeleteAccount();
            } else {
                disableDeleteAccount();
            }
        };

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
        return (
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                    {data.getTenant.deleteAccountFlag == true && (
                        <Alert severity="error" variant="filled">
                            Account Has Account Deletion Protection Turned Off. To Turn Back On, Select &quot;On&quot; For &quot;Account
                            Deletion Protection&quot; Below.
                        </Alert>
                    )}
                    <Typography variant="h2" component="div" sx={{ paddingTop: 5 }}>
                        Account Information
                    </Typography>
                    <List sx={{ bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemText primary="Account Id" secondary={data.getTenant.id} />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText primary="User" secondary={user?.username} />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText primary="Group" secondary={user?.signInUserSession?.idToken?.payload['cognito:groups'][0]} />
                        </ListItem>
                    </List>
                    {ownerPermissions && (
                        <>
                            <Typography variant="h2" component="div" sx={{ paddingTop: 5 }}>
                                Danger Zone
                            </Typography>
                            <List sx={{ bgcolor: 'background.paper' }}>
                                <ListItem
                                    secondaryAction={
                                        <FormControl size="small" error={data.getTenant.deleteAccountFlag == true ? true : false}>
                                            <Select
                                                id="group"
                                                value={data.getTenant.deleteAccountFlag == true ? 'Off' : 'On'}
                                                disabled={buttonLoading1 || buttonLoading2}
                                                onChange={handleDeleteAccount}
                                            >
                                                <MenuItem value={'On'}>On</MenuItem>
                                                <MenuItem value={'Off'}>Off</MenuItem>
                                            </Select>
                                        </FormControl>
                                    }
                                >
                                    <ListItemText primary="Account Deletion Protection" />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            !data.getTenant.deleteAccountFlag
                                                ? 'To Delete Your Account, Turn Off Account Deletion Protection.'
                                                : ''
                                        }
                                    />
                                    <Button
                                        variant={!data.getTenant.deleteAccountFlag ? 'outlined' : 'contained'}
                                        color="error"
                                        disabled={!data.getTenant.deleteAccountFlag || deleteButtonLoading}
                                        onClick={handleClickOpen}
                                    >
                                        Delete Account
                                    </Button>

                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Warning: This will delete all data associated with this account, including all other users
                                                and their data, as well as cancel any payment plan subscriptions at the next billing cycle.
                                                You will not be able to recover your data once it&apos;s deleted.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <LoadingButton onClick={deleteAccount} loading={deleteButtonLoading} color="error">
                                                I Understand, Delete It All
                                            </LoadingButton>
                                            <LoadingButton onClick={handleClose} loading={deleteButtonLoading}>
                                                No, Do Not Delete!
                                            </LoadingButton>
                                        </DialogActions>
                                    </Dialog>
                                </ListItem>
                            </List>
                        </>
                    )}
                </Grid>
            </Grid>
        );
    }

    let mainCard = (
        <MainCard title={'Account'}>
            <AccountInfo></AccountInfo>
        </MainCard>
    );
    return mainCard;
};

export default Account;
