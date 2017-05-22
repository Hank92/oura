// app/routes.js

var request = require('request');

var issueModel = require('../app/models/hazzulPost');
var hazzulBestModel = require('../app/models/hazzulBestPost');


module.exports = function (app, passport){

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



app.get('/:id', function(req, res){
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
