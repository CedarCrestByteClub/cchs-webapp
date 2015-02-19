
function push() {
var query = new Parse.Query(Parse.Installation);
Parse.Push.send({ 
  where: query,
  data: {
    alert: "When do we take to outer space"
  }
}, {
  success: function() {
    console.log("Push was successful");
  },
  error: function(error) {
    console.error(error);
  }
});
}