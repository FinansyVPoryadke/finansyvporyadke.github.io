//Игра - Очисти ленту от ненужных покупок
var purchases = [], buyLine;
var purchaseSpeed, numberPurchasesInHeight = 3, betweenPurchases = 1.5, countPurchases = 12, percentNeccecary = 40, countOfRecreate=0;

var purchasesData = [
    [{price: 50, url: 'media/svg/purchase_n_1.svg'},
    {price: 100, url: 'media/svg/purchase_n_2.svg'},
    {price: 150, url: 'media/svg/purchase_n_3.svg'},
    {price: 200, url: 'media/svg/purchase_n_4.svg'}]
,

    [{price: 50, url: 'media/svg/purchase_un_1.svg'},
    {price: 100, url: 'media/svg/purchase_un_2.svg'},
    {price: 100, url: 'media/svg/purchase_un_4.svg'},
    {price: 150, url: 'media/svg/purchase_un_3.svg'}]

];

function createPurchase(){
    purchaseSpeed = betweenPurchases*countPurchases*200;
    var purchase = {
        number: 2,
        isUnnecessary: random(0,100) < percentNeccecary ? 0 : 1,
        price: 0,
        url: '',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        JQ: $(''),
        isBought: false
    }

    do{
        var elementData = purchasesData[purchase.isUnnecessary][random(0,purchasesData[purchase.isUnnecessary].length-1)];
        purchase.price = elementData.price;
        purchase.url = elementData.url;
        if(!purchases.length) break;
    }while(purchases[purchases.length-1].url == purchase.url);

    purchase.JQ = $('<div class="purchase"><img src="'+purchase.url+'"><div class="purchase_price">'+purchase.price+'</div></div>');

    $('.purchases_box').append(purchase.JQ);
    purchase.width = purchase.JQ.width();
    purchase.height = purchase.JQ.height();

    var prev, topNumber, prevNumber;
    if(purchases.length){
        prev = purchases[purchases.length-1];
        prevNumber = prev.number;
    } else {
        prevNumber = 2;
    }
    do{
        topNumber = random(1,numberPurchasesInHeight);
    }while(topNumber == prevNumber);

    if(purchases.length) {
        if(prev.number%2 == topNumber%2) {
            if(prev.number<=numberPurchasesInHeight/2) topNumber=prev.number+2;
            else topNumber=prev.number-2;
        }
    }
    purchase.number = topNumber;
    purchase.top = ((($('.purchases_box').height()-numberPurchasesInHeight*purchase.height)*topNumber)/(numberPurchasesInHeight+1) + purchase.height*(topNumber-1))/$('.purchases_box').height()*100;
    purchase.JQ.css('top', purchase.top+'%');

    if(purchases.length>2){
        if(prev.number%2 == purchase.number%2 && purchases[purchases.length-2].left != prev.left){
            purchase.left = prev.left;
        } else {
            purchase.left = prev.left - purchase.width*betweenPurchases/purchase.JQ.width()*100;
        }
    } else {
        purchase.left = (purchase.JQ.position().left - purchases.length*purchase.width*betweenPurchases)/purchase.JQ.width()*100;
    }

    purchase.JQ.addClass('no_transition');
    purchase.JQ.css('transform', 'translateX('+purchase.left+'%)');
    //purchase.JQ.css('left', purchase.left+'%');
    console.log(purchase.JQ.position().left, purchase.JQ.css('transform'));
setTimeout(function(){
        purchase.leftEnd = purchase.left + purchaseSpeed;
    
    purchase.JQ.css('transform', 'translateX('+purchase.leftEnd+'%)');
    purchase.JQ.removeClass('no_transition');
console.log(purchase.left, purchase.leftEnd, purchaseSpeed);
},100);


    if(purchase.isUnnecessary){
        purchase.JQ.addClass('unnecessary');
    }
    return purchase;
}

