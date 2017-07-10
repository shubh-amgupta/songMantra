
// Login Function - Function to login to User window with only name greater than 2 characters
$("#signup_submit").on('click', function() {
   $("#email_signup").removeClass('error_input_signup');
   var name = $("#email_signup").val();
   if(name.length > 2) {
         // window.location.href="user_page.html"; // To go to a new page user_page.html via button click, can be used in future for signup, etc
         // return false; // To stop sbsorbtion of events and load the page important!
         $("#user_name").text(name);
         $("#user").addClass('hidden');
         $("#display").removeClass('hidden');
   }else {
      $("#email_signup").addClass('error_input_signup');
   }
});

var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;


// Display user's name in right side of the header
//$("user_name").html($("email_signup").val()); Dynamic
//$("#user_name").text("Shubham");


// Play and Pause action
$('.play-icon').on('click', function() {
    var song = document.querySelector('audio');
    toggleSong();
});


// Play and Pause on SpaceBar
// $('body').on('keypress', function(event) {
//             if (event.keyCode == 32) {
//                 var song = document.querySelector('audio');
//                 toggleSong();
//             }
//         });

$('body').on('keypress', function(event) {
   var target = event.target;
   if (event.keyCode == 32 && target.tagName != 'INPUT') {
      var song = document.querySelector('audio');
      toggleSong();
   }
});




function toggleSong() {
   var song = document.querySelector('audio');
   timeJump();
   if(song.paused == true) {
      console.log('Playing');
      $('.play-icon').removeClass('fa-play').addClass('fa-pause');
      song.play();
   }
   else {
      console.log('Pausing');
      $('.play-icon').removeClass('fa-pause').addClass('fa-play');
      song.pause();
   }
}

// var songName1 = 'Tamma Song';
// var songName2 = 'Humma Song';
// var songName3 = 'Nashe Si Chadh Gayi';
// var songName4 = 'The Breakup Song';

var songList = ['Tamma Song', 'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];

window.onload = function() {
   changeCurrentSongDetails(songs[0]);
   for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1)
    }
   updateCurrentTime();
   setInterval(function() {
   updateCurrentTime();
   },1000);
}


var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];
//
// $('#song1').click(function() {
//    var audio = document.querySelector('audio');
//    var currentSong = audio.src;
//    if(currentSong.search(fileNames[0]) != -1)
//    {
//    toggleSong();
//    }
//    else {
//    audio.src = fileNames[0];
//    toggleSong();
//    }
// });
// $('#song2').click(function() {
//    var audio = document.querySelector('audio');
//    audio.src = fileNames[1];
//    toggleSong();
// });
//
// $('#song3').click(function() {
//    var audio = document.querySelector('audio');
//    audio.src = fileNames[2];
//    toggleSong();
// });
//
//
// $('#song4').click(function() {
//    var audio = document.querySelector('audio');
//    audio.src = fileNames[3];
//    toggleSong();
// });


//
function updateCurrentTime() {
    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}


//
function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


// //
// for (var i = 0; i < fileNames.length ; i++) {
//     addSongNameClickEvent(fileNames[i],i+1)
// }


//
function addSongNameClickEvent(songObj,position) {
   var songName = songObj.fileName;
    var id = '#song' + position;
    $(id).click(function() {
      var audio = document.querySelector('audio');
      var currentSong = audio.src;
      if(currentSong.search(songName) != -1) {
         toggleSong();
      }
      else {
         audio.src = songName;
         toggleSong();
         changeCurrentSongDetails(songObj);
      }
   });
}


//
var songs = [{
        'name': 'Tamma Song',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
       'image' : 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
       'image' : 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
       'image' : 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
       'image' : 'song4.jpg'
    }]


function changeCurrentSongDetails(songObj) {
   $('.current-song-image').attr('src','img/' + songObj.image);
   $('.current-song-name').text(songObj.name);
   $('.current-song-duration').text(songObj.duration);
   $('.current-song-album').text(songObj.album);
}


$(document).ready(function() {
   $('#songs').DataTable({
      paging: false,
   });
});



$('#songs_filter input').attr('placeholder', "search");



$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});


$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});

function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = Math.floor(song.duration) - 5;
};


$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName; // Change Source
        toggleSong(); // Play Next Song
        changeCurrentSongDetails(nextSongObj); // Update Image
        currentSongNumber = currentSongNumber + 1; // Change State
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})
