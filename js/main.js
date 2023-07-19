import UI from "./UI.js";
import APPOINTMENT from "./APPOINTMENT.js";
import {form, input_patient_name, input_phone, input_date, input_time, input_symptoms,  data } from "./Variables.js";

export let edit_agenda;

export const appointment= new APPOINTMENT()
export const ui = new UI()

events_function()
function events_function(){

input_patient_name.addEventListener('change', validation)
input_phone.addEventListener('change', validation)
input_date.addEventListener('change', validation)
input_time.addEventListener('change', validation)
input_symptoms.addEventListener('change', validation)

form.addEventListener('submit', submission)
// document.addEventListener('DOMContentLoaded', loading_localstorage)
}


function validation(e){

data[e.target.name] = e.target.value

}



function submission(e){
e.preventDefault()

const {patient_name, phone, date, time, symptoms}= data

if(patient_name==='' || phone=== '' || date=== '' || time=== '' || symptoms===''){
   ui.alerts('Empty Inputs!', 'error')
    return
}

if(edit_agenda){

  console.log('edit agenda', data)
  ui.alerts('Edited Correctly!',)
  appointment.editing_agendas({...data})
  document.querySelector('button[type="submit"]').textContent= 'Create Date'
  edit_agenda= false
  
}else{

  console.log('creating agenda', data)
  data.id= Date.now()
  appointment.pushing_agenda({...data})
  ui.alerts('Added Correctly!',)

}


cleaning_object()

form.reset() 

ui.creating_agenda(appointment)

}


export function cleaning_object(){
  data.patient_name= ''
  data.phone= ''
  data.date= ''
  data.time= ''
  data.symptoms= ''
}


export function delete_agenda(id){

appointment.deleting_agenda(id)


ui.creating_agenda(appointment)

}


export function edition(agendas){
  const {patient_name, phone, date, time, symptoms, id}= agendas

  input_patient_name.value= patient_name
  input_phone.value= phone
  input_date.value= date
  input_time.value= time
  input_symptoms.value= symptoms

  data.patient_name= patient_name
  data.phone= phone
  data.date= date
  data.time= time
  data.symptoms= symptoms
  data.id= id

  document.querySelector('button[type="submit"]').textContent='Update'
  edit_agenda= true
}

