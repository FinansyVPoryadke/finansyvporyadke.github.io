var videoActiveJS, choice, autoChoice;
var videos;

var timeForChoice, timeForGame, timeClickAnimation = 400;

var money = [
{scene: 1, amount: 200, hasChange: false, isCurrent: true, isFirstPlayScene: true, isLoaded: false},
{scene: 2, amount: 1500, isCurrent: false, isFirstPlayScene: true, ch_1: -1500, ch_2: 0, hasChange: false, choice: 0, game: 0, isLoaded: false},
{scene: 3, amount: 250, isCurrent: false, isFirstPlayScene: true, ch_1: -200, ch_2: -200 , hasChange: false, choice: 0, game: 0, isLoaded: false},
{scene: 4, amount: 300, isCurrent: false, isFirstPlayScene: true, ch_1: 0, ch_2: 0 , hasChange: false, choice: 0, game: 0, isLoaded: false},
{scene: 5, amount: 350, isCurrent: false, isFirstPlayScene: true, ch_1: 0, ch_2: -300, hasChange: false, choice: 0, game: 0, isLoaded: false},
{scene: 6, amount: 0, isCurrent: false, isFirstPlayScene: true, hasChange: false, isLoaded: false},
];

var totalMoney = 0;

function videoCreate(videoJQuery) {
    var video = {
    id: '',
    scene: videoJQuery.parent().attr('class').slice(0, videoJQuery.parent().attr('class').indexOf(' ')),
    type: videoJQuery.attr('class').slice(0, videoJQuery.attr('class').indexOf(' ')),
    vHTML: '',
    vJQuery: '',
    vPlayer: videojsCreate(videoJQuery.get(0)),
    isLoaded: false
};
    
    video.id = video.vPlayer.id();
    video.vJQuery = $('#'+video.id);
    video.vHTML = video.vJQuery.get(0);
    return video;
}

function findVideoById(id){
    var video;
    $.each(videos, function(){
        if(this.id == id){
            video = this;
        }
    });
    return video;
}

function findVideoBySceneAndType(scene, type){
    var video;
    $.each(videos, function(){
        if(this.scene == scene && this.type == type){
            video = this;
        }
    });
    return video;
}

function videojsCreate(video){
    var videoj = videojs(video, {
      'autoplay': false,
      'bigPlayButton': false,
      controlBar: {
            'playToggle': true,
            'volumeMenuButton': { 'inline': false },
            'timeDivider': false,
            'durationDisplay': false,
            'currentTimeDisplay': false,
            'fullscreenToggle': false,
            'pictureInPictureToggle': false,
            'remainingTimeDisplay': true,
            "preload": "auto",
            'fill': true,
            'responsive': true
        
      }, 'fluid': true,
      userActions: {
        'doubleClick': false
        }
    });
    videoj.dimensions(window.width, window.height);

    return videoj;
}


function playVideo(video, lastVideo) {

    

    var nextVideo = findVideoById(video.attr('id')).vPlayer;

    




    lastVideo.parent().find('.timer_line').finish();
    lastVideo.parent().find('.timer_line').css('width', 0);

    lastVideo.removeClass('active');
    lastVideo.addClass('hide');

    video.removeClass('hide');
    video.addClass('active');


    $('.choice').fadeOut(0);
    
    nextVideo.play();
    
}

function changeTotalMoney(amount, isShow){
    var changeMoney = $('.change_money');

    if(amount==0) isShow = false;

        if(isShow){
    if(amount<0){
        changeMoney.addClass('spend');
        changeMoney.html(amount);
    } else {
        changeMoney.html('+'+amount);
    }

        changeMoney.animate({
            opacity: '100%',
            'marginTop': '0'
        }, 500, function() {
            changeMoney.animate({
                opacity: '0',        
            }, 500, function(){
                changeMoney.css('marginTop','3vw');
                changeMoney.removeClass('spend');
            });

        });
    }
    setTimeout(function(){
        totalMoney += amount;
        $('.total_money').html(totalMoney);
    }, 500);
}

function findObjByJQ(array, JQ){
    var obj;
    $.each(array, function(){
        if(this.JQ.is(JQ)){
            obj = this;
        }
    });
    return obj;
}

