function init()
{
    let everything = document.querySelectorAll(".item-thumb-link"); 
    var get_all = setInterval(function(){
        everything = document.querySelectorAll(".item-thumb-link");
        if (everything)
        {
            console.log("Trouvé !");
            iterate(everything);
            clearInterval(get_all);
        }
    }, 1000);
}
init();


// Prendre toutes les annonces
function iterate(card)
{
    card.forEach(function (c, index) {
        setTimeout(function (){
                var newindow = open(c.href, 'newwin', "width=1000,height=1000")
                sendForm(newindow);
        }, index * 14000);
    });
}



// Envoyer le formulaire sur la nouvelle page
function sendForm(newindow)
{
    let prenom = newindow.document.querySelector('input[name=prenom]');
    var get_name = setInterval(function(){
        prenom = newindow.document.querySelector('input[name=prenom]');
        if (prenom)
        {
            console.log("input trouvé !");
            let surname = newindow.document.querySelector('input[name=nom]');
            let phone = newindow.document.querySelector('input[name=telephone]');
            let message = newindow.document.querySelector('textarea[name=message]');
            let submit = newindow.document.querySelector('.contact-annonceur-envoyer');

            prenom.value = "Nassim";
            surname.value = "Amrane";
            phone.value = "07 84 72 15 32";
            message.value = "Bonjour, ce bien m'intéresse est-il toujours disponible ? Si oui, pouvez-vous mes contacter";
            setTimeout(() => {
                close_window(newindow, submit);
            }, 1000);
            clearInterval(get_name);
        }
    }, 1000);
}

function close_window(newindow, scrollto)
{
    scrollto.scrollIntoView();
    scrollto.click();
    setTimeout(function (){
        newindow.close();
    }, 4000);
}
