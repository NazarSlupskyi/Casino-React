import React from 'react';
import GameMachins from './GameMachins'
import { nanoid } from 'nanoid'

const Casino = ({handlerChooseCasino, admins, handlerTakeMoneyFromCasino, handlerBtnCancleAddingCasino, handlerBtnSubmitAddingCasino, handlerTransferMoneyToCasino,isAddingCasino, 
    handlerPlayForAdmin,isAddingMachin, handlerAddNewGameMachin, handlerBtnCancleAddingMachin, handlerBtnSubmitAddingMachin, handlerDeletMachin, handlerAddNewCasino}) => {
    let choosedAdmin = admins.find((admin) => admin.loggedIn === true) 

    return (
        <>  
            {choosedAdmin.casinos.find((casino) => casino.isChoosedCasino === true) === undefined ? 
            <div className='admin-casinos-conteiner'>
                <div className='admin-casinos-header'>
                    <div className='admin-casinos-title'>Your casinos</div>
                    <button className='add-new-casino-btn' onClick={handlerAddNewCasino}>+</button>
                </div>
                {isAddingCasino ? 
                    <div className='add-new-machin-conteiner'>
                        <div className='add-new-casino-title'>Add new Casino</div>
                        <div className='add-new-casino-name'>Name</div>
                        <input className='add-new-casino-name-input'></input>
                        <div className='add-new-casino-btn-conteiner'> 
                            <button className='add-new-casino-btn-submit' onClick={() => handlerBtnSubmitAddingCasino(choosedAdmin)}>Submit</button>
                            <button className='add-new-casino-btn-cancel' onClick={handlerBtnCancleAddingCasino}>Cancel</button>
                        </div>
                    </div>
                :
                    <ul className='list-of-admin-casinos'>
                        {choosedAdmin.casinos.map(casino => <li key={nanoid(12)} onClick={() => handlerChooseCasino(casino)} className='admin-casino'>{casino.casinoName}</li>)} 
                    </ul>
                }
            </div>
            :
                <GameMachins handlerDeletMachin={handlerDeletMachin} 
                    handlerBtnCancleAddingMachin={handlerBtnCancleAddingMachin} 
                    handlerBtnSubmitAddingMachin={handlerBtnSubmitAddingMachin} 
                    isAddingMachin={isAddingMachin} 
                    choosedAdmin={choosedAdmin} 
                    handlerTakeMoneyFromCasino={handlerTakeMoneyFromCasino} 
                    handlerAddNewGameMachin={handlerAddNewGameMachin} 
                    handlerTransferMoneyToCasino={handlerTransferMoneyToCasino}
                    handlerPlayForAdmin={handlerPlayForAdmin}    
                />
            }
        </>
    )
}

export default Casino;