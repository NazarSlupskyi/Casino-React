import React from 'react';
import { nanoid } from 'nanoid'

const User = ({isLogedIn, admins, handlerPlayForUser}) => {
    return (
        <>
            <div className='user-header'>
                <div className='user-name-title'>Name: {isLogedIn.userName}</div>
                <div className='user-amount-of-money'>Amount of money: {isLogedIn.userMoney} $</div>
            </div>

            <ul className='user-casinos-conteiner'>
                {admins.map(admin => admin.casinos.map( casino => {
                    if (casino.gameMachins.length !== 0) {
                        return(
                        <li key={nanoid(14)} className='user-casino'>
                            <div className='user-casino-name'>Casino {casino.casinoName}</div>
                            {casino.gameMachins.map(machin => <div key={nanoid(15)} className='user-casino-conteiner'>
                                <div className='user-casino-machin-name'>Machin №{machin.machineId}</div>
                                <div className='user-casino-play-title'>Play</div>
                                <input className='user-casino-play-input' type='Number' step='100'></input>
                                <button className='user-casino-play-button' onClick={(event) => handlerPlayForUser(event, isLogedIn, machin)}>Play</button>  
                            </div>)}
                        </li>
                        )
                    }    
                 }))}
            </ul>
        </>
    )
}

export default User;