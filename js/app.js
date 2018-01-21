/*

Jhon Edwin Cundumi Caicedo

*/
var calculadora = {
	
	visor: document.getElementById("display"),
	display: "0",
	operacion: "",
	num1: 0,
	num2: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false, // Para permitir ingreso consecutivo
	
	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),
	
	//Eventos de formato de botones
	
	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onclick = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},

	eventoAchicaBoton: function(event){
		calculadora.AchicaBoton(event.target);
	},

	eventoVuelveBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},
	
	//Formato de botones 
	
	AchicaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	AumentaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
	
	//---Fin evento de formato de botones
		
	//Eventos de función de calculadora

	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.digitenumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.digitenumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.digitenumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.digitenumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.digitenumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.digitenumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.digitenumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.digitenumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.digitenumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.digitenumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},
	
	//---Fin eventos de función calculadora	
	
	//Funcion de teclas de calculadora
	
	borrarVisor: function(){ 

	    this.display = "0";
		this.operacion = "";
		this.num1 = 0;
		this.num2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.actualizardisplay();
	},
	
	cambiarSigno: function(){
		if (this.display !="0") {
			var aux;
			if (this.display.charAt(0)=="-") {
				aux = this.display.slice(1);
			}	else {
				aux = "-" + this.display;
			}
		this.display = "";
		this.display = aux;
		this.actualizardisplay();
		}
	},
	
	ingresoDecimal: function(){
		if (this.display.indexOf(".")== -1) {
			if (this.display == ""){
				this.display = this.display + "0.";
			} else {
				this.display = this.display + ".";
			}
			this.actualizardisplay();
		}
	},
	
	digitenumero: function(valor){
		if (this.display.length < 8) {
		
			if (this.display=="0") {
				this.display = "";
				this.display = this.display + valor;
			} else {
				this.display = this.display + valor;
			}
		this.actualizardisplay();
		}
	},
	
	ingresoOperacion: function(oper){
		this.num1 = parseFloat(this.display);
		this.display = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.actualizardisplay();
	},
	
	verResultado: function(){ // TECLA IGUAL

		if(!this.auxTeclaIgual){ //Primer vez que presiono igual
			this.num2 = parseFloat(this.display);
			this.ultimoValor = this.num2;
		
		//Calculo el resultado
			this.realizarOperacion(this.num1, this.num2, this.operacion);
		
		} else { //Siguientes veces que presiono igual
		//Calculo el resultado
		this.realizarOperacion(this.num1, this.ultimoValor, this.operacion);
		}
	
		//Almaceno el resultado como primer valor para poder seguir operando
		this.num1 = this.resultado;
	
		//Borro el visor y lo reemplazo por el resultado
		this.display = "";
	
		//verifico el largo del resultado para recortarlo si hace falta

		if (this.resultado.toString().length < 9){
			this.display = this.resultado.toString();
		} else {
			this.display = this.resultado.toString().slice(0,8) + "...";
		}
	
		//Auxiliar para indicar si ya se presionó la tecla igual, para calcular sobre el último valor

		this.auxTeclaIgual = true;		
		this.actualizardisplay();
	
	},
	
	realizarOperacion: function(num1, num2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(num1 + num2);
			break;
			case "-": 
				this.resultado = eval(num1 - num2);
			break;
			case "*": 
				this.resultado = eval(num1 * num2);
			break;
			case "/": 
				this.resultado = eval(num1 / num2);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(num1));
		}
	},
	
	actualizardisplay: function(){
		this.visor.innerHTML = this.display;
	}
	
};

calculadora.init();