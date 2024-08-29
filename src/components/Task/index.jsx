import { useState } from 'react';
import styles from './task.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { MdEdit, MdSave, MdCancel } from 'react-icons/md'; // Import edit, save, and cancel icons

export function Task({ task, onDelete, onComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false); // State to handle edit mode
  const [newTitle, setNewTitle] = useState(task.title); // State to handle new title input

  // Function to handle saving the edited title
  const handleSave = () => {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  // Function to handle canceling the edit
  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(task.title);
  };

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      {isEditing ? (
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          className={styles.editInput} 
        />
      ) : (
        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {task.title}
        </p>
      )}

      <div className={styles.buttonGroup}>
        {isEditing ? (
          <>
            <button className={styles.saveButton} onClick={handleSave}>
              <MdSave size={20} />
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              <MdCancel size={20} />
            </button>
          </>
        ) : (
          <>
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>
              <MdEdit size={20} />
            </button>
            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
              <TbTrash size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