function recreatePurchase(purchase){
    purchase.isBought = false;
    purchase.width = purchase.JQ.width();
    purchase.height = purchase.JQ.height();
    purchase.isUnnecessary = random(0,100)< percentNeccecary ? 0 : 1;

    do{
        var elementData = purchasesData[purchase.isUnnecessary][random(0,purchasesData[purchase.isUnnecessary].length-1)];
        purchase.price = elementData.price;
        purchase.url = elementData.url;
        if(!purchases.length) break;
    }while(purchases[purchases.length-1].url == purchase.url);
    
    purchase.JQ.removeClass('unnecessary');

    if(purchase.isUnnecessary){
        purchase.JQ.addClass('unnecessary');
    }

    purchase.JQ.find('img').attr('src', purchase.url);
    purchase.JQ.find('.purchase_price').html(purchase.price);


    var topNumber = random(1,numberPurchasesInHeight);
    purchase.top = ((($('.purchases_box').height()-numberPurchasesInHeight*purchase.height)*topNumber)/(numberPurchasesInHeight+1) + purchase.height*(topNumber-1))/$('.purchases_box').height()*100;
    purchase.number = topNumber;


    prev = purchases[purchases.length-1];



    if(prev.number%2 == purchase.number%2 && prev.number != purchase.number && purchases[purchases.length-2].left != prev.left){

        purchase.left =prev.JQ.position().left/prev.JQ.width()*100 ;
    } else {

        purchase.left = prev.JQ.position().left/prev.JQ.width()*100 - purchase.width*betweenPurchases/purchase.JQ.width()*100;
    }


    purchase.JQ.addClass('no_transition');
    purchase.JQ.css('transform', 'translateX('+purchase.left+'%)');
    purchase.JQ.css('top', purchase.top+'%');
    //purchase.JQ.offset({ 'left': purchase.left+'%'});
setTimeout(function(){
    purchase.leftEnd = purchase.left + purchaseSpeed;
    purchase.JQ.removeClass('no_transition');
    purchase.JQ.css('transform', 'translateX('+purchase.leftEnd+'%)');
},100);
    return purchase;
}

function checkPurchaseTouchBuyLine(purchase) {
    if (collision(purchase.JQ, buyLine.JQ)) {
        var left = parseInt(purchase.JQ.position().left);
        if (left < buyLine.left) {
            return true;
        }
    }
    return false;
}



function startSecondGame(){

    changeTotalMoney(-money[2].game, false);
    money[2].game = 0;

    $('.game_2').fadeIn(0);
    $('.navigation > div > .game_2').removeClass('lock');

    buyLine = {
        JQ: $('.buy_line'),
        width: $('.buy_line').width(),
        left: $('.buy_line').position().left,
        top: $('.buy_line').position().top 
    }

    var buyTotal = 0, isPlaying = true;

    money[2].game = 0;
    countNecessary = 0;
    buyTotal = 0;
    purchases = [];
    purchaseSpeed = 0.2;
    countOfRecreate = 0;
    $('.purchases_box').empty();
    $('.buy_total').html(buyTotal+'.00');

    var anim_id;
var theInterval = setInterval(function () {
        $.each(purchases, function(){
            var purchase = this;
            //purchase = purchaseMove(purchase);

            if(purchase.isBought && purchase.JQ.position().left/$('body').width() > 1){
                purchases.splice(purchases.indexOf(purchase),1);
                purchases.push(recreatePurchase(purchase));
                purchase = purchases[purchases.length-1];
                //return;
            }
                if (checkPurchaseTouchBuyLine(purchase)) {
                if(!purchase.isBought){
                    purchase.isBought = true;
                    buyTotal += purchase.price;
                    $('.buy_total').html(buyTotal+'.00');
                    
                    if(purchase.isUnnecessary){
                        if(totalMoney-purchase.price<0){
                            isPlaying = false;
                            clearInterval(theInterval);
                             showGameEndWindow('game_2', 'Закончились все деньги в кошельке.</br></br>За время игры ты купил художественных</br>товаров на '+(buyTotal+money[2].game)+' из 1000 рублей: '+countNecessary+' шт.</br></br>А также других товаров на '+(-money[2].game)+' руб.');
                             if(saveGameState()) console.log(localStorage);
                        }
                        changeTotalMoney(-purchase.price, true);
                        money[2].game-=purchase.price;
                    } else {
                        if(buyTotal+money[2].game+purchase.price > 1000){
                            changeTotalMoney(-purchase.price, true);
                            money[2].game-=purchase.price;
                        }
                        countNecessary++;
                    }
                } 
            }
        });
        

        
    },50);
    var timer = $('.game_2').find('.timer_line');
    timer.animate({
        width: '100%'
    }, timeForGame*1000);
    setTimeout(function(){

        timer.finish();
        timer.css('width', 0);
        if(isPlaying) {
        isPlaying = false;
            clearInterval(theInterval);
            showGameEndWindow('game_2', 'За время игры ты купил художественных</br>товаров на '+(buyTotal+money[2].game)+' из 1000 рублей: '+countNecessary+' шт.</br></br>А также других товаров на '+(-money[2].game)+' руб.');
            if(saveGameState()) console.log(localStorage);
        }
    }, timeForGame*1000);

    for(i=0; i<countPurchases; i++){
        purchases.push(createPurchase());
    }

    


    $('.purchases_box > div').on('click mousedown touchstart', function(){
        var purchase = findObjByJQ(purchases, $(this));
        console.log(purchase);    
        purchases.splice(purchases.indexOf(purchase),1);
        purchases.push(recreatePurchase(purchase));
    });

}