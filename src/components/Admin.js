import React from 'react';
import Casino from './Casino'
import { nanoid } from 'nanoid'

const Admin = ({admins, handlerLoggedInAdmin, isAddingAdmin, handlerAddNewAdmin, isAddingMachin,handlerBtnSubmitAddingMachin,handlerBtnSubmitAddingAdmin, handlerBtnSubmitAddingCasino,
        handlerBtnCancleAddingAdmin, handlerChooseCasino, handlerTakeMoneyFromCasino, handlerTransferMoneyToCasino, handlerAddNewCasino, handlerBtnCancleAddingCasino, 
        handlerAddNewGameMachin, handlerDeletMachin, isAddingCasino, handlerBtnCancleAddingMachin, handlerPlayForAdmin}) => {
    let isLoggedIn = admins.find((admin) => admin.loggedIn === true)  

    if (isLoggedIn !== undefined) {
        return (
            <Casino handlerBtnSubmitAddingMachin={handlerBtnSubmitAddingMachin} 
                handlerAddNewGameMachin={handlerAddNewGameMachin} 
                isAddingMachin={isAddingMachin} 
                handlerChooseCasino={handlerChooseCasino} 
                admins={admins} 
                handlerTakeMoneyFromCasino={handlerTakeMoneyFromCasino} 
                handlerTransferMoneyToCasino={handlerTransferMoneyToCasino}
                handlerDeletMachin={handlerDeletMachin}
                isAddingCasino={isAddingCasino}
                handlerBtnCancleAddingMachin={handlerBtnCancleAddingMachin}
                handlerAddNewCasino={handlerAddNewCasino}
                handlerBtnCancleAddingCasino={handlerBtnCancleAddingCasino}
                handlerBtnSubmitAddingCasino={handlerBtnSubmitAddingCasino}
                handlerPlayForAdmin={handlerPlayForAdmin}
            />
        )
    } else {
        return (
            <>
            {isAddingAdmin ? 
                <div className='add-new-admin-conteiner'>
                    <div className='add-new-admin-title'>Add new admin</div>
                    <div className='add-new-admin-name'>Enter name</div>
                    <input className='add-new-admin-name-input'></input>
                    <div className='add-new-admin-money'>Enter amount of money</div>
                    <input className='add-new-admin-money-input' type='number' step='100'></input>
                    <div className='add-new-admin-btn-conteiner'>
                        <button className='add-new-admin-btn-submit' onClick={handlerBtnSubmitAddingAdmin}>Submit</button>
                        <button className='add-new-admin-btn-cancel' onClick={handlerBtnCancleAddingAdmin}>Cancel</button>
                    </div>
                </div> 
                :
                <div className='admin-main-conteiner'>
                    <div  className='admin-header-conteiner'>
                        <div className='admin-header-text'>List of Admins</div>
                        <button className='admin-add-btn' onClick={handlerAddNewAdmin}>+</button>
                    </div>
                
                    <ul className='admin-list-conteiner'>
                        {admins.map((admin) => <li key={nanoid(11)} onClick={handlerLoggedInAdmin} className='admin-list'>{admin.adminName}</li>)}
                    </ul>
                </div>
            }
            </>
        )
    }
}

export default Admin;