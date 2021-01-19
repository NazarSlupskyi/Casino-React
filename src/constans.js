export const defaultState = {
    isAddingAdmin: false, 
    isAddingCasino: false, 
    isAddingUser: false, 
    isAddingMachin: false, 
    users:[{userName: 'Jhon', userMoney: 10000, isChoosedUser: false}], 
    admins:[{adminName: 'Adam', adminMoney: 2000, loggedIn: false, casinos: [{casinoName: '777', isChoosedCasino: false, gameMachins: [{amountOfMoneyInMachine: 5000, machineId: 1}]}]}]
}
