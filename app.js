let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados=[];
let numeroMaximo=10;
let numeroMaximoDeIntentos=4;
function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto=generarNumeroSecreto();
    intentos=1;
    return;
}

function limpiarCaja(){
    document.getElementById('valorUsuario').value = '';
    return;
}
function reiniciarJuego(){
    //Limpia la caja
    limpiarCaja();
    //Condiciones Iniciales
    condicionesIniciales();
    //Deshabilita el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled',true);
    return;
}
function verificarIntento(){
    let numeroInresado = parseInt(document.getElementById('valorUsuario').value);
    //El usuario adivinó
    if(numeroInresado === numeroSecreto){
        asignarTextoElemento('p',`¡Adivinaste! en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
        //Habilita el boton de nuevo juego SOLO cuando el usuario completa el juego
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    //El ususario falló
    else{
        intentos++;
        console.log(intentos);
        limpiarCaja();
        if(intentos === numeroMaximoDeIntentos){
            asignarTextoElemento('p',`¡Perdiste! El número secreto era ${numeroSecreto}`);
            //Habilita el boton de nuevo juego SOLO cuando el usuario completa el juego
            document.getElementById('reiniciar').removeAttribute('disabled');
        }else{
            if(numeroInresado > numeroSecreto){
                asignarTextoElemento('p','¡El número secreto es menor!');
            }
            else{
                asignarTextoElemento('p','¡El número secreto es mayor!');
            }
        }
    }
    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados); 
    //SI ya sorteamos todos los numeros
    if(listaNumerosSorteados.length === numeroMaximo){
        asignarTextoElemento('p','¡Ya no hay más números para adivinar!');
    } else{
        //Si el número ya fue sorteado, se vuelve a generar
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

condicionesIniciales();