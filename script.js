    
	function formatseconds(seconds)
	{
  		return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
	}

	function changevolume(vol)
	{
		player.volume = vol;
	}

	function changeaudio(song)
	{
		$('#audiosrc1').attr(song.source);
        $('#captsrc1').attr(song.track);
		return player.load();
	}

  	function controls(cmd)
  	{
  		if(cmd=='play-pause')
  		{
            var btnobj = $('#ppbtn');
  			if(player.paused == true)
  			{
  				player.play();
  				btnobj.find('i').removeClass('fa-play').addClass('fa-pause');
  			}
  			else{
  				player.pause();
  				btnobj.find('i').removeClass('fa-pause').addClass('fa-play');
  			}
  		}
  		if(cmd=='fwd')
  		{
  			player.currentTime += 5;
  		}
  		if(cmd=='bwd')
  		{
  			player.currentTime -= 5;
  		}
  	}

  	function updateplayer(currenttime = -1)
  	{ 	
  		if(currenttime != -1)
  		{
  			player.currentTime = currenttime;
  		}
  		else{
  			currenttime = player.currentTime;
  		}
  		percent = (currenttime/player.duration)*100;
		if(percent >= 100)
		{
			player.pause();
            $('#ppbtn').find('i').removeClass('fa-pause').addClass('fa-play');
			player.currentTime = 0;
			progress.css('width','0%');
		}
		else{
			curtime.text(formatseconds(currenttime));
			progress.css('width',percent+'%');
		}
  	}


  	var player = $('#audio')[0];
  	var curtime = $('#curtime');
  	var tottime = $('#tottime');
  	var progress = $('#prgbar');

    $("#prgcont").on("click", function(e) {
        var max = $(this).width(); //Get width element
        var pos = e.pageX - $(this).offset().left; //Position cursor
        var dual = Math.round(pos / max * 100); // Round %
        dual = dual > 100 ? 100 : dual;
        updateplayer(player.duration * (dual/100))
    });

  	setInterval(function(){
  		updateplayer();
  		tottime.text(formatseconds(player.duration)); 
  	},1000);

    player.textTracks[0].oncuechange = function() {
        if(this.activeCues[0] != undefined)
        {
            var currentCue = this.activeCues[0].text || '';
            $('#curline').text(currentCue);
        }
    }

