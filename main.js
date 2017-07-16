
// Login Function - Function to login to User window with only name greater than 2 characters
$("#login_submit").on('click', function() {
   $("#login_submit").removeClass('error_input_signup');
   var username = $("#email_input").val();
   var password = $("#password_input").val();
       if(username.length > 2 && username === "test@acadview.com" && password === "JavascriptRocks") {
       //if(username === "1" && password ==="1") {
         // window.location.href="user_page.html"; // To go to a new page user_page.html via button click, can be used in future for signup, etc
         // return false; // To stop absorbtion of events and load the page important!
         $("#user_name").text(username);
         $("#user").addClass('hidden');
         $("#display").removeClass('hidden');
         return false;
   }else {
      $('#email_input').val(username);
      $("#password_input").addClass('error_input_signup');
      $("#wrong-id").removeClass('hidden');
      return false;
   }
});



var currentSongNumber = 1; //Used in different functions to check surrent Song Number
var willLoop = 0; //To toggle loop function in player
var willShuffle = 0; //To toggle shuffle function in toggle



// Play and Pause action
$('.play-icon').on('click', function() {
    var song = document.querySelector('audio');
    toggleSong();
});



// On space-bar(keycode - 32) press Play & Pause song except if space in pressed in INPUT tag
$('body').on('keypress', function(event) {
   var target = event.target;
   if (event.keyCode == 32 && target.tagName != 'INPUT') {
      var song = document.querySelector('audio');
      toggleSong();
   }
});



// Function - to toggle song Play if Paused, Paused if Play
function toggleSong() {
   var song = document.querySelector('audio');
   if(song.paused == true) {
      $('.play-icon').removeClass('fa-play').addClass('fa-pause');
      song.play();
      createMoments();
   }
   else {
      $('.play-icon').removeClass('fa-pause').addClass('fa-play');
      song.pause();
   }
}



// Onload function performed wheb html document is fully loaded. Idealy all JS should be inside onload
// Function - changeCurrentSongDetails chages the details of a song in object array index i
window.onload = function() {
   changeCurrentSongDetails(songs[0]);
   for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1);
    }
   //updateSongsList();
   updateCurrentTime();
   setInterval(function() {
   updateCurrentTime();
   },1000);
   setInterval(function() {
   updateSongProgress();
   },1000);
   var audio = document.querySelector('audio');
   var volume = audio.volume;
   setVolume(volume);
   changeSongDisplay(songs[0]);
}


// Function - updateCurrentTime updates the current song time elapsed and total
function updateCurrentTime() {
    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}



// Function -  it is a fancy time format to display song time
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



// Function - addSongNameClickEvent adds all the song in a table list and plays song on click
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
         changeSongDisplay(songObj);
      }
   });
}



// Object Array - Songs which contain all the songs with there info
var songs = [{
        'name': 'Tamma Song',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
       'image' : 'song1.jpg',
       'images' : 'song1'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
       'image' : 'song2.jpg',
       'images' : 'song2'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
       'image' : 'song3.jpg',
       'images' : 'song3'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
       'image' : 'song4.jpg',
       'images' : 'song4'
}]



// Function - changeCurrentSongDetails changes the details of the song like image, name, album
function changeCurrentSongDetails(songObj) {
   $('.current-song-image').attr('src','img/' + songObj.image);
   $('.current-song-name').text(songObj.name);
   $('.current-song-duration').text(songObj.duration);
   $('.current-song-album').text(songObj.album);
}



// Datatable function to run Data tables for searching and sorting songs by name, duration
$(document).ready(function() {
   $('#songs').DataTable({
      paging: false, //Paging false - doesn't displays pagenumber and list
   });
});



//
$('#songs_filter input').attr('placeholder', "search");



//Function - onclick of loop icon to loop songs
$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});


// Function - onclick of shuffle icon to randomly play songs
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});


// Function - timeJump to end of 5 seconds of song
function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = Math.floor(song.duration) - 5;
};



// Function - onEnd of a song to loop through songs and to shuffle songs
$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        changeSongDisplay(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        changeSongDisplay(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        changeSongDisplay(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})



// Function - To return a random number within a given range except some number (exculded)
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}



