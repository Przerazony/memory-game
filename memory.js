var cards = ["ciri.png","geralt.png","jaskier.png","jaskier.png","iorweth.png","triss.png","geralt.png","yen.png","ciri.png","triss.png","yen.png","iorweth.png"];
//alert(cards[4]);

/**dodając coś do konsoli możemy sprawdzić czy to chcemy jest rzeczywiście tablicą klikając zbadaj i przechodząc do zakładki konsola */
//console.log(cards);

var c0 = document.getElementById('c0');
var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var c3 = document.getElementById('c3');

var c4 = document.getElementById('c4');
var c5 = document.getElementById('c5');
var c6 = document.getElementById('c6');
var c7 = document.getElementById('c7');

var c8 = document.getElementById('c8');
var c9 = document.getElementById('c9');
var c10 = document.getElementById('c10');
var c11 = document.getElementById('c11');

/**używanie innej funckji zamiast wywoływania w html w div funkcji JS na zdarzenie onclick jak to robiliśmy wcześniej */
//dla c0 nasłuchujemy na click i wtedy wywołujemy funckję naszą
/**główną zaletą jest to że przy pomocy tego zdarzenia nasłuchiwania możemy do elementu przypiąć dowolną ilość nasłuchiwaczy danego zdarzenia (w przeciwieństwie do sposobu z atrybutami - wówczas jesteśmy ograniczeni do jednej funckji obsługującej zdarzenie) */
// wiele funkcji do tego samego zdarzenia :)
c0.addEventListener("click", function() { revealCard(0); });
c1.addEventListener("click", function() { revealCard(1); });
c2.addEventListener("click", function() { revealCard(2); });
c3.addEventListener("click", function() { revealCard(3); });

c4.addEventListener("click", function() { revealCard(4); });
c5.addEventListener("click", function() { revealCard(5); });
c6.addEventListener("click", function() { revealCard(6); });
c7.addEventListener("click", function() { revealCard(7); });

c8.addEventListener("click", function() { revealCard(8); });
c9.addEventListener("click", function() { revealCard(9); });
c10.addEventListener("click", function() { revealCard(10); });
c11.addEventListener("click", function() { revealCard(11); });

//zmiena jeśli ona true to 1 portret odsłonięty false = że pierwsza karta odsłaniana
var oneVisible = 1;
//liczba wykorzystanych rund
var turnCounter = 0;
//zmienna dla sprawdzania par
var visible_nr;
//zmienna zabezpieczenia przed odkrywaniem wiecej niz 2 naraz
var lock = false;
/**ile par do końca  gry */
var pairsLeft = 6;

function revealCard(nr)
{
    var opacityValue = $('#c'+nr).css('opacity');

    if(opacityValue != 0 && lock == false)
    {
        lock = true;
        //alert(nr);
        var obraz = "url(img/" + cards[nr] + ")";

        /**uchwyćmy w jQuery odpowiedniego diva z avatarem */
        //$ znaku dolara używa się do uruchomienia funckji jQuery() to to samo, ona za wszystko odpowiada i zwraca zawsze obiekt nie ważne co wrzucimy do środka, czy document czy funckję czy klasę, można używać nomenklatury jak w CSS czyli odwołać się do klasy poprzez .class

        /**łapiemy element <div class="card" id="cx"></div> gdzie x to numer wprowadzony do funckji*/
        /**chcesz zmienić css, do tego celu użyj metody .css(jakawłaściwosc, nowawartosc) */
        $('#c' +nr).css('background-image', obraz);
        /**
         * addClass() - dodaj przypnij klasę do elementu, ale uwaga dodajemy kolejną, ale nie zastępujemy innych, już aktywnych klas
         * metoda ta dodaje klasę ale kolejność ich nadrzędność wynika z tego jak po sobie są wprowadzone w arkusz CSS*/
        $('#c' +nr).addClass('cardA');
        /**removeClass(klasa) usuń podaną klasę z obiektu */
        $('#c' +nr).removeClass('card'); 

        /**toggleClass(klasa) jeśli element posiada przypiętą klasę to ją usuwamy z elementu zaś w przeciwnym wypadku dodajemy klasę do tego obieku */

        if(oneVisible == 1)
        {
            //first card
            oneVisible = 2;
            /**zapisujemy numer pierwszej karty */
            visible_nr = nr;
            lock = false;
        }
        else
        {
            //second card
            //warunek znalezienia pary
            if(cards[visible_nr] == cards[nr])
            {
                //alert("para");
                setTimeout(function() {hide2Cards(nr, visible_nr) },750);
                
            }
            else
            {
                //alert("pudło");
                setTimeout(function() {restore2Cards(nr, visible_nr) },1000);
            }
            

            turnCounter++;
            $('.score').html("Turn counter: "+turnCounter);
            oneVisible = 1;
        }

    }
}
 /**osobna funckja dla znikanai kart */
function hide2Cards(nr1,nr2)
{
    $('#c'+nr1).css("opacity",'0');
    $('#c'+nr2).css("opacity",'0');
    pairsLeft--;

    if(pairsLeft == 0)
    {
        $('.board').html('<h1>You win!<br>Done in '+turnCounter+'turns</h1>');
    }

    lock = false;
}
function restore2Cards(nr1,nr2)
{
    $('#c' +nr1).css('background-image', 'url(img/karta.png)');
    $('#c' +nr1).addClass('card');
    $('#c' +nr1).removeClass('cardA'); 
    $('#c' +nr2).css('background-image', 'url(img/karta.png)');
    $('#c' +nr2).addClass('card');
    $('#c' +nr2).removeClass('cardA');
    lock = false;

}