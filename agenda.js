"use strict";

const Agenda = []; //Array donde almacenar eventos

class Evento {

    constructor(nombre,fecha_hora,lugar,invitados=[],alertas=[]){
        this.nombre=nombre;
        this.fecha_hora=fecha_hora;
        this.lugar=lugar;
        this.invitados=invitados;
        this.alertas=alertas;
    }

    agregarInvitado(){
         
        let nombre = prompt("Nombre del invitado/a")
        let email = prompt("Email del invitado")

        while(!email.includes("@")){
            alert("El email no incluye @")
            email = prompt("Email del invitado")
        }

        const nuevoInvitado= new Invitado(nombre,email)
        this.invitados.push(nuevoInvitado)
    };

    agregarAlerta(){

        let nombre = prompt("Nombre de la alerta")

        alertas.push(Alerta)
    };

    activarAlertas(){
        
        const fechaHoy= new Date();


        this.alertas.forEach((element)=>{

            //COMPARRA MILISEGUNDOS ( FOTO ISABEL)

            const fechaAlerta = new Date(element.fecha_hora);

            if(fechaHoy<fechaAlerta)


        })


        alertas.forEach(element => {
            element.timerID=setTimeout(alert(element.mensaje),element.fecha_hora.getMiliseconds())


    });
    
   };

    mostrarEvento=function(){
        document.write(`<h1>Evento</h1>`)
        document.write(Evento.toString)

        document.write(`<h3>Invitados</h3>`)
        document.write(`<ul>`)
        invitados.forEach((element) => document.write(`<li>Nombre: ${element.nombre} </li> <br> 
        <li> Email: ${element.email} </li>`))
        document.write(`</ul>`)

        document.write(`<h3>Alertas</h3>`)
        document.write(`<ul>`)
        alertas.forEach((element) => document.write(`<li>Fecha y Hora: ${element.fecha_hora}</li> <br> 
        <li> Mensaje: ${element.mensaje} </li>`))
        document.write(`<ul>`)
    };  

    toString=function(){

        return `Nombre: ${nombre} <br>
        Fecha: ${fecha_hora} <br>
        Lugar: ${lugar}<br>`

    }


}

class Invitado {

    constructor(nombre,email){
        this.nombre=nombre;
        this.email=email;
    }

    toString=function(){
        return `Nombre: ${nombre}
        Email: ${email}`
    }
}

class Alerta {

    constructor(fecha_hora,mensaje,timerID){
        this.fecha_hora=fecha_hora;
        this.mensaje=mensaje;
        this.timerID=timerID;
    }

}



//FUNCIONES DEL MENU
function cargarAgenda(){

    if(localStorage.getItem("agenda")!= null){
        const agendaLs = JSON.parse(localStorage.getItem("agenda"));
        agendaLs.forEach((element)=> {
            let fecha = new Date(element.fecha_hora)
            const eventoLs= new Evento (element.nombre,fecha,element.lugar, element.invitados, element.alertas); 
            eventoLs.activarAlertas(); //NO TE OLVIDES DE ACTIVAR LAS ALERTAS
            Agenda.push(eventoLs);  
        });
        alert("Agenda anterior cargada")
    }else {
        alert("No hay agenda anterior")
    }
}


function guardarAgenda(){
    localStorage.setItem("agenda", JSON.stringify(Agenda));
}

function agregarEvento(){


    let nombre = prompt("Nombre del evento");

    let fecha_hora = prompt("Fecha y hora del evento (Formato:AAAA-MM-DDTHH:MM)")
    let fechaFinal = new Date(fecha_hora);
    let lugar=prompt("FAlta")

    const nuevoEvento = new Evento(nombre,fechaFinal,lugar);



    //Evento=(nombre,fechaFinal,);


    //AÑADIR INVITADOS

    let pregunta1 = confirm("¿Desea añadir invitados?")

    while(pregunta1=== true){

       
        nuevoEvento.agregarInvitado();
        pregunta1=confirm("¿Desea añadir mas invitados?")
    }



    //AÑADIR ALERTAS

    let pregunta2 = confirm("¿Desea añadir alertas?")
    
    if(pregunta2===true){
        let mensaje= prompt("¿Que mensaje desea mostrar?")
        let fecha_hora= prompt("Defina cuando desea que aparezca (Formato:AAAA-MM-DDTHH:MM)")
        let fechaFinal = new Date(fecha_hora);

        const nuevaAlerta= new Alerta(fechaFinal,mensaje)
        Evento.agregarAlerta(nuevaAlerta);
    }

}

function mostrarEventos(){
    Agenda.forEach((element)=>
    element.mostrarEvento());
}






