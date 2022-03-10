// posición del círculo
let x, y, speed;
let run = false
let brick_w = 30
let brick_h = 18
    // array de resultados
let results = []
    // cantidad de resultados esperados
let numberOfTries = 20

function setup() {
    // función para crear lienzo. Parámetros son ancho y alto.
    createCanvas(900, 600);
    // posición horizontal de la pelota
    x = width / 2;
    // posición vertical de la pelota
    y = 20;
    // velocidad de caída de la pelota
    speed = (Math.random() + 1) * 3
        // puntaje de la última ronda
    score = ""
        // texto de puntaje
    scoreText = `SCORE: ${score}`
}


//función que dibuja pared
function draw_wall() {
    fill(180, 30, 10)
    for (let i = height - height / 3; i < height; i += brick_h) {
        if ((i - (height - height / 3)) / brick_h % 2) {
            for (let j = 0; j < width / brick_w; j++) {
                rect((brick_w * j) + 1, i, brick_w, brick_h)
            }
        } else {
            for (let j = -0.5; j < width / brick_w; j++) {
                rect((brick_w * j) + 1, i, brick_w, brick_h)
            }
        }
    }
}

// función que devuelve el resultado promedio
function final_score() {
    total = 0
    for (i = 0; i < results.length; i++) {
        total += results[i]
    }
    average = Math.round(total / results.length)
    return average
}

// función que grafica. Corre varias veces por segundo para actualizar contenido.
function draw() {
    background(100, 220, 255);
    //Pelota
    stroke(50);
    fill(100);
    ellipse(x, y, 21);
    // texto
    fill(0)
    textSize(20);
    textAlign(CENTER)
        // NO MOSTRAR TEXTO
    text(`Resultado: ${score}`, width * 0.8, 50)
        // text(results, width * 0.8, 68)
        //     // mostrar resultado promedio al llegar al límite de intentos
        if (results.length >= numberOfTries & run == false) {
          text(`El test ha finalizado`, width * 0.8, 86)
          text(`Haz click para continuar`, width * 0.8, 120)
        }
            //averageScore = final_score()
            //text(`Resultado promedio: ${averageScore}/100`, width * 0.8, 86)
        // }
        // llamada a función que dibuja pared
    draw_wall()
        // círculo objetivo en el piso de la pared
    fill(255, 204, 0);
    ellipse(x, height - 11, 21)

    // mientras se esté jugando la ronda
    if (run) {
        // hacer caer pelota
        y = y + speed;
        // terminar ronda cuando haya caído 2 veces el alto del canvas
        if (y >= height * 2) {
            run = false
            score = Math.round(y / (height - 11) * 100).toString() + "/100"
            results.push(Math.round(y / (height - 11) * 100))
        }
    }
}


// cuando se haga click..
document.addEventListener('click', () => {
    // si se está jugando una ronda
    if (run) {
        // terminar ronda, mostrar y almacenar resultado
        run = false;
        score = Math.round(y / (height - 11) * 100).toString() + "/100"
        results.push(Math.round(y / (height - 11) * 100))

        // si no se está jugando una ronda
    } else {
        // reiniciar posición de la pelota
        y = 20;
        // reiniciar velocidad de caída
        speed = (Math.random() + 1) * 3
            // reiniciar juego
        run = true;
        // reiniciar puntaje
        score = ""
            // reiniciar array de puntajes si se llegó al límite de intentos
        if (results.length >= numberOfTries) {
            jatos.submitResultData({ 'results': results })
            results = []
            jatos.startNextComponent()
        }
    }
})
