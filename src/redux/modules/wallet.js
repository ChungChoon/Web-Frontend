import { cav } from 'klaytn/caver';
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

const INTEGRATE_WALLET = 'wallet/INTEGRATE_WALLET';
const LOAD_WALLET = 'wallet/LOAD_WALLET';
const REMOVE_WALLET = 'wallet/REMOVE_WALLET';
const CREATE_WALLET = 'wallet/CREATE_WALLET';
const GET_WALLET = 'wallet/GET_WALLET';

export const integrateWallet = createAction(INTEGRATE_WALLET);
export const loadWallet = createAction(LOAD_WALLET);
export const removeWallet = createAction(REMOVE_WALLET);
export const createWallet = createAction(CREATE_WALLET);
export const getWallet = createAction(GET_WALLET);

const initialState = Map({
    walletInstance: Map({}),
    newWalletInstance: Map({})
})

export default handleActions({
    [INTEGRATE_WALLET]: (state, action) => {
        const walletInstance = cav.klay.accounts.privateKeyToAccount(action.payload)
        cav.klay.accounts.wallet.add(walletInstance)
        sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
        return state.set('walletInstance', Map(walletInstance))
    },
    [LOAD_WALLET]: (state, action) => {
        cav.klay.accounts.wallet.add(action.payload.walletInstance)
        return state.set('walletInstance', Map(action.payload.walletInstance))
    },
    [REMOVE_WALLET]: (state, action) => {
        sessionStorage.removeItem('walletInstance')
        return state.set('walletInstance', Map({}))
    },
    [CREATE_WALLET]: (state, action) => {
        // console.log(action.payload)
        const newWalletInstance = cav.klay.accounts.create(action.payload)
        cav.klay.personal.importRawKey(newWalletInstance.privateKey.slice(2), action.payload).then(
            function(resolveData){
                cav.klay.personal.unlockAccount(resolveData, action.payload, 6000)
            }
        ).catch(function (err) {
            console.error(err);
        });
        cav.klay.accounts.wallet.add(newWalletInstance)
        return state.set('newWalletInstance', Map(newWalletInstance))
    }
}, initialState)