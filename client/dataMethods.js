/**
 * Methods to perform Data operations on the locally stored userData object
 */

export function addData(userData, item){
    userData.data.push(item)
}

export function removeData(userData, id){
    const index = userData.data.findIndex((d) => d.id === id)
    userData.data.splice(index, 1)
}
