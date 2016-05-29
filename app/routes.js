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
/*
app.get('/mbong19', function (req, res){
if(req.query.search){
	postModel.findByTitle(req.query.search, function (err, all_pins){
		var searchTitle = req.query.search;
		pageSize  = 0;
		pageCount = 0;
		totalPosts = 0;
		currentPage =0;
		res.render('mbong19.ejs', {
			postModels: all_pins,
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
			postModel.paginate({}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
         if(err){
         console.log("error");
         console.log(err);
     } else {
    	    pageSize = results.limit;
            pageCount = (results.total)/(results.limit);
    		pageCount = Math.ceil(pageCount);
    	    totalPosts = results.total;
    	console.log(results.docs)

    	res.render('mbong19.ejs', {
    		postModels: results.docs,
    		pageSize: pageSize,
    		pageCount: pageCount,
    		totalPosts: totalPosts,
    		currentPage: currentPage
    	})//res.render
     }//else
     });//paginate
	}
});
*/

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