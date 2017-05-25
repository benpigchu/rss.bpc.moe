#!/usr/bin/env node

const Koa=require("koa")
const logger=require("koa-logger")
const router=require("koa-route")

const generator=require("./generator.js")

const app=module.exports=new Koa()

app.use(logger())

app.use(router.get("/:platform/:feed",async(ctx,platform,feed)=>{
	ctx.body=await generator(platform,feed)
	ctx.type="rss"
}))

if(!module.parent){
	app.listen(3000)
}
