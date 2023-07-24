import {results} from "./Variables.js";
import {delete_agenda, edition, DB} from "./main.js";

class UI{

    alerts(message, type){
  
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


      creating_agenda(){
     
        this.cleaning_agenda()

       const  objectStore = DB.transaction('appointment').objectStore('appointment');
       objectStore.openCursor().onsuccess= function(e){
         console.log(e.target.result)
         const cursor = e.target.result;

         if(cursor){
          const {patient_name, phone, date, time, symptoms, id}= cursor.value

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
          phones.innerHTML=`<span class="fw-bold">Phone Number:</span> ${phone}`
          dates.innerHTML=`<span class="fw-bold">Date:</span> ${date}`
          times.innerHTML=`<span class="fw-bold">Time:</span> ${time}`
          symptom.innerHTML=`<span class="fw-bold">Symptoms:</span> ${symptoms}`
  
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
          const fullObject= cursor.value
          btn_edit.onclick= ()=>{
              edition(fullObject)
          }
  
          agenda_container.appendChild(names)
          agenda_container.appendChild(phones)
          agenda_container.appendChild(dates)
          agenda_container.appendChild(times)
          agenda_container.appendChild(symptom)
          agenda_container.appendChild(btn_delete)
          agenda_container.appendChild(btn_edit)
          results.appendChild(agenda_container)

          cursor.continue()
         

         }

       }

   
      }

      cleaning_agenda(){
        while(results.firstChild){
            results.removeChild(results.firstChild)
        }
      }



}

export default UI