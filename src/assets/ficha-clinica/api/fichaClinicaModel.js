//definir el modelo de datos para la ficha clinica en forma de clase
export class FichaClinica {
  //constructor de la clase FichaClinica
  constructor(
    nombre,
    edad,
    sexo,
    direccion,
    telefono,
    antecedentes,
    alergias,
    motivo,
    presionArterial,
    temperatura,
    frecuenciaCardiaca
  ) {
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;
    this.direccion = direccion;
    this.telefono = telefono;
    this.antecedentes = antecedentes;
    this.alergias = alergias;
    this.motivo = motivo;
    this.presionArterial = presionArterial;
    this.temperatura = temperatura;
    this.frecuenciaCardiaca = frecuenciaCardiaca;
  }

  //contructor por defecto
  static default() {
    return new FichaClinica("", "", "", "", "", "", "", "", "", "", "");
  }

  //metodo para convertir la ficha clinica a un objeto JSON
  toJSON() {
    return {
      nombre: this.nombre,
      edad: this.edad,
      sexo: this.sexo,
      direccion: this.direccion,
      telefono: this.telefono,
      antecedentes: this.antecedentes,
      alergias: this.alergias,
      motivo: this.motivo,
      presionArterial: this.presionArterial,
      temperatura: this.temperatura,
      frecuenciaCardiaca: this.frecuenciaCardiaca,
    };
  }
  //metodo estatico para crear una instancia de FichaClinica a partir de un objeto JSON
  static fromJSON(json) {
    return new FichaClinica(
      json.nombre,
      json.edad,
      json.sexo,
      json.direccion,
      json.telefono,
      json.antecedentes,
      json.alergias,
      json.motivo,
      json.presionArterial,
      json.temperatura,
      json.frecuenciaCardiaca
    );
  }
}
