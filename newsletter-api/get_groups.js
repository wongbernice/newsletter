
const db = require('./db'); // import newsletter database

// async function to get user's groups
async function getUserGroups(userId){
    try{
        const rows = await db.query(
            `SELECT g.id, g.group_name, g.deadline, g.current_newsletter_id
             FROM groups_table g
             JOIN user_groups ug ON g.id = ug.group_id
             WHERE ug.user_id = ?`,
            [userId]
        );

        // if no groups found
        if (!rows.length) {
            return { message: 'User is not part of any groups' };
        }

        return { groups: rows };

    } catch(err){
        console.error('Error getting user groups: ', err);
        throw err;
    }
}

//export function
module.exports={ getUserGroups };