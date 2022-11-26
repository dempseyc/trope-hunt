import Link from 'next/link'
import Button from '@mui/material/Button';
import TropeEditor from '../components/TropeEditor';
import {useEffect} from 'react';
import {useStoreState, useStoreActions} from '../store/store'

const Dashboard = (): JSX.Element => {
    const user_id = useStoreState(state => state.users.user?._id);
    const fetchUser = useStoreActions(actions => actions.users.fetchUser);
    useEffect(() => {
        if (!user_id) {
            fetchUser(null);
        }
    },[user_id, fetchUser]);
    const isAdmin = (user_id === "636d331fe7b21331ffcd7435");
    return (
        <div className="Dashboard">
            <header>{isAdmin ? `DASHBOARD`: `DATA`}</header>
            <Link href='/home' passHref>
            <Button
                key="home-back"
            >Back to Home</Button>
            </Link>
            {isAdmin? <TropeEditor/>: null}
        </div>
    )
}

export default Dashboard