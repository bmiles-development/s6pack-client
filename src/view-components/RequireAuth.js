import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react/prop-types
export function RequireAuth({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, route } = useAuthenticator((context) => [context.user]);
    useEffect(() => {
        if (route !== 'authenticated' && route !== 'idle') {
            return navigate('/login');
        }
    }, [user, route, navigate, dispatch]);

    return children;
}
