// app/routes.js

var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var	methodOverride = require('method-override');

var issueModel = require('../app/models/hazzulPost');
var hazzulBestModel = require('../app/models/hazzulBestPost');


module.exports = function (app, passport){

	app.get('/login', function(req, res) {
		        // render the page and pass in any flash data if it exists
		        res.render('login.ejs', { message: req.flash('loginMessage') });
		    });
		app.post('/login', passport.authenticate('local-login', {
		        successRedirect : '/profile', // redirect to the secure profile section
		        failureRedirect : '/login', // redirect back to the signup page if there is an error
		        failureFlash : true // allow flash messages
		    }));

		app.get('/signup', function(req, res) {
		        // render the page and pass in any flash data if it exists
		        res.render('signup.ejs', { message: req.flash('signupMessage') });
		    });

	// process the signup form
	   app.post('/signup', passport.authenticate('local-signup', {
	       successRedirect : '/profile', // redirect to the secure profile section
	       failureRedirect : '/signup', // redirect back to the signup page if there is an error
	       failureFlash : true // allow flash messages
	   }));


		app.get('/profile', isLoggedIn, function(req, res) {
	        res.render('profile.ejs', {
	            user : req.user // get the user out of session and pass to template
	        });
	    });

		app.get('/logout', function(req, res) {
	        req.logout();
	        res.redirect('/');
	    });

			// route middleware to make sure a user is logged in
		function isLoggedIn(req, res, next) {

		    // if user is authenticated in the session, carry on
		    if (req.isAuthenticated())
		        return next();

		    // if they aren't redirect them to the home page
		    res.redirect('/');
		}


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

app.get('/profile', isLoggedIn, function(req, res) {
			res.render('profile.ejs', {
					user : req.user // get the user out of session and pass to template
			});
	});

app.post('/:id/:page/hazzulFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/blogspotFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/blogspot/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/dogdripFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/dogdrip/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/fmkoreaFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/fmkorea/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/instizFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/instiz/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/mhcFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/mhc/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/pannFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/pann/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/repleFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/reple/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/searchFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/torrentFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/torrent/?page=' + pageNum)
		})
	})

}) //app.post

app.post('/:id/:page/ygosuFavorite', isLoggedIn, function (req, res){
	var pageNum = req.params.page;
	var user = req.user;

	issueModel.find({_id: req.params.id}, function(err, item){
		user.local.favorite.push(item[0].title)
		user.save(function(err, data){
			if(err) res.send(err)
			else
				res.redirect('/ygosu/?page=' + pageNum)
		})
	})

}) //app.post

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

app.post('/:id/:page/fmkorea', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/fmkorea/?page=' + pageNum)
		});
	})

}) //app.post

app.post('/:id/:page/dogdrip', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/dogdrip/?page=' + pageNum)
		});
	})

}) //app.post

app.post('/:id/:page/ygosu', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/ygosu/?page=' + pageNum)
		});
	})

}) //app.post

app.post('/:id/:page/torrent', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/torrent/?page=' + pageNum)
		});
	})

}) //app.post

app.post('/:id/:page/pann', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/pann/?page=' + pageNum)
		});
	})

}) //app.post

app.post('/:id/:page/reple', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/reple/?page=' + pageNum)
		});
	})

}) //app.post


app.post('/:id/:page/blogspot', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/blogspot/?page=' + pageNum)
		});
	})

}) //app.post

app.post('/:id/:page/instiz', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/instiz/?page=' + pageNum)
		});
	})

}) //app.post

app.post('/:id/:page/mhc', function (req, res){
	var pageNum = req.params.page;
	console.log(pageNum)
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/mhc/?page=' + pageNum)
		});
	})

}) //app.post

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

