//Игра - Собери монетки в копилку

var moneyBox;
var numberCoinsInWidth = 6, betweenCoins = 2, percent10 = 75, coinSpeed = 2000, countCoins = 15, numberCollect10, numberCollect100;
var coins = [];
var coinsData = [{price: 100, url: 'media/svg/money_100.svg'},
    {price: 10, url: 'media/svg/money_10.svg'}];

function createCoin(){
    var coin = {
        is10: random(0,100) < percent10 ? 1 : 0,
        isCollect: false,
        top: 0,
        left: '',
        width: 0,
        height: 0,
        number: 0,
        speed: 0,
        price: 0,
        url: '',
        JQ: '',
        top2: 0
    };

    coin.price = coinsData[coin.is10].price;
    coin.url = coinsData[coin.is10].url;
    coin.JQ = $('<div class="coin"><img src="'+coin.url+'"></div>');
    coin.speed = coinSpeed;
    if(!coin.is10) coin.JQ.addClass('money_100');

    $('.coins_box').append(coin.JQ);
    coin.width = coin.JQ.width();
    coin.height = coin.JQ.height();

    coin.JQ.css('transform', 'translateY(-200%)');
    var prev;
    if(coins.length){
        prev = coins[coins.length-1];
        prevNumber = prev.number;
    } else {
        prevNumber = numberCoinsInWidth/2;
    }

var leftNumber;
do{
    leftNumber = random(1,numberCoinsInWidth);
    coin.number = leftNumber;
}while(coin.number == prevNumber);
    
    coin.left = ((($('.coins_box').width()-numberCoinsInWidth*coin.width)*leftNumber)/(numberCoinsInWidth+1) + coin.width*(leftNumber-1))/$('.coins_box').width()*100;
    coin.JQ.css('left', coin.left+'%');


    if(coins.length>1){
       //if((Math.abs(coin.number - prev.number)>1 || prev.number%2 == coin.number%2) && coins[coins.length-2].top!=prev.top){
           // coin.top = prev.top;
        //} else {
            coin.top = prev.top - coin.height*betweenCoins/coin.width*100;
       // }
    } else {
        coin.top = (coin.JQ.position().top - coins.length*coin.height*betweenCoins)/coin.width*100;
    }

coin.top2=coin.top;
coin.JQ.addClass('no_transition');
    coin.JQ.css('transform', 'translateY('+coin.top2+'%)');

        setTimeout(function(){
                    coin.top2 += coin.speed;
    var parent = coin.JQ.parent();
    var coinTop = coin.top2*coin.JQ.width()/100;
    coin.JQ.removeClass('no_transition');
    coin.JQ.css('transform', 'translateY('+coin.top2+'%)');
    console.log(coin)
},100);

    return coin;
}

var countOfRecreate=0;

function recreateCoin(coin){
    coin.isCollect = false;
    var leftNumber = random(1,numberCoinsInWidth);
    coin.number = leftNumber;
    coin.width = coin.JQ.width();
    coin.height = coin.JQ.height();
   
    countOfRecreate++;
    
    var prev = coins[coins.length - 1];
    if(countOfRecreate == 1 || countOfRecreate == countCoins+1 || countOfRecreate == 2*countCoins+1) {
         - 100 - coin.height*betweenCoins/coin.width*100;
        console.log(coin.top);

} else{
    coin.top = prev.top - coin.JQ.height()*betweenCoins/coin.JQ.width()*100;
}


//coin.top2 = coin.top;
    coin.JQ.addClass('no_transition');
    coin.JQ.css('transform', 'translateY('+coin.top2+'%)');
    coin.left = ((($('.coins_box').width()-numberCoinsInWidth*coin.JQ.width())*leftNumber)/(numberCoinsInWidth+1) + coin.width*(leftNumber-1))/$('.coins_box').width()*100;
    coin.JQ.css('left', coin.left+'%');

    setTimeout(function(){
                    coin.top += coin.speed;
    var parent = coin.JQ.parent();
    var coinTop = coin.top*coin.JQ.width()/100;
    coin.JQ.removeClass('no_transition');
    coin.JQ.css('transform', 'translateY('+coin.top+'%)');
    console.log(coin)
},100);


    return coin;
}

