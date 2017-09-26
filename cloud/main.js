// With promises
console.log('KAMAN Main1 Reached');

// iOS push testing
Parse.Cloud.define("iosPush", function(request, response) {
  var output='';
  var user = request.user;
  
  
  
  
  var params = request.params;
  var device_tokens = [];
  var someKey = params.someKey;
  var data = params.data;
  var usersTraget = params.usersTraget;
  
  console.log ('YYYY='+usersTraget);

  //console.log('user'+user);
  //console.log('PushQuery before:'+params.pushQuery);
  //var pushQuery=request.pushQuery;
  //console.log('PushQuery ahead:' +pushQuery);
  var pushQuery = new Parse.Query(Parse.Installation);
 
  
   var userQuery = new Parse.Query(Parse.User);
	userQuery.equalTo("objectId", usersTraget);
  //userQuery.equalTo("objectId", emails);
	console.log("ObjectID checked");
  
  
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only
  //pushQuery.equalTo("someKey", someKey);
  //pushQuery.equalTo("user", user);
  //pushQuery.equalTo('installationId', user.get("installationId"));
  pushQuery.matchesQuery("user", userQuery);

  
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: data,
    sound: "default"
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
