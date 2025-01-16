// req : LO QUE EL CLIENTE ENVIA
// res : LO QUE EL SERVIDOR ENVIA

import { pool } from "../db.js";

// GET TASKS
export const getTasks = async (req, res) => {

  try {
    const [result] = await pool.query("SELECT * FROM Tasks ORDER BY createAt ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET TASK
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM Tasks WHERE id = ?",
      [id]
    );

    if (result.length == 0)
      return res.status(404).json({
        status: 404,
        message: "Tarea no encontrada",
      });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Tasks(title, description) VALUES(?, ?)",
      [title, description]
    );
    res.json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message }); 
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE Tasks SET ? WHERE id = ?`,
      [ req.body, req.params.id ]
    );
    const { affectedRows } = result;
    if (affectedRows === 0) {
      res.json({
        status: 404,
        message: "Error al actualizar la tarea",
      });
      return;
    }
  
    res.json({ status: 200, message: "Tarea actualizada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "DELETE FROM Tasks WHERE id = ?",
      [id]
    );
    const { affectedRows } = result;

    if (affectedRows === 0) {
      res.json({
        status: 404,
        message: "Error al eliminar la tarea",
      });
      return;
    }

    res.json({ status: 200, message: "Tarea eliminada" });

    // **Otra forma de hacerlo con un ternario
    /**
      affectedRows === 0 ? 
      res.json({
        message: "Error al eliminar la tarea",
      }) : 
      res.json({ 
        message: "Tarea eliminada" 
      });
    */
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
