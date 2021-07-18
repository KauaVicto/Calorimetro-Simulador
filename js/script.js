(function(){
    const BTN = document.getElementById('btn')
    const DISPLAY = document.getElementById('display')
    const RESULT = document.getElementById('formula')
    const BTNREIN = document.getElementById('reiniciar')
    const ALM = document.getElementById('alm')
    const CNV = document.getElementById('canvas')
    const CTX = CNV.getContext('2d')
    const TEMPESTAVEL = document.getElementById('tempEstavel')

    const ALT_JOGO = 600
    const LARG_JOGO = 600
    
    let avancoTemp = 300
    let desaceleraTemp = 60
    let Speedmin = 40
    let frame = 0
    let altFormula = 29
    let iniciado = false

    let Tinic  = 26.13
    let Tf = 0
    let Tatual = Tinic
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
        posX: 220,
        posY: 380,
        srcX: 0,
        srcY: 3600,
        larg: 130,
        alt: 130,
        estado: "desligado"
    }
    alimento = {
        posX: 240,
        posY: 370,
        srcX: 0,
        srcY: 0,
        larg: 94,
        alt: 94
    }

/*---------- IMAGEM ----------*/
    let img = new Image
        img.src = "assets/sprites.png"
        img.addEventListener("load", () => {
            requestAnimationFrame(loop, CNV)
        }, false)
    let alimentos = new Image
        alimentos.src = "assets/alimentos.png"

/*---------- EVENTOS ----------*/
    BTN.addEventListener('click', () => {
        if(!iniciado){
            iniciado = true
            valorAlm = parseInt(ALM.options[ALM.selectedIndex].value)
            alimento.srcY = (ALM.selectedIndex-1)*500
            if(valorAlm != 0){
                Tf = calcTempFim(valorAlm)

                console.log("iniciando...")
                setTimeout(() => {
                    fogo.estado = "ligado"
                }, 2000);
                
                DISPLAY.innerHTML = Tinic.toFixed(2)

                setTimeout(() => {
                    calorimetro.srcX = 0
                    calorimetro.srcY = 1200
                    calorimetro.qtframe = 2
                }, 3000)
                setTimeout(() => {
                    calorimetro.srcX = 0
                    calorimetro.srcY = 2400
                    calorimetro.qtframe = 6
                }, 20000)  
            }
                      
        }

    })

    BTNREIN.addEventListener('click', () => {
        BTNREIN.style.display = 'none'
        Tatual = Tinic
        Tf = 0
        avancoTemp = 360
        iniciado = false
        calorimetro.srcY = 0
        calorimetro.qtframe = 1
        fogo.estado = 'desligado'
        RESULT.innerHTML = '<p class="formln">Q = m.c.(T<sub>f</sub>-T<sub>0</sub>)</p>'
        altFormula = 29
        RESULT.style.height = '30px'
    })

/*---------- FUNÇOES ----------*/
    function calcTempFim(q){
        let Tf = ((q / 1000)+Tinic).toFixed(2)
        return Tf
    }

    function finalizar(){
        iniciado = false
        console.log("Finalizou")
        setTimeout(() => {
            fogo.estado = "desligado"
            calorimetro.srcY = 1200
            calorimetro.qtframe = 2
            TEMPESTAVEL.innerHTML += parseFloat(Tf).toFixed(2) + '°C'
            TEMPESTAVEL.style.display = 'block'
            
            imprimirFormulas('<p class="formln">Q = m.c.('+Tf+'-'+Tinic+')</p>', 2000)
            imprimirFormulas('<p class="formln">Q = 1000.1.('+(Tf-Tinic).toFixed(2)+')</p>', 4000)
            imprimirFormulas('<p class="formln">Q = '+(Tf-Tinic).toFixed(2)*1000+'</p>', 6000)
            setTimeout(() => {
                BTNREIN.style.display = 'block'
            }, 6500);
        }, 3000);
        
    }

    function imprimirFormulas(f, t){
        setTimeout(() => {
            RESULT.innerHTML += f;
            altFormula += 29
            RESULT.style.height = altFormula+'px'
        }, t);
    }

    function desenhar(){
        CTX.clearRect(0, 0, LARG_JOGO, ALT_JOGO)
        CTX.drawImage(
            img,
            calorimetro.srcX, calorimetro.srcY, 1200, 1200,
            calorimetro.posX, calorimetro.posY, calorimetro.larg, calorimetro.alt
        )
        if(iniciado){
            CTX.drawImage(
                alimentos,
                alimento.srcX, alimento.srcY, 500, 500,
                alimento.posX, alimento.posY, alimento.larg, alimento.alt
            )
        }
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
                if(avancoTemp > Speedmin){
                    avancoTemp -= desaceleraTemp
                }else{
                    avancoTemp = Speedmin
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
        if(iniciado){
            atualizar()
        }

        requestAnimationFrame(loop, CNV)
    }
}())
