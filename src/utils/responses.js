
export const error500 = (res,error)=>{
    console.log('inside catch',error)
    return res.status(500).json(error)
}


export const responseStatus = (res,response)=>{
    return res.status(response.status).json({ message:response?.message, data:response?.data })
}
