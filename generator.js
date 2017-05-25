const RSS=require("rss")

const util=require("./util.js")
const platforms=require("./platforms.js")

const generator=async(platform,feed)=>{
	const dataSource=platforms[platform]
	if(!(dataSource instanceof Function)){
		util.throw(404,`The platform ${platform} is not supported.`)
	}
	const data=await dataSource(feed)
	data.feed.generator="rss.bpc.moe"
	data.feed.feed_url=`https://rss.bpc.moe/${platform}/${feed}`
	const feedFile=new RSS(data.feed)
	for(const article of data.articles){
		feedFile.item(article)
	}
	return feedFile.xml()
}

module.exports=generator