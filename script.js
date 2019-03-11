function buildFetch(searchTerm, token, callback){
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		method: "GET",
		data: {
			key: "AIzaSyCvC6YXrQrz445wTIZC1DyIRJenwa5-7Zg",
		  	q: searchTerm,
		  	part: "snippet",
		  	maxResults: 10,
		  	pageToken: token
		},
		dataType: "json",
		success: responseJson => callback(responseJson),
		error: err => console.log(err)
	});
}


function displayVideos(data){
	$('.results').html('');

	data.items.forEach((item, index) => {
		$('.results').append(`
			<tr>
				<td><a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><img src="${item.snippet.thumbnails.medium.url}"/> </a> </td>
				<td><h2><a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"> ${item.snippet.title} </a></h2></td>
			</tr>
			`);
	});

	$(pageButtons(data));
}

function pageButtons(data){
	$('#prevPage').on('click', (event) => {
		event.preventDefault();
		if(data.prevPageToken != ""){
		//console.log('pressed prev');
		let videoSearch = $('#videoSearchBox').val(); 
		let pageToken = data.prevPageToken;

		buildFetch(videoSearch, pageToken, displayVideos);
		}
	});

	$('#nextPage').on('click', (event) => {
		event.preventDefault();
		//console.log('pressed next');
		let videoSearch = $('#videoSearchBox').val(); 
		let pageToken = data.nextPageToken;

		buildFetch(videoSearch, pageToken, displayVideos);
	});
}

function watchForm(){
	$('.searchForm').on('submit', (event) => {
		event.preventDefault();
		//console.log('You pressed the submit');
		let videoSearch = $('#videoSearchBox').val(); 
		let pageToken = "";

		buildFetch(videoSearch, pageToken, displayVideos);
	});
}

$(watchForm);
$('#videoSearchBox').val('');

