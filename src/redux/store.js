import {configureStore} from '@reduxjs/toolkit';
import cartreducer from './cart'
export default configureStore({
    reducer:{

        cart:cartreducer,
        
    }
});