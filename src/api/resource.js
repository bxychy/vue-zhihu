import {API_ROOT} from './config.js'
var apiZH={
	startimage: '/4/start-image/1080*1776',
	news: '/4/news/latest',
	newsbyid: '/4/news/',
	newsbydate: '/4/news/before/',
	newsinfo: '/4/story-extra',
	topics: '/4/themes',
	topicbyid: '/4/theme/',
	sections: '/3/sections',
	sectionbyid: '/3/section',
}

export const NewsResource = API_ROOT.concat( apiZH.news )
export const NewsIdResource = API_ROOT.concat( apiZH.newsbyid )
export const NewsDateResource = API_ROOT.concat( apiZH.newsbydate )
export const NewsInfoResource = API_ROOT.concat( apiZH.newsinfo )
export const TopicsResource = API_ROOT.concat( apiZH.topics )
export const TopicsIdResource = API_ROOT.concat( apiZH.topicbyid )
export const SectionsResource = API_ROOT.concat( apiZH.sections )
export const SectionIdResource = API_ROOT.concat( apiZH.sectionbyid )
