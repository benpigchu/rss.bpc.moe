// zhuanlan.zhihu.com

const util=require("../util.js")

const imgPlaceHolderMatcher=/<img src="\/\/zhstatic.zhihu.com\/assets\/zhihu\/ztext\/whitedot.jpg" [^><]*>/

const dataSource=async(feed)=>{
	const column=JSON.parse(await util.fetch(`https://zhuanlan.zhihu.com/api/columns/${feed}`))
	const posts=JSON.parse(await util.fetch(`https://zhuanlan.zhihu.com/api/columns/${feed}/posts?limit=20`))
	const feedData={title:column.name,
		description:column.intro,
		site_url:`https://zhuanlan.zhihu.com/${feed}`,
		image_url:column.avatar.template.replace("{size}","xl").replace("{id}",column.avatar.id),
		categories:column.topics.map((topic)=>topic.name)}
	const articleData=[]
	for(const postData of posts){
		const data=JSON.parse(await util.fetch(`https://zhuanlan.zhihu.com/api/posts/${postData.slug}`))
		articleData.push({title:data.title,
			description:data.content.replace(imgPlaceHolderMatcher,"").replace("<noscript>","").replace("</noscript>","").replace("<img ","<img referrerpolicy=\"no-referrer\" "),
			url:`https://zhuanlan.zhihu.com/p/${data.slug}`,
			categories:data.topics.map((topic)=>topic.name),
			author:data.author.name,
			date:data.publishedTime})
	}
	return{feed:feedData,articles:articleData}
}

module.exports=dataSource