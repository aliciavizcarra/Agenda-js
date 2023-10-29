    "use strict";
    
    const Agenda = []; //Array donde almacenar eventos

    //CLASES (evento,alerta,invitado)

    class Evento {

        constructor(nombre,fecha_hora,lugar,invitados=[],alertas=[]){
            this.nombre=nombre;
            this.fecha_hora=fecha_hora;
            this.lugar=lugar;
            this.invitados=invitados;
            this.alertas=alertas;
        }

        agregarInvitado(){
            
            const nombre = prompt("Nombre del invitado/a")
            const email = prompt("Email del invitado")

            while(!email.includes("@")){
                alert("El email no incluye @")
                email = prompt("Email del invitado")
            }

            const nuevoInvitado= new Invitado(nombre,email)
            this.invitados.push(nuevoInvitado)
        };

        agregarAlerta(){

            let mensaje = prompt("Mensaje de la alerta")
            let fecha_hora = prompt("¿Cuando quieres que salte?(Formato:AAAA-MM-DDTHH:MM)")
            const fechaAlerta = new Date(fecha_hora);

            const nuevaAlerta = new Alerta(fechaAlerta,mensaje)

            this.alertas.push(nuevaAlerta)

        };

        activarAlertas(){   

            const fechaHoy= new Date();

            const actual = fechaHoy.getTime()

            this.alertas.forEach((element)=>{

                const fechaAlerta = element.fecha_hora.getTime();

                if(element.timerID == null && actual<fechaAlerta){

                    const tiempoRestante = fechaAlerta - actual;

                    element.timerID=setTimeout(alert(element.mensaje),tiempoRestante);
                }
            })

        };
        

        mostrarEvento=function(){
            document.write(`<h1>Evento</h1>`)
            document.write(this.toString)

            document.write(`<h3>Invitados</h3>`)
            document.write(`<ul>`)

            this.invitados.forEach((element) => {
            document.write(`<li>Nombre: ${element.nombre} </li> <br>`);
            document.write(`<li> Email: ${element.email} </li>`);
            });

            document.write(`</ul>`)

            document.write(`<h3>Alertas</h3>`)
            document.write(`<ul>`)

            this.alertas.forEach((element) => {
            document.write(`<li>Fecha y Hora: ${element.fecha_hora}</li> <br>`);
            document.write(`<li> Mensaje: ${element.mensaje} </li>`);
            });

            document.write(`<ul>`)
        };  

        toString=function(){

            return `Nombre: ${this.nombre} <br>
            Fecha: ${this.fecha_hora} <br>
            Lugar: ${this.lugar}<br>`

        }

    }


    class Invitado {
        constructor(nombre,email){
            this.nombre=nombre;
            this.email=email;
        }
    }

    class Alerta {

        constructor(fecha_hora,mensaje){
            this.fecha_hora=fecha_hora;
            this.mensaje=mensaje;
            this.timerID=null;
        }

    }



    //FUNCIONES DEL MENU
    

    function agregarEvento(){

        const nombre = prompt("Nombre del evento");
        const fecha_hora = prompt("Fecha y hora del evento (Formato:AAAA-MM-DDTHH:MM)")
        const fechaFinal = new Date(fecha_hora);
        const lugar=prompt("Lugar del evento")

        const nuevoEvento = new Evento(nombre,fechaFinal,lugar);


        //AÑADIR INVITADOS

        const pregunta1 = confirm("¿Desea añadir invitados?")

        while(pregunta1 === true){
            nuevoEvento.agregarInvitado();
            pregunta1=confirm("¿Desea añadir mas invitados?")
        }

        //AÑADIR ALERTAS

        const pregunta2 = confirm("¿Desea añadir alertas?")
        
        while(pregunta2 === true){
        nuevoEvento.agregarAlerta();
        pregunta2= confirm("¿Desea añadir mas alertas?")
        }

        Agenda.push(nuevoEvento);

    }

    function mostrarEventos(){
        Agenda.forEach((element)=>
        element.mostrarEvento());
    }

    function borrarEvento(nombreEvento){

        const indice = Agenda.findIndex((element) => element.nombre ===nombreEvento);
        if (indice !== -1) {
            Agenda.splice(indice, 1);
            alert(`Evento "${nombreEvento}" ha sido eliminado.`);
        } else {
            alert(`No se encontró ningún evento con el nombre "${nombreEvento}".`);
        }
        
    }


    function borrarEventosPasados() {
        const fechaHoy = new Date().getTime();
        Agenda.forEach((evento, index) => {
        if (evento.fecha_hora.getTime() < fechaHoy) {
            Agenda.splice(index, 1);
        }
        });
    }

    function modificarEvento(nombreEvento) {

        const evento = Agenda.find((evento) => evento.nombre === nombreEvento);
    
        const pregunta1 = confirm(`"¿Desea modificar el evento ${nombreEvento}"`)
        
        const menu = prompt("¿Qué desea modificar?\n 1. Nombre\n 2. Fecha y Hora\n 3. Lugar\n 4. Invitados\n 5. Alertas\n")
        const opcion = parseInt(menu);
        
    
        switch (opcion) {

            case 1:
            const nuevoNombre = prompt("Nuevo nombre del evento");
            evento.nombre = nuevoNombre;
            break;
            case 2:
            const nuevaFechaHora = prompt("Nueva fecha y hora (Formato: AAAA-MM-DDTHH:MM)");
            evento.fecha_hora = new Date(nuevaFechaHora);
            break;
            case 3:
            const nuevoLugar = prompt("Nuevo lugar");
            evento.lugar = nuevoLugar;
            break;
            case 4:
            let pregunta = confirm("¿Desea añadir invitados?");
            while (pregunta) {
                evento.agregarInvitado();
                pregunta = confirm("¿Desea añadir más invitados?");
            }
            break;
            case 5:
            let preguntaAlerta = confirm("¿Desea añadir alertas?");
            while (preguntaAlerta) {
                evento.agregarAlerta();
                preguntaAlerta = confirm("¿Desea añadir más alertas?");
            }
            break;

            default:
            alert("Opción no válida");
            
        } 
    } 
    

    function desactivarAlertas(nombreEvento) {
        nombreEvento.alertas.forEach((alerta) => {
          clearTimeout(alerta.timerID);
          alert("Alerta desactivada: " + alerta.mensaje);
        });
    }

    function cargarAgenda(){

        if(localStorage.getItem("agenda")!== null){
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

    function menu(){
        const menu = prompt("¿Qué desea hacer? \n 1.Agregar evento a la agenda \n 2.Mostrar Eventos \n 3.Borrar evento \n 4.Borrar eventos pasados \n 5.Modificar un evento \n 6.Desactivar las alertas de un evento \n 7.Salir")
        const opcion = parseInt(menu);

        do {

            switch(opcion){

                case 1:
                    agregarEvento;
                break;
        
                case 2:
                    mostrarEventos;
                break;
        
                case 3:
                    const nombreEvento = prompt("Nombre del evento que desea borrar")
                    borrarEvento(nombreEvento);
                break;
        
                case 4:
                    borrarEventosPasados;
                break;
        
                case 5:
                    const nombreEventoModificar = prompt("Ingrese el nombre del evento a modificar");
                    modificarEvento(nombreEventoModificar);
                break;
        
                case 6:
                    const nombreEventoDesactivarAlertas = prompt("Ingrese el nombre del evento para desactivar alertas");
                    desactivarAlertas(nombreEventoDesactivarAlertas);
                break;

                case 7:
                    alert("Saliendo del programa")
                break;

                default:
                alert("Opcion no válida")
            }
        
        }while (menu !== "7")

    }

    
    //AQUI COMIENZA EL PROGRAMA
    cargarAgenda();
    menu();
    guardarAgenda();
