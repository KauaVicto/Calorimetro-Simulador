(function(){
    const BTN = document.getElementById('btn')
    const CNV = document.getElementById('canvas')
    const CTX = CNV.getContext('2d')
    const ALT_JOGO = 600
    const LARG_JOGO = 600

    let alm = document.getElementById('alm')

/*---------- OBJETOS ----------*/
    calorimetro = {
        srcX: 0,
        estado: "desligado",
        qtframe: 1
    }
    fogo = {
        srcX: 0,
        estado: "desligado"
    }

/*---------- IMAGEM ----------*/
    let img = new Image
        img.src = "assets/calorimetro.png"
        img.addEventListener("load", () => {
            requestAnimationFrame(loop, CNV)
        }, false)
    
    let fogoImg = new Image
        fogoImg.src = "assets/fogo.png"

/*---------- EVENTOS ----------*/
    BTN.addEventListener('click', () => {
        // valorAlm = parseInt(alm.options[alm.selectedIndex].value)
        // console.log(calc(valorAlm, 1000, 1))
        console.log("iniciando...")
        fogo.estado = "ligado"
        setTimeout(() => {
            calorimetro.srcX = 0
            img.src = "assets/iniciando.png"
            calorimetro.qtframe = 2
        }, 3000)
        setTimeout(() => {
            calorimetro.srcX = 0
            img.src = "assets/fervendo.png"
            calorimetro.qtframe = 6
        }, 10000)
    })

/*---------- FUNÇOES ----------*/
    function calc(q, m, c){
        let temp = q / (m * c)
        return temp
    }

    function desenhar(){
        CTX.clearRect(0, 0, LARG_JOGO, ALT_JOGO)
        CTX.drawImage(
            img,
            calorimetro.srcX, 0, 1200, 1200,
            0, 0, 600, 600
        )
        if(fogo.estado == "ligado"){
            CTX.drawImage(
                fogoImg,
                fogo.srcX, 0, 500, 500,
                250, 370, 100, 100
            )
        }
    }

    setInterval(() => {
        calorimetro.srcX += 1200
        if(calorimetro.srcX > (calorimetro.qtframe * 1200)-1200){
            calorimetro.srcX = 0
        }            
    }, 200);
    setInterval(() => {
        fogo.srcX += 500
        if(fogo.srcX > 1000){
            fogo.srcX = 0
        }                   
    }, 150);

    function loop(){
        desenhar()
        requestAnimationFrame(loop, CNV)
    }

    loop()
}())