app.get('/dogdrip', function (req, res){

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

				issueModel.paginate({url: "DogDrip"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
					var dogdrip = "개드립";

		    	res.render('hazzulDogdrip.ejs', {
		    		issuepostModel: sortId,
		    		issuepostModels: args,
		    		pageSize: pageSize,
		    		pageCount: pageCount,
		    		totalPosts: totalPosts,
						searchTitle: dogdrip,
						source: dogdrip,
		    		currentPage: currentPage
		    	})//res.render
		     }//else
		     });//paginate
		}
		});

		app.get('/ygosu', function (req, res){

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

						issueModel.paginate({url: "와이고수"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
							var ygosu = "와이고수";

				    	res.render('hazzulYgosu.ejs', {
				    		issuepostModel: sortId,
				    		issuepostModels: args,
				    		pageSize: pageSize,
				    		pageCount: pageCount,
				    		totalPosts: totalPosts,
								searchTitle: ygosu,
								source: ygosu,
				    		currentPage: currentPage
				    	})//res.render
				     }//else
				     });//paginate
				}
				});
				app.get('/instiz', function (req, res){

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

									issueModel.paginate({url: "인스티즈"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
										var instiz = "인스티즈";

										res.render('hazzulInstiz.ejs', {
											issuepostModel: sortId,
											issuepostModels: args,
											pageSize: pageSize,
											pageCount: pageCount,
											totalPosts: totalPosts,
											searchTitle: instiz,
											source: instiz,
											currentPage: currentPage
										})//res.render
									 }//else
									 });//paginate
							}
							});



				app.get('/blogspot', function (req, res){

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

								issueModel.paginate({url: "blogspot"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
									var blogspot = "Blogspot";

						    	res.render('hazzulBlogspot.ejs', {
						    		issuepostModel: sortId,
						    		issuepostModels: args,
						    		pageSize: pageSize,
						    		pageCount: pageCount,
						    		totalPosts: totalPosts,
										searchTitle: blogspot,
										source: blogspot,
						    		currentPage: currentPage
						    	})//res.render
						     }//else
						     });//paginate
						}
						});

					app.get('/reple', function (req, res){

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

										issueModel.paginate({url: "댓글학원"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
											var reple = "댓글학원";

								    	res.render('hazzulReple.ejs', {
								    		issuepostModel: sortId,
								    		issuepostModels: args,
								    		pageSize: pageSize,
								    		pageCount: pageCount,
								    		totalPosts: totalPosts,
												searchTitle:reple,
												source: reple,
								    		currentPage: currentPage
								    	})//res.render
								     }//else
								     });//paginate
								}
								});

								app.get('/mhc', function (req, res){

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

													issueModel.paginate({url: "모해유머"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
														var mhc = "모해유머";

														res.render('hazzulMhc.ejs', {
															issuepostModel: sortId,
															issuepostModels: args,
															pageSize: pageSize,
															pageCount: pageCount,
															totalPosts: totalPosts,
															searchTitle:mhc,
															source: mhc,
															currentPage: currentPage
														})//res.render
													 }//else
													 });//paginate
											}
											});


		app.get('/torrent', function (req, res){

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

						issueModel.paginate({url: "토렌트"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
							var torrent = "토렌트";

				    	res.render('hazzulTorrent.ejs', {
				    		issuepostModel: sortId,
				    		issuepostModels: args,
				    		pageSize: pageSize,
				    		pageCount: pageCount,
				    		totalPosts: totalPosts,
								searchTitle:torrent,
								source: torrent,
				    		currentPage: currentPage
				    	})//res.render
				     }//else
				     });//paginate
				}
				});

				app.get('/pann', function (req, res){

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

							issueModel.paginate({url: "네이트판"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
								var natePann = "네이트판";

								res.render('hazzulPann.ejs', {
									issuepostModel: sortId,
									issuepostModels: args,
									pageSize: pageSize,
									pageCount: pageCount,
									totalPosts: totalPosts,
									searchTitle: natePann,
									source: natePann,
									currentPage: currentPage
								})//res.render
							 }//else
							 });//paginate
					}
					});