function findVideoByJquery(JQ){
    var obj;
    $.each(videos, function(){
        if(this.vJQuery.is(JQ)){
            obj = this;
        }
    });
    return obj;
}

function random(min,max){
    return Math.round(Math.random() * (max-min) + min);
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function playScene(scene){
    var nextVideo;
    if(scene != 'scene_6'){
        nextVideo = findVideoBySceneAndType(scene, 'v_main');
    }
    else{
        if(totalMoney>5000) nextVideo = findVideoBySceneAndType(scene, 'v_1');
        else if(totalMoney>2000) nextVideo = findVideoBySceneAndType(scene, 'v_2');
        else if(totalMoney>400) nextVideo = findVideoBySceneAndType(scene, 'v_3');
        else nextVideo = findVideoBySceneAndType(scene, 'v_4');
    }


   //nextVideo.vPlayer.load();
        nextVideo.vJQuery.parent().removeClass('hide');
    nextVideo.vJQuery.parent().addClass('active'); 

    nextVideo.vJQuery.removeClass('hide');
    nextVideo.vJQuery.addClass('active');
    //loading(nextVideo.vPlayer);



//$('.loading').fadeOut(0);
    //if(loading(nextVideo.vPlayer)){
       nextVideo.vPlayer.play();
    //}
}

function showGameEndWindow(game, text){
    $('.game_end').attr('id', game);
    $('.game_end').find('.text').html(text);
    $('.game_end').fadeIn(0);
}

function fullScreen(element) {
        window.scrollTo(0,1);
          if(element.requestFullscreen) {
            element.requestFullscreen();
          } else if(element.webkitrequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if(element.mozRequestFullscreen) {
            element.mozRequestFullScreen();
          }
        }

function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
    return false;
  }
}

function saveGameState() {
    if (!supportsLocalStorage()) { return false; }
    localStorage["total.money"] = totalMoney;
    for (var i = 0; i < 6; i++) {
        localStorage["scene." + (i+1) + ".hasChange"] = money[i].hasChange;
        localStorage["scene." + (i+1) + ".isCurrent"] = money[i].isCurrent;
        localStorage["scene." + (i+1) + ".isFirstPlayScene"] = money[i].isFirstPlayScene;
        localStorage["scene." + (i+1) + ".choice"] = money[i].choice;
        localStorage["scene." + (i+1) + ".game"] = money[i].game;
    }
    return true;
}

function resumeGame() {
    if (!supportsLocalStorage()) { return false; }
    totalMoney = parseInt(localStorage["total.money"]);
    $('.total_money').html(totalMoney);
    $('.change_money').html('');
    for (var i = 0; i < 6; i++) {
        money[i].hasChange = (localStorage["scene." + (i+1) + ".hasChange"] == "true");
        money[i].isCurrent = (localStorage["scene." + (i+1) + ".isCurrent"] == "true");
        money[i].isFirstPlayScene = (localStorage["scene." + (i+1) + ".isFirstPlayScene"] == "true");
        money[i].choice = parseInt(localStorage["scene." + (i+1) + ".choice"]);
        money[i].game = parseInt(localStorage["scene." + (i+1) + ".game"]);
        if(!money[i].isFirstPlayScene){
            $('.navigation > div > .scene_'+money[i].scene).removeClass('lock');
            $('.navigation > div > .game_'+i).removeClass('lock');
        }
        
        if(money[i].isCurrent){
            $('.active').addClass('hide');
            $('.active').removeClass('active');

            playScene('scene_'+(i+1));
        }
    }
    return money;
}

function startNewGame(){
    totalMoney = 0;
    $('.total_money').html(totalMoney);
    $('.change_money').html('');

    for (var i = 0; i < 6; i++) {
        money[i].hasChange = false;
        money[i].isFirstPlayScene = true;
        money[i].game = 0;
        money[i].choice = 0;
        money[i].isCurrent = false;

    }
    money[0].isCurrent = true;

    $('.navigation > div > div').addClass('lock');

    return money;
}

