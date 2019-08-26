import ajax from './ajax'
const BASE_URL = 'https://www.xlxt.net'
// const BASE_URL = ''
// ------------------------------------------------------------------------
// 行业报告
export const tradeArticle = () => ajax(BASE_URL + '/Article/GetArticleShow?Keyword=&ClassifyID=32&Pagesize=15&Pageindex=1&IsRecommend=0')
// 读书报告
export const studyArticle = () => ajax(BASE_URL + '/Article/GetArticleShow?Keyword=&ClassifyID=31&Pagesize=15&Pageindex=1&IsRecommend=0')
// 零售峰会点亮行动
export const retailArticle = () => ajax(BASE_URL + '/Article/GetArticleShow?Keyword=&ClassifyID=30&Pagesize=15&Pageindex=1&IsRecommend=0')
// 线下
export const offArticle = () => ajax(BASE_URL + '/Article/GetArticleShow?Keyword=&ClassifyID=29&Pagesize=15&Pageindex=1&IsRecommend=0')
// 热点分享
export const hostArticle = () => ajax(BASE_URL + '/Article/GetArticleShow?Keyword=&ClassifyID=515&Pagesize=15&Pageindex=1&IsRecommend=0')
// 店长储备店长
export const shopArticle = (params) => ajax(BASE_URL + '/Course/GetCourseShow', params)
// 获取文章详情有权限
export const ArticleInfo1 = (params) => ajax(BASE_URL + '/Article/GetArticleByID', params)
// 获取文章详情无权限
export const ArticleInfo2 = (params) => ajax(BASE_URL + '/Article/GetArticleByIDShow', params)
// 获取评价
// 文章点赞
export const GetArticleLike = (params) => ajax(BASE_URL + '/Article/AddArticleLike', params)
// 获取评价
export const GetReviewFront = (params) => ajax(BASE_URL + '/Review/GetArticleReviewFront', params)
// 文章添加评价
export const AddReview = (params) => ajax(BASE_URL + '/Review/AddArticleReview', params)
// 文章评价回复
export const AddReviewReply = (params) => ajax(BASE_URL + '/Review/AddArticleReviewReply', params)
// 文章评论点赞
export const AddReviewLike = (params) => ajax(BASE_URL + '/Review/AddArticleReviewLike', params)
// 视频播放
export const VideoPlay = (params) => ajax(BASE_URL + '/Course/GetPlayAuthByVideoID', params)
