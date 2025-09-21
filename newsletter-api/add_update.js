
const db = require('./db'); // import newsletter database

// async function to add user to group
async function addUpdate({groupId, user_id, title, content}){
    try{
        // Insert into updates table
        const result = await db.query(
            `INSERT INTO updates (user_id, title, content) VALUES (?, ?, ?)`,
            [user_id, title, content]
        );

        const update_id = result.insertId;

        // Get current newsletter for the group
        const newsletterResult = await db.query(
            `SELECT current_newsletter_id
            FROM groups_table
            WHERE id = ?`,
            [groupId]
        );
        
        const newsletter_id = newsletterResult[0]?.current_newsletter_id;
        let message = 'Update added to newsletter successfully';

        if (!newsletter_id) {
            message = 'No current newsletter for this group';
            return { message, update_id, title, content };
        }

        // insert into newsletter_updates
        await db.query(
            `INSERT INTO newsletter_updates (newsletter_id, update_id)
            VALUES (?, ?)`,
            [newsletter_id, update_id]
        );

        return { message, update_id, title, content };

    } catch(err){
        console.error('Error adding update: ', err);
        throw err;
    }
}

//export function
module.exports={ addUpdate };