import Constant from '../Constant';
import axios from 'axios';
import CONF from '../Config';

export default {
    [Constant.ADD_CONTACT_FORM]: (store) => {
        store.commit(Constant.ADD_CONTACT_FORM);
    },
    [Constant.ADD_CONTACT]: (store) => {
        axios.post(CONF.ADD, store.state.contact)
            .then((response) => {
                if (response.data.status == "success") {
                    store.dispatch(Constant.CANCEL_FORM);
                    store.dispatch(Constant.FETCH_CONTACTS, { pageno: 1 });
                } else {
                    console.log("연락처 추가 실패 :" + response.data);
                }
            })
    },
    [Constant.EDIT_CONTACT_FORM]: (store, payload) => {
        axios.get(CONF.FETCH_ONE.replace("${no}", payload.no))
            .then((response) => {
                store.commit(Constant.EDIT_CONTACT_FORM, { contact: response.data });
            })
    },
    [Constant.UPDATE_CONTACT]: (store) => {
        var currentPageno = store.state.contactlist.pageno;
        var contact = store.state.contact;
        axios.put(CONF.UPDATE.replace("${no}",con))
    }
}