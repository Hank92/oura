// app/routes.js

var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var	methodOverride = require('method-override');

var issueModel = require('../app/models/hazzulPost');
var hazzulBestModel = require('../app/models/hazzulBestPost');


module.exports = function (app, passport){

app.get('/about', function (req, res){
	res.render('about.ejs');
})

app.get('/', function (req, res){


if(req.query.search){

	var currentPage = 1;
	if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    	}

		issueModel.paginate({ title: {$regex : req.query.search} } , {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
		 	var searchTitle = req.query.search;
		 		pageSize = results.limit;
        pageCount = (results.total)/(results.limit);
    		pageCount = Math.ceil(pageCount);
    	  totalPosts = results.total;
    	//console.log(results.docs)

    	res.render('hazzulSearch.ejs', {
				search: 1,
    		issuepostModels: results.docs,
    		searchTitle: searchTitle,
    		pageSize: pageSize,
    		pageCount: pageCount,
    		totalPosts: totalPosts,
    		currentPage: currentPage
    	})//res.render

})
	}
	else {
	var currentPage = 1;
	if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    	}
		issueModel.paginate({}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
         if(err){
         console.log("error!!");
         console.log(err);
     } else {
     	var args = Array.prototype.slice.call(results.docs);

    	args = args.sort(function(a,b) {
        if ( a.myClicks < b.myClicks )
            return -1;
        if ( a.myClicks > b.myClicks)
            return 1;
        return 0;
    } );
    	var sortId
    	sortId = args.slice(0);
    	sortId.splice(15,20);
    	sortId = sortId.sort(function(a,b) {
        if ( a._id < b._id )
            return -1;
        if ( a._id > b._id)
            return 1;
        return 0;
    } );

    	    pageSize = results.limit;
          pageCount = (results.total)/(results.limit);
    			pageCount = Math.ceil(pageCount);
    	    totalPosts = results.total;
    	//console.log(results.docs)
    	res.render('hazzul.ejs', {
				search: 0,
    		issuepostModel: sortId,
    		issuepostModels: args,
    		pageSize: pageSize,
    		pageCount: pageCount,
    		totalPosts: totalPosts,
    		currentPage: currentPage
    	})//res.render
     }//else
     });//paginate
}
});


app.get('/postdelete', function (req, res){
	issueModel.find({}, function(req, docs){
		res.render('dramaDelete.ejs', {postModels: docs})
	})

})

/*
app.get('/postdelete', function (req, res){
	issueModel.remove({}, function(err){
 if(err) res.json(err);
 else    res.redirect('/postDelete');
});
});
*/

app.get('/postdelete/:id/delete', function(req, res){
	issueModel.remove({_id: req.params.id},
	   function(err){
		if(err) res.json(err);
		else    res.redirect('/postDelete');
	});
});


app.get('/entertainDelete', function (req, res){
	dailyModel.find({}, function(req, docs){
		res.render('entertaindelete.ejs', {postModels: docs})
	})
})


app.get('/entertainDelete/:id/delete', function(req, res){
	dailyModel.remove({_id: req.params.id},
	   function(err){
		if(err) res.json(err);
		else    res.redirect('/entertainDelete');
	});
});


app.param('id', function(req, res, next, id){
	issueModel.findById(id, function(err, docs){
		if(err) res.json(err);
		else
			{
				req.postId = docs;
				next();
			}
			});
});



app.get('/hazzul/:id', function(req, res){
	var postId = req.postId;
	postId.usernumClicks += Math.floor((Math.random() * 10) + 1);
	postId.myClicks += 1;
	postId.save(function (err, data){
		if (err) res.send(err)
			else{
				console.log('accessed')
			}
	})

});

app.post('/:id/:page/hazzul', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/?page=' + pageNum)
		});
	})

}) //app.post



app.param('id', function(req, res, next, id){
	hazzulBestModel.findById(id, function(err, docs){
		if(err) res.json(err);
		else
			{
				req.dailypostId = docs;
				next();
			}
			});
});




};






//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------




//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
request('http://bhu.co.kr/bbs/board.php?bo_table=free&page=1', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						video_url: video_url,
						img_comment: image_comment,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

			var repeatedImg = image_url[0];


			issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free2&page=1', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});









request('http://bhu.co.kr/bbs/board.php?bo_table=free2&page=2', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free2&page=3', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];

				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free2&page=4', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						video_url: video_url,
						img_comment: image_comment,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];

				issueModel.find({img_url: repeatedImg}, function(err, newPosts){
				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free2&page=5', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];


				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free&page=2', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_url.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];


				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_url.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free2&page=6', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})
				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free&page=3', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})
				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free&page=4', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];
				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free&page=5', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

				var repeatedImg = image_url[0];

				issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){

					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

			var repeatedImg = image_url[0];
			issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=free&page=6', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

			var repeatedImg = image_url[0];
			issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var image_comment = [];
				var video_url = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

			var repeatedImg = image_url[0];
			issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=temp', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg0').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('.ytp-title-link').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)

			var repeatedImg = image_url[0];
			issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});



	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=temp', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);

		$('.bg1').each(function(){
		var bhuTitle = $(this).find('td.subject a font').text();
		var numClicks = $(this).find('td.hit').text();
		if (bhuTitle.indexOf("엠봉") >= 0) {
			bhuTitle = bhuTitle.replace("엠봉", "하즐");
			}
		var newHref = $(this).find('a').attr('href');
		newHref = newHref.replace("≀","&");
		newHref = newHref.replace("id","wr_id");
		newHref = newHref.replace("..",".");
		var bhuUrl = "http://www.bhu.co.kr"+ newHref;


			request(bhuUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('span div img').each(function(){

					var img_url = $(this).attr('src');
					image_url.push(img_url);

				})

				$('span div p').each(function(){
					var img_comments = $(this).text();
					image_comment.push(img_comments);

				})

				$('.ytp-title-link').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})

				// scrape all the images for the post
				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('span div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('span div iframe').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$('video source').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the videos for the post

					$("[style *= 'line-height: 180%']").each(function(){
						var content =  $(this).text();
						if (content.indexOf("엠봉") >= 0) {
						content = content.replace("엠봉", "하즐");
						comments.push({content: content});
						}
						comments.push({content: content});
					})//scrape all the comments for the post

					comments.splice(0,1)


					var repeatedImg = image_url[0];


			issueModel.find({img_url: repeatedImg}, function(err, newPosts){

				if (newPosts.length == 0 && image_url[0].indexOf("../data") !== 0 && image_url[0].indexOf("https://etorrent.co.kr/") !== 0  && image_url[0].indexOf("http://bhu.co.kr/data/cheditor4") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						img_comment: image_comment,
						video_url: video_url,
						comments: comments,
						numClicks: numClicks
					})
			Post.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(Post);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});



	}//첫 if구문

});
