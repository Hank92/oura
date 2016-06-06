// app/routes.js

var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var	methodOverride = require('method-override');

var postModel = require('../app/models/post');
var issueModel = require('../app/models/issuePost');
var dailyModel = require('../app/models/dailyPost');
var dailydramaModel = require('../app/models/dailydramaPost');
var usdramaModel = require('../app/models/usdramaPost');

module.exports = function (app, passport){

app.get('/about', function (req, res){
	res.render('about.ejs');
})

app.get('/', function (req, res){
if(req.query.search){
	issueModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		pageSize  = 0;
		pageCount = 0;
		totalPosts = 0;
		currentPage =0;
		res.render('issuein.ejs', {
			issuepostModels: all_pins,
			searchTitle: searchTitle,
			pageSize: pageSize,
    		pageCount: pageCount,
    		totalPosts: totalPosts,
    		currentPage: currentPage
		})
		
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
    	    pageSize = results.limit;
            pageCount = (results.total)/(results.limit);
    		pageCount = Math.ceil(pageCount);
    	    totalPosts = results.total;
    	console.log(results.docs)

    	res.render('issuein.ejs', {
    		issuepostModels: results.docs,
    		pageSize: pageSize,
    		pageCount: pageCount,
    		totalPosts: totalPosts,
    		currentPage: currentPage
    	})//res.render
     }//else
     });//paginate
}	
});

app.get('/entertain', function (req, res){
if(req.query.search){
	dailyModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('entertain.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('entertain.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/postdelete', function (req, res){
	issueModel.find({}, function(req, docs){
		res.render('postDelete.ejs', {postModels: docs})	
	})
	
})


app.get('/postdelete/:id/delete', function(req, res){
	issueModel.remove({_id: req.params.id}, 
	   function(err){
		if(err) res.json(err);
		else    res.redirect('/postDelete');
	});
});

app.get('/dramaDelete', function (req, res){
	usdramaModel.find({}, function(req, docs){
		res.render('dramadelete.ejs', {postModels: docs})	
	})
	
})


app.get('/dramaDelete/:id/delete', function(req, res){
	usdramaModel.remove({_id: req.params.id}, 
	   function(err){
		if(err) res.json(err);
		else    res.redirect('/dramaDelete');
	});
});

app.get('/entertainDelete', function (req, res){
	dailydModel.find({}, function(req, docs){
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


app.get('/drama', function (req, res){
if(req.query.search){
	dailydramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		
		currentPage =0;
		res.render('drama.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
    		currentPage: currentPage
		})
		
		})
	}
	else{
    		postModels = 0;
    	    currentPage= 1;

    	res.render('drama.ejs', {
    		postModels: postModels,
    		currentPage: currentPage
    	})
	}
});

app.get('/usdrama', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdrama.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdrama.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaB', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaB.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaB.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaC', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaC.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaC.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaD', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaD.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaD.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaE', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaE.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaE.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaF', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaF.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaF.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaG', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaG.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaG.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaH', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaH.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaH.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaS', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaS.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaS.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
});

app.get('/usdramaOthers', function (req, res){
if(req.query.search){
	usdramaModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		currentPage =0;
		res.render('usdramaOthers.ejs', {
			postModels: all_pins,
			searchTitle: searchTitle,
			
		})
		
		})
	}
	else {
    	
    		postModels = 0;
    	    currentPage= 1;
  
	res.render('usdramaOthers.ejs',  {
    		postModels: postModels,
    		currentPage: currentPage
    	})//res.render    	
    
	}
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

app.get('/issuein/:id', function(req, res){
	var postId = req.postId;
	res.render('individualIssueIn.ejs', {issuepostModel: postId});
	console.log(postId)//finds the matching object
});

app.param('id', function(req, res, next, id){
	dailyModel.findById(id, function(err, docs){
		if(err) res.json(err);
		else
			{
				req.dailypostId = docs;
				next();
			}
			});	
});

app.get('/entertain/:id', function(req, res){
	res.render('individualEntertain.ejs', {issuepostModel: req.dailypostId});
	
});

app.param('id', function(req, res, next, id){
	dailydramaModel.findById(id, function(err, docs){
		if(err) res.json(err);
		else
			{
				req.dailydramapostId = docs;
				next();
			}
			});	
});

app.get('/drama/:id', function(req, res){
	res.render('individualDrama.ejs', {issuepostModel: req.dailydramapostId});
	
});

app.param('id', function(req, res, next, id){
	usdramaModel.findById(id, function(err, docs){
		if(err) res.json(err);
		else
			{
				req.usdramapostId = docs;
				next();
			}
			});	
});

app.get('/usdrama/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaB/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});
app.get('/usdramaC/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaD/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaE/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaF/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaG/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaH/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaS/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});

app.get('/usdramaOthers/:id', function(req, res){
	res.render('individualusDrama.ejs', {issuepostModel: req.usdramapostId});
	
});


/*
app.param('id', function(req, res, next, id){
	postModel.findById(id, function(err, docs){
		if(err) res.json(err);
		else
			{
				req.mainpostId = docs;
				next();
			}
			});	
});

app.get('/mbong19/:id', function(req, res){
	   res.render('individualmbong19.ejs', {postModel: req.mainpostId});
	   console.log(req.mainpostId)
	})
	
	//finds the matching object

*/
app.post('/:id/post/Issue', function (req, res){
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/issuein/'+req.params.id )
		});
	})

}) //app.post  

