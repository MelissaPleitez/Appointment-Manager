const form = document.querySelector('#form')
const results= document.querySelector('#results')
const patient_name = document.querySelector('#patient_name')
const phone = document.querySelector('#phone')
const date = document.querySelector('#date')
const time = document.querySelector('#time')
const symptoms = document.querySelector('#symptoms')


const data={
    patient_name: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
}



events_function()
function events_function(){

patient_name.addEventListener('change', validation)
phone.addEventListener('change', validation)
date.addEventListener('change', validation)
time.addEventListener('change', validation)
symptoms.addEventListener('change', validation)

form.addEventListener('submit', submission)

}




function validation(e){

data[e.target.name] = e.target.value



}


class APPOINTMENT{

   constructor(){
    this.agenda= []
   }

   pushing_agenda(list){
    this.agenda = [...this.agenda, list]
   
   }

}


class UI{

    alerts(message, type){
        // const message_container = document.createElement('div')
        // message_container.classList('alert')
  
       if(type=== 'error'){
          Toastify({
  
              text: message,
              class:'danger',
              style: {
                background: "#b5586b",
              },
              duration: 3000
              
              }).showToast();
       }else{
     
          Toastify({
  
              text: message,
              class:'success',
              style: {
                background: "#79b558",
              },
              duration: 3000
              
              }).showToast();
       }
  
  
      }


      creating_agenda({agenda}){
        
       agenda.forEach((agendas)=>{
        const {patient_name, phone, date, time, symptoms, id}= agendas

        const agenda_container = document.createElement('div')
        agenda_container.classList.add('container', 'text-center', 'mt-4')
        agenda_container.dataset.id= id
        const names= document.createElement('h3')
        const phones= document.createElement('p')
        const dates= document.createElement('p')
        const times= document.createElement('p')
        const symptom= document.createElement('p')

        agenda_container.appendChild(names)
        agenda_container.appendChild(phones)
        agenda_container.appendChild(dates)
        agenda_container.appendChild(times)
        agenda_container.appendChild(symptom)

        results.appendChild(agenda_container)
       })

    //    console.log('passs..', agenda)

      }



}

const appointment= new APPOINTMENT()
const ui = new UI()


function submission(e){
e.preventDefault()

const {patient_name, phone, date, time, symptoms}= data

if(patient_name==='' || phone=== '' || date=== '' || time=== '' || symptoms===''){
   ui.alerts('Empty Inputs', 'error')
    return
}

data.id= Date.now()


appointment.pushing_agenda({...data})
ui.alerts('Added!',)

// cleaning_object()

form.reset() 

const {agenda}= appointment
ui.creating_agenda(appointment)

}

function cleaning_object(){
    data.patient_name= ''
    data.phone= ''
    data.date= ''
    data.time= ''
    data.symptoms= ''
}