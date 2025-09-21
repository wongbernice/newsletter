
const db = require('./db');

async function create(group){
    try{
        const result = await db.query(
            `INSERT INTO groups_table
            (group_name, deadline) 
            VALUES (?,?)`,
            [group.group_name, group.deadline]
        );

        const result2 = await db.query(
            `INSERT INTO newsletters
            (group_id, title) 
            VALUES (?,?)`,
            [result.insertId, group.date]
        );

        //update current newlstter id
        const result3 = await db.query(
            `UPDATE groups_table
            SET current_newsletter_id= ?
            WHERE id= ?`,
            [result2.insertId, result.insertId]
        );

        const result4 = await db.query(
            `INSERT INTO user_groups
            (user_id, group_id) 
            VALUES (?,?)`,
            [group.user_id, result.insertId]
        );

        let message = 'Error in creating programming language';

        if (result.affectedRows) {
            message = 'Group created successfully';
        }
        return {
            message:'Group & Newsletter created successfully'
        };
    } catch(err){
        console.error('Error creating group and newsletter', err);
        throw err;
    }
}

module.exports={ 
    create
}