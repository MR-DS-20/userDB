
const jwt = require("./jwt");
/**
 * Used to create data persitence while server is running
 */
module.exports = class UserDB {
    /**
    * User = {uuid: '', accessToken: '', data: [ {id:'',value:''}]}
    */
    users = [];

    getUser(uuid) {
        return this.users.find((u) => u.uuid === uuid);
    }

    /**
     * Creates a new user object & jwt to be sent back to user.
     * @param uuid 
     * @returns User
     */
    addUser(uuid) {
        const newUser = {
            uuid: uuid,
            accessToken: jwt.generateAccessToken(uuid),
            data: []
        };
        this.users.push(newUser);

        return newUser;

    }

    /**
     * Find the user, add the new items, then delete ones marked for deletion
     */
    updateData(uuid, added, deleted) {
        const userIndex = this.users.findIndex(u => u.uuid === uuid)

        added = added?.map(d => { 
            if(d.new){
                d.new = false;
            }
             return d 
        })
        if(added){
            this.users[userIndex].data.push(...added)
        }

        deleted.forEach(d => {
            this.users[userIndex].data.forEach( (i, index) => {
                if(i.id === d.id){
                    this.users[userIndex].data.splice(index, 1)
                }
            })
        });
        console.log(this.users[userIndex])
    }
};
