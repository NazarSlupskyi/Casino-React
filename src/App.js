import React, { useState } from 'react'
import './App.css';
import Admin from './components/Admin'
import UsersList from './components/UsersList';
import { defaultState } from './constans'

const App = () => {
  const [state, setState] = useState(defaultState) 

  const handlerPlayForUser = (event, user, machin) => {
    let randomNum = Math.floor(Math.random() * (999 - 100) + 100)
    const result = {}
    let moneyForPlaying = Number(event.target.previousElementSibling.value)
    const arrWithNum = []

    if (moneyForPlaying > user.userMoney || machin.amountOfMoneyInMachine < Number(moneyForPlaying) * 3) {
      alert('Enter another amount because your amount or the amount in the machine is not enough to play')
      return
    }

    randomNum.toString().split('').forEach(number => result[number] = result[number] ? result[number] + 1 : 1)
    
    for ( let key in result ) {
      arrWithNum.push(result[key])
    }

    let resultOfGame = Math.max(...arrWithNum)

    if (resultOfGame === 2) {
      machin.amountOfMoneyInMachine -= moneyForPlaying * 2
      user.userMoney += moneyForPlaying * 2 
    } else if (resultOfGame === 3) {
      machin.amountOfMoneyInMachine -= moneyForPlaying * 3
      user.userMoney += moneyForPlaying * 3
    } else {
      user.userMoney -= moneyForPlaying
      machin.amountOfMoneyInMachine += moneyForPlaying
    }
    
    setState({...state})
  }

  const handlerPlayForAdmin = (event, user, machin) => {
    let randomNum = Math.floor(Math.random() * (999 - 100) + 100)
    const result = {}
    let moneyForPlaying = Number(event.target.previousElementSibling.value)
    const arrWithNum = []

    if (moneyForPlaying > user.adminMoney || machin.amountOfMoneyInMachine < Number(moneyForPlaying) * 3) {
      alert('Enter another amount because your amount or the amount in the machine is not enough to play')
      return
    }

    randomNum.toString().split('').forEach(number => result[number] = result[number] ? result[number] + 1 : 1)
    
    for ( let key in result ) {
      arrWithNum.push(result[key])
    }

    let resultOfGame = Math.max(...arrWithNum)

    if (resultOfGame === 2) {
      machin.amountOfMoneyInMachine -= moneyForPlaying * 2
      user.adminMoney += moneyForPlaying * 2 
    } else if (resultOfGame === 3) {
      machin.amountOfMoneyInMachine -= moneyForPlaying * 3
      user.adminMoney += moneyForPlaying * 3
    } else {
      user.adminMoney -= moneyForPlaying
      machin.amountOfMoneyInMachine += moneyForPlaying
    }
    
    setState({...state})
  }

  const handlerChooseRole = (event) => { 
    let logginedAdmin = state.admins.find((admin) => admin.loggedIn === true) 
    let choosedCasino =  logginedAdmin ? logginedAdmin.casinos.find((casino) => casino.isChoosedCasino === true) : false
    let logginedUser = state.users.find(user => user.isChoosedUser === true)
    
    if (choosedCasino) choosedCasino.isChoosedCasino = false
    if (logginedAdmin !== undefined) logginedAdmin.loggedIn = false
    if (isAddingAdmin) state.isAddingAdmin = false
    if (isAddingMachin) state.isAddingMachin = false
    if (isAddingCasino) state.isAddingCasino = false
    if (isAddingUser) state.isAddingUser = false
    if (logginedUser !== undefined) logginedUser.isChoosedUser = false

    setState({...state, role: event.target.innerHTML})
  } 

  const handlerLoggedInAdmin = (event) => {
    state.admins.find((admin) => admin.adminName === event.target.innerHTML).loggedIn = true
    setState({...state})
  }

  const handlerLoggedInUser = (event) => {
    state.users.find((user) => user.userName === event.target.innerHTML).isChoosedUser = true
    setState({...state})
  }

  const handlerAddNewUser = () => setState({...state, isAddingUser: true})
  const handlerAddNewAdmin = () => setState({...state, isAddingAdmin: true})
  const handlerAddNewGameMachin = () => setState({...state, isAddingMachin: true})
  const handlerAddNewCasino = () => setState({...state, isAddingCasino: true})
  const handlerBtnSubmitAddingMachin = (choosedAdmin) => {
    let inputMoney = document.querySelector('.add-new-machin-money-input').value
    const regexp =  /^[0-9]+([,.][0-9]+)?$/g
    const resultOfRegexpTest = regexp.test(inputMoney)
    let casinoToAddMachin = choosedAdmin.casinos.find(casino => casino.isChoosedCasino === true)

    if (inputMoney !== '' && resultOfRegexpTest && inputMoney <= choosedAdmin.adminMoney ) {
      casinoToAddMachin.gameMachins.push({amountOfMoneyInMachine: +inputMoney, machineId: casinoToAddMachin.gameMachins.length + 1 || 1})
      choosedAdmin.adminMoney -= inputMoney  
    } else {
      inputMoney = ''
      alert('Please keep the correct data')
    }
    setState({...state, isAddingMachin: false})
  }

  const handlerBtnSubmitAddingCasino = (admin) => {
    let inputName = document.querySelector('.add-new-casino-name-input').value
    
    if (inputName !== '') {
      admin.casinos.push({casinoName: inputName, isChoosedCasino: false, gameMachins: []})
    } else {
      alert ('Please keep the correct data')
    }
    
    setState({...state, isAddingCasino: false})
  }

  const handlerBtnSubmitAddingAdmin = () => {
    let inputName = document.querySelector('.add-new-admin-name-input').value
    let inputMoney = document.querySelector('.add-new-admin-money-input').value
    const regexp =  /^[0-9]+([,.][0-9]+)?$/g
    const resultOfRegexpTest = regexp.test(inputMoney)
    let existingAdmin = state.admins.find(admin => admin.adminName === inputName)
    
    if (existingAdmin) {
      alert(' Enter another name')
      return
    }

    if (inputName && inputMoney !== '') {
      resultOfRegexpTest 
        ? setState({...state, isAddingAdmin: false, admins: [...admins, {adminName: inputName, adminMoney: inputMoney, loggedIn: false, casinos: []}]}) 
        : alert('Please keep the correct data')
    } else {
      inputMoney = ''
      inputName = ''
      alert('Please keep the correct data')
    }
  }

  const handlerBtnSubmitAddingUser = () => {
    let inputName = document.querySelector('.add-new-user-name-input').value
    let inputMoney = document.querySelector('.add-new-user-money-input').value
    const regexp =  /^[0-9]+([,.][0-9]+)?$/g
    const resultOfRegexpTest = regexp.test(inputMoney)
    let existingUser = state.users.find(user => user.userName === inputName)
    
    if (existingUser) {
      alert(' Enter another name')
      return
    }

    if (inputName && inputMoney !== '') {
      resultOfRegexpTest 
        ? setState({...state, isAddingUser: false, users: [...users, {userName: inputName, userMoney: inputMoney, isChoosedUser: false}]}) 
        : alert('Please keep the correct data')
    } else {
      inputMoney = ''
      inputName = ''
      alert('Please keep the correct data')
    }
  }

  const handlerDeletMachin = (machin, casino, admin) => {
    let machinsInCasino = casino.gameMachins.filter(gameMachin => gameMachin.machineId !== machin.machineId)
    
    if (machinsInCasino.length === 0) admin.adminMoney += Number(machin.amountOfMoneyInMachine)
    
    machinsInCasino.map((machine => machine.amountOfMoneyInMachine += Number(machin.amountOfMoneyInMachine) / machinsInCasino.length))
    casino.gameMachins = machinsInCasino
    setState({...state})
  }
  
  const handlerBtnCancleAddingAdmin = () => setState({...state, isAddingAdmin: false})
  const handlerBtnCancleAddingMachin = () => setState({...state, isAddingMachin: false})
  const handlerBtnCancleAddingCasino = () => setState({...state, isAddingCasino: false})
  const handlerBtnCancleAddingUser = () => setState({...state, isAddingUser: false})
  const handlerChooseCasino = (casino) => {
    let prevChoosedCasino = admins.find(admin => admin.loggedIn === true).casinos.find(casino => casino.isChoosedCasino === true)
    
    if (prevChoosedCasino !== undefined) prevChoosedCasino.isChoosedCasino = false 
    
    casino.isChoosedCasino = true
    setState({...state})
  }

  const handlerTakeMoneyFromCasino = (event, machin) => {
    let amountMoneyToTake = event.target.previousElementSibling.value
    let adminWhoTakeMoney = state.admins.find(admin => admin.loggedIn === true)
    const regexp =  /^[0-9]+([,.][0-9]+)?$/g
    const resultOfRegexpTest = regexp.test(amountMoneyToTake)
    
    if (machin.amountOfMoneyInMachine >= amountMoneyToTake && resultOfRegexpTest) {
      adminWhoTakeMoney.adminMoney += Number(amountMoneyToTake)
      machin.amountOfMoneyInMachine -= Number(amountMoneyToTake)
    } else {
      alert('Not enough money')
    }

    setState({...state})
  }

  const handlerTransferMoneyToCasino = (event, machin) => {
    let amountMoneyToTransfer = event.target.previousElementSibling.value
    let adminWhoTransferMoney = state.admins.find(admin => admin.loggedIn === true)
    const regexp =  /^[0-9]+([,.][0-9]+)?$/g
    const resultOfRegexpTest = regexp.test(amountMoneyToTransfer)

    if (adminWhoTransferMoney.adminMoney >= amountMoneyToTransfer && resultOfRegexpTest) {
      adminWhoTransferMoney.adminMoney -= Number(amountMoneyToTransfer)
      machin.amountOfMoneyInMachine += Number(amountMoneyToTransfer)
    } else { 
      alert ('Not enough money')
    }
  
    setState({...state})
  }
  
  let { role, admins, isAddingAdmin, isAddingMachin, isAddingCasino, isAddingUser, users } = state
  
  return (
    <>
      <div className='header'> Mega Casino </div>
      <div className="tab-conteiner">
        <div className='choice-type-user' onClick={handlerChooseRole}>Super Admin</div> 
        <div className='choice-type-user' onClick={handlerChooseRole}>User</div>  
      </div>
      {role === 'Super Admin' && 
        <Admin admins={admins} 
          isAddingCasino={isAddingCasino}
          handlerDeletMachin={handlerDeletMachin}
          handlerAddNewAdmin={handlerAddNewAdmin} 
          isAddingAdmin={isAddingAdmin} 
          handlerChooseCasino={handlerChooseCasino} 
          handlerLoggedInAdmin={handlerLoggedInAdmin}
          handlerBtnSubmitAddingAdmin={handlerBtnSubmitAddingAdmin} 
          handlerBtnCancleAddingAdmin={handlerBtnCancleAddingAdmin} 
          handlerTakeMoneyFromCasino={handlerTakeMoneyFromCasino} 
          handlerTransferMoneyToCasino={handlerTransferMoneyToCasino} 
          isAddingMachin={isAddingMachin} 
          handlerAddNewGameMachin={handlerAddNewGameMachin} 
          handlerBtnSubmitAddingMachin={handlerBtnSubmitAddingMachin}
          handlerBtnCancleAddingMachin={handlerBtnCancleAddingMachin}
          handlerAddNewCasino={handlerAddNewCasino}
          handlerBtnCancleAddingCasino={handlerBtnCancleAddingCasino}
          handlerBtnSubmitAddingCasino={handlerBtnSubmitAddingCasino}
          handlerPlayForAdmin={handlerPlayForAdmin}
        />}
      {role === 'User' && 
        <UsersList users={users}
          handlerLoggedInUser={handlerLoggedInUser}
          isAddingUser={isAddingUser}
          handlerAddNewUser={handlerAddNewUser}
          handlerBtnSubmitAddingUser={handlerBtnSubmitAddingUser}
          handlerBtnCancleAddingUser={handlerBtnCancleAddingUser}
          admins={admins}
          handlerPlayForUser={handlerPlayForUser}
        />}
      {role === undefined && <div className='massage-on-first-run'>Choose your role</div>}
    </>
  )
}



export default App;
