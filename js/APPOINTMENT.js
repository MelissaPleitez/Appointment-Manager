
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

 export default APPOINTMENT