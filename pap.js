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
function iterate(cards)
{
    cards.forEach(function (c, index) {
        setTimeout(function (){
                var newindow = open(c.href, 'newwin')
                sendForm(newindow, index);
        }, index * 14000);
    });
    console.log("Nombre d'annonces : " + cards.length);
}


function check_colocation(title)
{
    const regex = /coloc.*/i;
    if (regex.test(title))
     return true;

    return false;
}



// Envoyer le formulaire sur la nouvelle page
function sendForm(newindow, index)
{
    let prenom = newindow.document.querySelector('input[name=prenom]');
    var get_name = setInterval(function(){
        prenom = newindow.document.querySelector('input[name=prenom]');
        if (prenom)
        {
            console.log("input trouvé ! Annonce n°" + (index + 1));
            clearInterval(get_name);
            let title = newindow.document.querySelector("h1.item-title").innerText;
            if (check_colocation(title))
                return;
            let surname = newindow.document.querySelector('input[name=nom]');
            let phone = newindow.document.querySelector('input[name=telephone]');
            let message = newindow.document.querySelector('textarea[name=message]');
            let submit = newindow.document.querySelector('.contact-annonceur-envoyer');

            prenom.value = "Nassim";
            surname.value = "Amrane";
            phone.value = "07 84 72 15 32";
            message.value = "Bonjour, nous sommes un couple composé d'un informaticien et d'un cadre de santé. Nous recherchons quelque chose de stable. Nous sommes actuellement au rsa temporairement le temps d'aboutir à nos ambitions. Nous sommes des personnes sérieuses et honnête nous garantissons toute la coopération nécessaire au bon déroulement de la location dans l'attente de votre réponse je vous prie d'agréer mes salutations distinguées. Nous sommes disponible pour en discuter à ce numéro 07 84 72 15 32 et cet email ncamelia.amrane@gmail.com";
            setTimeout(() => {
                close_window(newindow, submit);
            }, 1000);
        }
    }, 1000);
}

function close_window(newindow, scrollto)
{
    scrollto.scrollIntoView();
    scrollto.click();
    console.log("Formulaire envoyé !");
    setTimeout(function (){
        newindow.close();
    }, 4000);
}
