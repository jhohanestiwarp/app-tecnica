import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Flights, Journey } from 'src/app/models/ruta';
//service
import { DataService } from 'src/app/servicio/data.service';

//model
import Flygth from "../../models/Fligth";


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
  formFly!: FormGroup;
  public ELEMENT_DATA: Flygth[] = [];
  public routesFlights: any[] = []

  constructor(public formulario: FormBuilder, private dataservis: DataService) {
    this.formFly = this.formulario.group({
      origin: ['', [Validators.required]],

      destino: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.dataservis.getfly().subscribe(resgistrofly => { this.ELEMENT_DATA = resgistrofly });
  }
  calcularVuelos() {
    const origin: string = this.formFly.get('origin')?.value.toUpperCase();
    const destino: string = this.formFly.get('destino')?.value.toUpperCase();

    if (!this.formFly.valid) {
      alert('Los campos son requeridos');
    } else if (origin === destino) {
      alert('Los campos no pueden ser igual');
    } else if (origin.length != 3 || destino.length != 3) {
      alert('Los campos deben tener 3 caracteres');
    }

    const journey: Journey = {
      Origin: origin,
      Destination: destino,
      Price: 0,
      Flights: []
    }

    const travel = (this.ELEMENT_DATA[0].departureStation == origin && this.ELEMENT_DATA[0].arrivalStation == destino) ? this.ELEMENT_DATA[0] : null

    if (travel) {
      const flight = {
        Origin: travel.departureStation,
        Destination: travel.arrivalStation,
        Price: travel.price,
        Transport: {
          FlightCarrier: travel.flightCarrier,
          FlightNumber: travel.flightNumber,
        }
      }
      journey.Flights.push(flight)
    } else {

      const filterFlights = this.ELEMENT_DATA.filter(f => f.departureStation == origin || f.departureStation == destino || f.arrivalStation == origin || f.arrivalStation == destino)

      this.routesFlights = this.validateFlights(filterFlights, 0, journey.Flights, {
        Origin: "",
        Destination: destino,
        DestinationAux: destino,
        Price: 0,
        Transport: {
          FlightCarrier: "",
          FlightNumber: 0,
        }
      })

      console.log(this.routesFlights);

      this.routesFlights = this.routesFlights.reverse()

      if (!this.routesFlights) {
        alert("No hay vuelos para ese destino")
      }

    }
  }

  validateFlights(filterFlights: Flygth[], index: number, selecction: Flights[], flights: Flights) {
    if (selecction[selecction.length - 1]?.Origin == this.formFly.get('origin')?.value.toUpperCase()) {
      return selecction;
    }

    const isRuteValid = filterFlights.find(f => f.arrivalStation == flights?.DestinationAux)

    if (isRuteValid) {   
      
      flights = {
        Origin: isRuteValid.departureStation,
        Destination: isRuteValid.arrivalStation,
        Price: isRuteValid.price,
        Transport: {
          FlightCarrier: isRuteValid.flightCarrier,
          FlightNumber: isRuteValid.flightNumber,
        }
      }

      if(selecction.length>0){
        selecction.push({...flights})
        flights.DestinationAux = flights.Origin
      }else if (selecction[selecction.length - 1]?.Origin != isRuteValid.departureStation) {     
        selecction.push({...flights})
        flights.DestinationAux = flights.Origin
      }
    }

    if (index < filterFlights.length) this.validateFlights(filterFlights, index + 1, selecction, flights)

    return selecction
  }

}