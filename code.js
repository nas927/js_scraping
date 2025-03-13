let code = "";
function receive_sms() {
    let receive = open("https://sms24.me/en/numbers/33644629452", "_blank");

    const finding = setInterval(function (){
        let browser = receive.document.querySelector(".sms-content");
        if (browser)
        {
            const regex = /\d{6}/g;
            const sms = browser.innerText.match(regex);
            code = sms;
            console.log("reading msg");
            clearInterval(finding);
        }
    });
};

setTimeout(function (){
    receive_sms();
}, 1000);