// Avoir tous les boutons pour trouver 
// le bouton Suivant
var everything = null;
var last_time = 0;
function init()
{
    var get_next_a = setInterval(function(){
        everything = document.querySelectorAll("a[title]");
        if (everything)
        {
            console.log("Trouvé !")
            clearInterval(get_next_a);
            searchPosts(everything);
        }
    }, 1000);
}
init();

// Avoir le bouton suivant
function go_next()
{
    var next = document.querySelector("button[aria-label='page suivante']");
    console.log("Getting next page...");
    if (next)
    {
        next.click();
        return true;
    }
    return false;
}

// Prendre toutes les annonces
function searchPosts(cards)
{
    cards.forEach(function (c, index) {
        setTimeout(function (){
                console.log("Ouverture de la fenêtre " + c.href);
                var newindow = open(c.href, 'newwin');
                sendForm(newindow, index);
        }, index * 16000);
    });
    if (!last_time)
        setting_timeout(loop, (Object.keys(cards).length * 14000));
}

// Envoyer le formulaire sur la nouvelle page
function sendForm(newindow, index)
{
    var get_tel = setInterval (function(){
        var tel = newindow.document.querySelector('input[name=firstName]');
        if (tel)
        {
            console.log("input trouvé ! n° " + index);
            setTimeout(function () {newindow.document.querySelector('button[data-testid=cdp-contact-form-submit]').click();}, 2000);
            setting_timeout(close_window, 3000, newindow);
            clearInterval(get_tel);
        }
    }, 1000);
}

function setting_timeout(do_thing, ms, ...args)
{
    setTimeout(function (){
        do_thing(...args);
    }, ms);
}

function close_window(newindow)
{
    newindow.close();
}

function loop()
{
    if (!go_next())
    {
        last_time = 1;
        console.log("Dernière page");
    }
    init();
}
