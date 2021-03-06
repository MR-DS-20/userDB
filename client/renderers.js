/**
 * Funcitons that render html elements, add listeners, change styles etc...
 */

import { removeData } from "./dataMethods.js";
/**
 * Renders all the data items in User Data as a bullet list to be inserted in a <ul> element. Adds listeners for deleteing elements
 */
export function renderDataList(userData) {
    // Create list items
    document.getElementById('user-data-list').innerHTML =
        userData.data
            .map((d, i) => {
                if (!d?.deleted) {
                    return `<li> ${d.value} | <span  class="pointer" id="${d.id}"><u>delete</u></span> </li>`;
                } else {
                    return '';
                }
            }).join('');

    /**
     * Add listeners
     */
    userData.data.forEach(d => {
        if (!d?.deleted) {
            document.getElementById(d.id).addEventListener('click', () => {
                removeData(userData, d.id);

                renderDataList(userData);
            })
        }

    })
}

/**
 * Used after a successfull login to hide the login components render user data and display editor
 */
export function hideLoginShowUserData(userData) {
    document.getElementById('login-component').style.display = 'none';

    document.getElementById('user-data-component').style.display = 'block';

    document.getElementById('user-data-edit-component').style.display = 'block';

    document.getElementById('user-id').innerText = userData.uuid;

    renderDataList(userData);
}