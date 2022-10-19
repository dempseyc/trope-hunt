import Button from '@mui/material/Button';
import UserAvatar from './UserAvatar';

const UserDetails = (props) => {
    const details = {...props.user};
    const {logoutUser} = props;
   return (
      <div className="UserDetails">
         <UserAvatar name={details.username} image={details.image} />
         <span>
         {details.email}
         </span>
         <Button onClick={(e) => logoutUser()}>Sign Out</Button>
      </div>

   );
}

export default UserDetails