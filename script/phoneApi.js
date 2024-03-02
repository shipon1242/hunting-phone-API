const loadPhone= async(searchText,isShowAll) =>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data=await res.json()
    const phones=data.data
    // console.log(phones)
    displayPhones(phones,isShowAll)
}
const displayPhones=(phones,isShowAll)=>{
    // console.log(phones)
    // where set up
const phoneContainer=document.getElementById('phones-container')
phoneContainer.textContent=''
// show all
const showAllContainer=document.getElementById('showAll-container')
if(phones.length>12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
    
}else{
    showAllContainer.classList.add('hidden')
}

// console.log('show all', isShowAll)
if(!isShowAll){
    phones=phones.slice(0,12)
}

    phones.forEach(phone=>{
        // console.log(phone)
        // create div
        const phoneCard=document.createElement('div')
        phoneCard.classList='card w-96 bg-gray-100 shadow-xl';
        // set inner html
        phoneCard.innerHTML = `<div class="card  bg-gray-100 shadow-xl">
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body ">
          <h2 class=" title text-center text-2xl font-bold">${phone. phone_name}</h2>
          <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions justify-center">
        
            <button onclick="handleDetails('${phone.slug}')" class="btn btn-primary w-3/4 text-3xl font-bold pb-2">Show Details</button>
          </div>
        </div>
      </div>`;
      phoneContainer.appendChild(phoneCard)


    }
    )

    // hide loading spinner
    toggleLoadingSpinner(false)
    
}


// handle search

const handleSearch=(isShowAll)=>{
    toggleLoadingSpinner(true,isShowAll)
    const searchField=document.getElementById('searchField')
    const searchText=searchField.value;
    loadPhone(searchText,isShowAll)
    
}

const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner= document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// show all  click
const handleShowAll=()=>{
    
    handleSearch(true)

}

// click handle details

const handleDetails= async(id)=>{
    

    // console.log('click handle details',id)
// load single phone data
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data=await res.json()
    const phone=data.data
    // console.log(phone)
    showModal(phone)
}
const showModal=(phone)=>{
    const phoneName=document.getElementById('show-details-phone-name')
    phoneName.innerText=phone.name
const showDetailsContainer=document.getElementById('show-details-container')
showDetailsContainer.innerHTML=`
<img class='flex justify-center' src="${phone.image}" alt="Shoes" />
<p> storage: ${phone.mainFeatures?.storage} </p>
<p> displaySize: ${phone.mainFeatures?.displaySize || 'no displaySize available'} </p>
<p> memory: ${phone.mainFeatures.memory} </p>
<p> releaseDate: ${phone.releaseDate}</p>
<p> Gps: ${phone.others?.GPS || 'no available'}</p>
<p> Gps: ${phone.others?.GPS ? phone.others.GPS: 'no available in this device'}</p>
<p> brand: ${phone.brand}</p>

`


    my_phoneDetails_modal.showModal()
    console.log(phone)
    
    
}