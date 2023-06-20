// const openModal=document.querySelectorAll('.openModal');
const closeModal = document.querySelector('.close');
const modal = document.querySelector('.modal');
const dial = document.querySelector('dialog');
const form=document.querySelector('#form')
document.querySelectorAll(".openModal").forEach(elem => elem.addEventListener("click",
    () => {
      let name=elem.value.split(' ')[0];
      console.log(typeof(elem.value.split(' ')[1]));
     
     let bal=Number(elem.value.split(' ')[1]);
        document.querySelector('#sender').value=name;
        document.querySelector('#amt').setAttribute("max",bal);
    
        modal.showModal();
        
        
    }));

closeModal.addEventListener('click', () => {
    modal.close();
})

modal.addEventListener('submit',()=>{alert("Transferred Successfully!!")});

function disableBack() { window.history.forward(); }
        setTimeout("disableBack()", 0);
        window.onunload = function () { null };