function loading(video) {
    video.load();
    video.on('canplaythrough', function(){
            if(this.readyState()>3 && this.hasClass('active')){
                    //$('.loading').fadeOut(0);
                    //console.log(t, t.readyState());
                    this.play();
                    //$('.loading').fadeOut(1000);
                     var videoIndex = videos.indexOf(findVideoById(this.id()));
                if(videoIndex != -1 && videoIndex<videos.length-1){

                //videos[videoIndex+1].vPlayer.load();
            }
        }
    })


}

var timeInterval = 100;

$(window).resize( function(){
    $('.info_content').data('jsp').reinitialise();
});
/*
$(document).ready(function() {
    //document.addEventListener('fullscreenchange webkitfullscreenchange', function() {
        window.addEventListener('fullscreenchange', function(){
        console.log("Change");
        $('body').on('click', function(){
            fullScreen(document.documentElement);
        })
        
    });
});*/

function clickAnimation(button){
    /*var shadow = button.css('box-shadow').split(' ');
    console.log(shadow, button)
    button.css('box-shadow', shadow[0]+' 0 '+shadow[2]+' '+shadow[3]);*/
    button.addClass('click');
    setTimeout(function(){
        button.removeClass('click');
    }, timeClickAnimation/2);
}



$(document).ready(function() {

$('.start_box').ready(function() {
    $('.start_box_prev').fadeOut(100);
});

    choice = false;
    autoChoice = false;
    timeForChoice = 20;
    timeForGame = 30;

    videos = [];

var jsp = $('.info_content').jScrollPane({
            showArrows: false,
            maintainPosition: false,
            verticalGutter: 10,
            mouseWheelSpeed: 5,
            horizontalGutter: 0,

});
        $('.info_content').data('jsp').reinitialise();


if (supportsLocalStorage()) { 
    //localStorage.clear();
    console.log(localStorage);
    if(localStorage.length==0) {
        $('.button_continue').hide(); 
    }
    if(localStorage.length>0 && parseInt(localStorage["total.money"])!=0) {
        $('.button_continue').show(); 
    }
}

   $.each($('video'), function(){
        $(this).addClass('video-js vjs-default-skin');

        videos.push(videoCreate($(this)));

    });

    $('.ch_1, .ch_2').click(function() {
        var button = $(this);
        clickAnimation(button.find('.ch_text'));

        setTimeout(function(){
            choice = true;

            var id = '.'+ button.attr('class').replace(/ch/,'v');
            console.log(id);
            var video = button.parent().parent().parent().find(id);
            var lastVideo = button.parent().parent().parent().find('.v_main');
            playVideo(video, lastVideo);

            $('.button_scenes, .button_info').show();
        }, timeClickAnimation);

    });

    $('.info_titles > div').click(function(){
        if(!$(this).hasClass('current')){
            var prev = $('.current');
            $('.info_content').find('.'+$(this).attr('class')).fadeIn(0);

            $(this).addClass('current');
            prev.removeClass('current');
            $('.info_content').find('.'+prev.attr('class')).fadeOut(0);
            $('.info_content').data('jsp').reinitialise();
            $('.info_content').data('jsp').scrollTo(0, 0);

        }
    });


    $('.button_start').click(function(){
        var button = $(this);
        clickAnimation(button);
        setTimeout(function(){
            fullScreen(document.documentElement);
            money = startNewGame();
            console.log(money, button)
            button.parent().fadeOut();
            var firstVideo = findVideoById($('.scene_1 > .v_main').attr('id'));
            firstVideo.vPlayer.play();
            firstVideo.vJQuery.parent().addClass('active');
            firstVideo.vJQuery.addClass('active');
            if(saveGameState()) console.log(localStorage);
        }, timeClickAnimation);

    });

    $('.button_continue').click(function(){
        var button = $(this);
        clickAnimation(button);
        setTimeout(function(){
            fullScreen(document.documentElement);
            money = resumeGame();
            console.log(money)
            button.parent().fadeOut();
            if(saveGameState()) console.log(localStorage);
        }, timeClickAnimation);

    });
    var videoHTML;

          if($(window).width()/16*9>$(window).height()){
            $('.video-js .vjs-tech').addClass('wide_screen');
            var deltaTop = ($(this).width()/16*9 - $(this).height())/2/$(this).height()*100;
            $('.video-js .vjs-tech').css('top', -deltaTop+'vh');
            var controlBottom = 30/$(this).height()*100;
            $('.vjs-control-bar').css('bottom', 2*deltaTop+controlBottom+'vh');
        }
    $(window).on('resize', function(){
        if($(this).width()/16*9>$(this).height()){
            $('.video-js .vjs-tech').addClass('wide_screen');
            var deltaTop = ($(this).width()/16*9 - $(this).height())/2/$(this).height()*100;
             
                $('.video-js .vjs-tech').css('top', -deltaTop+'vh');
            var controlBottom = 30/$(this).height()*100;
            $('.vjs-control-bar').css('bottom', 2*deltaTop+controlBottom+'vh');
        
        } else{
            $('.video-js .vjs-tech').removeClass('wide_screen');
            $('.video-js .vjs-tech').css('top', 0);
            $('.vjs-control-bar').css('bottom', 1.56+'vw');
        }
    });
/*
startSecondGame();
$('.start_box').hide();
$('.loading').hide();*/

        $('.video-js').on('classchanged', function(){
            video = findVideoByJquery($(this));
            console.log(video.vPlayer, video.vPlayer.readyState(), video.isLoaded);
            if(video.vPlayer.hasClass('active') && video.vPlayer.readyState()>3) {
                console.log(video.vPlayer, video.vPlayer.readyState(), video.isLoaded);
                //$('.loading').fadeOut(1000);
                video.vPlayer.play();
                var sceneVideos = videos.filter(x => x.scene === video.scene);
                var lastInScene = sceneVideos[sceneVideos.length-1];
                if(videos.indexOf(lastInScene) != -1 && videos.indexOf(lastInScene)<videos.length && video.scene!='scene_6'){
                    
                    var nextSceneVideo = videos[videos.indexOf(lastInScene)+1];
                    //
                    //nextSceneVideo.vPlayer.load();
                }
                
                if(sceneVideos.length == sceneVideos.filter(x => x.isLoaded === true).length){
                    //$('.loading').fadeOut(1000);
                //console.log(video.vPlayer.readyState(), video.isLoaded);
                $.each(sceneVideos, function () {
                    //console.log(this.vPlayer.readyState(), this.isLoaded);
                });
                    //video.vPlayer.play();

                }
            }
        });


    $.each(videos, function () {
 //       var videoData = this;
        var player = this.vPlayer;
        
        var videoData = this;
        /*
        console.log(videoData)
        var video = document.getElementById(player.id()+'_html5_api');
        if(videos.indexOf(videoData) == 0){
        video.load();
       // video.pause();
        video.addEventListener('progress', function(){
            if(this.buffered.end(0) > 0.9*this.duration)
            {
                videoData.isLoaded = true;
            }
        });

    } else if(videos[videos.indexOf(videoData)-1].isLoaded){
                video.load();
               // video.pause();
        video.addEventListener('progress', function(){
            if(this.buffered.end(0) > 0.9*this.duration)
            {
                videoData.isLoaded = true;
            }
        });
    }*/
    if(videos.indexOf(this) == 0) this.vPlayer.load();

        player.ready(function(){
        //this.load();
        //this.pause();
        

        var isSet = false;
        var videoData = findVideoById(this.id());

            this.on('progress', function(){
                /*
                var video = findVideoById(this.id());
                var sceneVideos = videos.filter(x => x.scene === video.scene);
               //console.log(video.vPlayer, video.vPlayer.readyState(), video.vPlayer.bufferedPercent());
                //if(this.readyState()<4) this.currentTime(this.duration()/2);;
                //if(this.readyState()>3 && this.bufferedPercent()>0.5){
                    if(this.readyState()>3){
//console.log('!!1', this, this.readyState(), this.bufferedPercent());
                video.isLoaded = true;
                
                $.each(sceneVideos, function () {
                    if(!this.isLoaded && this.vPlayer.readyState()<4){
                       // this.vPlayer.load();
                        //this.vPlayer.play();
                        //this.vPlayer.pause();
                        //this.vPlayer.currentTime(0);
                    }
                });
            } 
                //console.log(this, sceneVideos);
                if(sceneVideos.length == sceneVideos.filter(x => x.isLoaded === true).length){
                
               // console.log(this);

                if(this.hasClass('active') && video.isLoaded) {
                    this.play();
                    var lastInScene = sceneVideos[sceneVideos.length-1];
                                    if(videos.indexOf(lastInScene) != -1 && videos.indexOf(lastInScene)<videos.length && video.scene!='scene_6'){
                    
                    var nextSceneVideo = videos[videos.indexOf(lastInScene)+1];
                    //console.log(this, lastInScene, nextSceneVideo);
                   // nextSceneVideo.vPlayer.load();
                }
                }
                }
                
*/
            
            });
            this.on('useractive', function(){
                console.log('active');
                $('.button_scenes, .button_info').css('opacity', 1);
            });

            this.on('userinactive', function(){
                console.log('inactive');
                if(!this.paused()){
                $('.button_scenes, .button_info').css('opacity', 0);
            }
            });


            this.on('play', function(){
                $('.button_scenes, .button_info').css('opacity', 1);
                if(saveGameState()) console.log(localStorage);
                isSet = false;
                var video = findVideoById(this.id());
                if(videos.indexOf(video)!=-1 && videos.indexOf(video)<videos.length-1){
                //videos[videos.indexOf(video)+1].vPlayer.load();
            }
                
                                    
                $('.navigation > div > .'+ videoData.scene).removeClass('lock');
                var currentScene = Number(videoData.scene.slice(6,7));
                $.each(money, function () {
                    this.isCurrent = false;
                });
                money[currentScene-1].isCurrent = true;
                

            });

           this.on('timeupdate', function(){
                videoHTML = $('#'+this.id());

                var currentScene = Number(videoData.scene.slice(6,7));

                if(videoHTML.hasClass('active')){

                if(videoHTML.parent().hasClass('scene_6')){
                    return;
                }
                if(!isSet && !money[currentScene-1].isFirstPlayScene && this.hasClass('v_main')){
                    if(currentScene == 1 || currentScene == 6){
                        if(money[currentScene-1].hasChange) changeTotalMoney(-(money[currentScene-1].amount), false);
                    } else{
                        if(money[currentScene-1].choice == 0 && money[currentScene-1].hasChange) changeTotalMoney(-(money[currentScene-1].amount), false);
                        else if(money[currentScene-1].choice == 1) changeTotalMoney(-(money[currentScene-1].amount+money[currentScene-1].ch_1), false);
                        else if(money[currentScene-1].choice == 2) changeTotalMoney(-(money[currentScene-1].amount+money[currentScene-1].ch_2), false);
                        money[currentScene-1].choice = 0;
                    }
                    isSet = true;
                    money[currentScene-1].hasChange = false;   
                }


                
                if((this.hasClass('v_main')) && !money[currentScene-1].hasChange){

                    if($('#'+this.id()).parent().hasClass('scene_2')){
                        if(this.currentTime() > 8){
                            money[currentScene-1].hasChange = true;
                            changeTotalMoney(money[currentScene-1].amount, true);
                        }
                    } else{
                        money[currentScene-1].hasChange = true;
                        changeTotalMoney(money[currentScene-1].amount, true);
                    }
                }

            
                if(money[currentScene-1].choice == 0){
                    if(this.hasClass('v_1')){
                        changeTotalMoney(money[currentScene-1].ch_1, true);
                        money[currentScene-1].choice = 1;
                    }
                    if(this.hasClass('v_2')){
                        if($('#'+this.id()).parent().hasClass('scene_5')){
                            if(this.currentTime() > 7){
                                changeTotalMoney(money[currentScene-1].ch_2, true);
                                money[currentScene-1].choice = 2;
                            }
                        } else{
                            changeTotalMoney(money[currentScene-1].ch_2, true);
                            money[currentScene-1].choice = 2;
                        }
                    }
                }
            }
            });

            this.on('ended', function(){

                var videoIndex = videos.indexOf(findVideoById(this.id()));
                if(videoIndex != -1 && videoIndex<videos.length-1){

                //videos[videoIndex+1].vPlayer.load();
            }

                if(saveGameState()) console.log(localStorage);

                isSet = false;

                var currentScene = Number(videoData.scene.slice(6,7));
                money[currentScene-1].isFirstPlayScene = false;
                videoHTML = $('#'+this.id());
                if(this.hasClass('v_main') && !videoHTML.parent().hasClass('scene_1')) {

                    if(!choice) {
                        $('.button_scenes, .button_info').hide();
                        videoHTML.parent().find('.choice').fadeIn(0);
                        var timer = videoHTML.parent().find('.timer_line');
                        timer.animate({
                            width: '100%'
                        }, timeForChoice*1000);

                    }
                    setTimeout(function(){
                        if(!choice && videoHTML.parent().find('.choice').is(':visible')){
                            choice = true;
                            $(videoHTML.parent().find('.ch_1')).trigger('click');
                        }
                    }, timeForChoice*1000);
                }

                if(videoHTML.parent().hasClass('scene_1')){
                    //$('.loading').fadeIn(0);
                    choice = false;
                    
                    var lastVideo = $('#'+this.id());
                    var lastVideoConteiner = lastVideo.parent();

                    lastVideo.removeClass('active');
                    lastVideo.addClass('hide');

                    lastVideoConteiner.removeClass('active');
                    lastVideoConteiner.addClass('hide');
                    //this.pause();

                    playScene('scene_2');
                    
                } 
                else if(videoHTML.parent().hasClass('scene_6')){
                    $('.total_result > b').html(totalMoney+' руб.');
                    for(i=1; i<=4; i++){
                        var curScene = money[i];
                        var sceneMoney = curScene.amount+curScene.game;
                        if(curScene.choice == 1) sceneMoney+=curScene.ch_1;
                        else if(curScene.choice == 2) sceneMoney+=curScene.ch_2;

                        $('.results > p:nth-child('+i+') > b').html(sceneMoney+' руб.');
                        if(sceneMoney < 0) $('.results > p:nth-child('+i+') > b').addClass('spend');
                        else $('.results > p:nth-child('+i+') > b').removeClass('spend');
                    }
                    
                    $('.end_box').fadeIn(0);
                    $('.active').addClass('hide');
                    $('.active').removeClass('active');
                    $('.button_scenes, .button_info').css('opacity', 1);

                }
                else if(this.hasClass('v_1') || this.hasClass('v_2')){

                    choice = false;
                    
                    var lastVideo = $('#'+this.id());
                    var lastVideoConteiner = lastVideo.parent();

                    lastVideo.removeClass('active');
                    lastVideo.addClass('hide');

                    lastVideoConteiner.removeClass('active');
                    lastVideoConteiner.addClass('hide');

                    if(lastVideoConteiner.hasClass('scene_2')) {
                        //findVideoBySceneAndType('scene_3', 'v_main').vPlayer.load();
                        startFirstGame();
                    }
                    if(lastVideoConteiner.hasClass('scene_3')) {
                        //findVideoBySceneAndType('scene_4', 'v_main').vPlayer.load();
                        startSecondGame();
                    }
                    if(lastVideoConteiner.hasClass('scene_4')) {
                       // findVideoBySceneAndType('scene_5', 'v_main').vPlayer.load();
                        startThirdGame();
                    }
                    if(lastVideoConteiner.hasClass('scene_5')) {
                        //findVideoBySceneAndType('scene_6', 'v_2').vPlayer.load();
                        startFourthGame();
                    }

                }

            });
            //return;
        });
    });

    
    $('.button_game_again').click(function(){
        var button = $(this);
        clickAnimation(button);
        setTimeout(function(){
            var gameEndID = $('.game_end').attr('id');
            if(gameEndID == 'game_1') {
                startFirstGame();
            }
            else if(gameEndID == 'game_2') {
                startSecondGame();
            }
            else if(gameEndID == 'game_3') {
                startThirdGame();
            }
            else if(gameEndID == 'game_4') {
                startFourthGame();
            }
            $('.game_end').fadeOut(0);
        },timeClickAnimation);
    });

    $('.button_game_continue').click(function(){
        var button = $(this);
        clickAnimation(button);
        setTimeout(function(){
            var gameEndID = $('.game_end').attr('id');

            if(gameEndID == 'game_1') {

                $('body > .game_1').fadeOut(0);
                playScene('scene_3');
            }
            else if(gameEndID == 'game_2') {
                $('body > .game_2').fadeOut(0);
                playScene('scene_4');
            }
            else if(gameEndID == 'game_3') {
                $('body > .game_3').fadeOut(0);
                playScene('scene_5');
            }
            else if(gameEndID == 'game_4') {
                $('body > .game_4').fadeOut(0);
                playScene('scene_6');
            }
            $('.game_end').fadeOut(0);
        }, timeClickAnimation);
    });

    $('.button_scenes').click(function() {


            $('.navigation_box').fadeIn(0);
            var currentVideo = findVideoById($('.active > .active').attr('id'));
            if(currentVideo){
                
                currentVideo.vPlayer.pause();
            }

    });

    $('.button_info').click(function() {

            $('.info_box').fadeIn(0);
            $('.info_content').data('jsp').reinitialise();
            var currentVideo = findVideoById($('.active > .active').attr('id'));
            if(currentVideo){
                currentVideo.vPlayer.pause();
            }

    });

    $('.close').click(function() {
        $(this).parent().parent().fadeOut(0);
        var currentVideo = findVideoById($('.active > .active').attr('id'));
        if(currentVideo){
            currentVideo.vPlayer.play();
        }
    });



    $('.navigation > div > div').click(function() {
        if(!$(this).hasClass('lock')){
            var button = $(this);
            clickAnimation(button);
            setTimeout(function(){
                choice = false;
                var sClass = button.attr('class').split(' ')[0];
                var currentVideo = findVideoById($('.active > .active').attr('id'));

                        if(currentVideo){
                        if(currentVideo.scene == sClass){
                            button.parent().parent().parent().hide();
                            currentVideo.vPlayer.play();
                        } 
                    }
                    else{
                        currentVideo = videos[videos.length-1];
                    }
                if(sClass.slice(0,5) == 'scene'){
                    
                    var scene = $('.videos').find('.'+ sClass);
                    if(currentVideo && currentVideo.scene != sClass){

                        //$('.loading').fadeIn(0);
                        var nextVideo;
                        if(sClass != 'scene_6') {
                            nextVideo = findVideoBySceneAndType(sClass, 'v_main');
                        } else{
                            if(totalMoney>5000) nextVideo = findVideoBySceneAndType(sClass, 'v_1');
                            else if(totalMoney>2000) nextVideo = findVideoBySceneAndType(sClass, 'v_2');
                            else if(totalMoney>400) nextVideo = findVideoBySceneAndType(sClass, 'v_3');
                            else nextVideo = findVideoBySceneAndType(sClass, 'v_4');
                            
                        }
                        currentVideo.vPlayer.pause();
                            currentVideo.vPlayer.currentTime(0);

                            loading(nextVideo.vPlayer);

                            currentVideo.vJQuery.removeClass('active');
                            currentVideo.vJQuery.addClass('hide');

                            var currentScene = $('.videos > .active');

                            currentScene.removeClass('active');
                            currentScene.addClass('hide');

                        

                            nextVideo.vJQuery.removeClass('hide');
                            nextVideo.vJQuery.addClass('active');

                            scene.removeClass('hide');
                            scene.addClass('active');

                                //nextVideo.vPlayer.play();
                    }
                }
                else if(sClass.slice(0,4) == 'game'){
                    if(Number(sClass.slice(5,6)) == 1) startFirstGame();
                    if(Number(sClass.slice(5,6)) == 2) startSecondGame();
                    if(Number(sClass.slice(5,6)) == 3) startThirdGame();
                    if(Number(sClass.slice(5,6)) == 4) startFourthGame();
                    $('.active').addClass('hide');
                    $('.active').removeClass('active');
                    currentVideo.vPlayer.pause();
                            currentVideo.vPlayer.currentTime(0);
                }

                button.parent().parent().parent().hide();
                $('.end_box').hide();
            }, timeClickAnimation);
        }
        
    });
});        
