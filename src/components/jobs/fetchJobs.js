
// this code fetches jobs from network which expects such as params(location,descriptions) and page
import { useReducer,useEffect } from 'react'
import axios from 'axios'

// things you wanna do
const ACTION ={
    MAKE_REQUEST:'make-request',
    GET_DATA:'get_data',
    ERROR:'error',
    UPDATE_HAS_NEXT_PAGE:'update-has-next-page'

}
///to prevent cors errors in local dev use this heroku cors any where

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

function reducer(state,action){
    switch(action.type){
        case ACTION.MAKE_REQUEST:
            return {loading:true,jobs:[]}

        case ACTION.GET_DATA:
            return {...state,loading:false,jobs:action.payload.jobs}

        case ACTION.UPDATE_HAS_NEXT_PAGE:
            return {...state,hasNextPage: action.payload.hasNextPage}

        case ACTION.ERROR:
            return {...state,loading:false,error:action.payload.error,jobs:[]}
        default:
        return state
    }

}

export default function FetchJobs(params,page){
    const[state,dispatch] = useReducer(reducer,{jobs:[],loading:true})

    const cancelToken = axios.CancelToken.source()

    useEffect( ()=>{
        dispatch({type:ACTION.MAKE_REQUEST})
        axios.get(BASE_URL,{
            cancelToken:cancelToken.token,
            params:{markdown:true,page:page,...params}
        }).then(res=>{
            dispatch({type:ACTION.GET_DATA,payload:{jobs:res.data}})
        }).catch(e=>{
            if(axios.isCancel(e)) return
            dispatch({type:ACTION.ERROR,payload:{error:e}})
        })

        const cancelToken1 = axios.CancelToken.source()
        axios.get(BASE_URL,{
            cancelToken:cancelToken1.token,
            params:{markdown:true,page:page+1,...params}
        }).then(res=>{
            dispatch({type:ACTION.UPDATE_HAS_NEXT_PAGE,payload:{hasNextPage:res.data !== 0}})
        }).catch(e=>{
            if(axios.isCancel(e)) return
            dispatch({type:ACTION.ERROR,payload:{error:e}})
        })


        return()=>{
            cancelToken.cancel()
            cancelToken1.cancel()
        }

    },[params,page])

    return state
}