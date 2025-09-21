const db = require('./db'); // import newsletter database

// async function to compile a newsletter after the deadline has passed
async function compileNewsletter(newsletterId) {
  try {
    // newsletter and group info
    const newsletterResult = await db.query(
      `SELECT n.id, n.group_id, n.title, g.deadline
       FROM newsletters n
       JOIN groups_table g ON n.group_id = g.id
       WHERE n.id = ?`,
      [newsletterId]
    );
    
    // check if newsletter exists
    if (!newsletterResult || newsletterResult.length === 0) {
      throw new Error('Newsletter not found');
    }
    
    const newsletter = newsletterResult[0];

    // check if deadline has passed
    const now = new Date();
    if (new Date(newsletter.deadline) > now) {
      throw new Error('Deadline has not passed');
    }

    // fetch newletter updates
    const updates = await db.query(
      `SELECT CONCAT(u.first_name, ' ', u.last_name) AS user_name,
              up.title, up.content
       FROM newsletter_updates nu
       JOIN updates up ON nu.update_id = up.id
       JOIN users u ON up.user_id = u.id
       WHERE nu.newsletter_id = ?
       ORDER BY up.id ASC`,
      [newsletterId]
    );

    // return compiled newsletter
    return {
      message: 'Newsletter compiled successfully',
      newsletterId: newsletter.id,
      title: newsletter.title,
      updates
    };

    //catch errors
  } catch (err) {
    console.error('Error compiling newsletter:', err);
    throw err;
  }
}

module.exports = { compileNewsletter };
