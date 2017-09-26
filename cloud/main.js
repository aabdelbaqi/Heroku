// With promises
console.log('KAMAN Main1 Reached');

// iOS push testing
Parse.Cloud.define("iosPush", function(request, response) {
  var output='';
  var user = request.user;
  
  for (property in user) {
    output += property + ': ' + user[property]+'; ';
  }
  console.log('user output'+output);
  output='';
  for (property in request) {
    output += property + ': ' + request[property]+'; ';
  }
  console.log('request output'+output);
  
 
  
  
  
  var params = request.params;
  var device_tokens = [];
  var someKey = params.someKey;
  var data = params.data;
  var usersTraget = params.usersTraget;
  
  console.log ('YYYY='+usersTraget);
  
  
  console.log('----------------------');
    output='';
  for (property in params) {
    output += property + ': ' + params[property]+'; ';
  }
  console.log('params output'+output);
  
  
  console.log('----------------------');
    output='';
  var logs = request.log;
  for (property in logs) {
    output += property + ': ' + logs[property]+'; ';
  }
  console.log('logs output'+output);
  
  console.log('----------------------');
    output='';
 
  for (property in data) {
    output += property + ': ' + data[property]+'; ';
  }
  console.log('data output'+output);
  
  
  //console.log('user'+user);
  //console.log('PushQuery before:'+params.pushQuery);
  //var pushQuery=request.pushQuery;
  //console.log('PushQuery ahead:' +pushQuery);
  var pushQuery = new Parse.Query(Parse.Installation);
  output='';
 
  for (property in pushQuery) {
    output += property + ': ' + pushQuery[property]+'; ';
  }
  console.log('pushquery output'+output);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only
  //pushQuery.equalTo("someKey", someKey);
  pushQuery.equalTo("user", user);
  //pushQuery.equalTo('installationId', user.get("installationId"));

  console.log('----------------------');
  output='';
    var pQwhere=pushQuery._where;
  for (property in pQwhere) {
    output += property + ': ' + pQwhere[property]+'; ';
  }
  console.log('pQwhere output'+output);
  console.log('----------------------');
  output='';
    var pQwhereSK=pQwhere.Somekey;
  for (property in pQwhereSK) {
    output += property + ': ' + pQwhereSK[property]+'; ';
  }
  console.log('pQwhereSK output'+output);
  
    console.log('----------------------');
  output='';
    var pQwhereUser=pQwhere.user;
  for (property in pQwhereUser) {
    output += property + ': ' + pQwhereUser[property]+'; ';
  }
  console.log('pQwhereUser output'+output);
  
    console.log('----------------------');
  output='';
    var pQwhereID=pQwhere.installationId;
  for (property in pQwhereID) {
    output += property + ': ' + pQwhereID[property]+'; ';
  }
  console.log('pQwhereID output'+output);
  
  console.log('----------------------');
  output='';
    var ab=pushQuery._extraOptions;
  for (property in ab) {
    output += property + ': ' + ab[property]+'; ';
  }
  console.log('ab output'+output);
  
  
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
