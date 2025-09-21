
const db = require('./db'); // import newsletter database

// async function to add user to group
async function addUserToGroup(group){
    try{
        // add a new row to user_groups table
        const result = await db.query(
            `INSERT INTO user_groups (user_id, group_id) VALUES (?,?)`,
            [group.user_id, group.group_id]
        );
        
        let message = 'Error in adding user to group';

        // change message if success
        if (result.affectedRows) {
            message = 'User added to group successfully';
        }
        return {message};

    } catch(err){
        // return error if user already in group
        if(err.code === 'ER_DUP_ENTRY') {
            return {message: 'User is already in this group'}
        }

        // handle other errors
        console.error('Error adding user to group: ', err);
        throw err;
    }
}

//export function
module.exports={ addUserToGroup };