app.get('/fmkorea', function (req, res){

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

			issueModel.paginate({url: "fm코리아"}, {sort: {"_id":-1}, page: currentPage, limit: 20 }, function(err, results) {
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
				var fmkorea = "fmkorea";

				res.render('hazzulFMkorea.ejs', {
					issuepostModel: sortId,
					issuepostModels: args,
					pageSize: pageSize,
					pageCount: pageCount,
					totalPosts: totalPosts,
					searchTitle: fmkorea,
					source: fmkorea,
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



app.get('/:page/:id', function(req, res){
	var postId = req.postId;
	var pageNum = req.params.page;
	postId.usernumClicks += Math.floor((Math.random() * 10) + 1);
	postId.myClicks += 1;

	postId.save(function (err, data){
		if (err) res.send(err)
		else
	issueModel.find({_id: {$lt: postId._id}}).sort({_id: -1}).limit(5).exec(function(err, results) {

	var prevId = results;
	console.log(results)
			res.render('individualHazzul.ejs', {issuepostModel: postId, previousModel: prevId, pageNum: pageNum });
	})


	})


})



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

app.post('/:id/:page/hazzul', function (req, res){
	var pageNum = req.params.page;
	issueModel.find({_id: req.params.id}, function(err, item){
		if(err) return next("error finding blog post.");
		item[0].userComments.push({userPost : req.body.userPost})
		item[0].save(function(err, data){
			if (err) res.send(err)
			else
				res.redirect('/' + pageNum + '/'+req.params.id )
		});
	})

}) //app.post



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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}
					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}


					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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

					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var Post = new issueModel({
						title: bhuTitle,
						url: love,
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

request('http://www.issuein.com', function(err, res, body){

	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(body);
		$('td.title').each(function(){
		var issueTitle = $(this).find('a.hx').text();
		var newHref = $(this).find('a').attr('href');
		var issueUrl = "http://www.issuein.com"+ newHref;

			request(issueUrl, function(err, res, body){
				if(!err && res.statusCode == 200) {
				var $ = cheerio.load(body);
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('article_1 div img').each(function(){
					var img_url = $(this).attr('src');

					image_url.push(img_url);
					/*
					if(img_url.indexOf("156300120") == -1 ) {
						image_url.push(img_url);
					}
					*/
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$("li.fdb_itm").each(function(){
						var content =  $(this).find(".xe_content").text();
						comments.push({content: content});
					})//scrape all the comments for the post

				var repeatedImg = image_url[0];
				var numClicks = Math.floor((Math.random() * 1000) + 1);
				// scrape all the images for the post
				var repeatedImg = image_url[0];
				console.log(repeatedImg);

				issueModel.find({img_url: repeatedImg}, function(err, newPosts){
				if (newPosts.length == 0 && image_url[0].indexOf("./files/attach") !== 0 && image_url[0].indexOf("http://www.issuein.com/files/attach") !== 0  && image_url[0].indexOf("http://issuein.com/files/attach") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var issuePost = new issueModel({
						title: issueTitle,
						url: love,
						img_url: image_url,
						video_url:video_url,
						comments: comments,
						numClicks: numClicks

					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(numClicks);
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
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('article_1 div img').each(function(){
					var img_url = $(this).attr('src');

					image_url.push(img_url);
					/*
					if(img_url.indexOf("156300120") == -1 ) {
						image_url.push(img_url);
					}
					*/
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$("li.fdb_itm").each(function(){
						var content =  $(this).find(".xe_content").text();
						comments.push({content: content});
					})//scrape all the comments for the post

				var repeatedImg = image_url[0];
				var numClicks = Math.floor((Math.random() * 1000) + 1);
				// scrape all the images for the post
				var repeatedImg = image_url[0];
				console.log(repeatedImg);

				issueModel.find({img_url: repeatedImg}, function(err, newPosts){
				if (newPosts.length == 0 && image_url[0].indexOf("./files/attach") !== 0 && image_url[0].indexOf("http://www.issuein.com/files/attach") !== 0  && image_url[0].indexOf("http://issuein.com/files/attach") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var issuePost = new issueModel({
						title: issueTitle,
						url: love,
						img_url: image_url,
						video_url:video_url,
						comments: comments,
						numClicks: numClicks

					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(numClicks);
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
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('article_1 div img').each(function(){
					var img_url = $(this).attr('src');

					image_url.push(img_url);
					/*
					if(img_url.indexOf("156300120") == -1 ) {
						image_url.push(img_url);
					}
					*/
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$("li.fdb_itm").each(function(){
						var content =  $(this).find(".xe_content").text();
						comments.push({content: content});
					})//scrape all the comments for the post

				var repeatedImg = image_url[0];
				var numClicks = Math.floor((Math.random() * 1000) + 1);
				// scrape all the images for the post
				var repeatedImg = image_url[0];
				console.log(repeatedImg);

				issueModel.find({img_url: repeatedImg}, function(err, newPosts){
				if (newPosts.length == 0 && image_url[0].indexOf("./files/attach") !== 0 && image_url[0].indexOf("http://www.issuein.com/files/attach") !== 0  && image_url[0].indexOf("http://issuein.com/files/attach") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var issuePost = new issueModel({
						title: issueTitle,
						url: love,
						img_url: image_url,
						video_url:video_url,
						comments: comments,
						numClicks: numClicks

					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(numClicks);
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
				var comments = [];
				var image_url = [];
				var video_url = [];
				var image_comment = [];

				$('article_1 div img').each(function(){
					var img_url = $(this).attr('src');
					image_url.push(img_url);
					/*
					if(img_url.indexOf("156300120") == -1 ) {
						image_url.push(img_url);
					}
					*/
				})

				if (image_url.length == 0)
				var img_url = "http://road2himachal.travelexic.com/images/Video-Icon-crop.png"
				image_url.push(img_url)

				$('div embed').each(function(){
					var vid_url = $(this).attr('src');
					video_url.push(vid_url);
				})

				$("li.fdb_itm").each(function(){
						var content =  $(this).find(".xe_content").text();
						comments.push({content: content});
					})//scrape all the comments for the post

				var repeatedImg = image_url[0];
				var numClicks = Math.floor((Math.random() * 1000) + 1);
				// scrape all the images for the post
				var repeatedImg = image_url[0];
				console.log(repeatedImg);

				issueModel.find({img_url: repeatedImg}, function(err, newPosts){
				if (newPosts.length == 0 && image_url[0].indexOf("./files/attach") !== 0 && image_url[0].indexOf("http://www.issuein.com/files/attach") !== 0  && image_url[0].indexOf("http://issuein.com/files/attach") !== 0 && video_url[0] !== "" && image_url[0].indexOf("http://road2himachal") !== 0 ){
					//save data in Mongodb
					var love ="";
					if(repeatedImg.indexOf("fmkorea") >= 0){
						love = "fm코리아"
					}
					if(repeatedImg.indexOf("dogdrip") >= 0){
						love = "DogDrip"
					}
					if(repeatedImg.indexOf("ygosu") >= 0){
						love = "와이고수"
					}
					if(repeatedImg.indexOf("mhc") >= 0){
						love = "모해유머"
					}
					if(repeatedImg.indexOf("etorrent") >= 0){
						love = "토렌트"
					}
					if(repeatedImg.indexOf("pann") >= 0){
						love = "네이트판"
					}
					if(repeatedImg.indexOf("reple") >= 0){
						love = "댓글학원"
					}
					if(repeatedImg.indexOf("autobest") >= 0){
						love = "오토베스트"
					}
					if(repeatedImg.indexOf("ddanzi") >= 0){
						love = "딴지일보"
					}
					if(repeatedImg.indexOf("inven") >= 0){
						love = "인벤"
					}
					if(repeatedImg.indexOf("instiz") >= 0){
						love = "인스티즈"
					}
					if(repeatedImg.indexOf("cucudas") >= 0){
						love = "쿠쿠다스"
					}
					if(repeatedImg.indexOf("blogspot") >= 0){
						love = "blogspot"
					}
					if(repeatedImg.indexOf("gifyu") >= 0){
						love = "gifyu"
					}
					if(repeatedImg.indexOf("jjang0u") >= 0){
						love = "짱공유"
					}
					if(repeatedImg.indexOf("jjalbox") >= 0){
						love = "짤박스"
					}

					var issuePost = new issueModel({
						title: issueTitle,
						url: love,
						img_url: image_url,
						video_url:video_url,
						comments: comments,
						numClicks: numClicks

					})
			issuePost.save(function(error){
					if(error){
						console.log(error);
					}
					else
						console.log(numClicks);
				})

			//post.save
				}//if bhuTitle안에 있는 {}

			})//postModel.find


			}//if문

			})//request


		});

	}//첫 if구문

});
