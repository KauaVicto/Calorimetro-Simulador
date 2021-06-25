(function(){
    const btn = document.getElementById('btn')
    const cnv = document.getElementById('canvas')
    const ctx = cnv.getContext('2d')

    // let alm = document.getElementById('alm')
    // let posX = posY = 0

    // btn.addEventListener('click', () => {
    //     alimento = alm.options[alm.selectedIndex].value
    // })


    function desenhar(){
        
    }

    function atualizar(){
        
    }


    function loop(){
        // desenhar()
        // atualizar()
        requestAnimationFrame(loop, cnv)
    }

    loop()
}())