app.post('/:id/post/daily', function (req, res){
	dailyModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/entertain/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/dailydrama', function (req, res){
	dailydramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/drama/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdrama', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdrama/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaB', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaB/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaC', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaC/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaD', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaC/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaE', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaE/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaF', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaF/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaG', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaG/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaH', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaH/'+req.params.id )
		});
	})

}) //app.post 

app.post('/:id/post/usdramaS', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaS/'+req.params.id )
		});
	})

}) //app.post

app.post('/:id/post/usdramaOthers', function (req, res){
	usdramaModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/usdramaOthers/'+req.params.id )
		});
	})

}) //app.post 

//post a comment on humor board
app.post('/:id/post', function (req, res){
	postModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else 
				res.redirect('/mbong19/' + req.params.id )
		});
	})

}) //app.post  
};

//house of cards
request('http://www.heyheyfriends.com/browse-nhx56432-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "Borgias2 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//house
request('http://www.heyheyfriends.com/browse-house8-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "House8 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
/*
//how I met your mother
request('http://www.heyheyfriends.com/browse-mzs52498-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "How I met your mother9 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
*/
//heroes
request('http://www.heyheyfriends.com/browse-erw324242wr-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Heroes4 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
//New Girl
request('http://www.heyheyfriends.com/browse-nyt54796-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "NewGirl5 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Forever
request('http://www.heyheyfriends.com/browse-qyh14621-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Forever1 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Finder
request('http://www.heyheyfriends.com/browse-34243242-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Finder1 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Cougar Town
request('http://www.heyheyfriends.com/browse-NQA12698-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Cougar Town5 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Escape from Alcatraz
request('http://www.heyheyfriends.com/browse-13546752-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Escape from Alcatraz1 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Switched at Birth
request('http://www.heyheyfriends.com/browse-agf2568-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Switched at Birth2 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//breaking bad
request('http://www.heyheyfriends.com/browse-dfc5478-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Breaking bad4 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//prison break
request('http://www.heyheyfriends.com/browse-sfds34543535-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Prison break4 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Silicon Valley
request('http://www.heyheyfriends.com/browse-mbd41589-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Silicon Valley1 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Sherlock 
request('http://www.heyheyfriends.com/browse-123658-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Sherlock3 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Spartacus 
request('http://www.heyheyfriends.com/browse-Spartacus3-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Spartacus3 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Supernatural
request('http://www.heyheyfriends.com/browse-vck52497-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Supernatural10 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
/*
//Simpsons
request('http://www.heyheyfriends.com/browse-sdfsffd45435efsdf-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Simpson " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
*/
//Shameless
request('http://www.heyheyfriends.com/browse-CQA26974-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Shameless4 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Skin
request('http://www.heyheyfriends.com/browse-CNB25469-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Skin7 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Sex and the City
request('http://www.heyheyfriends.com/browse-dgd43534-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Sex and the City6 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//Game of Thrones
request('http://www.heyheyfriends.com/browse-WVD5268-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Game of Thrones3s " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
/*
request('http://www.mgoon.com/ch/Micis/?currentPage=5&perPage=12&sort_column=cdate&sort_type=1&search_keyword=G.o.T&f_date=0&f_quality=0&f_duration=0', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video-item').each(function(){
		var heyTitle = $(this).find('.video-title a').text();
		heyTitle = "Game of Thrones1 " + heyTitle;
		var newHref = $(this).find('.video-thumbnail a').attr('href');
	 	var heyUrl = "http://www.mgoon.com" + newHref;

			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#player_section').each(function(){
					var newHref = $(this).find("iframe").attr('src');
					vid_url = "http://www.mgoon.com" + newHref
				})


				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
*/
/*
usdramaModel.find({}, function(err, newPosts){
				
				if (newPosts.length){
					//save data in Mongodb
					var vid_url= "http://play.mgoon.com/Video/V5777531@key_YK4JTLkySbo67nOgaHTbMfvosdC8Q8btMyVxcJhBx7S4dqSDxWJK0PBxSswChfrkDq4AjXh2v698NEDaNJtY6UmfhVEJaKipBUiiPjDisWHpYQW561fetKUFLisZhwTRQ03Z@auto"
				
					var heyTitle = "Game of Thrones4 시즌 4-10" 

					var issuePost = new usdramaModel({
						title: heyTitle,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
*/
/*
usdramaModel.find({}, function(err, newPosts){
				
				if (newPosts.length){
					//save data in Mongodb
					var vid_url= "http://play.mgoon.com/Video/V2358380@key_YK4JTLkySbo67nOgaHTbMfvosdC8Q8btMyVxcJhBx7S4dqSDxWJK0PBxSswChfrkDq4AjXh2v68aYg3h83jLx9NhrFhLhF3nTqUeAepaJxynIYXGshEDnvORLhOZkii6CR8T2lmiphyP0ie@auto"
				
					var heyTitle = "How I met your mother1 시즌 1-22" 

					var issuePost = new usdramaModel({
						title: heyTitle,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			*/
//24
request('http://www.heyheyfriends.com/browse-wer3242-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "twentyfour6 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

/*
//awkward 
request('http://www.heyheyfriends.com/browse-awq23654-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Awkward3 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})


				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
//arrow
request('http://www.heyheyfriends.com/browse-wjs24963-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "Awkward3 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})


				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
// American horror story
request('http://www.heyheyfriends.com/browse-zxs24598-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "American horror story2 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})


				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
// BigBang Theory
request('http://www.heyheyfriends.com/browse-dsf43w5345-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "BigBang Theory5 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})


				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Cuckoo
request('http://www.heyheyfriends.com/browse-wed2369-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "Castle1 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// 보르지아
request('http://www.heyheyfriends.com/browse-cds25647-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "Borgias2 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});



// 보드워크 엠파이어 
request('http://www.heyheyfriends.com/browse-GBN21469-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "Boardwalk Empire3 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Chuck
request('http://www.heyheyfriends.com/browse-wed741258-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Chuck5 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Dirk Gently
request('http://www.heyheyfriends.com/browse-1568721-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Dirk Gently1 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Dexter
request('http://www.heyheyfriends.com/browse-CJH52481-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Dexter8 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Drop dead diva
request('http://www.heyheyfriends.com/browse-gfd25874-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "Drop Dead Diva4 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Endeavour
request('http://www.heyheyfriends.com/browse-bds14963-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Endeavour1 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Episode
request('http://www.heyheyfriends.com/browse-xcv145236-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Episode2 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Fringe
request('http://www.heyheyfriends.com/browse-wqs2698-videos-2-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		//heyTitle = "Fringe4 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Friends
request('http://www.heyheyfriends.com/browse-wer234-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Friends10 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Glee
request('http://www.heyheyfriends.com/browse-wbv25463-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Glee5 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

// Gossip Girl
request('http://www.heyheyfriends.com/browse-rgb23456-videos-1-date.html', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('.video_i').each(function(){
		var heyTitle = $(this).find('a .song_name').text();
		heyTitle = "Gossip Girl6 " + heyTitle;
		var heyUrl = $(this).find('a').attr('href');
	 	
			request(heyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var vid_url;

				$('#Playerholder embed').each(function(){
					vid_url = $(this).attr('src');
				})

				// scrape all the images for the post
				usdramaModel.find({title: heyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new usdramaModel({
						title: heyTitle,
						url: heyUrl,
						video_url: vid_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

request('http://bhu.co.kr/bbs/board.php?bo_table=best&page=1', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('td.subject').each(function(){
		var bhuTitle = $(this).find('a font').text();
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
							comments.push({content: content}); 	
					})//scrape all the comments for the post

					comments.splice(0,1)

			issueModel.find({title: bhuTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var Post = new issueModel({
						title: bhuTitle,
						url: bhuUrl,
						img_url: image_url,
						video_url: video_url,
						comments: comments
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


request('http://issuein.com/', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('td.title').each(function(){
		var issueTitle = $(this).find('a.hx').text();
		var newHref = $(this).find('a').attr('href');
		var issueUrl = "http://www.issuein.com"+ newHref;
	 	
			request(issueUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var image_url = [];
				var video_url = [];

				$('article div img').each(function(){
					var img_url = $(this).attr('src');
					image_url.push(img_url);	
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the images for the post
				issueModel.find({title: issueTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new issueModel({
						title: issueTitle,
						url: issueUrl,
						img_url: image_url,
						video_url: video_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//비정상회담
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EB%B9%84%EC%A0%95%EC%83%81%ED%9A%8C%EB%8B%B4', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://lh3.googleusercontent.com/G8G7UWO-6ebfRc-RJpDXdQshq_4LLwabvEVp5Z17wcLp5Fu3f4EkOfjFhmtVaFzW5-V0nAFqs8qzn8NP6IDR1ByfRZXBjWkykg=s0";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//슈퍼맨이 돌아왔다
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%8A%88%ED%8D%BC%EB%A7%A8', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://onairkorean.tv/data/file/content/3519350434_KY0uxdIg_EC8A88ED8DBCEBA7A8EC9DB4_EB8F8CEC9584EC9994EB8BA4_EB8BA4EC8B9CEBB3B4EAB8B0.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//유희열의 스케치북
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%9C%A0%ED%9D%AC%EC%97%B4', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://cfile9.uf.tistory.com/image/247A35495319AAD01D89B6";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//SNL 
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=SNL', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://image.ajunews.com/content/image/2016/02/24/20160224073924513576.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//섹션 TV
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%84%B9%EC%85%98TV+%EC%97%B0%EC%98%88%ED%86%B5%EC%8B%A0', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://imgnews.naver.com/image/277/2008/11/22/2008111716312008962_1.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//냉장고를 부탁해
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EB%83%89%EC%9E%A5%EA%B3%A0', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://lh3.ggpht.com/pw4_jdLKFo1KU7N6IRmA1U1oUXmKUqJ72yDm_X2vrVTIYQqqidYr1lOcuW9aVV9V__joXUcyQvt9EOQJIdEO-ctR8Gv7-josj0Y=s0";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//스포츠 하이라이트
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%8A%A4%ED%8F%AC%EC%B8%A0+%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://t1.daumcdn.net/thumb/C216x312/?fname=http%3A%2F%2Fcfile28.uf.daum.net%2Fimage%2F26242F4D5488E60B1F5114";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//우리동네 예체능
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%9A%B0%EB%A6%AC%EB%8F%99%EB%84%A4+%EC%98%88%EC%B2%B4%EB%8A%A5', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://www.todeffects.com/files/attach/images/126/709/002/87d5f2419cdf5b0709e3670ef29b353a.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//쇼미더머니
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%87%BC%EB%AF%B8%EB%8D%94%EB%A8%B8%EB%8B%88', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "https://scontent.cdninstagram.com/t51.2885-15/e35/13183495_240772802947579_1291572638_n.jpg?ig_cache_key=MTI0OTI4MzM4NDI1ODc0ODQ3Mg%3D%3D.2";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//뮤직뱅크 
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EB%AE%A4%EC%A7%81%EB%B1%85%ED%81%AC', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://s1.dmcdn.net/Gq49z/1280x720-jzH.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//쇼! 챔피언
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%87%BC%21+%EC%B1%94%ED%94%BC%EC%96%B8', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://4.bp.blogspot.com/-dQiLTS3pKFA/Vh5t53ZHEtI/AAAAAAAABNU/yUNGdFgTIls/s1600/%25EC%2587%25BC%2B%25EC%25B1%2594%25ED%2594%25BC%25EC%2596%25B8.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//주간 아이돌
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%A3%BC%EA%B0%84+%EC%95%84%EC%9D%B4%EB%8F%8C', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://s1.dmcdn.net/JnGUk/x240-BJc.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//음악의 신
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%9D%8C%EC%95%85%EC%9D%98+%EC%8B%A0+%EC%8B%9C%EC%A6%8C2', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://cfile22.uf.tistory.com/image/267674485721C32B14C01D";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});


//M 카운트 다운
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=M+%EC%B9%B4%EC%9A%B4%ED%8A%B8+%EB%8B%A4%EC%9A%B4', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://cfile4.uf.tistory.com/image/12235C4E506D3D36354EEC";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});


//복면가왕
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EB%B3%B5+%EB%A9%B4+%EA%B0%80+%EC%99%95', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://www.naverdrama.com/wp-content/uploads/2015/09/mask_singer.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});


//신의 목소리
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EB%B3%B4%EC%BB%AC+%EC%A0%84%EC%9F%81', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://image.ajunews.com/content/image/2016/02/04/20160204152032774026.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});


//아는 형님
request('http://baykoreans.net/?act=&vid=&mid=entertain&category=&search_target=title&search_keyword=%EC%95%84%EB%8A%94+%ED%98%95%EB%8B%98', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://photo.jtbc.joins.com/news/2015/12/03/201512030432057682.jpg";

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailyModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailyModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
//딴따라
request('http://baykoreans.net/?act=&vid=&mid=drama&category=&search_target=title&search_keyword=%EB%94%B4%EB%94%B0%EB%9D%BC', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://img.tenasia.hankyung.com/webwp_kr/wp-content/uploads/2016/02/2016021821170720308-540x377.jpg"

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailydramaModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailydramaModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//오해영
request('http://baykoreans.net/?act=&vid=&mid=drama&category=&search_target=title&search_keyword=%EC%98%A4%ED%95%B4%EC%98%81', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://image-origin.tving.com/resize.php?u=http://image-origin.tving.com/upload/cms/caip/CAIP1500/P000273930.jpg&w=327"

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailydramaModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailydramaModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//디어마이 프렌즈
request('http://baykoreans.net/?act=&vid=&mid=drama&category=&search_target=title&search_keyword=%EB%94%94%EC%96%B4+%EB%A7%88%EC%9D%B4+%ED%94%84%EB%A0%8C%EC%A6%88', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "https://i.ytimg.com/vi/Qh_trLkf4hI/maxresdefault.jpg"

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailydramaModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailydramaModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//동네변호사 조들호
request('http://baykoreans.net/index.php?mid=drama&search_target=title&search_keyword=%EB%8F%99%EB%84%A4%EB%B3%80%ED%98%B8%EC%82%AC+%EC%A1%B0%EB%93%A4%ED%98%B8&page=2&division=-2820019&last_division=-2781128', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://upload.enews24.net/News/Contents/20160323/28604327.jpg"

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailydramaModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailydramaModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//시그널
request('http://baykoreans.net/index.php?mid=drama_fin&search_target=title&search_keyword=%EC%8B%9C%EA%B7%B8%EB%84%90&page=1', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://img.lifestyler.co.kr/uploads/program/cheditor/2015/12/AC7MDCU5YIIHIKBT2YUC.jpg"

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailydramaModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailydramaModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//치즈인더트랩
request('http://baykoreans.net/index.php?mid=drama_fin&search_target=title&search_keyword=%EC%B9%98%EC%A6%88%EC%9D%B8%EB%8D%94&page=1', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://img.lifestyler.co.kr/uploads/program/cheditor/2015/11/412DZFKKHOEM74E8PKQ6.jpg"

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailydramaModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailydramaModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

//태양의 후예
request('http://baykoreans.net/index.php?mid=drama&category=2789935&search_target=title&search_keyword=%ED%83%9C%EC%96%91&page=1&division=-2820019&last_division=-2781128', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('tbody td.title').each(function(){
		var dailyTitle = $(this).find('a').text();
		var newHref = $(this).find('a').attr('href');
		var dailyUrl = "http://www.baykoreans.net"+ newHref;
	 	
			request(dailyUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var video_url = [];
				var image_url = "http://img.kbs.co.kr/cms/drama/sun/behind/wallpaper/__icsFiles/afieldfile/2016/02/12/sun_pos_01_1024_1.jpg"

				$('.boardReadBody center a').each(function(){
					var vid_url = $(this).attr('href');
					video_url.push(vid_url);
				})


				// scrape all the images for the post
				dailydramaModel.find({title: dailyTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new dailydramaModel({
						title: dailyTitle,
						url: dailyUrl,
						video_url: video_url,
						image_url: image_url
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

request('http://issuein.com/index.php?mid=index&page=2', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('td.title').each(function(){
		var issueTitle = $(this).find('a.hx').text();
		var newHref = $(this).find('a').attr('href');
		var issueUrl = "http://www.issuein.com"+ newHref;
	 	
			request(issueUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var image_url = [];
				var video_url = [];

				$('article div img').each(function(){
					var img_url = $(this).attr('src');
					image_url.push(img_url);	
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the images for the post
				issueModel.find({title: issueTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new issueModel({
						title: issueTitle,
						url: issueUrl,
						img_url: image_url,
						video_url:video_url
					
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});

request('http://issuein.com/index.php?mid=index&page=3', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('td.title').each(function(){
		var issueTitle = $(this).find('a.hx').text();
		var newHref = $(this).find('a').attr('href');
		var issueUrl = "http://www.issuein.com"+ newHref;
	 	
			request(issueUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var image_url = [];
				var video_url = [];

				$('article div img').each(function(){
					var img_url = $(this).attr('src');
					image_url.push(img_url);	
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the images for the post
				issueModel.find({title: issueTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new issueModel({
						title: issueTitle,
						url: issueUrl,
						img_url: image_url,
						video_url:video_url
					
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
request('http://issuein.com/index.php?mid=index&page=4', function(err, res, body){
	
	if(!err && res.statusCode == 200) {
		
		var $ = cheerio.load(body);
		$('td.title').each(function(){
		var issueTitle = $(this).find('a.hx').text();
		var newHref = $(this).find('a').attr('href');
		var issueUrl = "http://www.issuein.com"+ newHref;
	 	
			request(issueUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var image_url = [];
				var video_url = [];

				$('article div img').each(function(){
					var img_url = $(this).attr('src');
					image_url.push(img_url);	
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				// scrape all the images for the post
				issueModel.find({title: issueTitle}, function(err, newPosts){
				
				if (!newPosts.length){
					//save data in Mongodb

					var issuePost = new issueModel({
						title: issueTitle,
						url: issueUrl,
						img_url: image_url,
						video_url:video_url
					
					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else 
						console.log(issuePost);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find
			

			}//if문

			})//request

			
		});
		
	}//첫 if구문

});
*/