const form = document.querySelector('#form')
const results= document.querySelector('#results')
const input_patient_name = document.querySelector('#patient_name')
const input_phone = document.querySelector('#phone')
const input_date = document.querySelector('#date')
const input_time = document.querySelector('#time')
const input_symptoms = document.querySelector('#symptoms')

let edit_agenda;

const data={
    patient_name: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
}




events_function()
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


class APPOINTMENT{

   constructor(){
    this.agenda= []
   }

   pushing_agenda(list){
    this.agenda = [...this.agenda, list]
   
   }

   deleting_agenda(id){
     this.agenda = this.agenda.filter((agendas)=> agendas.id !== id)
   }

   editing_agendas(data){
    this.agenda= this.agenda.map((edit)=>edit.id === data.id? data : edit )
   }

}


class UI{

    alerts(message, type){
        // const message_container = document.createElement('div')
        // message_container.classList('alert')
  
       if(type=== 'error'){
          Toastify({
  
              text: message,
              class:'text-center',
              style: {
                background: "#b5586b",
              },
              duration: 3000
              
              }).showToast();
       }else{
     
          Toastify({
  
              text: message,
              class:'text-center',
              style: {
                background: "#79b558",
              },
              duration: 3000
              
              }).showToast();
       }
  
  
      }


      creating_agenda({agenda}){
     
        this.cleaning_agenda()
       agenda.forEach((agendas)=>{
        const {patient_name, phone, date, time, symptoms, id}= agendas

        const agenda_container = document.createElement('div')
        agenda_container.classList.add('container', 'text-center', 'mt-3')
        agenda_container.dataset.id= id
        const names= document.createElement('h3')
        const phones= document.createElement('p')
        const dates= document.createElement('p')
        const times= document.createElement('p')
        const symptom= document.createElement('p')

        names.classList.add('card-title', 'font-weight-bolder')
        names.textContent= patient_name
        phones.innerHTML=`<span class="fw-bold">Phone Number:<span> ${phone}`
        dates.innerHTML=`<span class="fw-bold">Date:<span> ${date}`
        times.innerHTML=`<span class="fw-bold">Time:<span> ${time}`
        symptom.innerHTML=`<span class="fw-bold">Symptoms:<span> ${symptoms}`

        const btn_delete= document.createElement('button')
        btn_delete.classList.add('btn', 'btn-danger', 'mr-2', 'm-2')
        btn_delete.innerHTML=`Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`
        btn_delete.onclick= ()=>{
            delete_agenda(id)
        }

        const btn_edit= document.createElement('button')
        btn_edit.classList.add('btn', 'btn-info',  'mr-2', 'm-2', 'text-white')
        btn_edit.innerHTML=`Edit <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>` 
        btn_edit.onclick= ()=>{
            edition(agendas)
        }

        agenda_container.appendChild(names)
        agenda_container.appendChild(phones)
        agenda_container.appendChild(dates)
        agenda_container.appendChild(times)
        agenda_container.appendChild(symptom)
        agenda_container.appendChild(btn_delete)
        agenda_container.appendChild(btn_edit)
        results.appendChild(agenda_container)

       })

    //    console.log('passs..', agenda)

      }

      cleaning_agenda(){
        while(results.firstChild){
            results.removeChild(results.firstChild)
        }
      }



}

const appointment= new APPOINTMENT()
const ui = new UI()


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
spinner()
ui.creating_agenda(appointment)

}

function cleaning_object(){
    data.patient_name= ''
    data.phone= ''
    data.date= ''
    data.time= ''
    data.symptoms= ''
}


function delete_agenda(id){

appointment.deleting_agenda(id)


ui.creating_agenda(appointment)
}


function edition(agendas){
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

function spinner(){

  const spinner = document.createElement('div')
  const span= document.createElement('span')
  spinner.classList.add('spinner-border')
  spinner.role= "status"
  span.classList.add('visually-hidden')
  span.textContent= 'Loading...'
  spinner.appendChild(span)

  results.appendChild(spinner)

  setTimeout(() => {
    spinner.remove()
  }, 3000);

}