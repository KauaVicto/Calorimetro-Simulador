(function(){
    const BTN = document.getElementById('btn')
    const DISPLAY = document.getElementById('display')
    const RESULT = document.getElementById('formula')

    const CNV = document.getElementById('canvas')
    const CTX = CNV.getContext('2d')
    const ALT_JOGO = 600
    const LARG_JOGO = 600

    let alm = document.getElementById('alm')
    
    let avancoTemp = 360
    let frame = 0
    let heightform = 27.04

    let Tinic = Tatual = 26.0
    let Tf = 0
/*---------- OBJETOS ----------*/
    calorimetro = {
        posX: -20,
        posY: -15,
        srcX: 0,
        srcY: 0,
        larg: 600,
        alt: 600,
        qtframe: 1
    }
    fogo = {
        posX: 235,
        posY: 360,
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
        Tf = calcTempFim(valorAlm)
        RESULT.innerHTML += '<p class="formln">Q = m.c.('+Tf+'-'+Tinic+')</p>';
        RESULT.innerHTML += '<p class="formln">Q = 1000.1.('+(Tf-Tinic).toFixed(2)+')</p>';
        RESULT.innerHTML += '<p class="formln">Q = '+(Tf-Tinic).toFixed(2)*1000+'</p>';
        heightform += 29
        RESULT.style.height = heightform+'px'

        console.log("iniciando...")

        fogo.estado = "ligado"
        DISPLAY.innerHTML = Tinic.toFixed(2)

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
    function calcTempFim(q){
        let Tf = ((q / 1000)+Tinic).toFixed(2)
        return Tf
    }

    function finalizar(){
        console.log("Finalizou")
        fogo.estado = "desligado"
    }

    function desenhar(){
        CTX.clearRect(0, 0, LARG_JOGO, ALT_JOGO)
        CTX.drawImage(
            img,
            calorimetro.srcX, calorimetro.srcY, 1200, 1200,
            calorimetro.posX, calorimetro.posY, calorimetro.larg, calorimetro.alt
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
        if(Tatual < Tf){
            frame++
            if(frame >= avancoTemp){
                if(avancoTemp > 60){
                    avancoTemp -= 60
                }else{
                    avancoTemp = 60
                }
                Tatual += Math.random()/20
                if(Tatual > parseFloat(Tf)){
                    Tatual = parseFloat(Tf)
                }
                DISPLAY.innerHTML = Tatual.toFixed(2)
                frame = 0
            }            
        }else{
            finalizar()
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