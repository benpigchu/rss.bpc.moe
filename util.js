const request=require("request-promise-native")

exports.throw=(code,msg,properties)=>{
	const err=new Error(msg)
	Object.assign(err,{status:code},properties)
	throw err
}

exports.rethrow=(err,code,properties)=>{
	Object.assign(err,{status:code},properties)
	throw err
}

exports.fetch=async(url)=>{
	try{
		return await request(url)
	}catch(err){
		if(err.name==="StatusCodeError"){
			if(err.response.statusCode===404){
				exports.throw(404,`This page do not exist`)
			}
			exports.throw(502,`Unexpected response`)
		}
		if(err.error){
			exports.rethrow(err.error)
		}
		throw err
	}
}