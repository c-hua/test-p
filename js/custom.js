$(document).ready(function(){
	$( "#notification i.fa-times" ).click(function() {
		$( "#notification" ).fadeOut( "slow");
	});
	var after = "";
    $("#load_more").on("click",function(){
      if(after){            
        var url = "http://www.reddit.com/r/pocketderm/.json?limit=3&after="+after;            
        loadReddit(url);    
      }          
    });
    loadReddit("http://www.reddit.com/r/pocketderm/.json?limit=2");
    function loadReddit(url){
      
       var result = $.getJSON(url, function (data) {             
          $.each(data.data.children, function (i, item) {
              console.log(item.data);            
              $("#reddit .items").append('<div class="item"><div class="score"><h2>'+item.data.score+'</h2></div><div class="item-title"><h3><a target="_blank" href="http://www.reddit.com'+item.data.permalink+'">'+item.data.title+'</a><span>('+item.data.domain+')</span></h3><div class="item-desc"><p> Submitted '+timeSince(item.data.created_utc)+' by <a href="http://www.reddit.com/user/'+item.data.author+'" target="_blank">'+item.data.author+'</a></p></div></div><div class="item-comments"><h3><img class="img-comment" src="images/comment.png" />'+item.data.num_comments+'</h3></div></div>');
              after = item.data.name;
          });
      });
      result.always(function() {
        console.log( "complete" );
      });
    }
});

/**
 * Return time since link was posted
 * http://stackoverflow.com/a/3177838/477958
**/
function timeSince(date) {
  var seconds = Math.floor(((new Date().getTime()/1000) - date))
 
  var interval = Math.floor(seconds / 31536000);
 
  if (interval >= 1) {
    if(interval == 1) return interval + " year ago";
    else
      return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    if(interval == 1) return interval + " month ago";
    else
      return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    if(interval == 1) return interval + " day ago";
    else
      return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    if(interval == 1) return interval + " hour ago";
    else
      return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    if(interval == 1) return interval + " minute ago";
    else
      return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}