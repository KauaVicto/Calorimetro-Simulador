(function(){
    const BTN = document.getElementById('btn')
    const DISPLAY = document.getElementById('display')
    const RESULT = document.getElementById('formula')

    const CNV = document.getElementById('canvas')
    const CTX = CNV.getContext('2d')
    const ALT_JOGO = 600
    const LARG_JOGO = 600

    let alm = document.getElementById('alm')
    let temp = 26.0
    let avancoTemp = 360
    let frame = 0

/*---------- OBJETOS ----------*/
    calorimetro = {
        srcX: 0,
        srcY: 0,
        larg: 500,
        alt: 500,
        qtframe: 1
    }
    fogo = {
        posX: 205,
        posY: 300,
        srcX: 0,
        srcY: 3600,
        larg: 94,
        alt: 94,
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
        valorAlm = parseInt(alm.options[alm.selectedIndex].value)
        //console.log(calc(valorAlm))
        RESULT.innerHTML = valorAlm + " = " + "1000 x 1 x " + calc(valorAlm)

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
    function calc(q){
        let temp = q / 1000
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
                fogo.posX, fogo.posY, fogo.larg, fogo.alt
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

/* 
Açúcar granulado:
387 Calorias

Ovo cozido:
155 Calorias

Farinha:
364 Calorias

Manteiga:
717 Calorias

Cerveja:
43 Calorias

Pão:
275 Calorias

Panqueca:
227 Calorias

Banana:
89 Calorias

Maçã:
52 Calorias

Tapioca:
130 Calorias
*/