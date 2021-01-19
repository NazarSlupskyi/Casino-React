import React from 'react'
import { nanoid } from 'nanoid'

const GameMachins = ({choosedAdmin, handlerTakeMoneyFromCasino, handlerTransferMoneyToCasino, isAddingMachin, handlerBtnCancleAddingMachin, handlerAddNewGameMachin, 
    handlerBtnSubmitAddingMachin, handlerDeletMachin, handlerPlayForAdmin}) => {
   
    let choosedCasino = choosedAdmin.casinos.find(casino => casino.isChoosedCasino === true)

    return (
        <> 
            <div className='casino-machins-conteiner'>
                <div className='casino-machins-header'>
                    <div className='casino-header-name'>Casino {choosedCasino.casinoName}</div>
                    <button className='add-new-machin-btn' onClick={handlerAddNewGameMachin}>+</button>
                </div>
                <div className='casino-info-conteiner'>
                    <div className='casino-info-money'>
                        Amount of money in casino: $ {choosedCasino.gameMachins.reduce((accumulator, currentValue) => accumulator + currentValue.amountOfMoneyInMachine, 0)}
                    </div>
                    <div className='casino-info-machins-count'>Count of machins: {choosedCasino.gameMachins.length}</div>
                    <div className='casino-info-your-balance'>Your balance: $ {choosedAdmin.adminMoney}</div>
                </div>
                {isAddingMachin ? 
                    <div className='add-new-machin-conteiner'>
                        <div className='add-new-machin-title'>Add new Game Machin</div>
                        <div className='add-new-machin-money'>Enter amount of money</div>
                        <input className='add-new-machin-money-input' type='number' step='100'></input>
                        <div className='add-new-machin-btn-conteiner'>
                            <button className='add-new-machin-btn-submit' onClick={() => handlerBtnSubmitAddingMachin(choosedAdmin)}>Submit</button>
                            <button className='add-new-machin-btn-cancel' onClick={handlerBtnCancleAddingMachin}>Cancel</button>
                        </div>
                    </div> 
                :
                    <ul className='list-of-casino-machins'>
                        {choosedCasino.gameMachins.map((machin) => (
                            <li key={nanoid(13)} className ='casino-machin'> 
                                <div className='casino-machin-header'>
                                    <div className='casino-machin-amount-of-money'>$ {machin.amountOfMoneyInMachine}</div>
                                    <div className='casino-machin-name'>Machin id {machin.machineId}</div>
                                    <button className='casino-machin-delete-btn' onClick={() => handlerDeletMachin(machin, choosedCasino, choosedAdmin)}>X</button>
                                </div>
                                <div className='casino-machin-action-title'>Take money from machin</div>
                                <input type='number' step='100' className='casino-machin-take-money-input'></input>
                                <button className='casino-machin-take-money-btn' onClick={(event) => handlerTakeMoneyFromCasino(event, machin)}>Take</button>
                                <div className='casino-machin-action-title'>Transfer money to machin</div>
                                <input type='number' step='100' className='casino-machin-transfer-money-input'></input>
                                <button className='casino-machin-transfer-money-btn' onClick={(event) => handlerTransferMoneyToCasino(event, machin)}>Transfer</button>
                                <div className='casino-machin-action-title'>Play</div>
                                <input type='number' step='100' className='casino-machin-play-input'></input>
                                <button className='casino-machin-play-btn'onClick={(event) => handlerPlayForAdmin(event, choosedAdmin, machin)}>Play</button>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </>
    )
}

export default GameMachins





