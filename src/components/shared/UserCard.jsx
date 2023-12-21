import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from '../ui/button'

const UserCard = ({user}) => {
  return (
    <Link to={`/profile/${user?.$id}`} className='user-card'>
        <img src={user?.imageUrl || "../../../puplic/assets/icons/profile-placeholder.svg"} alt="profile" className='rounded-full w-14 h-14' />

        <p className='base-medium text-light-1'> {user.name} </p>
        <p className='base-small text-light-3'> @{user.username} </p>

        <Button className='shad-button_primary px-5'>Follow</Button>
    </Link>
  )
}

export default UserCard