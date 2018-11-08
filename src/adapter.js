const getDogs = async url => {
    const response = await fetch(url)
    return response.json()
}

const updateDog = async (url, dog) => {
    const response = await fetch(url + `/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)     
    })
    return response.json()
}