function coinDown(coin) {
    coin.top += coin.speed;
    var parent = coin.JQ.parent();
    var coinTop = coin.top*coin.JQ.width()/100
    
    coin.JQ.css('transform', 'translateY('+coin.top+'%)');

    return coin;
}

function checkCoinTouchMoneybox(coin) {
    if (collision(coin.JQ, $('.money_box'))) {
        var left = coin.JQ.offset().left;
        var top = coin.JQ.offset().top;
        
        if (left > $('.money_box').offset().left && top < $('.money_box').offset().top && left+coin.JQ.width() < $('.money_box').offset().left+$('.money_box').width()) {
            return true;
        }
    }
    return false;
}

function checkCoinTouchFloor(coin) {
    var top = coin.JQ.offset().top;
    if (top > $('.floor_line').offset().top) {
        return true;
    }
    return false;
}


function startFirstGame_2(){

    changeTotalMoney(-money[1].game, false);
    money[1].game = 0;

    $('.game_1').fadeIn(0);
    $('.navigation > div > .game_1').removeClass('lock');

    moneyBox = {
        JQ: $('.money_box'),
        width: $('.money_box').width(),
        position: $('.money_box').position().left,
        top: $('.money_box').position().top 
    }
var the_game;
    var isPlaying = true;
    money[1].game = 0;
    numberCollect10 = 0;
    numberCollect100 = 0;
    countOfRecreate = 0;
    coins = [];
    $('.coins_box').empty();

    moneyBox.JQ.css('left', '31.25vw');

    var anim_id;

    var timer = $('.game_1').find('.timer_line');
    timer.animate({
        width: '100%'
    }, timeForGame*1000);
    setTimeout(function(){
        timer.finish();
        timer.css('width', 0);
        isPlaying = false;
        clearInterval(theGame);
        //cancelAnimationFrame(anim_id);
        //showGameEndWindow('game_1', 'За время игры ты собрал '+money[1].game+' руб.</br></br>Положив в конверт монет по 10 рублей: '+numberCollect10+' шт.</br>и купюр по 100 рублей: '+numberCollect100+' шт.');
    }, timeForGame*1000);


    for(i = 0; i<countCoins; i++){
            coins.push(createCoin());
        
    }
    console.log(coins);

    //coinSpeed = 500;
    setInterval(function(){
    $.each(coins, function(){
        var coin = this;
        //coinDown(coin);

//console.log(coin);

        if (checkCoinTouchMoneybox(coin)) {
            if(!coin.isCollect){
                coin.isCollect = true;
                changeTotalMoney(coin.price, true);
                money[1].game+=coin.price;
                if(coin.is10) numberCollect10++;
                if(!coin.is10) numberCollect100++;
                setTimeout(function(){
                    coin.JQ.animate({
                        opacity: '0'
                    }, 200, function(){
                            
                        });
                }, 200);
            } 

        }
        if(checkCoinTouchFloor(coin)){
            coins.splice(coins.indexOf(coin),1);
            coins.push(recreateCoin(coin));
            coin = coins[coins.length-1];
            coin.JQ.css('opacity', '100%');
            return;
        }
        });
        //if(isPlaying) clearInterval(the_game);
    },20);


    //anim_id = requestAnimationFrame(the_game);

    $('.money_box').draggable({
        axis: "x",
        containment: 'parent',
        stop: function(e, ui) {

            moneyBox.position = ui.position.left / $('body').width() * 100;
            ui.helper.css('left', moneyBox.position + 'vw');
            moneyBox.top = ui.offset.top / $('body').width() * 100;
            //var bottom = 100 - (moneyBox.JQ.height()+ui.offset.top)/ $('body').width() * 100;
           ui.helper.css('bottom', '7.3vw');
           ui.helper.css('top', '');

        }
    });
}