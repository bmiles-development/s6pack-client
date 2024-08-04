import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    selectedPlan: {
        id: 'dev_Free',
        title: 'Free',
        price: 0,
        statementDescriptor: 'Default Free Plan',
        totalUsers: 1,
        featureList: 'One User, Many Requests'
    },
    updatedPlanSnackBar: '',
    totalActiveUsers: 1,
    maxPlanUsers: 1
};

// ==============================|| SLICE - MENU ||============================== //

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        selectPlan(state, selectedPlan) {
            state.selectedPlan = selectedPlan;
        },

        setMaxPlanUsers(state, maxPlanUsers) {
            state.maxPlanUsers = maxPlanUsers;
        },

        setTotalActiveUsers(state, totalActiveUsers) {
            state.totalActiveUsers = totalActiveUsers;
        }
    }
});

export default planSlice.reducer;

export const { selectPlan, setMaxPlanUsers, setTotalActiveUsers } = planSlice.actions;
