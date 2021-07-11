(function(){
    const btn = document.getElementById('btn')
    const cnv = document.getElementById('canvas')
    const ctx = cnv.getContext('2d')

    let alm = document.getElementById('alm')

    let img = new image
        img.src = ""

    btn.addEventListener('click', () => {
        valorAlm = parseInt(alm.options[alm.selectedIndex].value)
        console.log(calc(valorAlm, 1000, 1))
    })

    function calc(q, m, c){
        let temp = q / (m * c)
        return temp
    }

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
