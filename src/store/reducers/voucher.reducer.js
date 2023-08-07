import { SET_PURCHASE_VOUCHERS } from "../types";

const initialState = {
    purchase_voucher: []
}

function voucherReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case SET_PURCHASE_VOUCHERS: {
            return Object.assign({}, { ...state }, { purchase_voucher: payload });
        }
        default:
            return state;
    }
}

export default voucherReducer;