import React from 'react'
import User from './User'
import { nanoid } from 'nanoid'

const UsersList = ({users, handlerLoggedInUser, isAddingUser, handlerAddNewUser, handlerBtnSubmitAddingUser, admins, handlerBtnCancleAddingUser, handlerPlayForUser}) => {
    let isLogedIn = users.find(user => user.isChoosedUser === true)
    
    if (isLogedIn) {    
        return (
            <User isLogedIn={isLogedIn} admins={admins} handlerPlayForUser={handlerPlayForUser}/>          
        )
    } else {
        return (
            <> 
                {isAddingUser ? 
                        <div className='add-new-user-conteiner'>
                        <div className='add-new-user-title'>Add new User</div>
                        <div className='add-new-user-name'>Enter name</div>
                        <input className='add-new-user-name-input'></input>
                        <div className='add-new-user-money'>Enter amount of money</div>
                        <input className='add-new-user-money-input' type='number' step='100'></input>
                        <div className='add-new-user-btn-conteiner'>
                            <button className='add-new-user-btn-submit' onClick={handlerBtnSubmitAddingUser}>Submit</button>
                            <button className='add-new-user-btn-cancel' onClick={handlerBtnCancleAddingUser}>Cancel</button>
                        </div>
                        </div> 
                    :
                    <>
                        <div className='users-header'>
                            <div className='users-header-title'>List of Users</div>
                            <button className='users-btn-add-user' onClick={handlerAddNewUser}>+</button>
                        </div>    
                        <ul>
                            {users.map(user => <li key={nanoid(10)} onClick={handlerLoggedInUser} className='user-list'>{user.userName}</li>)}
                        </ul>
                    </>
                }
            </>
        )
    }
}

export default UsersList;