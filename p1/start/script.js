const mieImg = ["arrabbiato", "bello", "piangere", "ridere", "amare", "amare1", "spavento", "shock", "arrabbiato", "bello", "piangere", "ridere", "amare", "amare1", "spavento", "shock"];
let arrayComparison = [],
    iconsFind = [],
    tentativi = 0,
    t;

function startGame() {
    mieImg.sort(function() {
        return 0.5 - Math.random()
    });
    for (i = 0; i < mieImg.length; i++) {
        let image = '<div><img class="icon" src="img/' + mieImg[i] + '.png"></div>';
        $(image).appendTo(".icon-grid");
    }
    startTimer();
    $(".icon").click(function() {
        tentativi++;
        $("#click").html("Numero di click: " + tentativi);
        $(this).addClass("show");
        $(this).addClass("disabled");
        $(this).addClass("selected");
        $(this).removeClass("icon");
        let source = $(this).attr("src");
        arrayComparison.push(source);
        if (arrayComparison.length == 2) {
            if (arrayComparison[0] === arrayComparison[1]) {
                $(".selected").addClass("find");
                $(".selected").removeClass("selected");
                iconsFind.push(arrayComparison[0]);
                iconsFind.push(arrayComparison[1]);
                arrayComparison = [];
                if (iconsFind.length == 16) {
                    $("#modal").addClass("active");
                    $("#tempoTrascorso").html("<h2>Congratulazioni! Hai risolto il gioco in: " + t + "</h2>")
                    $("#tempoTrascorso").append("<h2>e hai fatto : " + tentativi + " tentativi</h2>")
                }
            } else {
                setTimeout(function() {
                    $(".selected").addClass("icon");
                    $(".selected").removeClass("disabled");
                    $(".selected").removeClass("show");
                    $(".selected").removeClass("selected");
                    arrayComparison = [];
                }, 700);
            }

        }
    })
}

function startTimer() {
    let s = 0,
        m = 0,
        h = 0,
        hc = 0;
    interval = setInterval(function() {
        t = m + " min " + s + " sec";
        let time = 'Tempo: ' + t;
        $("#timer").html(time);
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            h++;
            m = 0;
            hc = 1;
        }
        if (hc == 1) {
            t = h + " ore " + +m + " min " + s + " sec"
            time = 'Tempo: ' + t;
            $("#timer").html(time);
        }
    }, 1000);
}

$(document).ready(() => {
    startGame();
})
$(".again").click(function() {
    $("#modal").removeClass("active");
    let lista = document.getElementById('griglia');
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.firstChild);
    }
    iconsFind = [];
    click = 0;
    startGame();
})