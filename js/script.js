(function(){
    const BTN = document.getElementById('btn')
    const CNV = document.getElementById('canvas')
    const CTX = CNV.getContext('2d')
    const ALT_JOGO = 600
    const LARG_JOGO = 600

    let alm = document.getElementById('alm')
    let frame = 0

/*---------- OBJETOS ----------*/
    calorimetro = {
        srcX: 0,
        src: "assets/calorimetro.png",
        estado: "desligado",
        qtframe: 1
    }
    fogo = {
        srcX: 0,
        estado: "desligado"
    }

/*---------- IMAGEM ----------*/
    let img = new Image
        img.src = calorimetro.src
        img.addEventListener("load", () => {
            requestAnimationFrame(loop, CNV)
        }, false)
    
    let fogoImg = new Image
        fogoImg.src = "assets/fogo.png"

/*---------- EVENTOS ----------*/
    BTN.addEventListener('click', () => {
        // valorAlm = parseInt(alm.options[alm.selectedIndex].value)
        // console.log(calc(valorAlm, 1000, 1))
        trocaImg(calorimetro.estado)
    })

/*---------- FUNÇOES ----------*/
    function calc(q, m, c){
        let temp = q / (m * c)
        return temp
    }

    function trocaImg(estado){
        if(estado == "desligado"){
            calorimetro.src = "assets/calorimetro.png"
        }else if(estado == "iniciando"){
            calorimetro.src = "assets/iniciando.png"
            calorimetro.qtframe = 2
        }else if(estado == "fervendo"){
            calorimetro.src = "assets/fervendo.png"
            calorimetro.qtframe = 6
        }
        img.src = calorimetro.src
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

    function atualizar(){
        frame++
        if(frame >= 40){
            calorimetro.srcX += 1200
            if(calorimetro.srcX > (calorimetro.qtframe * 1200)-1200){
                calorimetro.srcX = 0
            }
            if(fogo.estado == "ligado"){
                fogo.srcX += 500
                if(fogo.srcX > 1000){
                    fogo.srcX = 0
                }    
            }
            

            frame = 0
        }
    }


    function loop(){
        desenhar()
        atualizar()
        requestAnimationFrame(loop, CNV)
    }

    loop()
}())
