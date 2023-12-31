const db = require('../connection');

// gets information from our database files.
const getTasks = () => {
  return db.query(
    `SELECT todos.*,categories.category
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getLastTaskID = () => {
  console.log('here in getLastTASKID');
  return db.query(
    `SELECT todos.id
    FROM todos
    ORDER BY todos.id DESC
    LIMIT 1;`
  )
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};



const updateTask = async (taskId, name, date, category_id, completed) => {
  console.log('here in updateTASK');

  try {
    await db.query('BEGIN'); // Start a transaction

    // Drop the foreign key constraint
    await db.query('ALTER TABLE todos DROP CONSTRAINT todos_category_id_fkey');
    console.log(`Updating task with taskId=${taskId}, name=${name}, date=${date}, category_id=${category_id}, completed=${completed}`);
    // Execute the UPDATE statement
    const result = await db.query(
      `UPDATE todos
       SET name_of_todo = $1, date_added = $2, category_id = $3, completed = $4
       WHERE id = $5`, [name, date, category_id, completed, taskId]
    );

    // Add the foreign key constraint back
    await db.query('ALTER TABLE todos ADD CONSTRAINT todos_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id)');

    await db.query('COMMIT'); // Commit the transaction

    console.log(`Rows updated: ${result.rowCount}`);
    return result.rowCount;
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback the transaction if an error occurs
    console.error(err.message);
    throw err;
  }
};




const getFilms = () => {
  console.log('here in getFILMS');
  return db.query(
    `SELECT todos.*,categories.category
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 2
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getRestaurants = () => {
  console.log('here in getRestaurants');
  return db.query(
    `SELECT todos.*,categories.category
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 1
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getBooks = () => {
  return db.query(
    `SELECT todos.*,categories.category
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 3
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getProducts = () => {
  return db.query(
    `SELECT todos.*,categories.category
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE todos.category_id = 4
    ORDER BY todos.date_added
    LIMIT 15;`
  )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
  };

  const getOthers = () => {
    return db.query(
      `SELECT todos.*,categories.category
      FROM todos
      JOIN categories ON todos.category_id = categories.id
      WHERE todos.category_id = 5
      ORDER BY todos.date_added
      LIMIT 15;`
    )
      .then((data) => {
        console.log(data.rows);
        return data.rows;
      })
      .catch((err) => {
        console.error(err.message);
      });
    };

  const deleteTask = (taskID) => {
    return db.query(
      `DELETE FROM todos
      WHERE id=$1;`,
      [taskID]
    )
    .then((result) => {
      console.log(`Task with ID ${taskID} deleted.`);
      return result.rowCount > 0; // Return true if the task was deleted successfully.
    })
    .catch((err) => {
      console.error(`Error deleting task with ID ${taskID}: ${err.message}`);
      return false; // Return false if there was an error deleting the task.
    });
  };

  const completeTask = function(taskID,completed,date_completed){
    return db.query(
      `UPDATE todos
       SET completed = $1, date_completed = $2
       WHERE id = $3;`, [completed,date_completed,taskID]
    ).then((result) => {
      console.log(`Task with ID ${taskID} updated.`);
      return result.rowCount > 0; // Return true if the task was updated successfully.
    })
    .catch((err) => {
      console.error(`Error updating task with ID ${taskID}: ${err.message}`);
      return false; // Return false if there was an error deleting the task.
    });
  };


  const createNewTask = function(newTask){

    return db.query(
      `INSERT INTO todos (id,name_of_todo,category_id,completed,date_added,date_completed)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [newTask.taskID, newTask.name_of_todo, newTask.categoryID, "FALSE", newTask.date_added, newTask.date_completed]
      ).then((result) => {
      console.log(`Task with ID ${newTask.taskID} updated.`);
      return result.rowCount > 0; // Return true if the task was updated successfully.
    })
    .catch((err) => {
      console.error(`Error updating task with ID ${newTask.taskID}: ${err.message}`);
      return false; // Return false if there was an error deleting the task.
    });
  }


  module.exports = { getFilms, getRestaurants, getBooks, getProducts, getTasks, deleteTask, updateTask, getOthers,completeTask,getLastTaskID,createNewTask };
