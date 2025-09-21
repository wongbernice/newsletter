const db = require('./db'); // import newsletter database

// async function to get the groups past newsletters
async function getNewsletters(groupId){
    try{
        const rows = await db.query(
            `SELECT id, group_id, title, created_at
             FROM newsletters
             WHERE group_id = ?
             ORDER BY created_at DESC`,
            [groupId]
        );

        // if no newsletters found
        if (!rows.length) {
            return { message: 'No newsletters found for this group' };
        }

        return { newsletters: rows };

    } catch(err){
        console.error('Error getting newsletters: ', err);
        throw err;
    }
}

//export function
module.exports={ getNewsletters  };