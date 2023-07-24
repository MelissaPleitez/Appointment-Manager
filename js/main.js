import UI from "./UI.js";
import APPOINTMENT from "./APPOINTMENT.js";
import {form, input_patient_name, input_phone, input_date, input_time, input_symptoms,  data } from "./Variables.js";

export let DB
export let edit_agenda;
export const appointment= new APPOINTMENT()
export const ui = new UI()


window.onload= function(){
  createDB()
  events_function()
}


function events_function(){

input_patient_name.addEventListener('change', validation)
input_phone.addEventListener('change', validation)
input_date.addEventListener('change', validation)
input_time.addEventListener('change', validation)
input_symptoms.addEventListener('change', validation)

form.addEventListener('submit', submission)

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
 
  appointment.editing_agendas({...data})


  const transaction= DB.transaction(['appointment'], 'readwrite')
  const objectStore = transaction.objectStore('appointment')
 objectStore.put(data)

 transaction.oncomplete=()=>{
  ui.alerts('Edited Correctly!',)
  document.querySelector('button[type="submit"]').textContent= 'Create Date'
  edit_agenda= false
 }
 transaction.onerror=()=>{
  ui.alerts('Something went wrong!', 'error')
 }
  
}else{

  console.log('creating agenda', data)
  data.id= Date.now()
  appointment.pushing_agenda({...data})

  const transaction = DB.transaction(['appointment'], 'readwrite')
  const objectStore = transaction.objectStore('appointment')

  objectStore.add(data)
  window.location.reload()
  transaction.oncomplete= function(){
    console.log('appointment agregado en DB')
    ui.alerts('Added Correctly!',)
  }
    
  

}


cleaning_object()

form.reset() 

ui.creating_agenda()

}



export function cleaning_object(){
  data.patient_name= ''
  data.phone= ''
  data.date= ''
  data.time= ''
  data.symptoms= ''
}


export function delete_agenda(id){

// appointment.deleting_agenda(id)

const transaction= DB.transaction(['appointment'], 'readwrite')
const objectStore = transaction.objectStore('appointment')
objectStore.delete(id)
window.location.reload()

objectStore.oncomplete=()=>{
  ui.creating_agenda()
  
}

objectStore.onerror=()=>{
  console.log('Error delete')
}


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


function createDB(){

let create_db= window.indexedDB.open('appointment', 1)

create_db.onerror= function(){
  console.log('Error! ')
}

create_db.onsuccess = function(){
  console.log('Exito!')
  DB= create_db.result

  ui.creating_agenda()
}

create_db.onupgradeneeded= function(e){

  let columnsDB= e.target.result

  const infoObject = columnsDB.createObjectStore('appointment', {
       keyPath: 'id',
       autoIncrement: true
  })

  infoObject.createIndex('patient_name', 'patient_name', {unique: false})
  infoObject.createIndex('phone', 'phone', {unique: false})
  infoObject.createIndex('date', 'date', {unique: false})
  infoObject.createIndex('time', 'time', {unique: false})
  infoObject.createIndex('symptoms', 'symptoms', {unique: false})
  infoObject.createIndex('id', 'id', {unique: true})

console.log('DB creada!')
  
}


}