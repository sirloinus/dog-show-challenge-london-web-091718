const dogsURL = 'http://localhost:3000/dogs'
const dogList = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')
const inputName = dogForm.querySelector('input[name="name"]')
const inputBreed = dogForm.querySelector('input[name="breed"]')
const inputSex = dogForm.querySelector('input[name="sex"]')

const state = {
    dogs: [],
    dog: null
}

document.addEventListener('DOMContentLoaded', async() => {
    const dogs = await getDogs(dogsURL)
    state.dogs = dogs
    renderAllDogRows(dogs)
})

document.addEventListener('click', event => {
    if(event.target.className === 'edit-btn'){
        event.preventDefault()
        const id = event.target.dataset.id
        const foundDog = state.dogs.find(dog => dog.id === parseInt(id))
        state.dog = foundDog
        inputName.value = `${foundDog.name}`
        inputBreed.value = `${foundDog.breed}`
        inputSex.value = `${foundDog.sex}`
     }
    if(event.target.id === 'edit-submit'){
        event.preventDefault()
        const foundDog = state.dog
        editDogValues(foundDog)
    }
})

const editDogValues = async dog => {
    dog.name = inputName.value
    dog.breed = inputBreed.value
    dog.sex = inputSex.value
    const editedDog = await updateDog(dogsURL, dog)
    dogList.innerHTML = ''
    const dogs = await getDogs(dogsURL)
    renderAllDogRows(dogs)
}

const renderDogRow = dog => {
    const dogRowEl = document.createElement('tr')
    dogRowEl.innerHTML = `
        <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button class='edit-btn' data-id=${dog.id}>Edit Dog</button></td>
        </tr>
    `
    dogList.appendChild(dogRowEl)
}

const renderAllDogRows = dogs => 
    dogs.forEach(dog => renderDogRow(dog))