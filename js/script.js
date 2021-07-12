(function(){
    const BTN = document.getElementById('btn')
    const DISPLAY = document.getElementById('display')

    const CNV = document.getElementById('canvas')
    const CTX = CNV.getContext('2d')
    const ALT_JOGO = 600
    const LARG_JOGO = 600

    let alm = document.getElementById('alm')
    let temp = 26
    let avancoTemp = 360
    let frame = 0

/*---------- OBJETOS ----------*/
    calorimetro = {
        srcX: 0,
        srcY: 0,
        larg: 600,
        alt: 600,
        estado: "desligado",
        qtframe: 1
    }
    fogo = {
        srcX: 0,
        srcY: 3600,
        larg: 100,
        alt: 100,
        estado: "desligado"
    }

/*---------- IMAGEM ----------*/
    let img = new Image
        img.src = "assets/sprites.png"
        img.addEventListener("load", () => {
            requestAnimationFrame(loop, CNV)
        }, false)

/*---------- EVENTOS ----------*/
    BTN.addEventListener('click', () => {
        // valorAlm = parseInt(alm.options[alm.selectedIndex].value)
        // console.log(calc(valorAlm, 1000, 1))
        console.log("iniciando...")
        fogo.estado = "ligado"
        DISPLAY.innerHTML = temp.toFixed(1)
        setTimeout(() => {
            calorimetro.srcX = 0
            calorimetro.srcY = 1200
            calorimetro.qtframe = 2
        }, 10000)
        setTimeout(() => {
            calorimetro.srcX = 0
            calorimetro.srcY = 2400
            calorimetro.qtframe = 6
        }, 20000)
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
            calorimetro.srcX, calorimetro.srcY, 1200, 1200,
            0, 0, calorimetro.larg, calorimetro.alt
        )
        if(fogo.estado == "ligado"){
            CTX.drawImage(
                img,
                fogo.srcX, fogo.srcY, 500, 500,
                250, 370, fogo.larg, fogo.alt
            )
        }
    }

    function atualizar(){
        frame++
        if(frame >= avancoTemp){
            if(avancoTemp > 60){
                avancoTemp -= 60
            }else{
                avancoTemp = 60
            }
            temp += Math.random()/3
            DISPLAY.innerHTML = temp.toFixed(1)
            frame = 0

            console.log(avancoTemp)
        }
    }

    setInterval(() => {
        calorimetro.srcX += 1200
        if(calorimetro.srcX > ((calorimetro.qtframe-1) * 1200)){
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
        if(fogo.estado == 'ligado'){
            atualizar()            
        }

        requestAnimationFrame(loop, CNV)
    }
}())