// Function - onClick on next icon to play next song
$('.fa-step-forward').on('click', function() {
    if(currentSongNumber < songs.length) {
      nextSong();
    }
    if(currentSongNumber == 1) {
      $('.fa-step-backward').removeClass('disabled');
      nextSong();
    }
    if(currentSongNumber == songs.length) {
      $('.fa-step-forward').addClass('disabled');
    }
});



// Function - To play next Song
function nextSong() {
   var audio = document.querySelector('audio');
   var nextSongObj = songs[currentSongNumber];
   audio.src = nextSongObj.fileName;
   toggleSong();
   changeCurrentSongDetails(nextSongObj);
   changeSongDisplay(nextSongObj);
   currentSongNumber += 1;

}



// Function - onClick on back icon to play previous song
$('.fa-step-backward').on('click', function() {
    if(currentSongNumber > 0) {
      previousSong();
    }
    if(currentSongNumber == songs.length-1) {
      $('.fa-step-forward').removeClass('disabled');
      previousSong();
    }
    if(currentSongNumber == 0) {
      $('.fa-step-backward').addClass('disabled');
    }
});



// Function - To play previous song
function previousSong() {
   var audio = document.querySelector('audio');
   var nextSongObj = songs[currentSongNumber-1];
   audio.src = nextSongObj.fileName;
   toggleSong();
   changeCurrentSongDetails(nextSongObj);
   changeSongDisplay(nextSongObj);
   currentSongNumber -= 1;
}



// Function -  to set volume at a given percentage
function setVolume(percentage){
  var audio = document.querySelector('audio');
  audio.volume = percentage;

  var percentageOfVolume = audio.volume;
  var percentageOfVolumeSlider = 100 * percentageOfVolume;

  $('.volume-filled').css("width", Math.round(percentageOfVolumeSlider) + "%");
}

//Set's new volume id based off of the click on the volume bar.
// Function - To calculate where click event has occured
$('.volume-progress').on('click', function setNewVolume(event){
  var volumeSliderWidth = event.offsetX;
  var percentage = volumeSliderWidth/120;
  setVolume(percentage);
});



//Function - to update progressbar
function updateSongProgress() {
   var audio = document.querySelector('audio');
   var ct = audio.currentTime;
   var td = audio.duration;
   var percent = (ct/td) * 100;
   $('.progress-filled').css("width", percent + "%");
}



// Function - to calculate where click event has occured on progress bar
$(".player-progress").on('click', function(event) {
   var $this = $(this);
   var width = event.pageX - $this.offset().left;
   var total = $this.width();
   var time = (width/total) * 100;
   var audio = document.querySelector('audio');
   audio.currentTime = (audio.duration * time)/100;
   updateSongProgress();
})



function changeSongDisplay(songObj) {
   var directory = songObj.images;
   var images = $('.image-moments');
   for (var i = 0; i < images.length; i++) {
     images[i].setAttribute("src", "img/"+directory+"/"+(i + 1)+".jpg");
   }
}



// Image Slider Moments generation Codepen - https://codepen.io/anon/pen/MoZvvq
var current = 0,
    slides = $('.image-moments');
function createMoments() {
   setInterval(function() {
     for (var i = 0; i < slides.length; i++) {
       slides[i].style.opacity = 0;
     }
     current = (current != slides.length - 1) ? current + 1 : 0;
     slides[current].style.opacity = 1;
  }, 5000);
}



// function updateSongsList() {
//    var html = $("#songs").html();
//     html += "<tbody>";
//     for (var i = 0; i < songs.length; i++) {
//         html+="<tr class=\"song\" id=\""+songs[i].images+"\">";
//         html+="<td class='song-name'>"+songs[i].name+"</td>";
//         html+="<td class='song-album'>"+songs[i].album+"</td>";
//         html+="<td class='song-length'>"+songs[i].duration+"</td>";
//
//       //   html+="<td>"+songs[i].filename+"</td>";
//         html+="</tr>";
//     }
//     html+="</tbody>";
//     $(".song-list").html(html);
// }
