import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onSnapshot,doc,collection,getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

// let pr=[],l=false;
export const loaditems=createAsyncThunk(
    'cart/items',
    async()=>{
      
    const a=[]
      const res= await getDocs(collection(db,'Cars'))
        res.docs.forEach((doc,index)=>{
            let d=doc.data()
            d['id']=index+1
            a.push(d)
        })

        return a;
    }
)

export const cartslice=createSlice({
    name:'cart',
    initialState:{
        cartcount:0,
        currentitem:{},
        cartitems:[],
        items:[]
    },
    reducers:{
        addtocart:(state,payload)=>{
            console.log('add',payload)
            state.cartcount+=1
            // const ci=state.items.filter((item)=>{
            //    const x={...item}
            //     if(payload.payload===x.id)
            //         return x;
            // })
            // console.log(ci)
            // state.cartitems=[...state.cartitems,{...ci[0]}]
            // console.log(state.cartitems)
        },
       deletefromcart:(state)=>{
            console.log('delete')
            if(state.cartcount===0)
                return state;
            state.cartcount-=1
            
        },
        getitems:(state)=>{
            return state.items;
        },
        updateitemlist:(state,payload)=>{
            // console.log('yeyyy, its working',payload)
            state.items=payload.payload
                                                                                                                                           
        }                                                                                                                                                                                                                                                                                       
}                                                                                                                                                                                                                                                                                       
,
extraReducers:{
    [loaditems.pending]:(state,action)=>{
        console.log('pending thunk')
    }
    ,
    [loaditems.fulfilled]:(state,payload)=>{
        console.log(payload)
        state.items=payload.payload;
        console.log(state.items)
    },
    [loaditems.rejected]:()=>{
        console.log('rejected thunk')
    }
}


}

)

export const {addtocart,deletefromcart,getitems,updateitemlist}=cartslice.actions;
export default cartslice.reducer;