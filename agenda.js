const Agenda = []; //Array donde almacenar eventos

class Evento {

    constructor(nombre,fecha_hora,lugar,invitados=[],alertas=[]){
        this.nombre=nombre;
        this.fecha_hora=fecha_hora;
        this.lugar=lugar;
        this.invitados=invitados;
        this.alertas=alertas;
    }

    agregarInvitado=function(Invitado){
        invitados.push(Invitado)
    };

    agregarAlerta=function(Alerta){
        alertas.push(Alerta)
    };

   activarAlertas=function(alertas){

    alertas.forEach(element => {
        tiempoAlerta=setTimeout(alert(element.mensaje),element.fecha_hora.getMiliseconds())
    });
    
   };

    mostrarEvento=function(){
        document.write(`<h1>Eventos</h1>`)
        document.write(this.toString)
        //FALTA AÑADIR INVITADOS Y ALERTAS EN UNA <UL>
    };

    toString=function(){

        return `Evento: ${nombre} <br>
        Fecha: ${fecha_hora} <br>
        Lugar: ${lugar}<br>
        Invitados: ${invitados} <br>
        Alertas: ${alertas} <br>`
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

function agregarEvento(Evento){

    let pregunta1 = confirm("¿Desea añadir invitados?")

    if(pregunta1=== true){

        let nombre = prompt("Nombre del invitado/a")
        let email = prompt("Email del invitado")

        while(!email.includes("@")){
            alert("El email no incluye @")
            email = prompt("Email del invitado")
        }

        const nuevoInvitado= new Invitado(nombre,email)
        Evento.agregarInvitado(nuevoInvitado);
    }

    let pregunta2 = confirm("¿Desea añadir alertas?")
    
    if(pregunta2===true){
        let mensaje= prompt("¿Que mensaje desea mostrar?")
        let fecha_hora= prompt("Defina cuando desea que aparezca (Formato:AAAA-MM-DDTHH:MM)")
        fecha_hora= new Date();

        const nuevaAlerta= new Alerta(fecha_hora,mensaje)
        Evento.agregarAlerta(nuevaAlerta);

    }
}






